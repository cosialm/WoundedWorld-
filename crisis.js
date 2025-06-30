// OneWoundedWorld Crisis Page JavaScript

// Global variables
let currentVoiceIndex = 0;
let fabMenuOpen = false;
let impactCountersAnimated = false;

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeScrollAnimations();
    initializeProofWall();
    initializeSurvivorVoices();
    initializeImpactTracker();
    initializeFloatingActionButton();
    initializeEntrySection();
    
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    setupScrollTriggers();
});

// Entry Section Initialization
function initializeEntrySection() {
    // Reveal entry image on scroll
    const entryImage = document.getElementById('entryImage');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (scrolled > 100) {
            entryImage.classList.add('revealed');
        }
        
        // Parallax effect
        entryImage.style.transform = `translateY(${rate}px)`;
    });
}

// Scroll Animations Setup
function initializeScrollAnimations() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

// GSAP ScrollTrigger Setup
function setupScrollTriggers() {
    // Timeline events animation
    gsap.utils.toArray('.timeline-event').forEach((event, index) => {
        gsap.fromTo(event, 
            {
                opacity: 0,
                y: 50,
                scale: 0.9
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: event,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

    // Timeline line animation
    gsap.fromTo('#timelineLine',
        {
            scaleY: 0,
            transformOrigin: "top center"
        },
        {
            scaleY: 1,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.timeline-container',
                start: "top 70%",
                end: "bottom 30%",
                toggleActions: "play none none reverse"
            }
        }
    );

    // Proof wall items stagger animation
    gsap.fromTo('.proof-item',
        {
            opacity: 0,
            y: 30,
            scale: 0.9
        },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.proof-grid',
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        }
    );

    // Action cards animation
    gsap.fromTo('.action-card',
        {
            opacity: 0,
            y: 40,
            rotationX: 15
        },
        {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.action-cards',
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        }
    );
}

// Proof Wall Functionality
function initializeProofWall() {
    const proofItems = document.querySelectorAll('.proof-item');
    
    proofItems.forEach(item => {
        const image = item.querySelector('.proof-image');
        const quote = item.querySelector('.proof-quote');
        const overlay = item.querySelector('.reveal-overlay');
        
        item.addEventListener('click', function() {
            if (!item.classList.contains('revealed')) {
                // Reveal image
                image.classList.remove('blurred');
                image.classList.add('revealed');
                
                // Hide overlay
                overlay.style.opacity = '0';
                overlay.style.pointerEvents = 'none';
                
                // Show quote with animation
                setTimeout(() => {
                    quote.classList.remove('hidden');
                    quote.classList.add('visible');
                }, 300);
                
                // Mark as revealed
                item.classList.add('revealed');
                
                // Add reveal animation
                gsap.fromTo(image, 
                    { scale: 1.1, filter: 'blur(20px) grayscale(100%)' },
                    { scale: 1, filter: 'blur(0px) grayscale(0%)', duration: 0.8, ease: "power2.out" }
                );
                
                gsap.fromTo(quote,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.5, delay: 0.3, ease: "power2.out" }
                );
            }
        });
        
        // Hover effects
        item.addEventListener('mouseenter', function() {
            if (!item.classList.contains('revealed')) {
                gsap.to(overlay, { scale: 1.05, duration: 0.3 });
                gsap.to(image, { scale: 1.02, duration: 0.3 });
            }
        });
        
        item.addEventListener('mouseleave', function() {
            if (!item.classList.contains('revealed')) {
                gsap.to(overlay, { scale: 1, duration: 0.3 });
                gsap.to(image, { scale: 1, duration: 0.3 });
            }
        });
    });
}

// Survivor Voices Carousel
function initializeSurvivorVoices() {
    const voices = ['zahra', 'hassan', 'amira'];
    updateVoiceDisplay();
    
    // Auto-advance carousel every 8 seconds
    setInterval(() => {
        nextVoice();
    }, 8000);
}

function nextVoice() {
    currentVoiceIndex = (currentVoiceIndex + 1) % 3;
    updateVoiceDisplay();
}

function previousVoice() {
    currentVoiceIndex = (currentVoiceIndex - 1 + 3) % 3;
    updateVoiceDisplay();
}

function updateVoiceDisplay() {
    const voices = ['zahra', 'hassan', 'amira'];
    const voiceItems = document.querySelectorAll('.voice-item');
    const indicators = document.querySelectorAll('.indicator');
    
    // Update voice items
    voiceItems.forEach((item, index) => {
        if (index === currentVoiceIndex) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    
    // Update indicators
    indicators.forEach((indicator, index) => {
        if (index === currentVoiceIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
    
    // Add transition animation
    const activeVoice = voiceItems[currentVoiceIndex];
    gsap.fromTo(activeVoice,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" }
    );
}

// Audio playback functionality
function playAudio(voiceId) {
    const modal = document.getElementById('audioModal');
    const title = document.getElementById('audioModalTitle');
    const transcript = document.getElementById('audioTranscript');
    
    // Voice data
    const voiceData = {
        zahra: {
            title: "Zahra's Story - Gaza",
            transcript: "My name is Zahra. I am nine years old. We were sleeping when the walls came down. I was holding my little sister's hand. The noise was so loud, like thunder that never stops. When I woke up, everything was white dust and red. My sister... she never woke up. I still hear her laugh in my dreams. Sometimes I think she's calling my name, but when I look, there's only broken things. Mama says we have to be strong, but I don't know how to be strong when everything is broken. I used to draw pictures of our house, but now I only remember the pieces."
        },
        hassan: {
            title: "Hassan's Story - Iran",
            transcript: "I am Hassan, 67 years old. I have lived through many earthquakes, but this one... this one took everything. The earth shook for 30 seconds, but our lives shook forever. My house, my father's house, my grandfather's house - all gone in those 30 seconds. But you know what? We rebuild. We always rebuild. My hands are old, but they still know how to lay bricks. My back is bent, but it can still carry hope. This is what we do. We fall down, we get up. The earth shakes, we plant new seeds. This is how we survive."
        },
        amira: {
            title: "Amira's Story - Gaza",
            transcript: "Every morning I wake up and choose hope over despair. For my children. For tomorrow. My name is Amira, I am 34 years old, and I am a mother of three. When the bombs fall, I cover my children with my body. When there is no food, I give them my portion. When they cry, I sing to them. When they ask why this is happening, I tell them that somewhere, people care. That somewhere, people are working to help us. I choose to believe this because the alternative is too dark. Hope is not easy, but it is necessary. It is the only thing they cannot destroy."
        }
    };
    
    const data = voiceData[voiceId];
    if (data) {
        title.textContent = data.title;
        transcript.textContent = data.transcript;
        openModal('audioModal');
        
        // Simulate audio waveform animation
        animateWaveform(voiceId);
    }
}

function animateWaveform(voiceId) {
    const waveform = document.getElementById(`waveform-${voiceId}`);
    if (waveform) {
        gsap.to(waveform, {
            scaleX: 1.2,
            duration: 0.5,
            yoyo: true,
            repeat: -1,
            ease: "power2.inOut"
        });
    }
}

// Impact Tracker with Animated Counters
function initializeImpactTracker() {
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !impactCountersAnimated) {
                animateCounters();
                impactCountersAnimated = true;
            }
        });
    }, observerOptions);
    
    const impactSection = document.querySelector('.impact-tracker-section');
    if (impactSection) {
        observer.observe(impactSection);
    }
}

function animateCounters() {
    const counters = document.querySelectorAll('.impact-number');
    
    counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-count'));
        const isDecimal = target % 1 !== 0;
        
        gsap.fromTo(counter, 
            { textContent: 0 },
            {
                textContent: target,
                duration: 2,
                ease: "power2.out",
                snap: { textContent: isDecimal ? 0.1 : 1 },
                onUpdate: function() {
                    const current = parseFloat(this.targets()[0].textContent);
                    if (isDecimal) {
                        counter.textContent = current.toFixed(1);
                    } else if (current >= 1000) {
                        counter.textContent = current.toLocaleString();
                    } else {
                        counter.textContent = Math.round(current);
                    }
                }
            }
        );
        
        // Add entrance animation
        gsap.fromTo(counter.parentElement,
            { opacity: 0, y: 30, scale: 0.8 },
            { opacity: 1, y: 0, scale: 1, duration: 0.6, delay: Math.random() * 0.3 }
        );
    });
}

// Floating Action Button
function initializeFloatingActionButton() {
    const fab = document.querySelector('.fab-main');
    const fabMenu = document.querySelector('.fab-menu');
    
    // Hide FAB when scrolling up, show when scrolling down
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            // Scrolling down
            gsap.to('.floating-action', { opacity: 1, scale: 1, duration: 0.3 });
        } else if (scrollTop < lastScrollTop - 5) {
            // Scrolling up
            gsap.to('.floating-action', { opacity: 0.7, scale: 0.9, duration: 0.3 });
        }
        
        lastScrollTop = scrollTop;
    });
}

function toggleFabMenu() {
    const fabMenu = document.querySelector('.fab-menu');
    const fabMain = document.querySelector('.fab-main');
    
    fabMenuOpen = !fabMenuOpen;
    
    if (fabMenuOpen) {
        fabMenu.classList.add('open');
        gsap.to(fabMain, { rotation: 45, duration: 0.3 });
        
        // Animate menu items
        gsap.fromTo('.fab-item',
            { opacity: 0, scale: 0, y: 20 },
            { opacity: 1, scale: 1, y: 0, duration: 0.3, stagger: 0.1 }
        );
    } else {
        fabMenu.classList.remove('open');
        gsap.to(fabMain, { rotation: 0, duration: 0.3 });
    }
}

// Utility Functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

function shareCurrentPage() {
    if (navigator.share) {
        navigator.share({
            title: 'Crisis - What They Endure, The World Must Witness | OneWoundedWorld',
            text: 'Witness the humanitarian crisis in Gaza, Iran, and beyond. See the evidence, hear survivor voices, and take action.',
            url: window.location.href
        }).catch(console.error);
    } else {
        // Fallback for browsers that don't support Web Share API
        const shareData = {
            url: window.location.href,
            title: 'Crisis - What They Endure, The World Must Witness | OneWoundedWorld',
            text: 'Witness the humanitarian crisis in Gaza, Iran, and beyond. See the evidence, hear survivor voices, and take action.'
        };
        
        // Create share modal
        showShareModal(shareData);
    }
}

function showShareModal(shareData) {
    const modal = document.createElement('div');
    modal.className = 'modal open';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Share This Crisis Report</h3>
                <button class="modal-close" onclick="this.closest('.modal').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <p>Help spread awareness about this humanitarian crisis:</p>
                <div style="display: flex; gap: 1rem; margin: 1.5rem 0; flex-wrap: wrap;">
                    <button onclick="shareToTwitter('${shareData.url}', '${shareData.text}')" style="background: #1DA1F2; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 25px; cursor: pointer;">
                        <i class="fab fa-twitter"></i> Twitter
                    </button>
                    <button onclick="shareToFacebook('${shareData.url}')" style="background: #4267B2; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 25px; cursor: pointer;">
                        <i class="fab fa-facebook"></i> Facebook
                    </button>
                    <button onclick="shareToWhatsApp('${shareData.url}', '${shareData.text}')" style="background: #25D366; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 25px; cursor: pointer;">
                        <i class="fab fa-whatsapp"></i> WhatsApp
                    </button>
                    <button onclick="copyToClipboard('${shareData.url}')" style="background: #424242; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 25px; cursor: pointer;">
                        <i class="fas fa-copy"></i> Copy Link
                    </button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function shareToTwitter(url, text) {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
}

function shareToFacebook(url) {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
}

function shareToWhatsApp(url, text) {
    window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('Link copied to clipboard!', 'success');
    }).catch(() => {
        showToast('Failed to copy link', 'error');
    });
}

function downloadCrisisReport() {
    // Simulate PDF download
    showToast('Preparing Crisis Report download...', 'info');
    
    setTimeout(() => {
        // Create a mock download
        const link = document.createElement('a');
        link.href = 'data:application/pdf;base64,'; // Mock PDF data
        link.download = 'OneWoundedWorld_Crisis_Report_2025.pdf';
        link.style.display = 'none';
        document.body.appendChild(link);
        
        // Simulate download preparation
        showToast('Crisis Report downloaded successfully!', 'success');
        
        // Clean up
        document.body.removeChild(link);
    }, 2000);
}

// Modal Functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('open');
        modal.style.display = 'flex';
        
        // Animate modal entrance
        gsap.fromTo(modal.querySelector('.modal-content'),
            { opacity: 0, scale: 0.8, y: 50 },
            { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "power2.out" }
        );
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        // Animate modal exit
        gsap.to(modal.querySelector('.modal-content'),
            { 
                opacity: 0, 
                scale: 0.8, 
                y: 50, 
                duration: 0.2, 
                ease: "power2.in",
                onComplete: () => {
                    modal.classList.remove('open');
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            }
        );
    }
}

// Toast Notification System
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <i class="fas fa-${getToastIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Style the toast
    Object.assign(toast.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: getToastColor(type),
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '10px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
        zIndex: '3000',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        maxWidth: '400px',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease'
    });
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 4000);
}

function getToastIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

function getToastColor(type) {
    const colors = {
        success: '#0D5F44',
        error: '#A30000',
        warning: '#F59E0B',
        info: '#424242'
    };
    return colors[type] || '#424242';
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // ESC to close modals
    if (e.key === 'Escape') {
        const openModal = document.querySelector('.modal.open');
        if (openModal) {
            closeModal(openModal.id);
        }
        
        // Close FAB menu
        if (fabMenuOpen) {
            toggleFabMenu();
        }
    }
    
    // Arrow keys for voice carousel
    if (e.key === 'ArrowLeft') {
        previousVoice();
    } else if (e.key === 'ArrowRight') {
        nextVoice();
    }
    
    // Ctrl+S to share
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        shareCurrentPage();
    }
    
    // Ctrl+D to download
    if (e.ctrlKey && e.key === 'd') {
        e.preventDefault();
        downloadCrisisReport();
    }
});

// Click outside modal to close
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        closeModal(e.target.id);
    }
});

// Performance optimization: Lazy load images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Accessibility improvements
document.addEventListener('DOMContentLoaded', function() {
    // Add ARIA labels to interactive elements
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        if (!button.getAttribute('aria-label') && button.textContent.trim()) {
            button.setAttribute('aria-label', button.textContent.trim());
        }
    });
    
    // Add focus indicators for keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
});

// Export functions for global access
window.scrollToSection = scrollToSection;
window.shareCurrentPage = shareCurrentPage;
window.downloadCrisisReport = downloadCrisisReport;
window.toggleFabMenu = toggleFabMenu;
window.nextVoice = nextVoice;
window.previousVoice = previousVoice;
window.playAudio = playAudio;
window.openModal = openModal;
window.closeModal = closeModal;
window.shareToTwitter = shareToTwitter;
window.shareToFacebook = shareToFacebook;
window.shareToWhatsApp = shareToWhatsApp;
window.copyToClipboard = copyToClipboard;

