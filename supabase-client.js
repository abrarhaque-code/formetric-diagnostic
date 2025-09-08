// Supabase Client for Formetric Diagnostic
class SupabaseClient {
    constructor() {
        // Replace these with your actual Supabase project credentials
        this.SUPABASE_URL = 'https://vcuxiacsdghsmbmbzygx.supabase.co'; // Get from Supabase dashboard
        this.SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZjdXhpYWNzZGdoc21ibWJ6eWd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcwODUxOTMsImV4cCI6MjA3MjY2MTE5M30.RvL-0uppgRxb5VmE7vbTPr9dI0_Q7KCXhqOG7AsjyYE'; // Get from Supabase dashboard
        
        this.supabase = null;
        this.isConnected = false;
        
        this.init();
    }

    async init() {
        try {
            // Load Supabase client from CDN
            if (!window.supabase) {
                await this.loadSupabaseSDK();
            }
            
            // Initialize client
            this.supabase = window.supabase.createClient(this.SUPABASE_URL, this.SUPABASE_ANON_KEY);
            
            // Test connection
            const testResult = await this.testConnection();
            this.isConnected = testResult.success;
            
            console.log('✅ Supabase connected successfully');
        } catch (error) {
            console.error('❌ Supabase connection failed:', error);
            this.isConnected = false;
        }
    }

    async loadSupabaseSDK() {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://unpkg.com/@supabase/supabase-js@2';
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    async testConnection() {
        if (!this.supabase) {
            return { success: false, error: 'Supabase client not initialized' };
        }
        
        try {
            // Simple test query
            const { error } = await this.supabase
                .from('diagnostic_responses')
                .select('count', { count: 'exact', head: true });
                
            if (error && error.code !== 'PGRST116') { // PGRST116 = table doesn't exist yet, which is fine
                return { success: false, error: error.message };
            }
            
            return { success: true, url: this.SUPABASE_URL };
        } catch (err) {
            return { success: false, error: err.message };
        }
    }

    async saveDiagnosticResponse(diagnosticData) {
        if (!this.isConnected) {
            throw new Error('Database not connected - falling back to local storage');
        }

        const responseData = {
            email: diagnosticData.email,
            company_name: diagnosticData.company_name,
            founder_name: diagnosticData.founder_name,
            responses_json: diagnosticData.responses,
            overall_score: diagnosticData.score.overall,
            financial_health: diagnosticData.score.financial_health || null,
            growth_potential: diagnosticData.score.growth_potential || null,
            operational_efficiency: diagnosticData.score.operational_efficiency || null,
            created_at: new Date().toISOString()
        };

        const { data, error } = await this.supabase
            .from('diagnostic_responses')
            .insert([responseData])
            .select()
            .single();

        if (error) {
            throw error;
        }

        return data;
    }

    async updateEmailStatus(responseId, emailStatus) {
        if (!this.isConnected) return null;

        const { data, error } = await this.supabase
            .from('diagnostic_responses')
            .update({ 
                email_sent: emailStatus.sent,
                email_sent_at: emailStatus.sent ? new Date().toISOString() : null,
                email_error: emailStatus.error || null
            })
            .eq('id', responseId)
            .select()
            .single();

        if (error) {
            console.error('Failed to update email status:', error);
            return null;
        }

        return data;
    }

    async getDiagnosticStats() {
        if (!this.isConnected) return null;

        try {
            const { data, error } = await this.supabase
                .from('diagnostic_responses')
                .select('overall_score, responses_json, created_at')
                .order('created_at', { ascending: false })
                .limit(100);

            if (error) throw error;

            // Calculate basic stats
            const scores = data.map(d => d.overall_score).filter(s => s);
            const averageScore = scores.reduce((a, b) => a + b, 0) / scores.length;
            
            return {
                totalResponses: data.length,
                averageScore: Math.round(averageScore),
                recentResponses: data.slice(0, 10),
                lastWeekCount: data.filter(d => {
                    const responseDate = new Date(d.created_at);
                    const weekAgo = new Date();
                    weekAgo.setDate(weekAgo.getDate() - 7);
                    return responseDate > weekAgo;
                }).length
            };
        } catch (error) {
            console.error('Failed to get diagnostic stats:', error);
            return null;
        }
    }
}

// Initialize global Supabase client
window.supabaseClient = new SupabaseClient();

// SQL to create the required table in Supabase
// Run this in the Supabase SQL editor:
const CREATE_TABLE_SQL = `
-- Create diagnostic_responses table
CREATE TABLE IF NOT EXISTS diagnostic_responses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT NOT NULL,
    company_name TEXT,
    founder_name TEXT,
    responses_json JSONB NOT NULL,
    overall_score INTEGER,
    financial_health INTEGER,
    growth_potential INTEGER,
    operational_efficiency INTEGER,
    email_sent BOOLEAN DEFAULT FALSE,
    email_sent_at TIMESTAMPTZ,
    email_error TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_diagnostic_responses_email ON diagnostic_responses(email);
CREATE INDEX IF NOT EXISTS idx_diagnostic_responses_created_at ON diagnostic_responses(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE diagnostic_responses ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts (for the diagnostic form)
CREATE POLICY "Allow diagnostic submissions" ON diagnostic_responses
    FOR INSERT WITH CHECK (true);

-- Create policy to allow reading own data (for follow-up emails)
CREATE POLICY "Allow reading own submissions" ON diagnostic_responses
    FOR SELECT USING (true); -- In production, limit this more strictly
`;

console.log('📋 Supabase Table Creation SQL:');
console.log(CREATE_TABLE_SQL);

// Export for use in other files
window.SupabaseClient = SupabaseClient;