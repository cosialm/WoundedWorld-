// OneWoundedWorld Stories Page JavaScript

// Story data for modals
const storyData = {
    layla: {
        title: "Layla's Story - The Artist Who Drew Hope",
        content: `
            <div class="story-full">
                <div class="story-header">
                    <img src="images/stories/gaza-children.jpg" alt="Layla, 9, Gaza" class="story-modal-image">
                    <div class="story-details">
                        <h4>Layla, 9 years old</h4>
                        <p><strong>Location:</strong> Gaza, Palestine</p>
                        <p><strong>Status:</strong> Child survivor, displaced</p>
                        <p><strong>Impact:</strong> Lost her school in bombing</p>
                    </div>
                </div>
                <div class="story-narrative">
                    <p>Before the bombs, Layla was known in her neighborhood as the little girl who drew stars on everything. Her notebooks, the walls of her room, even the sidewalk outside her house - everywhere Layla went, stars followed.</p>
                    
                    <p>"I wanted to be an artist," she tells us, her small hands still stained with pencil lead. "I drew stars because my teacher said they were like dreams - far away but always shining."</p>
                    
                    <p>On October 15th, Layla's school was hit during morning classes. She wasn't there that day - a fever had kept her home. Twenty-three of her classmates didn't make it out. Her art teacher, Ms. Fatima, who had encouraged her star drawings, was among them.</p>
                    
                    <p>Now, when Layla draws, the stars have disappeared. Her sketches show tanks, helicopters, and buildings with holes. "The stars got scared," she explains matter-of-factly. "They're hiding until the loud noises stop."</p>
                    
                    <p>Living in a tent with her grandmother and two younger brothers, Layla still draws every day. But she's waiting. "When the stars come back," she says, "I'll draw them everywhere again. Even bigger than before."</p>
                    
                    <blockquote class="story-quote-full">
                        "I used to draw stars. Now I only draw tanks. But I'm saving space in my notebook for when the stars come back."
                    </blockquote>
                    
                    <p><em>Layla's story was verified through interviews with her grandmother and documentation from the Gaza Education Ministry. Her school remains destroyed.</em></p>
                </div>
            </div>
        `
    },
    iman: {
        title: "Iman's Clinic - Healing in the Kitchen",
        content: `
            <div class="story-full">
                <div class="story-header">
                    <img src="images/stories/iran-earthquake.jpg" alt="Iman, 42, Iran" class="story-modal-image">
                    <div class="story-details">
                        <h4>Iman, 42 years old</h4>
                        <p><strong>Location:</strong> Kermanshah, Iran</p>
                        <p><strong>Profession:</strong> Nurse, makeshift medic</p>
                        <p><strong>Impact:</strong> Earthquake survivor, community healer</p>
                    </div>
                </div>
                <div class="story-narrative">
                    <p>Dr. Iman Hosseini had worked at Kermanshah General Hospital for fifteen years when the 7.3 magnitude earthquake struck in November. In thirty seconds, her clinic, her home, and her life's work crumbled into rubble.</p>
                    
                    <p>"I was treating a child with pneumonia when the walls started dancing," she recalls. "We got everyone out, but the building... there was nothing left to save."</p>
                    
                    <p>With the hospital destroyed and medical supplies buried under tons of concrete, Iman made a decision that would define her new reality. She cleared the debris from her kitchen, sterilized her cooking pots, and hung a sign outside: "Medical Help Here."</p>
                    
                    <p>Using kitchen knives sterilized over her gas stove, she removed shrapnel from wounds. Her dining table became an operating surface. Bedsheets became bandages. Her spice jars were repurposed to hold the few medications she could salvage.</p>
                    
                    <p>"The earthquake took my clinic, but it couldn't take my hands," she says, showing palms scarred from digging through rubble to save medical equipment. "People need healing. If I have to do it in my kitchen, then my kitchen becomes a hospital."</p>
                    
                    <p>In the six months since the earthquake, Iman has treated over 400 patients in her makeshift kitchen clinic. She's delivered three babies on her dining table and saved countless lives with improvised medical tools.</p>
                    
                    <blockquote class="story-quote-full">
                        "They bombed my clinic. So I treat people in my kitchen. Healing doesn't need walls - it needs willing hands."
                    </blockquote>
                    
                    <p><em>Iman's story was documented by the Iranian Red Crescent and verified through patient testimonials. She continues to operate her kitchen clinic while waiting for the hospital to be rebuilt.</em></p>
                </div>
            </div>
        `
    },
    amira: {
        title: "Amira's Choice - Hope Over Despair",
        content: `
            <div class="story-full">
                <div class="story-header">
                    <img src="images/stories/palestinian-women.jpg" alt="Amira, 34, Palestine" class="story-modal-image">
                    <div class="story-details">
                        <h4>Amira, 34 years old</h4>
                        <p><strong>Location:</strong> Rafah, Palestine</p>
                        <p><strong>Status:</strong> Mother of four, displaced three times</p>
                        <p><strong>Impact:</strong> Family survival, community strength</p>
                    </div>
                </div>
                <div class="story-narrative">
                    <p>Amira has been displaced three times in eight months. Each time, she packed what she could carry, held her children's hands, and walked toward an uncertain tomorrow. Each time, she made the same choice: hope over despair.</p>
                    
                    <p>"The first time, I cried for three days," she admits, sitting in her current tent in Rafah. "The second time, I cried for one day. The third time, I didn't cry at all. Not because I stopped feeling, but because my children were watching."</p>
                    
                    <p>Her four children - ages 6, 8, 11, and 13 - have learned to pack their lives into backpacks. They know which toys are "essential" and which memories can be left behind. They've become experts at making new friends quickly, knowing they might have to say goodbye just as fast.</p>
                    
                    <p>"Every morning, I wake up and I have a choice," Amira explains. "I can let the fear win, or I can show my children that we are stronger than what happens to us. Every morning, I choose hope."</p>
                    
                    <p>That hope takes practical forms. Amira has organized the women in her current camp to share resources, teach children, and support each other through the hardest days. She's created a small library using books salvaged from their three homes, and runs informal classes for children who've missed months of school.</p>
                    
                    <p>"Hope isn't a feeling," she says. "It's a decision. And I make that decision every single morning, not just for me, but for them."</p>
                    
                    <blockquote class="story-quote-full">
                        "Every morning I wake up and choose hope over despair. Not because it's easy, but because my children are watching."
                    </blockquote>
                    
                    <p><em>Amira's story was documented through multiple interviews and verified by UNRWA camp records. She continues to lead community support efforts in her current displacement camp.</em></p>
                </div>
            </div>
        `
    },
    hassan: {
        title: "Hassan's House - Rebuilt Three Times",
        content: `
            <div class="story-full">
                <div class="story-header">
                    <img src="images/stories/iran-survivors.jpg" alt="Hassan, 67, Iran" class="story-modal-image">
                    <div class="story-details">
                        <h4>Hassan, 67 years old</h4>
                        <p><strong>Location:</strong> Sarpol-e Zahab, Iran</p>
                        <p><strong>Status:</strong> Earthquake survivor, community leader</p>
                        <p><strong>Impact:</strong> Lost home three times, rebuilt three times</p>
                    </div>
                </div>
                <div class="story-narrative">
                    <p>Hassan Ahmadi has built the same house three times. Not by choice, but by necessity. Each time an earthquake destroyed his home, he cleared the rubble, gathered his tools, and started again.</p>
                    
                    <p>"The first time was 1988," he recalls, his weathered hands still steady as he demonstrates laying bricks. "I was young then, angry. I cursed the earth for taking my house. The second time was 2003. I was older, sadder. I cried while I rebuilt."</p>
                    
                    <p>The third time was November 2017. The 7.3 magnitude earthquake that devastated Kermanshah province reduced Hassan's house to rubble once again. This time, at 67, he faced a choice: give up or start over.</p>
                    
                    <p>"This time, I laughed," he says, surprising visitors with his response. "Not because it was funny, but because I realized something. The earthquake can take my house, but it can't take my ability to build. That belongs to me."</p>
                    
                    <p>Hassan's third house is different from the first two. It's smaller, simpler, but stronger. He's incorporated earthquake-resistant techniques learned from engineers who came after the disaster. More importantly, he's made it a community gathering place.</p>
                    
                    <p>"Every Friday, the neighbors come for tea," he explains. "We share stories, plan repairs, help each other. The earthquake taught me that houses are just walls. Home is the people who come through your door."</p>
                    
                    <p>Now, Hassan teaches younger men in his village how to build earthquake-resistant homes. His hands, scarred from decades of construction work, guide theirs as they learn to create something that can withstand the earth's anger.</p>
                    
                    <blockquote class="story-quote-full">
                        "I've rebuilt this house three times. I'll rebuild it again if I have to. The earthquake can take my walls, but it can't take my will to build."
                    </blockquote>
                    
                    <p><em>Hassan's story was verified through local government records and interviews with community members. His earthquake-resistant building techniques are now being taught throughout the region.</em></p>
                </div>
            </div>
        `
    }
};

// Audio data for testimonies
const audioData = {
    audio1: {
        title: "Amina's Journey - From Drought to Hope",
        transcript: `
            "My name is Amina. I am from a small village outside Mogadishu. When the rains stopped coming for three years, we had to choose: stay and starve, or leave everything and walk.
            
            I carried my youngest son on my back for 200 kilometers. My daughter, she's only seven, she walked the whole way. She never complained, not once. She would ask me, 'Mama, when will we get there?' And I would say, 'Soon, habibti. Soon.'
            
            The refugee camp... it's not home. But it's safe. My children go to school now. They have food. They have hope. And that's enough for me. That's everything for me.
            
            People ask me if I'm angry about what happened to us. I tell them: anger is a luxury I can't afford. Hope is what keeps us alive."
        `,
        duration: "2:34"
    },
    audio2: {
        title: "Yusef's School - Learning Under Fire",
        transcript: `
            "Hi, my name is Yusef. I'm ten years old. I want to tell you about my school.
            
            Our school got bombed three months ago. But we still have classes! My teacher, Mr. Ahmad, he comes to our building every day. We sit in the basement because it's safer there.
            
            I love math the most. Even when the planes come, Mr. Ahmad keeps teaching. He says education is like a seed - you can bomb the ground, but if the seed is planted deep enough, it will still grow.
            
            I want to be a teacher like Mr. Ahmad when I grow up. I want to teach kids that learning is stronger than bombs. That's what he taught me."
        `,
        duration: "1:47"
    },
    audio3: {
        title: "Zahra's Hands - Healing Without Supplies",
        transcript: `
            "I am Zahra, and I am a nurse. When the earthquake hit, our hospital collapsed. But the injured kept coming.
            
            I had no equipment, no medicine, no clean water. But I had my hands, and I had my knowledge. I used torn sheets for bandages. I sterilized needles with fire. I held pressure on wounds with my bare hands.
            
            For three days, I worked without sleep. My hands were covered in blood - not just from patients, but from cuts I got digging through rubble to find supplies.
            
            A little girl asked me why my hands were shaking. I told her they weren't shaking from fear - they were shaking from determination. These hands have saved lives. They will save more.
            
            This is what we do. We heal. Even when the world is broken, we heal."
        `,
        duration: "3:12"
    }
};

// DOM Elements
let currentAudio = null;
let currentStoryFilter = 'all';
let currentRegionFilter = 'all';

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    initializeFilters();
    initializeModals();
    initializeAudioWaves();
    initializeScrollAnimations();
    initializeFormSubmission();
});

// Smooth scroll function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Filter functionality
function initializeFilters() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const regionBtns = document.querySelectorAll('.region-btn');
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Update active state
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Update filter
            currentStoryFilter = this.dataset.filter;
            filterStories();
        });
    });
    
    regionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active state
            regionBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update filter
            currentRegionFilter = this.dataset.region;
            filterStories();
        });
    });
}

function filterStories() {
    const storyCards = document.querySelectorAll('.story-card');
    
    storyCards.forEach(card => {
        const category = card.dataset.category;
        const region = card.dataset.region;
        
        const categoryMatch = currentStoryFilter === 'all' || category === currentStoryFilter;
        const regionMatch = currentRegionFilter === 'all' || region === currentRegionFilter;
        
        if (categoryMatch && regionMatch) {
            card.classList.remove('hidden');
            card.style.animation = 'fadeInUp 0.5s ease-out';
        } else {
            card.classList.add('hidden');
        }
    });
}

// Modal functionality
function initializeModals() {
    // Close modals when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target.id);
        }
    });
    
    // Close modals with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                closeModal(activeModal.id);
            }
        }
    });
}

function openStoryModal(storyId) {
    const modal = document.getElementById('storyModal');
    const titleElement = document.getElementById('modalStoryTitle');
    const contentElement = document.getElementById('modalStoryContent');
    
    if (storyData[storyId]) {
        titleElement.textContent = storyData[storyId].title;
        contentElement.innerHTML = storyData[storyId].content;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function openSubmissionModal() {
    const modal = document.getElementById('submissionModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Stop any playing audio
    if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
        updateAudioButton('play');
    }
}

// Audio functionality
function initializeAudioWaves() {
    const waveforms = document.querySelectorAll('.audio-waveform');
    
    waveforms.forEach(waveform => {
        const bars = waveform.querySelectorAll('.wave-bar');
        
        // Animate waves
        setInterval(() => {
            bars.forEach((bar, index) => {
                const height = Math.random() * 80 + 20;
                bar.style.height = height + '%';
            });
        }, 500);
    });
}

function playAudio(audioId) {
    const modal = document.getElementById('audioModal');
    const titleElement = document.getElementById('audioModalTitle');
    const transcriptElement = document.getElementById('audioTranscript');
    
    if (audioData[audioId]) {
        titleElement.textContent = audioData[audioId].title;
        transcriptElement.innerHTML = `
            <h4>Transcript:</h4>
            <p>${audioData[audioId].transcript.replace(/\n\s*/g, '</p><p>')}</p>
        `;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Simulate audio playback
        simulateAudioPlayback(audioData[audioId].duration);
    }
}

function simulateAudioPlayback(duration) {
    const playPauseBtn = document.getElementById('playPauseBtn');
    const progressFill = document.querySelector('.progress-fill');
    const currentTimeElement = document.getElementById('currentTime');
    const totalTimeElement = document.getElementById('totalTime');
    
    totalTimeElement.textContent = duration;
    
    let isPlaying = false;
    let currentTime = 0;
    const totalSeconds = parseTimeToSeconds(duration);
    
    playPauseBtn.addEventListener('click', function() {
        if (isPlaying) {
            pauseAudio();
        } else {
            playAudioSimulation();
        }
    });
    
    function playAudioSimulation() {
        isPlaying = true;
        updateAudioButton('pause');
        
        const interval = setInterval(() => {
            if (!isPlaying) {
                clearInterval(interval);
                return;
            }
            
            currentTime += 1;
            const progress = (currentTime / totalSeconds) * 100;
            
            progressFill.style.width = progress + '%';
            currentTimeElement.textContent = formatTime(currentTime);
            
            if (currentTime >= totalSeconds) {
                pauseAudio();
                clearInterval(interval);
            }
        }, 1000);
    }
    
    function pauseAudio() {
        isPlaying = false;
        updateAudioButton('play');
    }
}

function updateAudioButton(state) {
    const playPauseBtn = document.getElementById('playPauseBtn');
    const icon = playPauseBtn.querySelector('i');
    
    if (state === 'play') {
        icon.className = 'fas fa-play';
    } else {
        icon.className = 'fas fa-pause';
    }
}

function parseTimeToSeconds(timeString) {
    const parts = timeString.split(':');
    return parseInt(parts[0]) * 60 + parseInt(parts[1]);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out';
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);
    
    // Observe story cards and timeline items
    const animatedElements = document.querySelectorAll('.story-card, .timeline-item, .audio-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// Form submission
function initializeFormSubmission() {
    const form = document.getElementById('storySubmissionForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('submitterName').value || 'Anonymous',
            location: document.getElementById('submitterLocation').value,
            storyType: document.getElementById('storyType').value,
            story: document.getElementById('storyText').value,
            consentPublish: document.getElementById('consentPublish').checked,
            consentContact: document.getElementById('consentContact').checked
        };
        
        // Validate required fields
        if (!formData.location || !formData.storyType || !formData.story || !formData.consentPublish) {
            showNotification('Please fill in all required fields and consent to publication.', 'error');
            return;
        }
        
        // Simulate form submission
        submitStory(formData);
    });
}

function submitStory(formData) {
    // Show loading state
    const submitBtn = document.querySelector('#storySubmissionForm .btn-primary');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> SENDING...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset form
        document.getElementById('storySubmissionForm').reset();
        
        // Show success message
        showNotification('Thank you for sharing your story. We will review it and contact you if needed.', 'success');
        
        // Close modal
        closeModal('submissionModal');
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Utility functions
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'var(--forest)' : type === 'error' ? 'var(--crimson)' : 'var(--charcoal)'};
        color: white;
        padding: 15px 20px;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-strong);
        z-index: 3000;
        animation: slideInRight 0.3s ease-out;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

function donateInName() {
    // Redirect to donate page with context
    window.location.href = 'donate.html?context=story';
}

function shareStory() {
    // Get current story or page URL
    const url = window.location.href;
    const text = 'These voices need to be heard. Read their stories and join the movement for humanitarian relief.';
    
    // Check if Web Share API is available
    if (navigator.share) {
        navigator.share({
            title: 'Stories from OneWoundedWorld',
            text: text,
            url: url
        });
    } else {
        // Fallback to copying URL
        navigator.clipboard.writeText(url).then(() => {
            showNotification('Story link copied to clipboard!', 'success');
        });
    }
}

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
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
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .story-modal-image {
        width: 100%;
        max-width: 200px;
        height: 150px;
        object-fit: cover;
        border-radius: var(--border-radius);
        margin-bottom: 20px;
    }
    
    .story-header {
        display: flex;
        gap: 20px;
        margin-bottom: 30px;
        align-items: flex-start;
    }
    
    .story-details h4 {
        font-family: var(--font-serif);
        font-size: 1.3rem;
        margin-bottom: 10px;
        color: var(--charcoal);
    }
    
    .story-details p {
        margin-bottom: 5px;
        color: var(--slate);
    }
    
    .story-narrative p {
        margin-bottom: 20px;
        line-height: 1.7;
        text-align: justify;
    }
    
    .story-quote-full {
        font-family: var(--font-serif);
        font-size: 1.2rem;
        font-style: italic;
        color: var(--crimson);
        text-align: center;
        margin: 30px 0;
        padding: 20px;
        background-color: var(--snow);
        border-left: 4px solid var(--crimson);
        border-radius: var(--border-radius);
    }
    
    @media (max-width: 768px) {
        .story-header {
            flex-direction: column;
        }
        
        .story-modal-image {
            max-width: 100%;
        }
        
        .notification {
            right: 10px !important;
            left: 10px !important;
            max-width: none !important;
        }
    }
`;

document.head.appendChild(notificationStyles);

