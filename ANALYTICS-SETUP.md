# Google Analytics 4 Setup Guide for Formetric

## Overview

Your Formetric diagnostic tool now includes Google Analytics 4 (GA4) tracking with conversion events. This guide will help you set up GA4 to track user behavior and conversions.

## Quick Setup (5 minutes)

### Step 1: Create GA4 Account

1. Go to [Google Analytics](https://analytics.google.com/)
2. Sign in with your Google account
3. Click "Start measuring"
4. Enter your account name (e.g., "Formetric")
5. Choose your data sharing settings
6. Click "Next"

### Step 2: Set Up Property

1. Enter property name: "Formetric Diagnostic Tool"
2. Select your reporting time zone
3. Choose your currency
4. Click "Next"

### Step 3: Choose Business Information

1. Select "Other" for industry category
2. Choose your business size
3. Select "Generate leads" as your primary business objective
4. Click "Create"

### Step 4: Set Up Data Stream

1. Choose "Web" as your platform
2. Enter your website URL (e.g., https://yourdomain.com)
3. Enter stream name: "Formetric Website"
4. Click "Create stream"

### Step 5: Get Your Measurement ID

1. After creating the stream, you'll see your **Measurement ID** (format: G-XXXXXXXXXX)
2. Copy this ID - you'll need it in the next step

## Implementation

### Replace Placeholder ID

In all HTML files (index.html, diagnostic.html, results.html), replace `GA_MEASUREMENT_ID` with your actual measurement ID:

```html
<!-- Find this line: -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>

<!-- Replace with: -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
```

And also update the gtag config:

```javascript
// Find this line:
gtag('config', 'GA_MEASUREMENT_ID');

// Replace with:
gtag('config', 'G-XXXXXXXXXX');
```

## Tracked Events

Your diagnostic tool automatically tracks these important conversion events:

### 1. Page Views
- **Event**: `page_view`
- **Triggered**: On every page load
- **Pages**: Landing page, Diagnostic, Results

### 2. Diagnostic Started
- **Event**: `diagnostic_start`
- **Triggered**: When user clicks "Get your analysis" button
- **Category**: `engagement`
- **Label**: `Get your analysis`

### 3. Diagnostic Completed
- **Event**: `diagnostic_complete`
- **Triggered**: When user completes all diagnostic questions
- **Category**: `engagement`
- **Label**: `Completed Financial Diagnostic`

### 4. Email Submitted
- **Event**: `email_submit`
- **Triggered**: When user submits email for results
- **Category**: `conversion`
- **Label**: `Results Email Capture`

## Set Up Conversion Goals

### In GA4 Dashboard:

1. Go to **Configure** → **Events**
2. Click **Create conversion**
3. Add these events as conversions:
   - `diagnostic_start`
   - `diagnostic_complete`
   - `email_submit`

### Create Custom Audiences:

1. Go to **Configure** → **Audiences**
2. Create these audiences:
   - **Diagnostic Starters**: Users who triggered `diagnostic_start`
   - **Diagnostic Completers**: Users who triggered `diagnostic_complete`
   - **Email Subscribers**: Users who triggered `email_submit`

## Key Metrics to Monitor

### Conversion Funnel:
1. **Landing Page Views**: Total visitors
2. **Diagnostic Starts**: Click-through rate from landing page
3. **Diagnostic Completions**: Completion rate of diagnostic
4. **Email Captures**: Email submission rate

### Calculate These Rates:
- **Start Rate**: `diagnostic_start` / `page_view` (landing page)
- **Completion Rate**: `diagnostic_complete` / `diagnostic_start`
- **Email Capture Rate**: `email_submit` / `diagnostic_complete`
- **Overall Conversion Rate**: `email_submit` / `page_view` (landing page)

## Recommended Reports

### 1. Real-time Report
- Monitor active users and current conversions
- **Path**: Realtime → Overview

### 2. Conversion Report
- Track your conversion events performance
- **Path**: Reports → Engagement → Conversions

### 3. Audience Report
- Understand user demographics and behavior
- **Path**: Reports → User → Demographics

### 4. Custom Funnel Report
Create a custom exploration to track the full funnel:
1. Go to **Explore** → **Free form**
2. Add dimensions: `Event name`, `Page title`
3. Add metrics: `Event count`, `Users`
4. Create funnel: Landing → Diagnostic Start → Diagnostic Complete → Email Submit

## Optimization Tips

### Based on Realistic Expectations:

1. **Low Start Rate** (<15%):
   - Improve landing page headline and value proposition
   - Make CTA button more prominent
   - Add educational previews or testimonials

2. **Low Completion Rate** (<25%):
   - Simplify assessment questions
   - Reduce number of steps or make questions optional
   - Add clear progress indicators and value reminders

3. **Low Email Capture** (<60%):
   - Improve value proposition on results page
   - Focus on educational benefits
   - Simplify email form and clearly explain next steps

## Privacy Compliance

Your GA4 setup includes:
- ✅ Cookie consent handling
- ✅ IP anonymization (automatic in GA4)
- ✅ Data retention settings
- ✅ Privacy policy updates

## Testing Your Setup

### Verify Tracking:

1. Open your website in a new incognito window
2. Go through the diagnostic process
3. Check GA4 Realtime report to see events firing
4. Look for these events in sequence:
   - `page_view` (landing page)
   - `diagnostic_start`
   - `page_view` (diagnostic page)
   - `diagnostic_complete`
   - `page_view` (results page)
   - `email_submit`

### Debug Mode:

Add this to your gtag config for debugging (remove in production):

```javascript
gtag('config', 'G-XXXXXXXXXX', {
    debug_mode: true
});
```

## Troubleshooting

### Events Not Showing:

1. **Check Measurement ID**: Ensure it's correct in all files
2. **Clear Browser Cache**: Hard refresh pages
3. **Check Browser Console**: Look for JavaScript errors
4. **Verify Network Requests**: Check Network tab in DevTools for gtag requests

### Common Issues:

- **Ad Blockers**: May prevent GA4 loading
- **Same Domain**: GA4 may not track localhost properly
- **GDPR Compliance**: Ensure cookie consent is properly handled

## Advanced Features (Optional)

### Enhanced Ecommerce Tracking:
If you add paid features later, set up ecommerce tracking:

```javascript
gtag('event', 'purchase', {
    transaction_id: '12345',
    value: 99.00,
    currency: 'USD',
    items: [{
        item_id: 'diagnostic_premium',
        item_name: 'Premium Financial Analysis',
        category: 'diagnostic',
        quantity: 1,
        price: 99.00
    }]
});
```

### Custom Dimensions:
Track additional business data:

```javascript
gtag('config', 'G-XXXXXXXXXX', {
    custom_map: {
        'custom_parameter_1': 'company_stage',
        'custom_parameter_2': 'revenue_range'
    }
});
```

## Support

- **Google Analytics Help**: [support.google.com/analytics](https://support.google.com/analytics)
- **GA4 Documentation**: [developers.google.com/analytics/devguides/collection/ga4](https://developers.google.com/analytics/devguides/collection/ga4)

---

**Next Steps:**
1. Create your GA4 account
2. Replace the placeholder measurement ID
3. Set up conversion goals
4. Monitor your funnel performance
5. Optimize based on the data

Your diagnostic tool is now ready to provide valuable insights into user behavior and conversion performance!