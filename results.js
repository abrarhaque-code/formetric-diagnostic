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
        headline.textContent = `${this.companyName}'s Financial Health Analysis`;

        // Generate overall score and classification
        const overallScore = this.calculateOverallScore();
        const classification = this.getScoreClassification(overallScore);
        
        document.getElementById('overall-score').textContent = overallScore;
        
        // Update score circle styling
        const scoreCircle = document.getElementById('score-circle');
        scoreCircle.className = `score-circle ${classification.class}`;

        // Generate personalized subtitle with positive framing
        const subtitle = document.getElementById('results-subtitle');
        subtitle.textContent = this.generatePositiveSubtitle(classification);

        // Generate specific insights
        this.generateSpecificInsights();
        
        // Generate recommendations
        this.generateRecommendations();
        
        // Generate urgency indicators
        this.generateUrgencyElements();
    }

    calculateOverallScore() {
        // Enhanced scoring with positive bias for conversion
        let baseScore = 45; // Start higher to avoid negative sentiment
        
        const responses = this.responses;

        // Revenue stage scoring (more generous)
        const revenueScores = {
            'pre_revenue': 15,
            '0_100k': 25,
            '100k_500k': 35,
            '500k_1m': 50,
            '1m_5m': 70,
            '5m_plus': 85
        };
        baseScore += revenueScores[responses.revenue_range] || 0;

        // Business stage bonus
        const stageBonus = {
            'pre_launch': 5,
            'early_stage': 10,
            'growth_stage': 15,
            'established': 20
        };
        baseScore += stageBonus[responses.business_stage] || 0;

        // Margin impact (positive framing)
        const marginBonus = {
            'below_30': -10,
            '30_50': 5,
            '50_70': 15,
            '70_plus': 25,
            'unsure': 0 // Neutral, not negative
        };
        baseScore += marginBonus[responses.gross_margins] || 0;

        // Cash runway (security scoring)
        const runwayBonus = {
            'less_3_months': -5, // Less harsh than before
            '3_6_months': 5,
            '6_12_months': 15,
            '12_plus_months': 25,
            'profitable': 30
        };
        baseScore += runwayBonus[responses.cash_runway] || 0;

        // Growth goal alignment bonus
        const goalBonus = {
            'profitability': 10,
            'scale_revenue': 15,
            'market_expansion': 12,
            'product_diversification': 8,
            'exit_preparation': 20
        };
        baseScore += goalBonus[responses.growth_goals] || 0;

        // Ensure score is in optimal range for conversion psychology
        return Math.max(35, Math.min(92, Math.round(baseScore))); // Never below 35, max 92 for credibility
    }

    getScoreClassification(score) {
        if (score >= 75) {
            return {
                class: 'excellent',
                label: 'Excellent Position',
                sentiment: 'strong'
            };
        } else if (score >= 55) {
            return {
                class: 'good',
                label: 'Strong Foundation',
                sentiment: 'positive'
            };
        } else {
            return {
                class: 'needs-improvement',
                label: 'Growth Opportunity',
                sentiment: 'opportunity' // Never "poor" or "bad"
            };
        }
    }

    generatePositiveSubtitle(classification) {
        const companyName = this.companyName;
        
        const subtitles = {
            'strong': [
                `${companyName} is positioned for accelerated growth with targeted optimizations.`,
                `Strong fundamentals detected. Ready to unlock the next level of performance.`,
                `${companyName} has excellent potential for market leadership expansion.`
            ],
            'positive': [
                `${companyName} shows solid performance with clear paths to optimization.`,
                `Good foundation in place. Several high-impact improvements identified.`,
                `${companyName} is well-positioned to outperform industry benchmarks.`
            ],
            'opportunity': [
                `${companyName} has significant untapped potential for rapid improvement.`,
                `Multiple optimization opportunities identified for accelerated growth.`,
                `${companyName} is positioned for dramatic performance improvements.`
            ]
        };

        const options = subtitles[classification.sentiment] || subtitles['positive'];
        return options[Math.floor(Math.random() * options.length)];
    }

    generateSpecificInsights() {
        const responses = this.responses;
        
        // Financial Health Insights
        const financialScore = this.calculateComponentScore('financial', 60);
        document.getElementById('financial-score').textContent = `${financialScore}/100`;
        
        const financialInsights = this.getFinancialInsights(responses, financialScore);
        document.getElementById('financial-insight').textContent = financialInsights.text;
        document.getElementById('financial-opportunity').textContent = financialInsights.opportunity;

        // Growth Potential
        const growthScore = this.calculateComponentScore('growth', 65);
        document.getElementById('growth-score').textContent = `${growthScore}/100`;
        
        const growthInsights = this.getGrowthInsights(responses, growthScore);
        document.getElementById('growth-insight').textContent = growthInsights.text;
        document.getElementById('growth-opportunity').textContent = growthInsights.opportunity;

        // Operational Efficiency
        const efficiencyScore = this.calculateComponentScore('efficiency', 58);
        document.getElementById('efficiency-score').textContent = `${efficiencyScore}/100`;
        
        const efficiencyInsights = this.getEfficiencyInsights(responses, efficiencyScore);
        document.getElementById('efficiency-insight').textContent = efficiencyInsights.text;
        document.getElementById('efficiency-opportunity').textContent = efficiencyInsights.opportunity;
    }

    calculateComponentScore(component, baseScore) {
        // Add some variation but keep in conversion-friendly range
        const variation = Math.floor(Math.random() * 25) - 12; // -12 to +12
        return Math.max(40, Math.min(88, baseScore + variation));
    }

    getFinancialInsights(responses, score) {
        const marginLevel = responses.gross_margins;
        const runway = responses.cash_runway;

        if (score >= 70) {
            return {
                text: "Strong unit economics with healthy margins and cash position.",
                opportunity: "💰 Premium pricing opportunity"
            };
        } else if (score >= 50) {
            return {
                text: "Solid financial foundation with room for margin optimization.",
                opportunity: "📊 Margin improvement identified"
            };
        } else {
            return {
                text: "Key opportunities to strengthen financial performance rapidly.",
                opportunity: "🚀 High-impact improvements available"
            };
        }
    }

    getGrowthInsights(responses, score) {
        const channel = responses.primary_channel;
        const stage = responses.business_stage;

        if (score >= 70) {
            return {
                text: "Excellent growth trajectory with scalable acquisition channels.",
                opportunity: "🎯 Scale acceleration ready"
            };
        } else if (score >= 50) {
            return {
                text: "Good growth potential with optimization opportunities identified.",
                opportunity: "📈 Growth lever activation"
            };
        } else {
            return {
                text: "Significant growth opportunities through channel optimization.",
                opportunity: "🔥 Breakthrough growth possible"
            };
        }
    }

    getEfficiencyInsights(responses, score) {
        const challenge = responses.customer_acquisition;
        const painPoint = responses.biggest_pain_point;

        if (score >= 70) {
            return {
                text: "Efficient operations with strong systems and processes.",
                opportunity: "⚡ Automation opportunities"
            };
        } else if (score >= 50) {
            return {
                text: "Solid operational foundation ready for scaling improvements.",
                opportunity: "🎛️ Process optimization ready"
            };
        } else {
            return {
                text: "Major efficiency gains available through targeted improvements.",
                opportunity: "🚀 Quick wins identified"
            };
        }
    }

    generateRecommendations() {
        const recommendations = [];
        const responses = this.responses;

        // Generate honest, actionable recommendations based on responses
        if (responses.gross_margins === 'below_30' || responses.gross_margins === 'unsure') {
            recommendations.push({
                icon: '💰',
                title: 'Focus on Margin Analysis',
                description: 'Understanding and improving your gross margins is critical for sustainable growth. Consider reviewing your cost structure and pricing strategy.'
            });
        }

        if (responses.cash_runway === 'less_3_months' || responses.cash_runway === '3_6_months') {
            recommendations.push({
                icon: '⏰',
                title: 'Prioritize Cash Flow',
                description: 'With limited runway, focus on immediate revenue-generating activities and consider ways to extend your cash position.'
            });
        }

        if (responses.customer_acquisition === 'high_cac') {
            recommendations.push({
                icon: '🎯',
                title: 'Optimize Customer Acquisition',
                description: 'High acquisition costs can limit growth. Test different channels, improve conversion rates, and focus on customer lifetime value.'
            });
        }

        if (responses.primary_channel === 'mixed' || responses.business_stage === 'early_stage') {
            recommendations.push({
                icon: '📊',
                title: 'Channel Performance Analysis',
                description: 'Track and compare the performance of your different sales channels to focus resources on the most profitable ones.'
            });
        }

        if (responses.biggest_pain_point === 'marketing_roi') {
            recommendations.push({
                icon: '📈',
                title: 'Marketing Attribution',
                description: 'Implement better tracking to understand which marketing activities actually drive revenue. Focus on measurable campaigns.'
            });
        }

        // Always include at least one general recommendation
        if (recommendations.length === 0) {
            recommendations.push({
                icon: '🚀',
                title: 'Foundation Strengthening',
                description: 'Focus on building strong unit economics and sustainable growth processes as you scale your business.'
            });
        }

        // Populate the recommendations HTML
        const recommendationsList = document.getElementById('recommendations-list');
        if (recommendationsList) {
            recommendationsList.innerHTML = recommendations.map(rec => `
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
        // Animate score counting up for psychological impact
        const scoreElement = document.getElementById('overall-score');
        const targetScore = parseInt(scoreElement.textContent);
        
        let currentScore = 0;
        const increment = Math.ceil(targetScore / 30); // 30 steps
        
        const countAnimation = setInterval(() => {
            currentScore += increment;
            if (currentScore >= targetScore) {
                currentScore = targetScore;
                clearInterval(countAnimation);
            }
            scoreElement.textContent = currentScore;
        }, 50);
    }

    setupEmailCapture() {
        const form = document.getElementById('email-capture-form');
        
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const button = form.querySelector('.cta-button');
            
            // Store email
            localStorage.setItem('userEmail', email);
            
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
        // Store data for follow-up system
        const followUpData = {
            email: email,
            timestamp: new Date().toISOString(),
            responses: this.responses,
            score: this.score,
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
                    score: this.score,
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
                                <div class="text-sm text-gray-600">Industry benchmarks and optimization tips</div>
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