// OneWoundedWorld Support Tools Page JavaScript

// Global variables
let currentLanguage = 'en';
let selectedRepresentatives = [];
let downloadStats = {
    posters: 2847,
    emails: 567,
    calls: 89,
    volunteers: 156
};

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    initializeCounters();
    initializeFilters();
    initializeEmailTool();
    initializeVolunteerForm();
    initializeScrollEffects();
    loadEmailTemplates();
});

// Smooth scrolling function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const navHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = element.offsetTop - navHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Initialize animated counters
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString();
    }, 16);
}

// Download filters
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const downloadItems = document.querySelectorAll('.download-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter items
            const filter = button.getAttribute('data-filter');
            downloadItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeInUp 0.5s ease-out';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Tool modal system
function openToolModal(toolType) {
    const modal = document.getElementById('toolModal');
    const title = document.getElementById('modalToolTitle');
    const content = document.getElementById('modalToolContent');
    const actionBtn = document.getElementById('modalToolAction');
    
    const toolData = getToolData(toolType);
    
    title.textContent = toolData.title;
    content.innerHTML = toolData.content;
    actionBtn.textContent = toolData.actionText;
    actionBtn.onclick = () => toolData.action();
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function getToolData(toolType) {
    const tools = {
        posters: {
            title: 'Protest Poster Pack',
            content: `
                <div class="tool-modal-content">
                    <p>Download our complete collection of protest posters designed by survivors and activists.</p>
                    <h4>What's Included:</h4>
                    <ul>
                        <li>"Never Again Means Now" - A4/A3 formats</li>
                        <li>"We Are One Wounded World" - Unity poster</li>
                        <li>"Stop Erasing Us" - Resistance message</li>
                        <li>"Their Names, Our Voices" - Memorial poster</li>
                        <li>"From the River to the Sea" - Liberation poster</li>
                    </ul>
                    <h4>Formats Available:</h4>
                    <p>PDF (print-ready), PNG (high-res), SVG (scalable)</p>
                    <h4>Usage Guidelines:</h4>
                    <p>Free for non-commercial use. Please credit OneWoundedWorld.org when sharing.</p>
                </div>
            `,
            actionText: 'Download Pack (12MB)',
            action: () => downloadResource('poster-pack')
        },
        social: {
            title: 'Social Media Toolkit',
            content: `
                <div class="tool-modal-content">
                    <p>Turn your social media into a force for change with our comprehensive toolkit.</p>
                    <h4>Instagram Package:</h4>
                    <ul>
                        <li>10 Story templates with call-to-action</li>
                        <li>15 Post templates (square format)</li>
                        <li>5 Reel templates with trending audio</li>
                        <li>Profile picture overlays</li>
                    </ul>
                    <h4>Twitter/X Package:</h4>
                    <ul>
                        <li>Header images with solidarity messages</li>
                        <li>Tweet templates with hashtags</li>
                        <li>Thread templates for storytelling</li>
                    </ul>
                    <h4>Trending Hashtags:</h4>
                    <p>#OneWoundedWorld #NeverAgain #FreePalestine #IranRevolution #HumanityFirst</p>
                </div>
            `,
            actionText: 'Get Social Tools',
            action: () => downloadResource('social-toolkit')
        },
        calls: {
            title: 'Call Scripts',
            content: `
                <div class="tool-modal-content">
                    <p>Ready-to-use scripts for calling representatives and advocacy hotlines.</p>
                    <h4>Available Scripts:</h4>
                    <ul>
                        <li><strong>Ceasefire Call:</strong> "Hi, I'm calling to urge [Representative] to support an immediate ceasefire..."</li>
                        <li><strong>Humanitarian Aid:</strong> "I'm a constituent calling about the humanitarian crisis..."</li>
                        <li><strong>Investigation Request:</strong> "I'm calling to request support for an independent investigation..."</li>
                    </ul>
                    <h4>Tips for Effective Calls:</h4>
                    <ul>
                        <li>State your name and that you're a constituent</li>
                        <li>Be polite but firm</li>
                        <li>Ask for a specific action</li>
                        <li>Request a response</li>
                    </ul>
                    <h4>Key Phone Numbers:</h4>
                    <p>We'll provide local representative numbers based on your location.</p>
                </div>
            `,
            actionText: 'View Scripts',
            action: () => downloadResource('call-scripts')
        },
        banners: {
            title: 'Digital Banners',
            content: `
                <div class="tool-modal-content">
                    <p>Professional digital banners for online meetings, websites, and profiles.</p>
                    <h4>Zoom Backgrounds:</h4>
                    <ul>
                        <li>Solidarity messages with Palestinian flag</li>
                        <li>Iranian resistance symbols</li>
                        <li>OneWoundedWorld branding</li>
                        <li>Minimalist designs for professional settings</li>
                    </ul>
                    <h4>Website Banners:</h4>
                    <ul>
                        <li>Header banners (1200x300px)</li>
                        <li>Sidebar banners (300x600px)</li>
                        <li>Footer banners (728x90px)</li>
                    </ul>
                    <h4>Profile Overlays:</h4>
                    <ul>
                        <li>Facebook profile frames</li>
                        <li>LinkedIn banner templates</li>
                        <li>Twitter header images</li>
                    </ul>
                </div>
            `,
            actionText: 'Customize Banners',
            action: () => downloadResource('digital-banners')
        }
    };
    
    return tools[toolType] || tools.posters;
}

// Download functionality
function downloadResource(resourceId) {
    // Simulate download
    showToast(`Downloading ${resourceId}...`, 'success');
    
    // Update download stats
    downloadStats.posters++;
    updateDownloadCounter();
    
    // In a real implementation, this would trigger an actual download
    setTimeout(() => {
        showToast('Download complete!', 'success');
    }, 2000);
    
    // Close modal if open
    closeModal('toolModal');
}

function downloadFullKit() {
    showToast('Preparing Full Activist Kit (45MB)...', 'info');
    
    setTimeout(() => {
        showToast('Download started! Check your downloads folder.', 'success');
        downloadStats.posters += 5;
        updateDownloadCounter();
    }, 3000);
}

function updateDownloadCounter() {
    const counter = document.querySelector('.stat-number[data-count="2847"]');
    if (counter) {
        counter.textContent = downloadStats.posters.toLocaleString();
    }
}

// Email tool functionality
function initializeEmailTool() {
    const campaignOptions = document.querySelectorAll('input[name="campaign"]');
    campaignOptions.forEach(option => {
        option.addEventListener('change', updateEmailTemplate);
    });
    
    // Initialize with default template
    updateEmailTemplate();
}

function updateRepresentatives() {
    const country = document.getElementById('country').value;
    const postalCode = document.getElementById('postal-code').value;
    
    if (country && postalCode) {
        // Simulate API call to find representatives
        showToast('Finding your representatives...', 'info');
        
        setTimeout(() => {
            const mockReps = getMockRepresentatives(country);
            displayRepresentatives(mockReps);
        }, 1500);
    }
}

function findRepresentatives() {
    const country = document.getElementById('country').value;
    const postalCode = document.getElementById('postal-code').value;
    
    if (!country || !postalCode) {
        showToast('Please select your country and enter your postal code.', 'error');
        return;
    }
    
    updateRepresentatives();
}

function getMockRepresentatives(country) {
    const representatives = {
        us: [
            { name: 'Senator John Smith', email: 'john.smith@senate.gov', type: 'Senator' },
            { name: 'Rep. Jane Doe', email: 'jane.doe@house.gov', type: 'Representative' }
        ],
        uk: [
            { name: 'MP David Wilson', email: 'david.wilson@parliament.uk', type: 'MP' },
            { name: 'Lord Sarah Brown', email: 'sarah.brown@parliament.uk', type: 'Lord' }
        ],
        ca: [
            { name: 'MP Michael Johnson', email: 'michael.johnson@parl.gc.ca', type: 'MP' },
            { name: 'Senator Lisa Chen', email: 'lisa.chen@sen.parl.gc.ca', type: 'Senator' }
        ]
    };
    
    return representatives[country] || [];
}

function displayRepresentatives(representatives) {
    const recipientField = document.getElementById('recipient');
    if (representatives.length > 0) {
        const rep = representatives[0];
        recipientField.value = `${rep.name} <${rep.email}>`;
        selectedRepresentatives = representatives;
        showToast(`Found ${representatives.length} representative(s)`, 'success');
    } else {
        showToast('No representatives found for this location.', 'error');
    }
}

function updateEmailTemplate() {
    const selectedCampaign = document.querySelector('input[name="campaign"]:checked').value;
    const messageField = document.getElementById('message');
    const subjectField = document.getElementById('subject');
    
    const templates = getEmailTemplates();
    const template = templates[selectedCampaign];
    
    if (template) {
        subjectField.value = template.subject;
        messageField.value = template.message;
    }
}

function updateLanguage() {
    const language = document.getElementById('language').value;
    currentLanguage = language;
    
    // Update email template for selected language
    updateEmailTemplate();
    
    showToast(`Language updated to ${getLanguageName(language)}`, 'success');
}

function getLanguageName(code) {
    const languages = {
        en: 'English',
        ar: 'Arabic',
        fr: 'French',
        fa: 'Farsi'
    };
    return languages[code] || 'English';
}

function loadEmailTemplates() {
    // This would typically load from a server
    // For now, we'll use the templates defined in getEmailTemplates()
}

function getEmailTemplates() {
    const templates = {
        ceasefire: {
            subject: 'Urgent: Call for Immediate Ceasefire and Humanitarian Access',
            message: `Dear [Representative Name],

I am writing as your constituent to urge you to take immediate action to support a ceasefire and ensure humanitarian access to Gaza and other conflict zones.

The current humanitarian crisis demands urgent intervention. Civilians, including children, are suffering from lack of access to basic necessities including food, water, medical supplies, and shelter.

I respectfully request that you:

1. Publicly call for an immediate and permanent ceasefire
2. Support unrestricted humanitarian access to affected areas
3. Advocate for the protection of civilians and civilian infrastructure
4. Support international investigations into violations of international law

As a constituent, I believe it is our moral obligation to speak out against human suffering wherever it occurs. The international community must act now to prevent further loss of innocent life.

I look forward to your response and to seeing your leadership on this critical humanitarian issue.

Thank you for your time and consideration.

Sincerely,
[Your Name]
[Your Address]
[Your Phone Number]
[Your Email]`
        },
        sanctions: {
            subject: 'Request for Investigation into Human Rights Violations',
            message: `Dear [Representative Name],

I am writing to request your support for comprehensive investigations into human rights violations and potential war crimes in Gaza, Iran, and other regions experiencing humanitarian crises.

Recent reports from international human rights organizations have documented serious violations of international humanitarian law, including:

- Attacks on civilian infrastructure including hospitals, schools, and residential areas
- Restrictions on humanitarian aid and medical supplies
- Forced displacement of civilian populations
- Targeting of journalists and humanitarian workers

I urge you to:

1. Support independent international investigations
2. Advocate for accountability mechanisms
3. Call for the protection of civilians and humanitarian workers
4. Support the work of international human rights organizations

The international community has a responsibility to ensure accountability for violations of international law and to protect civilian populations.

I trust that you will use your position to advocate for justice and human rights.

Thank you for your leadership on this important issue.

Respectfully,
[Your Name]
[Your Address]
[Your Phone Number]
[Your Email]`
        },
        aid: {
            subject: 'Urgent: Ensure Safe Passage for Humanitarian Aid',
            message: `Dear [Representative Name],

I am writing to urge your immediate action to ensure safe and unrestricted humanitarian access to Gaza, Iran, and other crisis-affected regions.

The humanitarian situation is dire, with millions of people lacking access to:
- Clean water and sanitation
- Food and nutrition
- Medical care and supplies
- Shelter and protection
- Education for children

International humanitarian organizations are struggling to deliver life-saving assistance due to access restrictions and security concerns.

I respectfully request that you:

1. Advocate for the establishment of humanitarian corridors
2. Support increased funding for humanitarian operations
3. Call for the protection of humanitarian workers
4. Ensure that humanitarian aid reaches those most in need without discrimination

Every day of delay means more suffering for innocent civilians, including children, elderly, and vulnerable populations.

I urge you to use your influence to prioritize humanitarian access and save lives.

Thank you for your urgent attention to this matter.

Sincerely,
[Your Name]
[Your Address]
[Your Phone Number]
[Your Email]`
        }
    };
    
    return templates;
}

function previewEmail() {
    const form = document.getElementById('emailForm');
    const formData = new FormData(form);
    
    const emailData = {
        senderName: formData.get('sender-name') || '[Your Name]',
        senderEmail: formData.get('sender-email') || '[Your Email]',
        recipient: formData.get('recipient') || '[Representative]',
        subject: formData.get('subject') || '[Subject]',
        message: formData.get('message') || '[Message]'
    };
    
    // Create preview modal content
    const previewContent = `
        <div class="email-preview">
            <h4>Email Preview</h4>
            <div class="email-header">
                <p><strong>From:</strong> ${emailData.senderName} &lt;${emailData.senderEmail}&gt;</p>
                <p><strong>To:</strong> ${emailData.recipient}</p>
                <p><strong>Subject:</strong> ${emailData.subject}</p>
            </div>
            <div class="email-body">
                <pre>${emailData.message}</pre>
            </div>
        </div>
    `;
    
    // Show preview in modal
    const modal = document.getElementById('toolModal');
    const title = document.getElementById('modalToolTitle');
    const content = document.getElementById('modalToolContent');
    const actionBtn = document.getElementById('modalToolAction');
    
    title.textContent = 'Email Preview';
    content.innerHTML = previewContent;
    actionBtn.textContent = 'Send Email';
    actionBtn.onclick = () => {
        closeModal('toolModal');
        submitEmail();
    };
    
    modal.classList.add('active');
}

function submitEmail() {
    const form = document.getElementById('emailForm');
    const formData = new FormData(form);
    
    // Validate required fields
    const requiredFields = ['sender-name', 'sender-email', 'recipient', 'subject', 'message'];
    const missingFields = requiredFields.filter(field => !formData.get(field));
    
    if (missingFields.length > 0) {
        showToast('Please fill in all required fields.', 'error');
        return;
    }
    
    // Simulate email sending
    showToast('Sending email...', 'info');
    
    setTimeout(() => {
        showToast('Email sent successfully!', 'success');
        downloadStats.emails++;
        updateEmailCounter();
        
        // Reset form
        form.reset();
        updateEmailTemplate();
    }, 2000);
}

function updateEmailCounter() {
    const counter = document.querySelector('.stat-number[data-count="567"]');
    if (counter) {
        counter.textContent = downloadStats.emails.toLocaleString();
    }
}

// Volunteer form functionality
function initializeVolunteerForm() {
    const form = document.getElementById('volunteerForm');
    form.addEventListener('submit', handleVolunteerSubmission);
    
    // Add click handlers to skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('click', () => {
            const skill = card.getAttribute('data-skill');
            toggleSkillSelection(skill);
        });
    });
}

function toggleSkillSelection(skill) {
    const checkbox = document.querySelector(`input[name="skills"][value="${skill}"]`);
    if (checkbox) {
        checkbox.checked = !checkbox.checked;
        
        // Update visual feedback
        const card = document.querySelector(`[data-skill="${skill}"]`);
        if (checkbox.checked) {
            card.style.borderColor = 'var(--forest)';
            card.style.backgroundColor = 'rgba(27, 94, 32, 0.05)';
        } else {
            card.style.borderColor = 'transparent';
            card.style.backgroundColor = 'white';
        }
    }
}

function handleVolunteerSubmission(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const selectedSkills = formData.getAll('skills');
    
    if (selectedSkills.length === 0) {
        showToast('Please select at least one skill area.', 'error');
        return;
    }
    
    // Simulate form submission
    showToast('Submitting volunteer application...', 'info');
    
    setTimeout(() => {
        showToast('Thank you for volunteering! Check your email for next steps.', 'success');
        downloadStats.volunteers++;
        updateVolunteerCounter();
        
        // Reset form
        event.target.reset();
        
        // Reset skill card styling
        document.querySelectorAll('.skill-card').forEach(card => {
            card.style.borderColor = 'transparent';
            card.style.backgroundColor = 'white';
        });
    }, 2000);
}

function updateVolunteerCounter() {
    const counter = document.querySelector('.stat-number[data-count="156"]');
    if (counter) {
        counter.textContent = downloadStats.volunteers.toLocaleString();
    }
}

// Social sharing functionality
function shareToolkit() {
    const shareData = {
        title: 'OneWoundedWorld Support Tools',
        text: 'Get ready-to-use advocacy tools to amplify voices and create change. Download posters, email templates, and more.',
        url: window.location.href
    };
    
    if (navigator.share) {
        navigator.share(shareData)
            .then(() => showToast('Shared successfully!', 'success'))
            .catch(() => showToast('Sharing cancelled', 'info'));
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(shareData.url)
            .then(() => showToast('Link copied to clipboard!', 'success'))
            .catch(() => showToast('Unable to copy link', 'error'));
    }
}

// Scroll effects
function initializeScrollEffects() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Navbar hide/show on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
        
        // Floating action button visibility
        const fab = document.querySelector('.floating-action');
        if (currentScrollY > 500) {
            fab.style.opacity = '1';
            fab.style.pointerEvents = 'auto';
        } else {
            fab.style.opacity = '0';
            fab.style.pointerEvents = 'none';
        }
    });
}

// Toast notification system
function showToast(message, type = 'info') {
    // Remove existing toasts
    const existingToasts = document.querySelectorAll('.toast');
    existingToasts.forEach(toast => toast.remove());
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <i class="fas fa-${getToastIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="toast-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    toast.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${getToastColor(type)};
        color: white;
        padding: 16px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 12px;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add to page
    document.body.appendChild(toast);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (toast.parentElement) {
            toast.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => toast.remove(), 300);
        }
    }, 5000);
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
        success: '#1B5E20',
        error: '#B71C1C',
        warning: '#E65100',
        info: '#1976D2'
    };
    return colors[type] || '#1976D2';
}

// Add CSS for toast animations
const toastStyles = document.createElement('style');
toastStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .toast-content {
        display: flex;
        align-items: center;
        gap: 8px;
        flex: 1;
    }
    
    .toast-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 4px;
        border-radius: 4px;
        opacity: 0.8;
        transition: opacity 0.2s;
    }
    
    .toast-close:hover {
        opacity: 1;
        background: rgba(255,255,255,0.1);
    }
`;
document.head.appendChild(toastStyles);

// Keyboard navigation
document.addEventListener('keydown', function(event) {
    // Close modals with Escape key
    if (event.key === 'Escape') {
        const activeModal = document.querySelector('.modal.active');
        if (activeModal) {
            closeModal(activeModal.id);
        }
    }
    
    // Quick actions with keyboard shortcuts
    if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
            case 'd':
                event.preventDefault();
                downloadFullKit();
                break;
            case 'e':
                event.preventDefault();
                scrollToSection('email-tool');
                break;
            case 'v':
                event.preventDefault();
                scrollToSection('volunteer');
                break;
        }
    }
});

// Initialize page when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePage);
} else {
    initializePage();
}

function initializePage() {
    // Add any additional initialization here
    console.log('OneWoundedWorld Support Tools page initialized');
    
    // Show welcome message
    setTimeout(() => {
        showToast('Welcome to Support Tools! Use Ctrl+D to download the full kit.', 'info');
    }, 1000);
}

