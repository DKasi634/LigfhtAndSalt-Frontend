// ============================================================
// DONATE PAGE INTERACTIVE FUNCTIONALITY
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Quick Amount Buttons Functionality
    const amountButtons = document.querySelectorAll('.amount-btn');
    const customAmountInput = document.getElementById('customAmount');
    
    // Handle quick amount button clicks
    amountButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            amountButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Set the custom amount input value
            const amount = this.getAttribute('data-amount');
            customAmountInput.value = amount;
            
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Handle custom amount input
    customAmountInput.addEventListener('input', function() {
        // Remove active class from all buttons when typing custom amount
        amountButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add visual feedback for input
        if (this.value > 0) {
            this.style.borderColor = 'var(--color-blue)';
            this.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
        } else {
            this.style.borderColor = '#e2e8f0';
            this.style.boxShadow = 'none';
        }
    });
    
    // Form submission handling
    const donationForm = document.querySelector('.donation-form');
    const donateBtn = document.querySelector('.donate-btn');
    
    donationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const amount = customAmountInput.value;
        const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
        const donorName = document.getElementById('donorName').value;
        const donorEmail = document.getElementById('donorEmail').value;
        
        // Validate amount
        if (!amount || amount < 1) {
            showNotification('Veuillez entrer un montant valide', 'error');
            return;
        }
        
        // Show loading state
        donateBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i><span>Envoi en cours...</span>';
        donateBtn.disabled = true;
        
        // Simulate form processing
        setTimeout(() => {
            // Reset button
            donateBtn.innerHTML = '<i class="fa-solid fa-heart"></i><span>Faire un don</span><i class="fa-solid fa-arrow-right"></i>';
            donateBtn.disabled = false;
            
            // Show success message
            showNotification('Merci pour votre générosité ! Nous vous contacterons bientôt.', 'success');
            
            // Reset form
            donationForm.reset();
            amountButtons.forEach(btn => btn.classList.remove('active'));
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
        }, 2000);
    });
    
    // Payment method selection animation
    const paymentMethods = document.querySelectorAll('.payment-method');
    paymentMethods.forEach(method => {
        const radio = method.querySelector('input[type="radio"]');
        const label = method.querySelector('label');
        
        radio.addEventListener('change', function() {
            // Add visual feedback
            label.style.transform = 'scale(1.02)';
            setTimeout(() => {
                label.style.transform = '';
            }, 200);
        });
    });
    
    // Animate stats on scroll
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }
    
    // Animate progress bars on scroll
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressBars();
                progressObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
    
    // Smooth scrolling for anchor links
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
});

// ============================================================
// ANIMATION FUNCTIONS
// ============================================================

function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const suffix = stat.textContent.replace(/\d/g, '');
        let currentNumber = 0;
        const increment = target / 60;
        
        const timer = setInterval(() => {
            currentNumber += increment;
            if (currentNumber >= target) {
                currentNumber = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(currentNumber) + suffix;
        }, 25);
    });
}

function animateProgressBars() {
    const progressFills = document.querySelectorAll('.progress-fill');
    
    progressFills.forEach(fill => {
        const width = fill.getAttribute('data-width');
        fill.style.width = '0%';
        
        setTimeout(() => {
            fill.style.transition = 'width 2s cubic-bezier(0.4, 0, 0.2, 1)';
            fill.style.width = width + '%';
        }, 300);
    });
}

// ============================================================
// NOTIFICATION SYSTEM
// ============================================================

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fa-solid ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fa-solid fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    return icons[type] || icons.info;
}

function getNotificationColor(type) {
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6'
    };
    return colors[type] || colors.info;
}

// ============================================================
// PARALLAX EFFECT FOR HERO SECTION
// ============================================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image img');
    
    if (heroImage) {
        const rate = scrolled * -0.5;
        heroImage.style.transform = `perspective(1000px) rotateY(-5deg) translateY(${rate}px)`;
    }
});

// ============================================================
// FORM VALIDATION ENHANCEMENTS
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="number"]');
    
    inputs.forEach(input => {
        // Add focus/blur effects
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
            this.parentElement.style.transition = 'transform 0.2s ease';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
        
        // Real-time validation
        input.addEventListener('input', function() {
            validateInput(this);
        });
    });
});

function validateInput(input) {
    const value = input.value.trim();
    let isValid = true;
    
    // Email validation
    if (input.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = emailRegex.test(value);
    }
    
    // Number validation
    if (input.type === 'number' && value) {
        isValid = parseFloat(value) > 0;
    }
    
    // Update input styling
    if (value && !isValid) {
        input.style.borderColor = '#ef4444';
        input.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
    } else if (value && isValid) {
        input.style.borderColor = '#10b981';
        input.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.1)';
    } else {
        input.style.borderColor = '#e2e8f0';
        input.style.boxShadow = 'none';
    }
}
