// OneWoundedWorld.org - Redesigned Homepage JavaScript
// Theme: "They Bomb Us. We Build Each Other."

// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeInteractivity();
    initializeCounters();
    initializeCarousels();
    initializeCharts();
    initializeForms();
    initializeAudio();
    initializeFloatingAction();
    initializeNavigation();
});

// GSAP Animations
function initializeAnimations() {
    // Hero animations
    const tl = gsap.timeline();
    
    // Flags animation
    gsap.set('.flag', { scale: 0, rotation: 180 });
    gsap.to('.flag', {
        scale: 1,
        rotation: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.7)',
        delay: 1
    });
    
    // Typewriter effect enhancement
    gsap.set('.typewriter', { width: 0 });
    gsap.to('.typewriter', {
        width: '100%',
        duration: 4,
        ease: 'none',
        delay: 2
    });
    
    // Hero content reveal
    gsap.set('.hero-subhead, .hero-ctas', { opacity: 0, y: 30 });
    gsap.to('.hero-subhead', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        delay: 6
    });
    gsap.to('.hero-ctas', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        delay: 6.5
    });
    
    // Scroll-triggered animations
    gsap.utils.toArray('.stat-item').forEach((item, index) => {
        gsap.fromTo(item, 
            { opacity: 0, y: 50, scale: 0.8 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: 'back.out(1.7)',
                delay: index * 0.1,
                scrollTrigger: {
                    trigger: item,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
    
    // Path cards animation
    gsap.utils.toArray('.path-card').forEach((card, index) => {
        gsap.fromTo(card,
            { opacity: 0, y: 100, rotationX: 45 },
            {
                opacity: 1,
                y: 0,
                rotationX: 0,
                duration: 1,
                ease: 'power3.out',
                delay: index * 0.2,
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
    
    // Media wall reveal animation
    gsap.utils.toArray('.media-item').forEach((item, index) => {
        gsap.fromTo(item,
            { opacity: 0, scale: 0.5, rotation: 10 },
            {
                opacity: 1,
                scale: 1,
                rotation: 0,
                duration: 0.8,
                ease: 'back.out(1.7)',
                delay: index * 0.1,
                scrollTrigger: {
                    trigger: item,
                    start: 'top 90%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
    
    // Parallax effects
    gsap.utils.toArray('.hero-image').forEach(img => {
        gsap.to(img, {
            yPercent: -50,
            ease: 'none',
            scrollTrigger: {
                trigger: img,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    });
    
    // Section title animations
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.fromTo(title,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: title,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
}

// Interactive functionality
function initializeInteractivity() {
    // Crisis map interactions
    const crisisZones = document.querySelectorAll('.crisis-zone');
    crisisZones.forEach(zone => {
        zone.addEventListener('click', function() {
            const region = this.dataset.region;
            showCrisisDetails(region);
        });
        
        zone.addEventListener('mouseenter', function() {
            gsap.to(this.querySelector('.pulse'), {
                scale: 1.5,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        zone.addEventListener('mouseleave', function() {
            gsap.to(this.querySelector('.pulse'), {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
    
    // Media wall reveal functionality
    const mediaItems = document.querySelectorAll('.media-item');
    mediaItems.forEach(item => {
        item.addEventListener('click', function() {
            const revealType = this.dataset.reveal;
            revealMediaItem(this, revealType);
        });
    });
    
    // Action buttons
    const shareBtn = document.querySelector('.share-btn');
    if (shareBtn) {
        shareBtn.addEventListener('click', shareToSave);
    }
    
    const timelineBtn = document.querySelector('.timeline-btn');
    if (timelineBtn) {
        timelineBtn.addEventListener('click', () => {
            window.location.href = 'crisis.html#timeline';
        });
    }
    
    // Instant action buttons
    const emailRepBtn = document.getElementById('emailRep');
    if (emailRepBtn) {
        emailRepBtn.addEventListener('click', openEmailTool);
    }
    
    const downloadKitBtn = document.getElementById('downloadKit');
    if (downloadKitBtn) {
        downloadKitBtn.addEventListener('click', downloadPosterPack);
    }
    
    const shareStoryBtn = document.getElementById('shareStory');
    if (shareStoryBtn) {
        shareStoryBtn.addEventListener('click', shareStory);
    }
    
    // Product story buttons
    const storyBtns = document.querySelectorAll('.story-btn');
    storyBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            showProductStory(this);
        });
    });
}

// Animated counters
function initializeCounters() {
    const counters = document.querySelectorAll('[data-target]');
    
    counters.forEach(counter => {
        const target = parseFloat(counter.dataset.target);
        const isDecimal = target % 1 !== 0;
        
        gsap.fromTo(counter, 
            { textContent: 0 },
            {
                textContent: target,
                duration: 2,
                ease: 'power2.out',
                snap: { textContent: isDecimal ? 0.1 : 1 },
                stagger: 0.2,
                scrollTrigger: {
                    trigger: counter,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                onUpdate: function() {
                    const value = parseFloat(this.targets()[0].textContent);
                    if (isDecimal) {
                        counter.textContent = value.toFixed(1);
                    } else {
                        counter.textContent = Math.floor(value).toLocaleString();
                    }
                }
            }
        );
    });
}

// Carousel functionality
function initializeCarousels() {
    // Crisis explainer carousel
    const explainerCarousel = document.querySelector('.explainer-carousel');
    if (explainerCarousel) {
        initializeExplainerCarousel();
    }
    
    // Quotes carousel
    const quotesCarousel = document.querySelector('.quotes-carousel');
    if (quotesCarousel) {
        initializeQuotesCarousel();
    }
}

function initializeExplainerCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    let currentSlide = 0;
    
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        // Animate slide transition
        gsap.fromTo(slides[index], 
            { opacity: 0, x: 50 },
            { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
        );
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }
    
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
    
    // Auto-advance carousel
    setInterval(nextSlide, 8000);
}

function initializeQuotesCarousel() {
    const slides = document.querySelectorAll('.quote-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.quote-prev');
    const nextBtn = document.querySelector('.quote-next');
    let currentQuote = 0;
    
    function showQuote(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
        
        // Animate quote transition
        gsap.fromTo(slides[index], 
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
        );
    }
    
    function nextQuote() {
        currentQuote = (currentQuote + 1) % slides.length;
        showQuote(currentQuote);
    }
    
    function prevQuote() {
        currentQuote = (currentQuote - 1 + slides.length) % slides.length;
        showQuote(currentQuote);
    }
    
    nextBtn.addEventListener('click', nextQuote);
    prevBtn.addEventListener('click', prevQuote);
    
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentQuote = index;
            showQuote(currentQuote);
        });
    });
    
    // Auto-advance quotes
    setInterval(nextQuote, 10000);
}

// Charts initialization
function initializeCharts() {
    const chartCanvas = document.getElementById('impactChart');
    if (chartCanvas) {
        const ctx = chartCanvas.getContext('2d');
        
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Direct Aid', 'Operations', 'Advocacy & Tools'],
                datasets: [{
                    data: [82, 10, 8],
                    backgroundColor: [
                        '#1B5E20', // Forest Green
                        '#424242', // Charcoal
                        '#1976D2'  // Blue
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
                        backgroundColor: '#212121',
                        titleColor: '#FAFAFA',
                        bodyColor: '#FAFAFA',
                        borderColor: '#B71C1C',
                        borderWidth: 2,
                        cornerRadius: 8,
                        displayColors: true,
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.parsed + '%';
                            }
                        }
                    }
                },
                animation: {
                    animateRotate: true,
                    duration: 2000,
                    easing: 'easeOutQuart'
                }
            }
        });
    }
}

// Form handling
function initializeForms() {
    const emailForm = document.getElementById('emailForm');
    if (emailForm) {
        emailForm.addEventListener('submit', handleEmailSubmission);
    }
    
    // Language selector
    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
        languageSelect.addEventListener('change', handleLanguageChange);
    }
}

function handleEmailSubmission(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const alerts = document.getElementById('alerts').checked;
    const toolkit = document.getElementById('toolkit').checked;
    
    // Animate submission
    const submitBtn = e.target.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'JOINING...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        submitBtn.textContent = '✓ JOINED THE RESISTANCE';
        submitBtn.style.background = '#1B5E20';
        
        // Show success message
        showToast('Welcome to the resistance! Check your email for next steps.', 'success');
        
        // Reset form after delay
        setTimeout(() => {
            emailForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
        }, 3000);
    }, 2000);
}

function handleLanguageChange(e) {
    const selectedLang = e.target.value;
    showToast(`Language changed to ${selectedLang.toUpperCase()}`, 'info');
    // In a real implementation, this would trigger translation
}

// Audio functionality
function initializeAudio() {
    const audioButtons = document.querySelectorAll('.audio-btn');
    const audioModal = document.getElementById('audioModal');
    const modalClose = document.querySelector('.modal-close');
    const playBtn = document.getElementById('playBtn');
    
    audioButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const audioType = this.dataset.audio;
            openAudioModal(audioType);
        });
    });
    
    if (modalClose) {
        modalClose.addEventListener('click', closeAudioModal);
    }
    
    if (audioModal) {
        audioModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeAudioModal();
            }
        });
    }
    
    if (playBtn) {
        playBtn.addEventListener('click', toggleAudioPlayback);
    }
}

function openAudioModal(audioType) {
    const modal = document.getElementById('audioModal');
    const title = document.getElementById('audioTitle');
    const transcript = document.getElementById('audioTranscript');
    
    // Set content based on audio type
    const audioData = {
        fatima: {
            title: 'Fatima - Gaza Nurse',
            transcript: '"We had no bandages left. I tore my hijab into strips. The fabric was white, like hope. By morning, it was red with their pain. But we saved three children that night. Three futures that almost ended."'
        },
        maryam: {
            title: 'Maryam - Mother from Rafsanjan',
            transcript: '"He was drawing when the earth shook. Crayons scattered everywhere. We found him under his desk, still holding the red one. At the funeral, I put all his crayons in the grave. He loved to color the world."'
        },
        ahmad: {
            title: 'Ahmad - 12 years old, Khan Yunis',
            transcript: '"The bakery was broken, but the oven still worked. We hid there during the bombing. The smell of bread mixed with smoke. Mama said we were safe because even broken places can feed you."'
        }
    };
    
    const data = audioData[audioType] || audioData.fatima;
    title.textContent = data.title;
    transcript.textContent = data.transcript;
    
    modal.classList.add('active');
    
    // Animate modal entrance
    gsap.fromTo(modal.querySelector('.modal-content'),
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }
    );
}

function closeAudioModal() {
    const modal = document.getElementById('audioModal');
    
    gsap.to(modal.querySelector('.modal-content'),
        { 
            scale: 0.5, 
            opacity: 0, 
            duration: 0.3, 
            ease: 'power2.in',
            onComplete: () => {
                modal.classList.remove('active');
            }
        }
    );
}

function toggleAudioPlayback() {
    const playBtn = document.getElementById('playBtn');
    const progress = document.getElementById('progress');
    const timeDisplay = document.getElementById('timeDisplay');
    
    if (playBtn.textContent === '▶️') {
        playBtn.textContent = '⏸️';
        simulateAudioPlayback(progress, timeDisplay);
    } else {
        playBtn.textContent = '▶️';
        // Stop simulation
    }
}

function simulateAudioPlayback(progressBar, timeDisplay) {
    const duration = 45; // 45 seconds
    let currentTime = 0;
    
    const interval = setInterval(() => {
        currentTime += 0.1;
        const percentage = (currentTime / duration) * 100;
        
        progressBar.style.width = percentage + '%';
        timeDisplay.textContent = `${formatTime(currentTime)} / ${formatTime(duration)}`;
        
        if (currentTime >= duration) {
            clearInterval(interval);
            document.getElementById('playBtn').textContent = '▶️';
        }
    }, 100);
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Floating Action Button
function initializeFloatingAction() {
    const fab = document.getElementById('floatingAction');
    const fabMain = fab.querySelector('.fab-main');
    
    fabMain.addEventListener('click', function() {
        fab.classList.toggle('active');
        
        // Animate menu items
        const menuItems = fab.querySelectorAll('.fab-item');
        if (fab.classList.contains('active')) {
            gsap.fromTo(menuItems,
                { scale: 0, rotation: 180 },
                { 
                    scale: 1, 
                    rotation: 0, 
                    duration: 0.3, 
                    stagger: 0.1, 
                    ease: 'back.out(1.7)' 
                }
            );
        }
    });
    
    // Close FAB when clicking outside
    document.addEventListener('click', function(e) {
        if (!fab.contains(e.target)) {
            fab.classList.remove('active');
        }
    });
}

// Navigation
function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navbar = document.getElementById('navbar');
    
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(33, 33, 33, 0.98)';
        } else {
            navbar.style.background = 'rgba(33, 33, 33, 0.95)';
        }
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Utility functions
function showCrisisDetails(region) {
    const details = {
        gaza: {
            title: 'Gaza Crisis',
            description: 'Over 2.3 million people trapped in 365 sq km. 70% are refugees. Medical system collapsed.',
            action: 'Send emergency medical supplies'
        },
        iran: {
            title: 'Iran Humanitarian Crisis',
            description: 'Earthquake zones need rebuilding. Sanctions block medical supplies. Children lack basic care.',
            action: 'Fund mobile medical clinics'
        },
        lebanon: {
            title: 'Lebanon Emergency',
            description: '1.5 million Syrian refugees. Economic collapse. Healthcare system failing.',
            action: 'Support refugee families'
        }
    };
    
    const data = details[region];
    showToast(`${data.title}: ${data.description}`, 'info');
}

function revealMediaItem(item, revealType) {
    const blur = item.querySelector('.media-blur');
    const overlay = item.querySelector('.media-overlay');
    
    // Remove blur and show content
    gsap.to(blur, {
        filter: 'blur(0px) brightness(1)',
        duration: 0.8,
        ease: 'power2.out'
    });
    
    gsap.to(overlay, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out'
    });
    
    // Add revealed class to prevent re-blurring
    item.classList.add('revealed');
    
    // Show context-specific message
    const messages = {
        shoes: 'Layla, age 6. She was walking to school when the airstrike hit.',
        ambulance: 'They targeted the Red Crescent ambulance. 3 medics died trying to save lives.',
        medical: 'The medical tent was clearly marked. They bombed it anyway.',
        protest: 'Tehran stands with Gaza. Solidarity crosses all borders.',
        flags: 'From Iran to Palestine, one struggle, one voice.',
        march: 'Thousands march in Tehran for Gaza. The world is watching.'
    };
    
    setTimeout(() => {
        showToast(messages[revealType] || 'Truth revealed.', 'warning');
    }, 1000);
}

function shareToSave() {
    if (navigator.share) {
        navigator.share({
            title: 'OneWoundedWorld - Crisis Update',
            text: 'They bomb us. We build each other. Join the resistance.',
            url: window.location.href
        });
    } else {
        // Fallback to clipboard
        navigator.clipboard.writeText(window.location.href);
        showToast('Link copied! Share to save lives.', 'success');
    }
}

function openEmailTool() {
    // In a real implementation, this would open a representative finder
    showToast('Opening representative finder...', 'info');
    setTimeout(() => {
        window.open('support-tools.html#email-tool', '_blank');
    }, 1000);
}

function downloadPosterPack() {
    // Simulate download
    showToast('Downloading protest toolkit...', 'info');
    
    // Create a fake download
    const link = document.createElement('a');
    link.href = 'data:text/plain;charset=utf-8,OneWoundedWorld Protest Toolkit\n\nThank you for joining the resistance.';
    link.download = 'onewoundedworld-toolkit.txt';
    link.click();
    
    setTimeout(() => {
        showToast('Toolkit downloaded! Print and protest.', 'success');
    }, 2000);
}

function shareStory() {
    const stories = [
        'Fatima stitched wounds with her hijab. Share her courage.',
        'Ahmad found hope in a broken bakery. Share his resilience.',
        'Maryam buried her son with his crayons. Share her love.'
    ];
    
    const randomStory = stories[Math.floor(Math.random() * stories.length)];
    
    if (navigator.share) {
        navigator.share({
            title: 'Survivor Story - OneWoundedWorld',
            text: randomStory,
            url: 'https://onewoundedworld.org/stories'
        });
    } else {
        navigator.clipboard.writeText(randomStory + ' https://onewoundedworld.org/stories');
        showToast('Story copied! Share their voice.', 'success');
    }
}

function showProductStory(button) {
    const stories = {
        'Still Standing': 'Designed by Layla Al-Rashid while hiding in a Gaza shelter. Each hoodie funds medical supplies for 2 families.',
        'She Had a Name': 'Honors the 7,308 children killed. Their names are printed inside the collar.',
        'Erase the Silence': 'Made from recycled protest banners. Carries the voices they tried to silence.'
    };
    
    const productName = button.closest('.product-info').querySelector('h3').textContent.replace(/"/g, '');
    const story = stories[productName] || 'Every product tells a story of resistance.';
    
    showToast(story, 'info');
}

function showToast(message, type = 'info') {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    // Style the toast
    Object.assign(toast.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: type === 'success' ? '#1B5E20' : 
                   type === 'warning' ? '#B71C1C' : 
                   type === 'info' ? '#1976D2' : '#424242',
        color: '#FAFAFA',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        zIndex: '10000',
        maxWidth: '300px',
        fontSize: '0.9rem',
        fontWeight: '500',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease'
    });
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 4000);
}

// Heartbeat animation for critical stats
function addHeartbeatEffect() {
    const criticalStats = document.querySelectorAll('.stat-item.critical');
    criticalStats.forEach(stat => {
        setInterval(() => {
            gsap.to(stat, {
                scale: 1.05,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                ease: 'power2.inOut'
            });
        }, 2000);
    });
}

// Initialize heartbeat effect after page load
window.addEventListener('load', addHeartbeatEffect);

// Keyboard accessibility
document.addEventListener('keydown', function(e) {
    // ESC key closes modals
    if (e.key === 'Escape') {
        const audioModal = document.getElementById('audioModal');
        if (audioModal.classList.contains('active')) {
            closeAudioModal();
        }
        
        const fab = document.getElementById('floatingAction');
        if (fab.classList.contains('active')) {
            fab.classList.remove('active');
        }
    }
    
    // Enter key on buttons
    if (e.key === 'Enter' && e.target.tagName === 'BUTTON') {
        e.target.click();
    }
});

// Performance optimization
function optimizePerformance() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Preload critical resources
    const criticalImages = [
        'images/homepage/hero_child_destruction.jpg',
        'images/homepage/destroyed_school_gaza.jpg'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Initialize performance optimizations
window.addEventListener('load', optimizePerformance);

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // In production, this would send error reports
});

// Service worker registration for offline functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

