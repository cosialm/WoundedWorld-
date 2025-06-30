// OneWoundedWorld Shop Page JavaScript

// Global variables
let cart = [];
let selectedName = '';
let customizationProduct = null;

// Product data
const products = {
    'still-standing': {
        title: '"Still Standing" Tee',
        price: 25,
        image: 'images/merch/resistance-shirt.jpg',
        story: `
            <div class="story-content">
                <img src="images/merch/resistance-shirt.jpg" alt="Still Standing Tee" style="width: 100%; border-radius: 8px; margin-bottom: 1rem;">
                <h4>The Story Behind "Still Standing"</h4>
                <p>This design was created by Amira, a 28-year-old Palestinian artist whose home was destroyed in Gaza. Despite losing everything, she continues to create art that speaks truth to power.</p>
                <p><strong>Impact:</strong> Each shirt sold provides one week of food rations (rice, lentils, oil, and baby formula) to a family of four in crisis zones.</p>
                <p><strong>Made with:</strong> 100% organic cotton, ethically sourced and printed with water-based inks.</p>
                <blockquote>"Art is my resistance. When they destroy our buildings, we rebuild with our voices." - Amira</blockquote>
            </div>
        `,
        impact: 'Feeds 1 family for 1 week'
    },
    'she-was-9': {
        title: '"She Was 9" Memorial Poster',
        price: 0,
        image: 'images/merch/palestine-shirt.jpg',
        story: `
            <div class="story-content">
                <img src="images/merch/palestine-shirt.jpg" alt="She Was 9 Poster" style="width: 100%; border-radius: 8px; margin-bottom: 1rem;">
                <h4>Remembering Layla</h4>
                <p>Layla was 9 years old when she was killed while playing in her backyard in Gaza. This poster honors her memory and the memory of all children lost to conflict.</p>
                <p><strong>Impact:</strong> Free download, but donations fund school supplies for 2 children including notebooks, pencils, and educational materials.</p>
                <p><strong>Usage:</strong> Print at home or local print shop. Display in windows, classrooms, or community centers.</p>
                <blockquote>"She loved to draw stars. Now she is one." - Layla's mother</blockquote>
            </div>
        `,
        impact: 'School supplies for 2 children'
    },
    'they-killed-her': {
        title: '"They Killed Her. I Wear Her Name." Hoodie',
        price: 40,
        image: 'images/merch/iran-protest-shirt.jpg',
        story: `
            <div class="story-content">
                <img src="images/merch/iran-protest-shirt.jpg" alt="They Killed Her Hoodie" style="width: 100%; border-radius: 8px; margin-bottom: 1rem;">
                <h4>Honor Her Memory</h4>
                <p>This hoodie allows you to carry the name of a child lost to violence. Each name represents a life cut short, a future stolen, a family forever changed.</p>
                <p><strong>Impact:</strong> Funds thermal blankets, winter clothing, and emergency shelter materials for families displaced by conflict.</p>
                <p><strong>Customization:</strong> Choose from our list of remembered children or submit a name to honor someone special to you.</p>
                <blockquote>"When we speak their names, they live forever." - Memorial Project</blockquote>
            </div>
        `,
        impact: 'Thermal blanket + winter kit'
    },
    'not-collateral': {
        title: '"We Are Not Collateral" Tote',
        price: 18,
        image: 'images/merch/activism-tote.jpg',
        story: `
            <div class="story-content">
                <img src="images/merch/activism-tote.jpg" alt="We Are Not Collateral Tote" style="width: 100%; border-radius: 8px; margin-bottom: 1rem;">
                <h4>Carrying Truth</h4>
                <p>This powerful statement challenges the dehumanizing language of war. Every person is someone's child, parent, sibling - never just "collateral damage."</p>
                <p><strong>Impact:</strong> Funds emergency medical supplies including antibiotics, trauma bandages, and pain medication for field hospitals.</p>
                <p><strong>Material:</strong> Durable canvas construction, reinforced handles, perfect for daily use while making a statement.</p>
                <blockquote>"We are not numbers in your statistics. We are human beings with names, dreams, and families." - Humanitarian worker</blockquote>
            </div>
        `,
        impact: 'Emergency medical kit'
    },
    'women-life-freedom': {
        title: '"Women Life Freedom" Solidarity Shirt',
        price: 30,
        image: 'images/merch/iran-activist.jpg',
        story: `
            <div class="story-content">
                <img src="images/merch/iran-activist.jpg" alt="Women Life Freedom Shirt" style="width: 100%; border-radius: 8px; margin-bottom: 1rem;">
                <h4>Made by Survivors</h4>
                <p>Hand-printed by Iranian refugee women who fled persecution for demanding basic human rights. Each shirt is a testament to their courage and resilience.</p>
                <p><strong>Impact:</strong> Funds trauma counseling, mental health support, and community healing programs for survivors of violence.</p>
                <p><strong>Artisans:</strong> Made in partnership with refugee women's cooperatives, providing fair wages and dignity through work.</p>
                <blockquote>"Every stitch is an act of resistance. Every sale is a step toward freedom." - Maryam, artisan</blockquote>
            </div>
        `,
        impact: 'Trauma therapy session'
    },
    'sticker-pack': {
        title: 'Resistance Sticker Pack',
        price: 5,
        image: 'images/merch/protest-shirts.jpg',
        story: `
            <div class="story-content">
                <img src="images/merch/protest-shirts.jpg" alt="Resistance Sticker Pack" style="width: 100%; border-radius: 8px; margin-bottom: 1rem;">
                <h4>Small Acts, Big Impact</h4>
                <p>Ten waterproof stickers featuring resistance artwork from artists in Palestine, Iran, and Lebanon. Spread the message wherever you go.</p>
                <p><strong>Impact:</strong> Funds antibiotic injections and medical gauze for treating infected wounds in field hospitals.</p>
                <p><strong>Designs:</strong> Original artwork by local artists, each sticker tells a story of resistance and hope.</p>
                <blockquote>"Revolution starts with small acts of courage." - Street artist, Beirut</blockquote>
            </div>
        `,
        impact: 'Antibiotic injection + gauze'
    }
};

// Impact messages for cart
const impactMessages = {
    1: "You're about to feed 1 family!",
    2: "You're about to help 2 families and provide medical aid!",
    3: "You're about to feed 3 families and fund trauma therapy!",
    4: "You're about to make a massive impact - feeding families and saving lives!",
    5: "You're about to change multiple lives with your purchase!"
};

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    updateCartDisplay();
    animateOnScroll();
});

// Initialize event listeners
function initializeEventListeners() {
    // Collection filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterProducts(this.dataset.collection);
            updateActiveFilter(this);
        });
    });

    // Cart icon click
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', openCart);
    }

    // Upload area click
    const uploadArea = document.querySelector('.upload-area');
    if (uploadArea) {
        uploadArea.addEventListener('click', function() {
            document.getElementById('imageUpload').click();
        });
    }

    // File input change
    const fileInput = document.getElementById('imageUpload');
    if (fileInput) {
        fileInput.addEventListener('change', handleFileSelect);
    }

    // Close modals on outside click
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target.id);
        }
    });

    // Smooth scroll for anchor links
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

// Scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Filter products
function filterProducts(collection) {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        if (collection === 'all' || card.dataset.collection === collection) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.5s ease-out';
        } else {
            card.style.display = 'none';
        }
    });
}

// Update active filter button
function updateActiveFilter(activeButton) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    activeButton.classList.add('active');
}

// Add to cart
function addToCart(productId, price) {
    const product = products[productId];
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            title: product.title,
            price: price,
            image: product.image,
            impact: product.impact,
            quantity: 1
        });
    }

    updateCartDisplay();
    showCartNotification(product.title);
    
    // Animate cart icon
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.style.animation = 'pulse 0.5s ease-out';
        setTimeout(() => {
            cartIcon.style.animation = '';
        }, 500);
    }
}

// Add customized item to cart
function addCustomizedItem() {
    const customName = document.getElementById('customNameInput').value;
    const finalName = selectedName || customName;
    
    if (!finalName) {
        alert('Please select or enter a name to honor.');
        return;
    }

    const customProduct = {
        id: 'they-killed-her-' + Date.now(),
        title: `"They Killed Her. I Wear Her Name." Hoodie - ${finalName}`,
        price: 40,
        image: 'images/merch/iran-protest-shirt.jpg',
        impact: 'Thermal blanket + winter kit',
        quantity: 1,
        customization: finalName
    };

    cart.push(customProduct);
    updateCartDisplay();
    closeModal('customizationModal');
    showCartNotification(`Customized hoodie for ${finalName}`);
    
    // Reset selections
    selectedName = '';
    document.getElementById('customNameInput').value = '';
    document.querySelectorAll('.name-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
}

// Download poster
function downloadPoster(productId) {
    // Simulate download
    const link = document.createElement('a');
    link.href = 'images/merch/palestine-shirt.jpg'; // In real implementation, this would be a PDF
    link.download = 'she-was-9-memorial-poster.jpg';
    link.click();
    
    showCartNotification('Poster downloaded! Consider making a donation.');
    
    // Open donation modal or redirect
    setTimeout(() => {
        if (confirm('Would you like to make a donation to fund school supplies for 2 children?')) {
            window.open('donate.html', '_blank');
        }
    }, 1000);
}

// Open customization modal
function openCustomization(productId, price) {
    customizationProduct = { id: productId, price: price };
    openModal('customizationModal');
}

// Select name for customization
function selectName(name) {
    selectedName = name;
    document.querySelectorAll('.name-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    event.target.classList.add('selected');
}

// Update cart display
function updateCartDisplay() {
    const cartCount = document.querySelector('.cart-count');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const impactText = document.getElementById('impactText');

    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCount) {
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }

    // Update cart items
    if (cartItems) {
        cartItems.innerHTML = '';
        
        if (cart.length === 0) {
            cartItems.innerHTML = '<p style="text-align: center; color: #424242; padding: 2rem;">Your cart is empty</p>';
        } else {
            cart.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <img src="${item.image}" alt="${item.title}" class="cart-item-image">
                    <div class="cart-item-info">
                        <div class="cart-item-title">${item.title}</div>
                        <div class="cart-item-price">$${item.price} x ${item.quantity}</div>
                        <div class="cart-item-impact">${item.impact}</div>
                    </div>
                    <button onclick="removeFromCart('${item.id}')" style="background: none; border: none; color: #B71C1C; cursor: pointer;">
                        <i class="fas fa-trash"></i>
                    </button>
                `;
                cartItems.appendChild(cartItem);
            });
        }
    }

    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (cartTotal) {
        cartTotal.textContent = total.toFixed(2);
    }

    // Update impact text
    if (impactText) {
        const itemCount = cart.length;
        impactText.textContent = impactMessages[Math.min(itemCount, 5)] || impactMessages[5];
    }
}

// Remove from cart
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCartDisplay();
}

// Open cart
function openCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    if (cartSidebar) {
        cartSidebar.classList.add('open');
    }
}

// Close cart
function closeCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    if (cartSidebar) {
        cartSidebar.classList.remove('open');
    }
}

// Proceed to checkout
function proceedToCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    // In a real implementation, this would integrate with a payment processor
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    if (confirm(`Proceed to checkout for $${total.toFixed(2)}? This will help ${itemCount} families and fund critical aid.`)) {
        // Simulate checkout process
        showCheckoutSuccess();
    }
}

// Show checkout success
function showCheckoutSuccess() {
    const modal = document.createElement('div');
    modal.className = 'modal open';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Thank You for Your Impact!</h3>
            </div>
            <div class="modal-body" style="text-align: center;">
                <i class="fas fa-heart" style="font-size: 4rem; color: #B71C1C; margin-bottom: 1rem;"></i>
                <h4>Your order is being processed</h4>
                <p>You've just funded critical aid for families in crisis. Your merchandise will ship within 3-5 business days.</p>
                <p><strong>Impact Summary:</strong></p>
                <ul style="text-align: left; margin: 1rem 0;">
                    ${cart.map(item => `<li>${item.quantity}x ${item.impact}</li>`).join('')}
                </ul>
                <p>We'll send you updates on how your purchase is making a difference.</p>
                <button class="btn btn-primary" onclick="closeCheckoutModal()" style="margin-top: 1rem;">
                    Continue Shopping
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Clear cart
    cart = [];
    updateCartDisplay();
    closeCart();
}

// Close checkout modal
function closeCheckoutModal() {
    const modal = document.querySelector('.modal.open');
    if (modal) {
        modal.remove();
    }
}

// Show cart notification
function showCartNotification(productTitle) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #1B5E20;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        z-index: 4000;
        animation: slideInRight 0.3s ease-out;
    `;
    notification.innerHTML = `
        <i class="fas fa-check-circle" style="margin-right: 0.5rem;"></i>
        Added "${productTitle}" to cart!
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Open product modal
function openProductModal(productId) {
    const product = products[productId];
    if (!product) return;

    const modal = document.getElementById('productModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');

    if (modal && modalTitle && modalBody) {
        modalTitle.textContent = product.title;
        modalBody.innerHTML = product.story;
        openModal('productModal');
    }
}

// Open modal
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
}

// Close modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('open');
        document.body.style.overflow = 'auto';
    }
}

// Open upload modal
function openUploadModal() {
    openModal('uploadModal');
}

// Handle file select
function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const uploadArea = document.querySelector('.upload-area');
            uploadArea.innerHTML = `
                <img src="${e.target.result}" style="max-width: 100%; max-height: 200px; border-radius: 8px;">
                <p>Image selected: ${file.name}</p>
            `;
        };
        reader.readAsDataURL(file);
    }
}

// Submit upload
function submitUpload() {
    const location = document.getElementById('locationInput').value;
    const message = document.getElementById('messageInput').value;
    const file = document.getElementById('imageUpload').files[0];

    if (!file || !location) {
        alert('Please select an image and enter your location.');
        return;
    }

    // Simulate upload
    alert('Thank you for sharing your resistance! Your photo will be reviewed and added to our community gallery.');
    closeModal('uploadModal');
    
    // Reset form
    document.getElementById('locationInput').value = '';
    document.getElementById('messageInput').value = '';
    document.getElementById('imageUpload').value = '';
    document.querySelector('.upload-area').innerHTML = `
        <i class="fas fa-cloud-upload-alt"></i>
        <p>Drag & drop your image here or click to browse</p>
    `;
}

// Share to Instagram
function shareToInstagram() {
    const text = encodeURIComponent('Wearing my resistance with @onewoundedworld - every purchase feeds families and funds critical aid. #WearTheResistance #OneWoundedWorld');
    window.open(`https://www.instagram.com/create/story/?text=${text}`, '_blank');
}

// Open gift modal
function openGiftModal() {
    alert('Gift feature coming soon! For now, you can purchase items and include a personal message at checkout.');
}

// Animate on scroll
function animateOnScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out';
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe product cards
    document.querySelectorAll('.product-card').forEach(card => {
        observer.observe(card);
    });

    // Observe impact items
    document.querySelectorAll('.impact-item').forEach(item => {
        observer.observe(item);
    });
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
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
`;
document.head.appendChild(style);

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close any open modals
        document.querySelectorAll('.modal.open').forEach(modal => {
            closeModal(modal.id);
        });
        
        // Close cart if open
        const cartSidebar = document.getElementById('cartSidebar');
        if (cartSidebar && cartSidebar.classList.contains('open')) {
            closeCart();
        }
    }
});

// Initialize cart from localStorage if available
function initializeCart() {
    const savedCart = localStorage.getItem('onewoundedworld_cart');
    if (savedCart) {
        try {
            cart = JSON.parse(savedCart);
            updateCartDisplay();
        } catch (e) {
            console.error('Error loading cart from localStorage:', e);
        }
    }
}

// Save cart to localStorage
function saveCart() {
    try {
        localStorage.setItem('onewoundedworld_cart', JSON.stringify(cart));
    } catch (e) {
        console.error('Error saving cart to localStorage:', e);
    }
}

// Update cart display and save to localStorage
const originalUpdateCartDisplay = updateCartDisplay;
updateCartDisplay = function() {
    originalUpdateCartDisplay();
    saveCart();
};

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeCart();
});

// Export functions for global access
window.scrollToSection = scrollToSection;
window.addToCart = addToCart;
window.openProductModal = openProductModal;
window.openCustomization = openCustomization;
window.selectName = selectName;
window.addCustomizedItem = addCustomizedItem;
window.downloadPoster = downloadPoster;
window.removeFromCart = removeFromCart;
window.openCart = openCart;
window.closeCart = closeCart;
window.proceedToCheckout = proceedToCheckout;
window.openModal = openModal;
window.closeModal = closeModal;
window.openUploadModal = openUploadModal;
window.submitUpload = submitUpload;
window.shareToInstagram = shareToInstagram;
window.openGiftModal = openGiftModal;

