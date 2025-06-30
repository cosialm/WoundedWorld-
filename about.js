// OneWoundedWorld About Page JavaScript

// Initialize GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeInteractions();
    initializeCounters();
    initializeTimeline();
    initializeTeamMembers();
    initializeValueCards();
    initializeFloatingAction();
    initializeDownloads();
});

// Smooth scrolling function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Initialize GSAP animations
function initializeAnimations() {
    // Hero animations
    gsap.from('.hero-title', {
        duration: 1.5,
        y: 50,
        opacity: 0,
        ease: 'power3.out'
    });

    gsap.from('.hero-subtitle', {
        duration: 1.5,
        y: 30,
        opacity: 0,
        delay: 0.3,
        ease: 'power3.out'
    });

    gsap.from('.hero-buttons .btn', {
        duration: 1,
        y: 30,
        opacity: 0,
        delay: 0.6,
        stagger: 0.2,
        ease: 'power3.out'
    });

    // Floating flags animation
    gsap.to('.flag-icon', {
        duration: 6,
        y: -20,
        rotation: 5,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut',
        stagger: 1.5
    });

    // Section title animations
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power3.out'
        });
    });

    // Value cards animation
    gsap.utils.toArray('.value-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.8,
            y: 50,
            opacity: 0,
            delay: index * 0.1,
            ease: 'power3.out'
        });
    });

    // Team member cards animation
    gsap.utils.toArray('.team-member').forEach((member, index) => {
        gsap.from(member, {
            scrollTrigger: {
                trigger: member,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.8,
            y: 50,
            opacity: 0,
            delay: index * 0.2,
            ease: 'power3.out'
        });
    });

    // Chart bars animation
    gsap.utils.toArray('.bar-fill').forEach(bar => {
        const percentage = bar.getAttribute('data-percentage');
        gsap.from(bar, {
            scrollTrigger: {
                trigger: bar,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            duration: 2,
            width: '0%',
            ease: 'power3.out'
        });
    });
}

// Initialize timeline animations
function initializeTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            x: index % 2 === 0 ? -100 : 100,
            opacity: 0,
            ease: 'power3.out'
        });
    });

    // Animate timeline line
    gsap.from('.timeline-line', {
        scrollTrigger: {
            trigger: '.timeline',
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 1
        },
        scaleY: 0,
        transformOrigin: 'top center',
        ease: 'none'
    });
}

// Initialize counter animations
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        
        gsap.from(counter, {
            scrollTrigger: {
                trigger: counter,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            duration: 2,
            textContent: 0,
            ease: 'power2.out',
            snap: { textContent: 1 },
            stagger: 0.2,
            onUpdate: function() {
                counter.textContent = Math.ceil(counter.textContent).toLocaleString();
            }
        });
    });
}

// Initialize team member interactions
function initializeTeamMembers() {
    const expandButtons = document.querySelectorAll('.member-expand');
    
    expandButtons.forEach(button => {
        button.addEventListener('click', function() {
            const teamMember = this.closest('.team-member');
            const isExpanded = teamMember.classList.contains('expanded');
            
            // Close all other expanded members
            document.querySelectorAll('.team-member.expanded').forEach(member => {
                if (member !== teamMember) {
                    member.classList.remove('expanded');
                    member.querySelector('.member-expand').textContent = 'Read Full Story';
                }
            });
            
            // Toggle current member
            if (isExpanded) {
                teamMember.classList.remove('expanded');
                this.textContent = 'Read Full Story';
            } else {
                teamMember.classList.add('expanded');
                this.textContent = 'Close Story';
                
                // Smooth scroll to show the expanded content
                setTimeout(() => {
                    teamMember.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }, 300);
            }
        });
    });
}

// Initialize value card interactions
function initializeValueCards() {
    const valueCards = document.querySelectorAll('.value-card');
    
    valueCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add hover effect
            gsap.to(this, {
                duration: 0.3,
                y: -10,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', function() {
            // Remove hover effect
            gsap.to(this, {
                duration: 0.3,
                y: 0,
                ease: 'power2.out'
            });
        });
    });
}

// Initialize floating action button
function initializeFloatingAction() {
    const fabMain = document.querySelector('.fab-main');
    const fabItems = document.querySelectorAll('.fab-item');
    
    // FAB item click handlers
    fabItems.forEach(item => {
        item.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            handleFabAction(action);
        });
    });
    
    // Main FAB click handler
    fabMain.addEventListener('click', function() {
        handleFabAction('donate');
    });
}

// Handle floating action button actions
function handleFabAction(action) {
    switch(action) {
        case 'donate':
            showToast('Redirecting to donation page...');
            setTimeout(() => {
                window.location.href = 'donate.html';
            }, 1000);
            break;
        case 'share':
            if (navigator.share) {
                navigator.share({
                    title: 'OneWoundedWorld - About Us',
                    text: 'Learn about OneWoundedWorld\'s mission to help humanitarian crises in Iran, Palestine, and beyond.',
                    url: window.location.href
                });
            } else {
                // Fallback for browsers without Web Share API
                copyToClipboard(window.location.href);
                showToast('Page URL copied to clipboard!');
            }
            break;
        case 'volunteer':
            showToast('Redirecting to volunteer opportunities...');
            setTimeout(() => {
                scrollToSection('team');
            }, 500);
            break;
    }
}

// Initialize download functionality
function initializeDownloads() {
    const downloadButtons = document.querySelectorAll('.download-btn');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function() {
            const fileName = this.getAttribute('data-file');
            handleDownload(fileName);
        });
    });
}

// Handle download functionality
function handleDownload(fileName) {
    // Simulate download process
    showToast(`Downloading ${fileName}...`);
    
    // Create a blob with sample content for demonstration
    const content = generateSamplePDF(fileName);
    const blob = new Blob([content], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    
    // Create download link
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setTimeout(() => {
        showToast('Download completed!');
    }, 1500);
}

// Generate sample PDF content
function generateSamplePDF(fileName) {
    const content = `
OneWoundedWorld.org - ${fileName}

This is a sample document for demonstration purposes.

Our Mission:
We are a global humanitarian organization dedicated to providing aid and support to crisis-affected communities in Iran, Palestine, and other regions.

Our Values:
- Truth: We document reality without sanitization
- Transparency: Every dollar is traceable
- Empathy: We stand beside, not above
- Resistance: Nonviolent but never neutral
- Hope: Built from ruins, one act at a time

Financial Transparency:
- 78% Direct Aid
- 12% Logistics
- 10% Awareness

Impact Statistics:
- 15,420 Meals Delivered
- 3,240 Medical Treatments
- 890 Families Housed
- 1,200 Children in School

For more information, visit OneWoundedWorld.org

Generated on: ${new Date().toLocaleDateString()}
    `;
    return content;
}

// Initialize general interactions
function initializeInteractions() {
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(33, 33, 33, 0.98)';
        } else {
            navbar.style.background = 'rgba(33, 33, 33, 0.95)';
        }
    });
    
    // Smooth scroll for all internal links
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
    
    // Button click effects
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Utility functions
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }
}

// Intersection Observer for lazy loading and animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.value-card, .team-member, .download-item, .partner-logo').forEach(el => {
    observer.observe(el);
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .animate-in {
        animation: fadeInUp 0.8s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key to close expanded team members
    if (e.key === 'Escape') {
        document.querySelectorAll('.team-member.expanded').forEach(member => {
            member.classList.remove('expanded');
            member.querySelector('.member-expand').textContent = 'Read Full Story';
        });
    }
    
    // Enter key for button activation
    if (e.key === 'Enter' && e.target.classList.contains('member-expand')) {
        e.target.click();
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(33, 33, 33, 0.98)';
    } else {
        navbar.style.background = 'rgba(33, 33, 33, 0.95)';
    }
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// Error handling for animations
window.addEventListener('error', function(e) {
    console.warn('Animation error caught:', e.error);
    // Fallback: ensure basic functionality works even if animations fail
});

// Accessibility improvements
function improveAccessibility() {
    // Add ARIA labels to interactive elements
    document.querySelectorAll('.member-expand').forEach(button => {
        button.setAttribute('aria-expanded', 'false');
        button.setAttribute('aria-controls', 'member-story');
    });
    
    // Add focus indicators
    document.querySelectorAll('.btn, .member-expand, .fab-item').forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #B71C1C';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
}

// Initialize accessibility improvements
improveAccessibility();

// Console message for developers
console.log('%cOneWoundedWorld.org', 'color: #B71C1C; font-size: 24px; font-weight: bold;');
console.log('%cBuilt with compassion for humanitarian causes', 'color: #1B5E20; font-size: 14px;');
console.log('%cEvery line of code serves those who need it most', 'color: #757575; font-size: 12px;');

