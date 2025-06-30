// OneWoundedWorld.org JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Navigation Toggle
    initNavigation();
    
    // Counter Animations
    initCounters();
    
    // Quote Carousel
    initQuoteCarousel();
    
    // Explainer Cards
    initExplainerCards();
    
    // Media Wall Consent
    initMediaWall();
    
    // Email Form
    initEmailForm();
    
    // Floating Action Button
    initFloatingActionButton();
    
    // Smooth Scrolling
    initSmoothScrolling();
    
    // Scroll Effects
    initScrollEffects();
});

// Navigation Functions
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Close menu when clicking on links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// Counter Animation
function initCounters() {
    const counters = document.querySelectorAll('.counter-number, .impact-number');
    const options = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, options);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // Format large numbers
        if (target >= 1000000) {
            element.textContent = (current / 1000000).toFixed(1) + 'M';
        } else if (target >= 1000) {
            element.textContent = Math.floor(current).toLocaleString();
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Quote Carousel
function initQuoteCarousel() {
    const slides = document.querySelectorAll('.quote-slide');
    const navButtons = document.querySelectorAll('.quote-nav-btn');
    let currentSlide = 0;
    
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        
        navButtons.forEach((btn, i) => {
            btn.classList.toggle('active', i === index);
        });
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    // Auto-advance slides
    setInterval(nextSlide, 6000);
    
    // Navigation buttons
    navButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
    
    // Audio buttons (placeholder functionality)
    const audioButtons = document.querySelectorAll('.quote-audio');
    audioButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Placeholder for audio functionality
            this.style.color = '#fff';
            setTimeout(() => {
                this.style.color = '#E57373';
            }, 1000);
        });
    });
}

// Explainer Cards
function initExplainerCards() {
    const cards = document.querySelectorAll('.explainer-card');
    let currentCard = 0;
    
    function showCard(index) {
        cards.forEach((card, i) => {
            card.classList.toggle('active', i === index);
        });
    }
    
    function nextCard() {
        currentCard = (currentCard + 1) % cards.length;
        showCard(currentCard);
    }
    
    // Auto-advance cards
    setInterval(nextCard, 4000);
    
    // Click to activate
    cards.forEach((card, index) => {
        card.addEventListener('click', () => {
            currentCard = index;
            showCard(currentCard);
        });
    });
}

// Media Wall Consent
function initMediaWall() {
    const mediaItems = document.querySelectorAll('.media-item');
    
    mediaItems.forEach(item => {
        const image = item.querySelector('.media-image');
        const overlay = item.querySelector('.media-overlay');
        let consentGiven = false;
        
        item.addEventListener('click', function() {
            if (!consentGiven) {
                // First click - show consent warning
                const warning = overlay.querySelector('.consent-warning');
                warning.textContent = 'Click again to confirm viewing';
                warning.style.background = '#558B2F';
                consentGiven = true;
            } else {
                // Second click - reveal image
                image.classList.remove('blurred');
                overlay.style.opacity = '0.3';
                overlay.style.pointerEvents = 'none';
            }
        });
    });
}

// Email Form
function initEmailForm() {
    const form = document.querySelector('.email-form');
    const emailInput = form.querySelector('input[type="email"]');
    const submitBtn = form.querySelector('button[type="submit"]');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        if (email && isValidEmail(email)) {
            // Show success message
            showEmailSuccess();
            emailInput.value = '';
        } else {
            // Show error
            emailInput.style.borderColor = '#B71C1C';
            setTimeout(() => {
                emailInput.style.borderColor = '#424242';
            }, 3000);
        }
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showEmailSuccess() {
    // Create modal
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
    `;
    
    const content = document.createElement('div');
    content.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 15px;
        text-align: center;
        max-width: 400px;
        margin: 1rem;
    `;
    
    content.innerHTML = `
        <h3 style="color: #1B5E20; margin-bottom: 1rem;">🎉 You're now on the front-line!</h3>
        <p style="margin-bottom: 1.5rem;">Thank you for joining our movement. Together we are stronger.</p>
        <button onclick="this.closest('[style*=fixed]').remove()" style="background: #B71C1C; color: white; border: none; padding: 0.5rem 1rem; border-radius: 25px; cursor: pointer;">Close</button>
    `;
    
    modal.appendChild(content);
    document.body.appendChild(modal);
    
    // Auto-close after 5 seconds
    setTimeout(() => {
        if (document.body.contains(modal)) {
            modal.remove();
        }
    }, 5000);
}

// Floating Action Button
function initFloatingActionButton() {
    const fabMain = document.getElementById('fab-main');
    const fabMenu = document.getElementById('fab-menu');
    const fabItems = document.querySelectorAll('.fab-item');
    
    let isOpen = false;
    
    fabMain.addEventListener('click', function() {
        isOpen = !isOpen;
        fabMenu.classList.toggle('active', isOpen);
        fabMain.style.transform = isOpen ? 'rotate(45deg)' : 'rotate(0deg)';
    });
    
    // FAB item actions
    fabItems.forEach(item => {
        item.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            
            switch(action) {
                case 'donate':
                    scrollToSection('donate');
                    break;
                case 'share':
                    shareWebsite();
                    break;
                case 'chat':
                    // Placeholder for chat functionality
                    alert('Chat feature coming soon!');
                    break;
            }
            
            // Close menu
            isOpen = false;
            fabMenu.classList.remove('active');
            fabMain.style.transform = 'rotate(0deg)';
        });
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Effects
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe sections for scroll animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Utility Functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

function shareWebsite() {
    if (navigator.share) {
        navigator.share({
            title: 'OneWoundedWorld - They Bomb Us. We Build Each Other.',
            text: 'Join the movement for humanitarian aid and crisis support.',
            url: window.location.href
        });
    } else {
        // Fallback - copy to clipboard
        navigator.clipboard.writeText(window.location.href).then(() => {
            alert('Link copied to clipboard!');
        });
    }
}

// Path card hover effects
document.addEventListener('DOMContentLoaded', function() {
    const pathCards = document.querySelectorAll('.path-card');
    
    pathCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-6px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Pulse dots interaction
document.addEventListener('DOMContentLoaded', function() {
    const pulseDots = document.querySelectorAll('.pulse-dot');
    
    pulseDots.forEach(dot => {
        dot.addEventListener('click', function() {
            const region = this.getAttribute('data-region');
            alert(`Crisis information for ${region} - Full details available in Crisis section`);
        });
        
        dot.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.5)';
        });
        
        dot.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

// Button click effects
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

