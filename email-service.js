// Email Service for Formetric Diagnostic
class EmailService {
    constructor() {
        // Use serverless function endpoint to avoid CORS issues
        this.EMAIL_API_URL = window.location.origin + '/api/send-email';
        // For development, you can override this
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            // During development, we'll use mock mode unless specifically configured
            this.EMAIL_API_URL = '/api/send-email';
        }
        
        this.isConfigured = true; // Always configured now - handled server-side
    }

    async sendDiagnosticResults(email, diagnosticData) {
        try {
            // Call our serverless function instead of Resend API directly
            const response = await fetch(this.EMAIL_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    diagnosticData: diagnosticData
                })
            }).catch(err => {
                // Network error or serverless function not available
                console.warn('Email API call failed:', err);
                // Fallback to mock for development
                if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                    return this.mockEmailSend(email, diagnosticData);
                }
                throw new Error('Email service unavailable');
            });

            if (!response.ok) {
                const error = await response.json().catch(() => ({ message: 'Unknown error' }));
                throw new Error(`Email API error: ${error.message || response.statusText}`);
            }

            const result = await response.json();
            
            // Update database with email status
            if (window.supabaseClient && diagnosticData.databaseId) {
                await window.supabaseClient.updateEmailStatus(diagnosticData.databaseId, {
                    sent: true,
                    error: null
                });
            }

            console.log('✅ Email sent successfully:', result.messageId);
            return { success: true, messageId: result.messageId };

        } catch (error) {
            console.error('❌ Email send failed:', error);
            
            // Update database with error status
            if (window.supabaseClient && diagnosticData.databaseId) {
                await window.supabaseClient.updateEmailStatus(diagnosticData.databaseId, {
                    sent: false,
                    error: error.message
                });
            }

            return { success: false, error: error.message };
        }
    }

    mockEmailSend(email, diagnosticData) {
        // For development/demo - simulate email sending
        console.log('📧 MOCK EMAIL SEND:');
        console.log('To:', email);
        console.log('Subject: Your Financial Health Analysis');
        console.log('Content Preview:');
        
        const content = this.generateEmailContent(diagnosticData);
        console.log(content.text.substring(0, 200) + '...');
        
        return Promise.resolve({ 
            success: true, 
            messageId: 'mock_' + Date.now(),
            mock: true 
        });
    }

    generateEmailContent(diagnosticData) {
        const { company_name, founder_name, email, score } = diagnosticData;
        const overallScore = score.overall;
        
        // Generate score interpretation
        let scoreInterpretation = '';
        let nextSteps = '';
        
        if (overallScore >= 75) {
            scoreInterpretation = `Excellent work! ${company_name} shows strong financial health with solid fundamentals in place.`;
            nextSteps = `Focus on scaling operations and exploring premium pricing strategies to maximize your strong position.`;
        } else if (overallScore >= 55) {
            scoreInterpretation = `${company_name} has a solid foundation with clear opportunities for improvement.`;
            nextSteps = `Consider optimizing your unit economics and customer acquisition costs to unlock the next level of growth.`;
        } else {
            scoreInterpretation = `${company_name} has significant potential for rapid improvement with the right strategic focus.`;
            nextSteps = `Priority should be on strengthening cash flow and optimizing your core business metrics.`;
        }

        const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #2E86AB 0%, #257a9e 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: white; padding: 30px; border: 1px solid #e5e7eb; }
        .score-box { background: #f8f9fa; border-left: 4px solid #2E86AB; padding: 20px; margin: 20px 0; }
        .score { font-size: 36px; font-weight: bold; color: #2E86AB; margin: 0; }
        .cta-button { background: #2E86AB; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 8px 8px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 style="margin: 0;">Your Financial Health Analysis</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Results for ${company_name}</p>
        </div>
        
        <div class="content">
            <p>Hi ${founder_name},</p>
            
            <p>Thank you for completing our financial diagnostic. Based on your responses, here's your personalized analysis:</p>
            
            <div class="score-box">
                <h2 style="margin: 0 0 10px 0;">Overall Financial Health</h2>
                <div class="score">${overallScore}/100</div>
            </div>
            
            <h3>Key Insight</h3>
            <p>${scoreInterpretation}</p>
            
            <h3>Recommended Next Steps</h3>
            <p>${nextSteps}</p>
            
            <div style="background: #f0f9ff; border: 1px solid #bae6fd; padding: 20px; border-radius: 6px; margin: 20px 0;">
                <h4 style="margin: 0 0 10px 0; color: #0369a1;">Want to dive deeper?</h4>
                <p style="margin: 0;">We're currently in beta and expanding our analysis capabilities. If you'd like to discuss your results and explore growth strategies, feel free to reach out.</p>
            </div>
            
            <p>Best regards,<br>
            The Formetric Team</p>
        </div>
        
        <div class="footer">
            <p>This analysis is for informational purposes only and should not be considered professional financial advice.</p>
            <p>Questions? Reply to this email or contact us at hello@formetric.com</p>
            <p><a href="#" style="color: #666;">Unsubscribe</a> | <a href="#" style="color: #666;">Privacy Policy</a></p>
        </div>
    </div>
</body>
</html>`;

        const text = `
Your Financial Health Analysis - ${company_name}

Hi ${founder_name},

Thank you for completing our financial diagnostic. Based on your responses, here's your personalized analysis:

OVERALL FINANCIAL HEALTH: ${overallScore}/100

Key Insight:
${scoreInterpretation}

Recommended Next Steps:
${nextSteps}

WANT TO DIVE DEEPER?
We're currently in beta and expanding our analysis capabilities. If you'd like to discuss your results and explore growth strategies, feel free to reach out.

Best regards,
The Formetric Team

---
This analysis is for informational purposes only and should not be considered professional financial advice.
Questions? Reply to this email or contact us at hello@formetric.com
`;

        return { html, text };
    }

    // Alternative email service - using EmailJS for client-side sending
    async sendViaEmailJS(email, diagnosticData) {
        // EmailJS is easier to set up but less reliable for production
        // Include this as a fallback option
        
        if (!window.emailjs) {
            throw new Error('EmailJS not loaded');
        }

        const templateParams = {
            to_email: email,
            company_name: diagnosticData.company_name,
            founder_name: diagnosticData.founder_name,
            score: diagnosticData.score.overall,
            from_name: 'Formetric Team'
        };

        try {
            const response = await window.emailjs.send(
                'YOUR_SERVICE_ID',
                'YOUR_TEMPLATE_ID',
                templateParams,
                'YOUR_PUBLIC_KEY'
            );
            
            return { success: true, messageId: response.text };
        } catch (error) {
            return { success: false, error: error.text };
        }
    }

    // Get setup instructions for email service
    getSetupInstructions() {
        return {
            resend: {
                title: "Resend Setup (Recommended)",
                steps: [
                    "1. Go to resend.com and create a free account",
                    "2. Verify your domain (or use resend.dev for testing)",
                    "3. Create an API key in the dashboard",
                    "4. Replace YOUR_RESEND_API_KEY in email-service.js",
                    "5. Update FROM_EMAIL to your verified domain",
                    "Free tier: 100 emails/day, 3,000 emails/month"
                ]
            },
            emailjs: {
                title: "EmailJS Setup (Alternative)",
                steps: [
                    "1. Go to emailjs.com and create account",
                    "2. Connect your email service (Gmail, etc.)",
                    "3. Create email template",
                    "4. Get Service ID, Template ID, and Public Key",
                    "5. Include EmailJS SDK and configure",
                    "Free tier: 200 emails/month"
                ]
            }
        };
    }
}

// Initialize email service
window.emailService = new EmailService();

// Log setup instructions
console.log('📧 Email Service Setup Instructions:');
console.log(window.emailService.getSetupInstructions());

// Export for use in other files
window.EmailService = EmailService;