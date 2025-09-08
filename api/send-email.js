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
                subject: `Your Financial Assessment Results - ${diagnosticData.category ? diagnosticData.category.label : 'Developing'} Category`,
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

// Generate email content - using categorical system
function generateEmailContent(diagnosticData) {
    const { company_name, founder_name, email, category, recommendations } = diagnosticData;
    const categoryLabel = category ? category.label : 'Developing';
    
    // Generate category-based interpretation
    let categoryInterpretation = '';
    let nextSteps = '';
    
    if (category && category.class === 'strong') {
        categoryInterpretation = `Excellent work! ${company_name} demonstrates strong financial practices and is well-positioned for continued growth.`;
        nextSteps = recommendations ? recommendations.priorities.slice(0, 2).join(' \n\n') : 'Continue building on your strong foundation.';
    } else if (category && category.class === 'developing') {
        categoryInterpretation = `${company_name} has built a solid foundation with clear opportunities to optimize and accelerate growth.`;
        nextSteps = recommendations ? recommendations.priorities.slice(0, 2).join(' \n\n') : 'Focus on optimizing your key financial metrics.';
    } else if (category && category.class === 'growing') {
        categoryInterpretation = `${company_name} shows promising momentum with several key areas ready for strategic development.`;
        nextSteps = recommendations ? recommendations.priorities.slice(0, 2).join(' \n\n') : 'Build stronger financial tracking and systems.';
    } else {
        categoryInterpretation = `${company_name} is in an exciting early stage with tremendous potential for rapid progress through focused improvements.`;
        nextSteps = recommendations ? recommendations.priorities.slice(0, 2).join(' \n\n') : 'Start with basic financial system setup and tracking.';
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
        .category-box { background: #f8f9fa; border-left: 4px solid #2E86AB; padding: 20px; margin: 20px 0; }
        .category { font-size: 24px; font-weight: bold; color: #2E86AB; margin: 0; }
        .disclaimer-box { background: #fef3c7; border: 1px solid #fbbf24; padding: 15px; border-radius: 6px; margin: 20px 0; }
        .cta-button { background: #2E86AB; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 8px 8px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 style="margin: 0;">Your Financial Assessment Results</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Results for ${company_name}</p>
        </div>
        
        <div class="content">
            <p>Hi ${founder_name},</p>
            
            <p>Thank you for completing our financial diagnostic. Based on your responses, here's your personalized assessment:</p>
            
            <div class="category-box">
                <h2 style="margin: 0 0 10px 0;">Financial Assessment Category</h2>
                <div class="category">${categoryLabel}</div>
            </div>
            
            <h3>Assessment Insight</h3>
            <p>${categoryInterpretation}</p>
            
            <h3>Your Priority Next Steps</h3>
            <p style="white-space: pre-line;">${nextSteps}</p>
            
            <div class="disclaimer-box">
                <h4 style="margin: 0 0 10px 0; color: #92400e;">⚠️ Important Disclaimer</h4>
                <p style="margin: 0; font-size: 12px; color: #92400e;">This assessment provides educational guidance based on general financial best practices, not industry benchmarking data. Results are for informational purposes only and do not constitute professional financial, investment, or business advice.</p>
            </div>
            
            <div style="background: #f0f9ff; border: 1px solid #bae6fd; padding: 20px; border-radius: 6px; margin: 20px 0;">
                <h4 style="margin: 0 0 10px 0; color: #0369a1;">Want to dive deeper?</h4>
                <p style="margin: 0;">We're currently in beta and expanding our analysis capabilities. If you'd like to discuss your results and explore growth strategies, feel free to reach out.</p>
            </div>
            
            <p>Best regards,<br>
            The Formetric Team</p>
        </div>
        
        <div class="footer">
            <p><strong>This analysis is for educational purposes only and is not professional financial advice.</strong></p>
            <p>Every business situation is unique. Consult with qualified professionals before making significant financial decisions.</p>
            <p>Questions? Reply to this email or contact us at hello@formetric.com</p>
            <p><a href="#" style="color: #666;">Unsubscribe</a> | <a href="#" style="color: #666;">Privacy Policy</a></p>
        </div>
    </div>
</body>
</html>`;

    const text = `
Your Financial Assessment Results - ${company_name}

Hi ${founder_name},

Thank you for completing our financial diagnostic. Based on your responses, here's your personalized assessment:

FINANCIAL ASSESSMENT CATEGORY: ${categoryLabel}

Assessment Insight:
${categoryInterpretation}

Your Priority Next Steps:
${nextSteps}

IMPORTANT DISCLAIMER:
This assessment provides educational guidance based on general financial best practices, not industry benchmarking data. Results are for informational purposes only and do not constitute professional financial, investment, or business advice.

WANT TO DIVE DEEPER?
We're currently in beta and expanding our analysis capabilities. If you'd like to discuss your results and explore growth strategies, feel free to reach out.

Best regards,
The Formetric Team

---
This analysis is for educational purposes only and is not professional financial advice.
Every business situation is unique. Consult with qualified professionals before making significant financial decisions.
Questions? Reply to this email or contact us at hello@formetric.com
`;

    return { html, text };
}