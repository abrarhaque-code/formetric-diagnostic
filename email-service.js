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