// OneWoundedWorld Donate Page JavaScript

// Global variables
let selectedAmount = 40;
let donationType = 'once';
let currentTestimonial = 0;
let testimonialInterval;
let countersAnimated = false;

// Impact data for different donation amounts
const impactData = {
    15: {
        description: "Feeds 1 family for 1 week",
        breakdown: [
            { icon: "fas fa-bread-slice", text: "Rice, oil, and lentils for 7 days" },
            { icon: "fas fa-baby", text: "Baby milk and formula" },
            { icon: "fas fa-tint", text: "Clean drinking water" }
        ]
    },
    40: {
        description: "Saves a wounded child",
        breakdown: [
            { icon: "fas fa-medkit", text: "Medical supplies for 1 wounded child" },
            { icon: "fas fa-pills", text: "Antibiotics and pain medication" },
            { icon: "fas fa-band-aid", text: "Trauma bandages and gauze" }
        ]
    },
    100: {
        description: "Restores a tent for 6 people",
        breakdown: [
            { icon: "fas fa-home", text: "Emergency shelter for 6 people" },
            { icon: "fas fa-bed", text: "Blankets and sleeping materials" },
            { icon: "fas fa-tint", text: "Water purification tablets" }
        ]
    },
    250: {
        description: "Rebuilds a classroom corner",
        breakdown: [
            { icon: "fas fa-book", text: "Educational materials and books" },
            { icon: "fas fa-chalkboard", text: "Whiteboard and teaching supplies" },
            { icon: "fas fa-child", text: "Learning space for 20 children" }
        ]
    }
};

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    initializeDonationForm();
    initializeStickySidebar();
    initializeCounters();
    initializeTestimonials();
    initializeChart();
    initializePaymentForm();
    initializeScrollEffects();
});

// Donation Form Functions
function initializeDonationForm() {
    // Donation type toggle
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            toggleBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            donationType = this.getAttribute('data-type');
            updateDonationButton();
        });
    });

    // Amount selection
    const amountOptions = document.querySelectorAll('.amount-option:not(.custom)');
    amountOptions.forEach(option => {
        option.addEventListener('click', function() {
            amountOptions.forEach(opt => opt.classList.remove('selected'));
            document.querySelector('.amount-option.custom').classList.remove('selected');
            this.classList.add('selected');
            selectedAmount = parseInt(this.getAttribute('data-amount'));
            updateImpactCalculator();
            updateDonationButton();
        });
    });

    // Custom amount input
    const customAmountInput = document.getElementById('customAmount');
    const customOption = document.querySelector('.amount-option.custom');
    
    customAmountInput.addEventListener('focus', function() {
        amountOptions.forEach(opt => opt.classList.remove('selected'));
        customOption.classList.add('selected');
    });

    customAmountInput.addEventListener('input', function() {
        const value = parseInt(this.value) || 0;
        if (value > 0) {
            selectedAmount = value;
            updateImpactCalculator();
            updateDonationButton();
        }
    });

    // Honor donation checkbox
    const honorCheckbox = document.getElementById('honorDonation');
    const honorInput = document.getElementById('honorName');
    
    honorCheckbox.addEventListener('change', function() {
        if (this.checked) {
            honorInput.style.display = 'block';
            honorInput.focus();
        } else {
            honorInput.style.display = 'none';
            honorInput.value = '';
        }
    });

    // Donate button
    const donateBtn = document.getElementById('donateBtn');
    donateBtn.addEventListener('click', openPaymentModal);

    // Initialize with default selection
    document.querySelector('[data-amount="40"]').classList.add('selected');
    updateImpactCalculator();
    updateDonationButton();
}

function updateImpactCalculator() {
    const impactBreakdown = document.getElementById('impactBreakdown');
    const selectedAmountSpan = document.getElementById('selectedAmount');
    
    selectedAmountSpan.textContent = selectedAmount;
    
    // Find the best matching impact data
    let impactInfo = impactData[40]; // default
    const amounts = Object.keys(impactData).map(Number).sort((a, b) => a - b);
    
    for (let amount of amounts) {
        if (selectedAmount >= amount) {
            impactInfo = impactData[amount];
        }
    }
    
    // For custom amounts, calculate proportional impact
    if (!impactData[selectedAmount] && selectedAmount > 250) {
        const multiplier = Math.floor(selectedAmount / 250);
        impactInfo = {
            description: `Rebuilds ${multiplier} classroom corners`,
            breakdown: [
                { icon: "fas fa-book", text: `Educational materials for ${multiplier * 20} children` },
                { icon: "fas fa-chalkboard", text: `${multiplier} whiteboards and teaching supplies` },
                { icon: "fas fa-child", text: `Learning space for ${multiplier * 20} children` }
            ]
        };
    }
    
    // Update the breakdown display
    impactBreakdown.innerHTML = '';
    impactInfo.breakdown.forEach(item => {
        const div = document.createElement('div');
        div.className = 'impact-item';
        div.innerHTML = `
            <i class="${item.icon}"></i>
            <span>${item.text}</span>
        `;
        impactBreakdown.appendChild(div);
    });
}

function updateDonationButton() {
    const donateAmountSpans = document.querySelectorAll('#donateAmount');
    donateAmountSpans.forEach(span => {
        span.textContent = selectedAmount;
    });
    
    const donateBtn = document.getElementById('donateBtn');
    const typeText = donationType === 'monthly' ? 'MONTHLY' : 'NOW';
    donateBtn.querySelector('span').innerHTML = `DONATE $${selectedAmount} ${typeText}`;
}

// Sticky Sidebar Functions
function initializeStickySidebar() {
    const stickyBar = document.getElementById('stickyBar');
    const donateSection = document.getElementById('donate');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                stickyBar.classList.add('visible');
            } else {
                stickyBar.classList.remove('visible');
            }
        });
    }, { threshold: 0.1 });
    
    observer.observe(donateSection);
}

function scrollToDonate(type = 'once') {
    const donateSection = document.getElementById('donate');
    const offsetTop = donateSection.offsetTop - 100;
    
    window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
    });
    
    // Set donation type if specified
    if (type === 'monthly') {
        setTimeout(() => {
            const monthlyBtn = document.querySelector('[data-type="monthly"]');
            if (monthlyBtn) {
                monthlyBtn.click();
            }
        }, 500);
    }
}

// Counter Animation Functions
function initializeCounters() {
    const counters = document.querySelectorAll('.counter-number');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                animateCounters();
                countersAnimated = true;
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounters() {
    const counters = document.querySelectorAll('.counter-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current).toLocaleString();
        }, 16);
        
        counter.style.animation = 'countUp 0.5s ease-out';
    });
}

// Testimonial Rotation Functions
function initializeTestimonials() {
    const testimonials = document.querySelectorAll('.testimonial');
    
    if (testimonials.length > 1) {
        testimonialInterval = setInterval(() => {
            testimonials[currentTestimonial].classList.remove('active');
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            testimonials[currentTestimonial].classList.add('active');
        }, 4000);
    }
}

// Chart Initialization
function initializeChart() {
    const ctx = document.getElementById('allocationChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [
                'Field Relief Kits (41%)',
                'Medical Aid (30%)',
                'Shelter & Tents (12%)',
                'Psychosocial Support (9%)',
                'Admin & Operations (8%)'
            ],
            datasets: [{
                data: [41, 30, 12, 9, 8],
                backgroundColor: [
                    '#B71C1C',
                    '#1B5E20',
                    '#B8860B',
                    '#558B2F',
                    '#424242'
                ],
                borderWidth: 0,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + '%';
                        }
                    }
                }
            },
            animation: {
                animateRotate: true,
                duration: 2000
            }
        }
    });
}

// Payment Form Functions
function initializePaymentForm() {
    // Payment method selection
    const paymentBtns = document.querySelectorAll('.payment-btn');
    const cardForm = document.getElementById('cardForm');
    
    paymentBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            paymentBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const method = this.getAttribute('data-method');
            if (method === 'card') {
                cardForm.style.display = 'block';
            } else {
                cardForm.style.display = 'none';
            }
        });
    });
    
    // Default to card payment
    document.querySelector('[data-method="card"]').classList.add('active');
    
    // Card number formatting
    const cardNumberInput = document.getElementById('cardNumber');
    cardNumberInput.addEventListener('input', function() {
        let value = this.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
        let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
        this.value = formattedValue;
    });
    
    // Expiry date formatting
    const expiryInput = document.getElementById('expiryDate');
    expiryInput.addEventListener('input', function() {
        let value = this.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        this.value = value;
    });
    
    // CVV validation
    const cvvInput = document.getElementById('cvv');
    cvvInput.addEventListener('input', function() {
        this.value = this.value.replace(/\D/g, '');
    });
    
    // Process payment button
    const processBtn = document.getElementById('processPayment');
    processBtn.addEventListener('click', processPayment);
}

function openPaymentModal() {
    const modal = document.getElementById('paymentModal');
    const modalAmount = document.getElementById('modalAmount');
    const modalType = document.getElementById('modalType');
    const modalHonor = document.getElementById('modalHonor');
    const honorSummary = document.getElementById('honorSummary');
    const finalAmount = document.getElementById('finalAmount');
    
    modalAmount.textContent = selectedAmount;
    finalAmount.textContent = selectedAmount;
    modalType.textContent = donationType === 'monthly' ? 'Monthly donation' : 'One-time donation';
    
    const honorName = document.getElementById('honorName').value;
    if (honorName.trim()) {
        modalHonor.textContent = honorName;
        honorSummary.style.display = 'flex';
    } else {
        honorSummary.style.display = 'none';
    }
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closePaymentModal() {
    const modal = document.getElementById('paymentModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function processPayment() {
    // Simulate payment processing
    const processBtn = document.getElementById('processPayment');
    const originalText = processBtn.innerHTML;
    
    processBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> PROCESSING...';
    processBtn.disabled = true;
    
    setTimeout(() => {
        closePaymentModal();
        openThankYouModal();
        processBtn.innerHTML = originalText;
        processBtn.disabled = false;
    }, 3000);
}

function openThankYouModal() {
    const modal = document.getElementById('thankYouModal');
    const thankYouAmount = document.getElementById('thankYouAmount');
    
    thankYouAmount.textContent = selectedAmount;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Track conversion (in real implementation, this would send to analytics)
    console.log('Donation completed:', {
        amount: selectedAmount,
        type: donationType,
        timestamp: new Date().toISOString()
    });
}

function closeThankYouModal() {
    const modal = document.getElementById('thankYouModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function subscribeUpdates() {
    alert('Thank you! You will receive monthly field updates about the impact of your donation.');
    closeThankYouModal();
}

function shareImpact() {
    const text = `I just donated $${selectedAmount} to OneWoundedWorld to help save lives in humanitarian crises. Join me in making a difference!`;
    const url = window.location.href;
    
    if (navigator.share) {
        navigator.share({
            title: 'I just made a difference',
            text: text,
            url: url
        });
    } else {
        // Fallback to copying to clipboard
        navigator.clipboard.writeText(text + ' ' + url).then(() => {
            showToast('Impact message copied to clipboard!');
        });
    }
}

// Scroll Effects
function initializeScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animate donation amounts
                if (entry.target.classList.contains('amount-option')) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease-out';
                }
                
                // Animate trust items
                if (entry.target.classList.contains('trust-item')) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease-out';
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const elements = document.querySelectorAll('.amount-option, .trust-item, .detail-item');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(element);
    });
}

// Utility Functions
function showToast(message) {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: #1B5E20;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 25px;
        z-index: 3000;
        animation: slideInUp 0.3s ease-out;
    `;
    
    document.body.appendChild(toast);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'slideOutDown 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    }).format(amount);
}

// Keyboard Navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        if (document.getElementById('paymentModal').classList.contains('active')) {
            closePaymentModal();
        }
        if (document.getElementById('thankYouModal').classList.contains('active')) {
            closeThankYouModal();
        }
    }
});

// Click outside modal to close
document.getElementById('paymentModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closePaymentModal();
    }
});

document.getElementById('thankYouModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeThankYouModal();
    }
});

// Add toast animations to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
        from {
            transform: translateY(100px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutDown {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(100px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Performance optimization: Lazy load chart library
function loadChartLibrary() {
    if (typeof Chart === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        script.onload = initializeChart;
        document.head.appendChild(script);
    } else {
        initializeChart();
    }
}

// Initialize chart when section comes into view
const chartObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            loadChartLibrary();
            chartObserver.disconnect();
        }
    });
}, { threshold: 0.1 });

const chartSection = document.querySelector('.impact-transparency');
if (chartSection) {
    chartObserver.observe(chartSection);
}

