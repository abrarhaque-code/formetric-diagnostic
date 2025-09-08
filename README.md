# Formetric - Professional Financial Assessment for Health & Wellness Brands

A professional financial assessment platform with integrated diagnostic tool for health & wellness brands. Provides educational guidance based on business stage and financial best practices.

## 🌟 Features

### Core Functionality
- **Premium Landing Page**: Editorial-style design matching enterprise SaaS standards
- **Educational Assessment Tool**: 10-question evaluation for financial health guidance
- **Personalized Results**: Assessment results with stage-appropriate recommendations
- **Email Integration**: Automated results delivery via Brevo/SendinBlue
- **Legal Compliance**: Complete privacy policy and terms of service
- **Analytics Tracking**: Comprehensive Google Analytics 4 implementation

### Technical Highlights
- **Responsive Design**: Pixel-perfect across all devices and screen sizes
- **Performance Optimized**: Sub-3-second load times with Core Web Vitals optimization
- **Progressive Enhancement**: Graceful fallbacks for all interactive features
- **Error Handling**: Comprehensive error monitoring and user feedback
- **SEO Ready**: Complete meta tags, schema markup, and Open Graph implementation
- **Accessibility**: WCAG 2.1 compliant with full keyboard navigation support

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ (for development tooling)
- Modern web browser
- HTTP server (for local development)

### Local Development Setup

1. **Clone and Navigate**
   ```bash
   git clone <repository-url>
   cd formetric-app
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   # Option 1: Using npx (recommended)
   npx http-server . -p 8080 -c-1

   # Option 2: Using Node.js http-server globally
   npm install -g http-server
   http-server . -p 8080 -c-1

   # Option 3: Using Python (if Node.js not available)
   python -m http.server 8080
   ```

4. **Open in Browser**
   ```
   http://localhost:8080
   ```

### Project Structure
```
formetric-app/
├── index.html              # Main landing page
├── diagnostic.html         # Diagnostic tool interface
├── results.html           # Results and recommendations page
├── privacy-policy.html    # Privacy policy page
├── terms.html             # Terms of service page
├── diagnostic.js          # Diagnostic logic and UI
├── results.js             # Results calculation and display
├── email-service.js       # Email integration service
├── supabase-client.js     # Database client (optional)
├── fallbacks.js           # Fallback implementations
├── test-suite.html        # Comprehensive testing interface
├── api/
│   └── send-email.js      # Serverless email function
└── docs/
    ├── LAUNCH-CHECKLIST.md
    ├── DEPLOYMENT-CHECKLIST.md
    ├── SETUP-GUIDE.md
    └── ANALYTICS-SETUP.md
```

## 🛠️ Environment Variables Setup

### Required Environment Variables

Create a `.env` file in your project root:

```bash
# Email Service (Brevo/SendinBlue)
BREVO_API_KEY=your_brevo_api_key_here
SENDER_EMAIL=noreply@yourcompany.com
SENDER_NAME="Formetric Team"

# Google Analytics (Optional but recommended)
GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Supabase (Optional - for advanced data storage)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here

# Domain Configuration
PRODUCTION_URL=https://yourdomain.com
```

### Setting Up Email Service (Brevo)

1. **Create Brevo Account**
   - Sign up at [brevo.com](https://brevo.com)
   - Verify your domain for sending emails

2. **Generate API Key**
   - Go to Account Settings > API Keys
   - Create new API key with "Send emails" permission
   - Add to your environment variables

3. **Configure Sender Domain**
   - Add and verify your sending domain
   - Set up SPF, DKIM, and DMARC records
   - Test email deliverability

### Setting Up Google Analytics

1. **Create GA4 Property**
   - Go to [analytics.google.com](https://analytics.google.com)
   - Create new GA4 property for your domain

2. **Get Measurement ID**
   - Copy your G-XXXXXXXXXX measurement ID
   - Add to environment variables and HTML files

3. **Configure Events**
   - Custom events are pre-configured in the code
   - Verify tracking in GA4 real-time reports

## 🚢 Deployment Instructions

### Vercel Deployment (Recommended)

1. **Prepare for Deployment**
   ```bash
   # Ensure all environment variables are set
   # Test locally first
   npm run test  # Run test suite
   ```

2. **Deploy to Vercel**
   ```bash
   # Install Vercel CLI
   npm install -g vercel

   # Login and deploy
   vercel login
   vercel --prod
   ```

3. **Configure Environment Variables in Vercel**
   - Go to your Vercel dashboard
   - Project Settings > Environment Variables
   - Add all required environment variables

### Alternative Deployment Options

#### Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `echo "Static site - no build needed"`
3. Set publish directory: `.`
4. Configure environment variables in Netlify dashboard

#### Traditional Hosting
1. Upload all files to your web server
2. Ensure HTTPS is enabled
3. Configure environment variables via hosting panel
4. Test all functionality after deployment

### Post-Deployment Checklist

- [ ] SSL certificate active and HTTPS redirect working
- [ ] All environment variables configured correctly
- [ ] Email functionality tested and working
- [ ] Google Analytics tracking verified
- [ ] All pages loading correctly
- [ ] Mobile responsiveness confirmed
- [ ] Performance benchmarks met (see LAUNCH-CHECKLIST.md)

## 🧪 Testing

### Running the Test Suite

1. **Open Test Interface**
   ```
   http://localhost:8080/test-suite.html
   ```

2. **Run Complete Test Suite**
   - Click "Run Complete Test Suite" button
   - Review all test results
   - Address any failing tests before deployment

3. **Test User Journey**
   - Click "Test User Journey" button
   - Complete full diagnostic flow
   - Verify email delivery

### Manual Testing Checklist

- [ ] **Cross-Browser Testing**: Chrome, Firefox, Safari, Edge
- [ ] **Device Testing**: Mobile phones, tablets, desktops
- [ ] **Performance Testing**: Page load times, Core Web Vitals
- [ ] **Accessibility Testing**: Keyboard navigation, screen readers
- [ ] **Email Testing**: Deliverability, formatting, spam scoring

## 🔧 Configuration

### Customizing the Diagnostic Tool

The diagnostic questions and scoring logic can be modified in `diagnostic.js`:

```javascript
// Update questions array
const questions = [
    {
        id: 'revenue_growth',
        text: 'Your custom question here',
        options: [
            { value: 'high', text: 'Option 1', score: 10 },
            { value: 'medium', text: 'Option 2', score: 5 },
            { value: 'low', text: 'Option 3', score: 2 }
        ]
    }
    // Add more questions...
];

// Customize scoring thresholds
const scoreThresholds = {
    excellent: 80,
    good: 60,
    needs_improvement: 40,
    poor: 0
};
```

### Customizing Email Templates

Email templates are defined in `email-service.js`:

```javascript
function generateEmailTemplate(results, userEmail) {
    return {
        subject: "Your Formetric Financial Health Results",
        html: `
            <!-- Your custom HTML email template -->
        `
    };
}
```

### Brand Customization

Update brand colors and styling in the CSS custom properties:

```css
:root {
    --deep-charcoal: #0A0A0B;
    --signal-blue: #2E86AB;
    --cream: #FAFAF8;
    --editorial-gray: #6B7280;
    /* Add your brand colors */
}
```

## 📊 Analytics and Monitoring

### Key Metrics Tracked

- **User Engagement**: Page views, session duration, bounce rate
- **Assessment Flow**: Start rate, completion rate (realistic expectation: 25-40%), drop-off points
- **Educational Value**: Email capture rate (realistic: 60-75%), results email open rate
- **Performance**: Page load times, Core Web Vitals, error rates

### Custom Events

The following custom events are automatically tracked:

- `diagnostic_started`: User begins diagnostic
- `diagnostic_progress`: User completes each question
- `diagnostic_completed`: User finishes all questions
- `email_submitted`: User provides email for results
- `results_viewed`: User views results page

### Error Monitoring

Automatic error tracking includes:

- JavaScript runtime errors
- Network request failures
- Form submission errors
- Email delivery failures

## 🛡️ Security & Privacy

### Security Measures

- **XSS Protection**: All user inputs sanitized
- **Rate Limiting**: API endpoints protected against abuse
- **Secure Headers**: CSP, HSTS, and security headers configured
- **Data Encryption**: All data transmission over HTTPS

### Privacy Compliance

- **GDPR Ready**: Privacy policy includes all required disclosures
- **Data Minimization**: Only essential data collected
- **User Control**: Easy data deletion and export options
- **Transparent Processing**: Clear privacy policy and consent flows

## 🤝 Contributing

### Development Guidelines

1. **Code Style**
   - Use consistent indentation (2 spaces)
   - Follow semantic HTML practices
   - Maintain mobile-first responsive design
   - Ensure accessibility standards compliance

2. **Testing Requirements**
   - Test all changes across target browsers
   - Verify mobile responsiveness
   - Run complete test suite before submitting
   - Include test cases for new features

3. **Performance Standards**
   - Maintain Core Web Vitals in "Good" range
   - Keep page load times under 3 seconds
   - Optimize images and assets
   - Minimize JavaScript bundle size

### Submitting Changes

1. Fork the repository
2. Create a feature branch
3. Make your changes following guidelines
4. Test thoroughly using test-suite.html
5. Submit a pull request with detailed description

## 📚 Additional Resources

### Documentation
- [Launch Checklist](./LAUNCH-CHECKLIST.md) - Complete pre-launch verification
- [Deployment Checklist](./DEPLOYMENT-CHECKLIST.md) - Production deployment guide
- [Setup Guide](./SETUP-GUIDE.md) - Detailed setup instructions
- [Analytics Setup](./ANALYTICS-SETUP.md) - Analytics configuration guide

### External Resources
- [Brevo API Documentation](https://developers.brevo.com/)
- [Google Analytics 4 Setup](https://support.google.com/analytics/answer/9304153)
- [Vercel Deployment Guide](https://vercel.com/docs/deployments/overview)
- [Core Web Vitals Guide](https://web.dev/vitals/)

## 🆘 Support

### Common Issues

**Email not sending?**
- Verify Brevo API key is correct
- Check sender domain verification
- Review email content for spam triggers
- Confirm environment variables are set

**Analytics not tracking?**
- Verify GA4 measurement ID
- Check browser ad blockers
- Confirm real-time reports in GA4
- Test with network tab open

**Performance issues?**
- Run Lighthouse audit
- Check Core Web Vitals
- Optimize images and assets
- Review third-party scripts

### Getting Help

1. Check the troubleshooting guide in LAUNCH-CHECKLIST.md
2. Review test-suite.html for specific error details
3. Check browser console for error messages
4. Verify all environment variables are configured

---

## License

This project is proprietary software. All rights reserved.

## Changelog

### v1.0.0 (Current)
- Initial MVP launch
- Complete diagnostic tool
- Email integration
- Analytics tracking
- Legal pages implementation
- Performance optimization
- Comprehensive testing suite

---

**Built with professional standards for educational financial assessment**

For questions or support, please refer to the documentation or contact the development team.