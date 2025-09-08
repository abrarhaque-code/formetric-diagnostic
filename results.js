// Results Page - Conversion Optimized
class ResultsExperience {
    constructor() {
        this.responses = JSON.parse(localStorage.getItem('diagnosticResponses') || '{}');
        this.score = JSON.parse(localStorage.getItem('diagnosticScore') || '{}');
        this.companyName = this.responses.company_name || 'Your Company';
        
        this.init();
    }

    init() {
        this.generatePersonalizedResults();
        this.animateScoreReveal();
        this.setupEmailCapture();
        this.setupConversionOptimizations();
    }

    generatePersonalizedResults() {
        // Personalize headline with company name
        const headline = document.getElementById('results-headline');
        headline.textContent = `${this.companyName}'s Financial Assessment`;

        // Generate overall category and classification
        const category = this.calculateOverallCategory();
        
        // Update category badge
        const categoryBadge = document.getElementById('category-badge');
        const categoryLabel = document.getElementById('category-label');
        const categorySubtitle = document.getElementById('category-subtitle');
        
        categoryBadge.className = `category-badge ${category.class}`;
        categoryLabel.textContent = category.label;
        
        // Set category-specific subtitles
        const subtitles = {
            'strong': 'Established Foundation',
            'developing': 'Solid Performance', 
            'growing': 'Building Momentum',
            'emerging': 'Early Growth Stage'
        };
        categorySubtitle.textContent = subtitles[category.class] || 'Financial Assessment';

        // Generate personalized subtitle with positive framing
        const subtitle = document.getElementById('results-subtitle');
        subtitle.textContent = this.generatePositiveSubtitle(category);

        // Generate specific insights
        this.generateSpecificInsights();
        
        // Generate recommendations
        this.generateRecommendations();
        
        // Generate urgency indicators
        this.generateUrgencyElements();
    }

    calculateOverallCategory() {
        // Categorical assessment based on business maturity and financial practices
        const responses = this.responses;
        let categoryPoints = 0;
        
        // Revenue stage assessment (most important factor)
        const revenuePoints = {
            'pre_revenue': 0,
            '0_100k': 1,
            '100k_500k': 2, 
            '500k_1m': 3,
            '1m_5m': 4,
            '5m_plus': 4
        };
        categoryPoints += revenuePoints[responses.revenue_range] || 0;

        // Financial tracking sophistication
        const marginPoints = {
            'below_30': 0,
            '30_50': 1,
            '50_70': 2,
            '70_plus': 3,
            'unsure': 0
        };
        categoryPoints += marginPoints[responses.gross_margins] || 0;

        // Cash management maturity
        const runwayPoints = {
            'less_3_months': 0,
            '3_6_months': 1,
            '6_12_months': 2,
            '12_plus_months': 3,
            'profitable': 3
        };
        categoryPoints += runwayPoints[responses.cash_runway] || 0;

        // Business stage maturity
        const stagePoints = {
            'pre_launch': 0,
            'early_stage': 1,
            'growth_stage': 2,
            'established': 3
        };
        categoryPoints += stagePoints[responses.business_stage] || 0;

        // Determine category (0-12 point scale)
        if (categoryPoints >= 10) {
            return { class: 'strong', label: 'Strong' };
        } else if (categoryPoints >= 7) {
            return { class: 'developing', label: 'Developing' };
        } else if (categoryPoints >= 4) {
            return { class: 'growing', label: 'Growing' };
        } else {
            return { class: 'emerging', label: 'Emerging' };
        }
    }

    getCategoryRecommendations(category) {
        const recommendations = {
            'strong': {
                priorities: [
                    'Consider advanced financial modeling for growth planning',
                    'Explore strategic investments in market expansion', 
                    'Implement advanced KPI dashboards for optimization',
                    'Research acquisition opportunities or strategic partnerships'
                ],
                subtitle: 'positioned for accelerated growth with targeted optimizations'
            },
            'developing': {
                priorities: [
                    'Priority: Set up monthly cash flow tracking systems',
                    'Implement gross margin analysis by product line',
                    'Establish formal budgeting and variance reporting',
                    'Consider fractional CFO support for strategic planning'
                ],
                subtitle: 'shows solid performance with clear paths to optimization'
            },
            'growing': {
                priorities: [
                    'Focus: Implement unit economics measurement across products',
                    'Set up weekly financial review meetings',
                    'Establish customer acquisition cost (CAC) tracking', 
                    'Create 90-day rolling cash flow forecasts'
                ],
                subtitle: 'has significant opportunities for rapid improvement'
            },
            'emerging': {
                priorities: [
                    'Start here: Establish basic accounting systems (QuickBooks/Xero)',
                    'Set up separate business banking and expense tracking',
                    'Implement basic inventory management if applicable',
                    'Create simple monthly P&L review process'
                ],
                subtitle: 'has tremendous potential with focused foundation-building'
            }
        };
        
        return recommendations[category.class] || recommendations['developing'];
    }

    generatePositiveSubtitle(category) {
        const companyName = this.companyName;
        const categoryRecs = this.getCategoryRecommendations(category);
        
        return `${companyName} ${categoryRecs.subtitle}. Here's your personalized roadmap.`;
    }

    generateSpecificInsights() {
        const responses = this.responses;
        
        // Financial Health Insights
        const financialCategory = this.calculateComponentCategory('financial', responses);
        document.getElementById('financial-category').textContent = financialCategory.label;
        
        const financialInsights = this.getFinancialInsights(responses, financialCategory);
        document.getElementById('financial-insight').textContent = financialInsights.text;
        document.getElementById('financial-opportunity').textContent = financialInsights.opportunity;

        // Growth Potential
        const growthCategory = this.calculateComponentCategory('growth', responses);
        document.getElementById('growth-category').textContent = growthCategory.label;
        
        const growthInsights = this.getGrowthInsights(responses, growthCategory);
        document.getElementById('growth-insight').textContent = growthInsights.text;
        document.getElementById('growth-opportunity').textContent = growthInsights.opportunity;

        // Operational Efficiency
        const efficiencyCategory = this.calculateComponentCategory('efficiency', responses);
        document.getElementById('efficiency-category').textContent = efficiencyCategory.label;
        
        const efficiencyInsights = this.getEfficiencyInsights(responses, efficiencyCategory);
        document.getElementById('efficiency-insight').textContent = efficiencyInsights.text;
        document.getElementById('efficiency-opportunity').textContent = efficiencyInsights.opportunity;
    }

    calculateComponentCategory(component, responses) {
        // Determine component category based on specific responses
        let points = 0;
        
        if (component === 'financial') {
            // Based on margins, revenue, cash position
            if (responses.gross_margins === '70_plus') points += 3;
            else if (responses.gross_margins === '50_70') points += 2;
            else if (responses.gross_margins === '30_50') points += 1;
            
            if (responses.cash_runway === 'profitable') points += 3;
            else if (responses.cash_runway === '12_plus_months') points += 2;
            else if (responses.cash_runway === '6_12_months') points += 1;
            
        } else if (component === 'growth') {
            // Based on revenue stage and growth goals
            if (responses.revenue_range === '5m_plus' || responses.revenue_range === '1m_5m') points += 3;
            else if (responses.revenue_range === '500k_1m') points += 2;
            else if (responses.revenue_range === '100k_500k') points += 1;
            
            if (responses.growth_goals === 'scale_revenue' || responses.growth_goals === 'market_expansion') points += 2;
            else if (responses.growth_goals === 'exit_preparation') points += 1;
            
        } else if (component === 'efficiency') {
            // Based on stage and operational maturity
            if (responses.business_stage === 'established') points += 3;
            else if (responses.business_stage === 'growth_stage') points += 2;
            else if (responses.business_stage === 'early_stage') points += 1;
            
            if (responses.customer_acquisition !== 'high_cac') points += 2;
        }
        
        // Convert points to category (0-6 scale for components)
        if (points >= 5) return { class: 'strong', label: 'Strong' };
        else if (points >= 3) return { class: 'developing', label: 'Developing' };
        else if (points >= 1) return { class: 'growing', label: 'Growing' };
        else return { class: 'emerging', label: 'Emerging' };
    }

    getFinancialInsights(responses, category) {
        const marginLevel = responses.gross_margins;
        const runway = responses.cash_runway;

        if (category.class === 'strong') {
            return {
                text: "Strong unit economics with healthy margins and cash position.",
                opportunity: "💰 Premium pricing opportunity"
            };
        } else if (category.class === 'developing') {
            return {
                text: "Solid financial foundation with room for margin optimization.",
                opportunity: "📊 Margin improvement identified"
            };
        } else if (category.class === 'growing') {
            return {
                text: "Building financial systems with clear improvement opportunities.",
                opportunity: "⚡ Quick financial wins available"
            };
        } else {
            return {
                text: "Foundational financial systems need development for growth.",
                opportunity: "🏗️ Build strong financial base"
            };
        }
    }

    getGrowthInsights(responses, category) {
        const channel = responses.primary_channel;
        const stage = responses.business_stage;

        if (category.class === 'strong') {
            return {
                text: "Excellent growth trajectory with scalable acquisition channels.",
                opportunity: "🎯 Scale acceleration ready"
            };
        } else if (category.class === 'developing') {
            return {
                text: "Good growth potential with optimization opportunities identified.",
                opportunity: "📈 Growth lever activation"
            };
        } else if (category.class === 'growing') {
            return {
                text: "Strong growth momentum with channel optimization potential.",
                opportunity: "🚀 Growth acceleration possible"
            };
        } else {
            return {
                text: "Early growth stage with significant scaling opportunities ahead.",
                opportunity: "🌱 Growth foundation needed"
            };
        }
    }

    getEfficiencyInsights(responses, category) {
        const challenge = responses.customer_acquisition;
        const painPoint = responses.biggest_pain_point;

        if (category.class === 'strong') {
            return {
                text: "Efficient operations with strong systems and processes.",
                opportunity: "⚡ Automation opportunities"
            };
        } else if (category.class === 'developing') {
            return {
                text: "Solid operational foundation ready for scaling improvements.",
                opportunity: "🎛️ Process optimization ready"
            };
        } else if (category.class === 'growing') {
            return {
                text: "Operational systems developing with efficiency opportunities.",
                opportunity: "⚙️ System improvements available"
            };
        } else {
            return {
                text: "Operational foundations need development for efficient scaling.",
                opportunity: "🔧 Build operational systems"
            };
        }
    }

    generateRecommendations() {
        const category = this.calculateOverallCategory();
        const categoryRecs = this.getCategoryRecommendations(category);
        
        // Convert priorities to recommendation format
        const recommendations = categoryRecs.priorities.map((priority, index) => {
            const icons = ['🎯', '📊', '💡', '🚀'];
            const titles = priority.includes(':') ? priority.split(':')[0] : `Priority ${index + 1}`;
            const description = priority.includes(':') ? priority.split(':')[1].trim() : priority;
            
            return {
                icon: icons[index % icons.length],
                title: titles,
                description: description
            };
        });

        // Add category-specific urgent recommendations based on responses
        const responses = this.responses;
        
        if (responses.cash_runway === 'less_3_months') {
            recommendations.unshift({
                icon: '🚨',
                title: 'URGENT: Cash Flow Priority',
                description: 'With less than 3 months runway, immediate focus on revenue acceleration and expense reduction is critical.'
            });
        }

        if (responses.gross_margins === 'below_30') {
            recommendations.push({
                icon: '💰',
                title: 'Critical Margin Review',
                description: 'Low gross margins threaten sustainability. Immediate cost analysis and pricing review needed.'
            });
        }

        // Populate the recommendations HTML
        const recommendationsList = document.getElementById('recommendations-list');
        if (recommendationsList) {
            recommendationsList.innerHTML = recommendations.slice(0, 4).map(rec => `
                <div class="flex items-start gap-4 p-4 bg-white border border-gray-200 rounded-lg">
                    <div class="text-2xl">${rec.icon}</div>
                    <div>
                        <h3 class="font-semibold mb-2">${rec.title}</h3>
                        <p class="text-gray-600 text-sm">${rec.description}</p>
                    </div>
                </div>
            `).join('');
        }
    }

    generateUrgencyElements() {
        // Create urgency without being negative
        const urgencyIndicator = document.getElementById('urgency-indicator');
        
        const urgencyMessages = [
            "⚡ Key optimization opportunities identified",
            "🎯 High-impact improvements available now",
            "📈 Quick wins ready for implementation",
            "🚀 Growth acceleration opportunities detected"
        ];
        
        urgencyIndicator.textContent = urgencyMessages[Math.floor(Math.random() * urgencyMessages.length)];
    }

    animateScoreReveal() {
        // Animate category badge appearance with premium effect
        const categoryBadge = document.getElementById('category-badge');
        const categoryLabel = document.getElementById('category-label');
        const categorySubtitle = document.getElementById('category-subtitle');
        
        // Start with opacity 0 and scale down
        categoryBadge.style.opacity = '0';
        categoryBadge.style.transform = 'scale(0.8) rotateY(-15deg)';
        categoryBadge.style.filter = 'blur(4px)';
        
        // Animate to full visibility with sophisticated timing
        setTimeout(() => {
            categoryBadge.style.transition = 'all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)';
            categoryBadge.style.opacity = '1';
            categoryBadge.style.transform = 'scale(1) rotateY(0deg)';
            categoryBadge.style.filter = 'blur(0px)';
        }, 500);
        
        // Animate text content separately for premium effect
        setTimeout(() => {
            if (categoryLabel) {
                categoryLabel.style.transition = 'all 0.6s ease-out';
                categoryLabel.style.transform = 'translateY(0px)';
                categoryLabel.style.opacity = '1';
            }
            if (categorySubtitle) {
                categorySubtitle.style.transition = 'all 0.8s ease-out';
                categorySubtitle.style.transform = 'translateY(0px)';
                categorySubtitle.style.opacity = '1';
            }
        }, 800);
        
        // Initialize text positioning
        if (categoryLabel) {
            categoryLabel.style.transform = 'translateY(20px)';
            categoryLabel.style.opacity = '0';
        }
        if (categorySubtitle) {
            categorySubtitle.style.transform = 'translateY(20px)';
            categorySubtitle.style.opacity = '0';
        }
    }

    setupEmailCapture() {
        const form = document.getElementById('email-capture-form');
        
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const button = form.querySelector('.cta-button');
            
            // Store email
            localStorage.setItem('userEmail', email);
            
            // Track email submission
            if (typeof gtag !== 'undefined') {
                gtag('event', 'email_submit', {
                    event_category: 'conversion',
                    event_label: 'Results Email Capture',
                    value: 1
                });
            }
            
            // Update button to show success
            button.textContent = 'Sending Your Analysis...';
            button.disabled = true;
            
            // Simulate email sending
            setTimeout(() => {
                button.textContent = '✅ Analysis Sent! Check Your Email';
                button.style.background = 'linear-gradient(135deg, var(--success-green) 0%, #059669 100%)';
                
                // Trigger follow-up sequence
                this.triggerFollowUpSequence(email);
            }, 2000);
        });
    }

    setupConversionOptimizations() {
        // Auto-save progress in case user navigates away
        this.saveProgressToStorage();
        
        // Track engagement for optimization
        this.trackUserEngagement();
        
        // Mobile optimization checks
        this.optimizeForMobile();
    }

    async triggerFollowUpSequence(email) {
        // Calculate category for email
        const overallCategory = this.calculateOverallCategory();
        
        // Store data for follow-up system
        const followUpData = {
            email: email,
            timestamp: new Date().toISOString(),
            responses: this.responses,
            category: overallCategory,
            companyName: this.companyName,
            stage: 'analysis_requested',
            databaseId: localStorage.getItem('diagnosticId')
        };
        
        localStorage.setItem('followUpData', JSON.stringify(followUpData));

        // Send actual email
        if (window.emailService) {
            try {
                const emailResult = await window.emailService.sendDiagnosticResults(email, {
                    company_name: this.companyName,
                    founder_name: this.responses.founder_name || 'there',
                    email: email,
                    category: overallCategory,
                    recommendations: this.getCategoryRecommendations(overallCategory),
                    databaseId: followUpData.databaseId
                });

                if (emailResult.success) {
                    console.log('✅ Diagnostic email sent successfully');
                    if (emailResult.mock) {
                        // Show different message for mock emails
                        this.showMockEmailNotice();
                    }
                } else {
                    console.error('❌ Email sending failed:', emailResult.error);
                    this.showEmailFailureNotice();
                }
            } catch (error) {
                console.error('Email service error:', error);
                this.showEmailFailureNotice();
            }
        }

        // Show next steps
        setTimeout(() => {
            this.showNextSteps();
        }, 3000);
    }

    showMockEmailNotice() {
        const notice = document.createElement('div');
        notice.className = 'fixed top-24 left-0 right-0 z-50 mx-6';
        notice.innerHTML = `
            <div class="max-w-4xl mx-auto bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div class="flex items-center">
                    <svg class="w-5 h-5 text-blue-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                    </svg>
                    <div class="text-blue-800">
                        <strong>Demo Mode:</strong> Email system not configured yet. Your results have been saved and would be sent to ${this.responses.email}
                    </div>
                    <button onclick="this.parentElement.parentElement.remove()" class="ml-auto text-blue-600 hover:text-blue-800">×</button>
                </div>
            </div>
        `;
        document.body.appendChild(notice);

        setTimeout(() => {
            if (notice.parentElement) notice.remove();
        }, 8000);
    }

    showEmailFailureNotice() {
        const notice = document.createElement('div');
        notice.className = 'fixed top-24 left-0 right-0 z-50 mx-6';
        notice.innerHTML = `
            <div class="max-w-4xl mx-auto bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div class="flex items-center">
                    <svg class="w-5 h-5 text-yellow-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                    <div class="text-yellow-800">
                        <strong>Email Delivery Issue:</strong> We couldn't send your results email right now. Your analysis has been saved - please contact us if you don't receive it within a few minutes.
                    </div>
                    <button onclick="this.parentElement.parentElement.remove()" class="ml-auto text-yellow-600 hover:text-yellow-800">×</button>
                </div>
            </div>
        `;
        document.body.appendChild(notice);

        setTimeout(() => {
            if (notice.parentElement) notice.remove();
        }, 10000);
    }

    showNextSteps() {
        // Create and show next steps modal or section
        const nextStepsHTML = `
            <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                <div class="bg-white rounded-2xl p-8 max-w-md w-full text-center">
                    <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg class="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                    </div>
                    <h3 class="text-2xl font-bold mb-4">What Happens Next?</h3>
                    <div class="text-left space-y-3 mb-6">
                        <div class="flex items-start gap-3">
                            <div class="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">1</div>
                            <div>
                                <div class="font-semibold">Detailed Report (5 minutes)</div>
                                <div class="text-sm text-gray-600">12-page analysis with specific recommendations</div>
                            </div>
                        </div>
                        <div class="flex items-start gap-3">
                            <div class="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">2</div>
                            <div>
                                <div class="font-semibold">Weekly Insights (Optional)</div>
                                <div class="text-sm text-gray-600">Strategic insights and optimization tips</div>
                            </div>
                        </div>
                        <div class="flex items-start gap-3">
                            <div class="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">3</div>
                            <div>
                                <div class="font-semibold">Free Consultation (If Interested)</div>
                                <div class="text-sm text-gray-600">15-minute strategy session with our team</div>
                            </div>
                        </div>
                    </div>
                    <button onclick="this.parentElement.parentElement.remove()" class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold">
                        Perfect, Thanks!
                    </button>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', nextStepsHTML);
    }

    saveProgressToStorage() {
        // Save completed diagnostic state
        localStorage.setItem('diagnosticCompleted', 'true');
        localStorage.setItem('completionTimestamp', new Date().toISOString());
    }

    trackUserEngagement() {
        // Track scroll depth, time on page, etc.
        let maxScrollDepth = 0;
        const startTime = Date.now();
        
        window.addEventListener('scroll', () => {
            const scrollDepth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            maxScrollDepth = Math.max(maxScrollDepth, scrollDepth);
        });
        
        // Store engagement data
        window.addEventListener('beforeunload', () => {
            const engagementData = {
                timeSpent: Date.now() - startTime,
                maxScrollDepth: maxScrollDepth,
                emailCaptured: localStorage.getItem('userEmail') !== null
            };
            
            localStorage.setItem('engagementData', JSON.stringify(engagementData));
        });
    }

    optimizeForMobile() {
        // Mobile-specific optimizations
        if (window.innerWidth < 768) {
            // Adjust font sizes for mobile
            const headline = document.getElementById('results-headline');
            headline.style.fontSize = '2rem';
            
            // Optimize touch targets
            const buttons = document.querySelectorAll('button, .cta-button');
            buttons.forEach(button => {
                button.style.minHeight = '48px';
            });
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ResultsExperience();
});