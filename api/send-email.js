// Vercel Serverless Function for Email Sending
// This avoids CORS issues by handling Resend API calls server-side

export default async function handler(req, res) {
    // Set CORS headers for development
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Only allow POST requests
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    const { email, diagnosticData } = req.body;

    // Validate request data
    if (!email || !diagnosticData) {
        res.status(400).json({ error: 'Missing email or diagnostic data' });
        return;
    }

    // Get API key from environment variables
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    
    if (!RESEND_API_KEY) {
        console.error('RESEND_API_KEY not configured');
        res.status(500).json({ error: 'Email service not configured' });
        return;
    }

    try {
        // Generate email content
        const emailContent = generateEmailContent(diagnosticData);
        
        // Call Resend API
        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${RESEND_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                from: 'Formetric <noreply@resend.dev>',
                to: email,
                subject: `Your Financial Health Analysis - ${diagnosticData.score.overall}/100`,
                html: emailContent.html,
                text: emailContent.text
            })
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({ message: 'Unknown error' }));
            throw new Error(`Resend API error: ${error.message || response.statusText}`);
        }

        const result = await response.json();
        
        console.log('✅ Email sent successfully:', result.id);
        res.status(200).json({ 
            success: true, 
            messageId: result.id 
        });

    } catch (error) {
        console.error('❌ Email send failed:', error);
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
}

// Generate email content - same logic as client-side
function generateEmailContent(diagnosticData) {
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