// Formetric Financial Diagnostic - Premium Experience
class PremiumDiagnostic {
    constructor() {
        this.currentStep = 0;
        this.totalSteps = 10;
        this.responses = {};
        this.questions = this.initializeQuestions();
        
        this.init();
    }

    initializeQuestions() {
        return [
            {
                id: 'company_info',
                title: 'Let\'s start with your company',
                subtitle: 'This helps us customize your analysis',
                type: 'input_group',
                fields: [
                    { name: 'company_name', label: 'Company Name', type: 'text', required: true },
                    { name: 'founder_name', label: 'Your Name', type: 'text', required: true },
                    { name: 'email', label: 'Email Address', type: 'email', required: true }
                ]
            },
            {
                id: 'industry_focus',
                title: 'What\'s your primary focus?',
                subtitle: 'This helps us benchmark against similar companies',
                type: 'single_choice',
                options: [
                    { value: 'supplements', label: 'Supplements & Nutrition', description: 'Vitamins, protein, wellness supplements' },
                    { value: 'skincare', label: 'Natural Skincare', description: 'Clean beauty, organic skincare products' },
                    { value: 'functional_foods', label: 'Functional Foods', description: 'Healthy snacks, superfoods, beverages' },
                    { value: 'fitness', label: 'Fitness & Active', description: 'Workout gear, athletic supplements' },
                    { value: 'other', label: 'Other Health & Wellness', description: 'Tell us more about your focus' }
                ]
            },
            {
                id: 'business_stage',
                title: 'What stage is your business?',
                subtitle: 'This affects our growth recommendations',
                type: 'single_choice',
                options: [
                    { value: 'pre_launch', label: 'Pre-Launch', description: 'Still developing products/market' },
                    { value: 'early_stage', label: 'Early Stage', description: '0-12 months, finding product-market fit' },
                    { value: 'growth_stage', label: 'Growth Stage', description: '1-3 years, scaling operations' },
                    { value: 'established', label: 'Established', description: '3+ years, optimizing performance' }
                ]
            },
            {
                id: 'revenue_range',
                title: 'What\'s your current annual revenue?',
                subtitle: 'We use this for industry benchmarking',
                type: 'single_choice',
                options: [
                    { value: 'pre_revenue', label: 'Pre-Revenue', description: 'Still in development phase' },
                    { value: '0_100k', label: '$0 - $100K', description: 'Early validation stage' },
                    { value: '100k_500k', label: '$100K - $500K', description: 'Growing customer base' },
                    { value: '500k_1m', label: '$500K - $1M', description: 'Scaling operations' },
                    { value: '1m_5m', label: '$1M - $5M', description: 'Established business' },
                    { value: '5m_plus', label: '$5M+', description: 'High-growth company' }
                ]
            },
            {
                id: 'primary_channel',
                title: 'How do you primarily sell?',
                subtitle: 'Different channels have different unit economics',
                type: 'single_choice',
                options: [
                    { value: 'dtc_online', label: 'Direct-to-Consumer Online', description: 'Your own website, email marketing' },
                    { value: 'amazon_marketplaces', label: 'Amazon & Marketplaces', description: 'Third-party platforms' },
                    { value: 'retail_wholesale', label: 'Retail & Wholesale', description: 'Physical stores, distributors' },
                    { value: 'subscription', label: 'Subscription Model', description: 'Recurring monthly/quarterly delivery' },
                    { value: 'mixed', label: 'Mixed Channels', description: 'Multiple sales channels' }
                ]
            },
            {
                id: 'customer_acquisition',
                title: 'What\'s your biggest challenge in getting customers?',
                subtitle: 'This helps us identify optimization opportunities',
                type: 'single_choice',
                options: [
                    { value: 'high_cac', label: 'Customer Acquisition Cost', description: 'Ads are expensive, ROI is challenging' },
                    { value: 'low_conversion', label: 'Low Conversion Rates', description: 'Traffic doesn\'t convert to sales' },
                    { value: 'customer_retention', label: 'Customer Retention', description: 'Hard to get repeat purchases' },
                    { value: 'brand_awareness', label: 'Brand Awareness', description: 'People don\'t know about us' },
                    { value: 'pricing_strategy', label: 'Pricing Strategy', description: 'Unsure about optimal pricing' }
                ]
            },
            {
                id: 'gross_margins',
                title: 'What are your gross margins?',
                subtitle: 'This is critical for understanding unit economics',
                type: 'single_choice',
                options: [
                    { value: 'below_30', label: 'Below 30%', description: 'Need significant cost optimization' },
                    { value: '30_50', label: '30% - 50%', description: 'Room for improvement' },
                    { value: '50_70', label: '50% - 70%', description: 'Healthy margin range' },
                    { value: '70_plus', label: '70%+', description: 'Excellent margin control' },
                    { value: 'unsure', label: 'Not Sure', description: 'Need help calculating this' }
                ]
            },
            {
                id: 'cash_runway',
                title: 'How long is your current cash runway?',
                subtitle: 'Understanding your financial runway helps prioritize recommendations',
                type: 'single_choice',
                options: [
                    { value: 'less_3_months', label: 'Less than 3 months', description: 'Immediate cash flow focus needed' },
                    { value: '3_6_months', label: '3-6 months', description: 'Short-term optimization priority' },
                    { value: '6_12_months', label: '6-12 months', description: 'Good runway for growth experiments' },
                    { value: '12_plus_months', label: '12+ months', description: 'Strong position for scaling' },
                    { value: 'profitable', label: 'Profitable/Self-funded', description: 'Cash flow positive operations' }
                ]
            },
            {
                id: 'growth_goals',
                title: 'What\'s your primary growth goal?',
                subtitle: 'This shapes our strategic recommendations',
                type: 'single_choice',
                options: [
                    { value: 'profitability', label: 'Achieve Profitability', description: 'Focus on unit economics and cost control' },
                    { value: 'scale_revenue', label: 'Scale Revenue Fast', description: 'Growth at reasonable CAC levels' },
                    { value: 'market_expansion', label: 'Expand to New Markets', description: 'Geographic or demographic expansion' },
                    { value: 'product_diversification', label: 'Diversify Products', description: 'Expand product line strategically' },
                    { value: 'exit_preparation', label: 'Prepare for Exit', description: 'Optimize metrics for acquisition/sale' }
                ]
            },
            {
                id: 'biggest_pain_point',
                title: 'What keeps you up at night?',
                subtitle: 'Your biggest concern guides our priority recommendations',
                type: 'single_choice',
                options: [
                    { value: 'cash_flow', label: 'Cash Flow Management', description: 'Unpredictable revenue, expense control' },
                    { value: 'competition', label: 'Increasing Competition', description: 'Market getting more crowded' },
                    { value: 'supply_chain', label: 'Supply Chain Issues', description: 'Cost increases, inventory challenges' },
                    { value: 'team_scaling', label: 'Team & Operations Scaling', description: 'Growing without losing efficiency' },
                    { value: 'marketing_roi', label: 'Marketing ROI', description: 'Unclear what marketing actually works' }
                ]
            }
        ];
    }

    init() {
        this.renderCurrentQuestion();
        this.bindEvents();
        this.updateProgress();
    }

    bindEvents() {
        document.getElementById('next-btn').addEventListener('click', () => this.nextQuestion());
        document.getElementById('prev-btn').addEventListener('click', () => this.previousQuestion());
    }

    renderCurrentQuestion() {
        const question = this.questions[this.currentStep];
        const container = document.getElementById('question-container');
        
        container.innerHTML = this.generateQuestionHTML(question);
        this.bindQuestionEvents(question);
        
        // Animate in
        setTimeout(() => {
            const questionCard = container.querySelector('.question-card');
            if (questionCard) {
                questionCard.classList.add('active');
            }
        }, 100);
    }

    generateQuestionHTML(question) {
        let html = `
            <div class="question-card">
                <div class="mb-8">
                    <h2 class="text-2xl font-bold mb-3" style="color: var(--deep-charcoal);">
                        ${question.title}
                    </h2>
                    <p class="text-lg" style="color: var(--editorial-gray);">
                        ${question.subtitle}
                    </p>
                </div>
                
                <div class="space-y-4">
        `;

        if (question.type === 'input_group') {
            question.fields.forEach(field => {
                html += `
                    <div>
                        <label class="block text-sm font-semibold mb-2" style="color: var(--deep-charcoal);">
                            ${field.label} ${field.required ? '*' : ''}
                        </label>
                        <input 
                            type="${field.type}" 
                            name="${field.name}"
                            class="premium-input"
                            ${field.required ? 'required' : ''}
                        >
                    </div>
                `;
            });
        } else if (question.type === 'single_choice') {
            question.options.forEach((option, index) => {
                html += `
                    <div class="option-card" data-value="${option.value}">
                        <div class="flex items-start">
                            <div class="w-6 h-6 border-2 border-gray-300 rounded-full mr-4 mt-1 flex items-center justify-center">
                                <div class="w-3 h-3 bg-blue-600 rounded-full opacity-0 transition-opacity"></div>
                            </div>
                            <div class="flex-1">
                                <h3 class="font-semibold text-lg mb-2" style="color: var(--deep-charcoal);">
                                    ${option.label}
                                </h3>
                                <p class="text-sm" style="color: var(--editorial-gray);">
                                    ${option.description}
                                </p>
                            </div>
                        </div>
                    </div>
                `;
            });
        }

        html += `
                </div>
            </div>
        `;

        return html;
    }

    bindQuestionEvents(question) {
        if (question.type === 'input_group') {
            const inputs = document.querySelectorAll('.premium-input');
            inputs.forEach(input => {
                input.addEventListener('input', () => this.validateCurrentStep());
            });
        } else if (question.type === 'single_choice') {
            const options = document.querySelectorAll('.option-card');
            options.forEach(option => {
                option.addEventListener('click', () => {
                    // Clear previous selections
                    options.forEach(opt => {
                        opt.classList.remove('selected');
                        opt.querySelector('.w-3').style.opacity = '0';
                    });
                    
                    // Select current option
                    option.classList.add('selected');
                    option.querySelector('.w-3').style.opacity = '1';
                    
                    // Store response
                    this.responses[question.id] = option.dataset.value;
                    
                    this.validateCurrentStep();
                });
            });
        }
    }

    validateCurrentStep() {
        const question = this.questions[this.currentStep];
        let isValid = false;

        if (question.type === 'input_group') {
            const requiredFields = question.fields.filter(field => field.required);
            isValid = requiredFields.every(field => {
                const input = document.querySelector(`[name="${field.name}"]`);
                return input && input.value.trim() !== '';
            });
            
            if (isValid) {
                // Store all field values
                question.fields.forEach(field => {
                    const input = document.querySelector(`[name="${field.name}"]`);
                    if (input) {
                        this.responses[field.name] = input.value.trim();
                    }
                });
            }
        } else if (question.type === 'single_choice') {
            isValid = this.responses[question.id] !== undefined;
        }

        // Update next button state
        const nextBtn = document.getElementById('next-btn');
        nextBtn.disabled = !isValid;
    }

    nextQuestion() {
        if (this.currentStep < this.totalSteps - 1) {
            this.currentStep++;
            this.updateProgress();
            this.renderCurrentQuestion();
            this.updateNavigation();
        } else {
            // Final step - redirect to results
            this.submitDiagnostic();
        }
    }

    previousQuestion() {
        if (this.currentStep > 0) {
            this.currentStep--;
            this.updateProgress();
            this.renderCurrentQuestion();
            this.updateNavigation();
        }
    }

    updateProgress() {
        const progress = ((this.currentStep + 1) / this.totalSteps) * 100;
        document.getElementById('progress-fill').style.width = `${progress}%`;
        document.getElementById('current-step').textContent = this.currentStep + 1;
        document.getElementById('total-steps').textContent = this.totalSteps;
    }

    updateNavigation() {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');

        prevBtn.style.display = this.currentStep > 0 ? 'block' : 'none';
        
        if (this.currentStep === this.totalSteps - 1) {
            nextBtn.textContent = 'Get My Results →';
        } else {
            nextBtn.textContent = 'Next Question →';
        }
    }

    async submitDiagnostic() {
        // Show loading state
        const nextBtn = document.getElementById('next-btn');
        nextBtn.textContent = 'Analyzing...';
        nextBtn.disabled = true;

        try {
            // Calculate basic score
            const score = this.calculateScore();
            
            // Prepare data for database
            const diagnosticData = {
                email: this.responses.email,
                company_name: this.responses.company_name,
                founder_name: this.responses.founder_name,
                responses: this.responses,
                score: score
            };

            // Try to save to database first
            let savedResponse = null;
            try {
                if (window.supabaseClient && window.supabaseClient.isConnected) {
                    savedResponse = await window.supabaseClient.saveDiagnosticResponse(diagnosticData);
                    console.log('✅ Diagnostic saved to database:', savedResponse.id);
                }
            } catch (dbError) {
                console.warn('Database save failed, using localStorage fallback:', dbError);
                // Continue with localStorage fallback
            }

            // Always store in localStorage as backup and for results page
            localStorage.setItem('diagnosticResponses', JSON.stringify(this.responses));
            localStorage.setItem('diagnosticScore', JSON.stringify(score));
            
            // Store database ID if available
            if (savedResponse) {
                localStorage.setItem('diagnosticId', savedResponse.id);
            }

            // Redirect to results
            setTimeout(() => {
                window.location.href = 'results.html';
            }, 2000);

        } catch (error) {
            console.error('Error submitting diagnostic:', error);
            nextBtn.textContent = 'Try Again';
            nextBtn.disabled = false;
            
            // Show user-friendly error message
            this.showErrorMessage('Unable to save your diagnostic. Please check your connection and try again.');
        }
    }

    showErrorMessage(message) {
        const errorHTML = `
            <div id="error-message" class="fixed top-24 left-0 right-0 z-50 mx-6">
                <div class="max-w-4xl mx-auto bg-red-50 border border-red-200 rounded-lg p-4">
                    <div class="flex items-center">
                        <svg class="w-5 h-5 text-red-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                        </svg>
                        <div class="text-red-800">${message}</div>
                        <button onclick="document.getElementById('error-message').remove()" class="ml-auto text-red-600 hover:text-red-800">×</button>
                    </div>
                </div>
            </div>
        `;
        
        // Remove existing error messages
        const existing = document.getElementById('error-message');
        if (existing) existing.remove();
        
        document.body.insertAdjacentHTML('afterbegin', errorHTML);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            const errorEl = document.getElementById('error-message');
            if (errorEl) errorEl.remove();
        }, 5000);
    }

    calculateScore() {
        let score = {
            overall: 50, // Base score
            financial_health: 50,
            growth_potential: 50,
            operational_efficiency: 50,
            recommendations: []
        };

        // Simple scoring logic (can be enhanced later)
        const responses = this.responses;

        // Revenue stage impact
        const revenueMultipliers = {
            'pre_revenue': -10,
            '0_100k': 0,
            '100k_500k': 10,
            '500k_1m': 20,
            '1m_5m': 30,
            '5m_plus': 40
        };
        score.overall += revenueMultipliers[responses.revenue_range] || 0;

        // Margin impact
        const marginMultipliers = {
            'below_30': -15,
            '30_50': 0,
            '50_70': 15,
            '70_plus': 25,
            'unsure': -5
        };
        score.financial_health += marginMultipliers[responses.gross_margins] || 0;

        // Cash runway impact
        const runwayMultipliers = {
            'less_3_months': -20,
            '3_6_months': -10,
            '6_12_months': 5,
            '12_plus_months': 15,
            'profitable': 25
        };
        score.financial_health += runwayMultipliers[responses.cash_runway] || 0;

        // Normalize scores
        score.overall = Math.max(20, Math.min(95, score.overall));
        score.financial_health = Math.max(20, Math.min(95, score.financial_health));
        score.growth_potential = Math.max(20, Math.min(95, score.growth_potential));
        score.operational_efficiency = Math.max(20, Math.min(95, score.operational_efficiency));

        return score;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new PremiumDiagnostic();
});