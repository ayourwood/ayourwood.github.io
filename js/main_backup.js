/**
 * ==========================================
 * ÙˆØ±Ø´Ø© Ø§ÙŠÙˆØ± Ù„Ù„Ù†Ø¬Ø§Ø±Ø© - AYUR WOODWORKING
 * Main JavaScript File - Application Logic
 * ==========================================
 */

document.addEventListener('DOMContentLoaded', function() {
    // PAGE LOADER - FADE OUT ANIMATION
    const pageLoader = document.getElementById('pageLoader');
    if (pageLoader) {
        setTimeout(() => {
            pageLoader.classList.add('fade-out');
            setTimeout(() => {
                if (pageLoader.parentNode) {
                    pageLoader.parentNode.removeChild(pageLoader);
                }
            }, 600);
        }, 1200);
    }

    // Initialize AOS Animation Library
    AOS.init({
        duration: 800,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic'
    });

    window.addEventListener('load', () => {
        const pageLoader = document.getElementById('pageLoader');
        if (pageLoader && !pageLoader.classList.contains('fade-out')) {
            setTimeout(() => {
                pageLoader.classList.add('fade-out');
                setTimeout(() => {
                    if (pageLoader && pageLoader.parentNode) {
                        pageLoader.parentNode.removeChild(pageLoader);
                    }
                }, 600);
            }, 200);
        }
    });

    // NAVBAR SCROLL EFFECT
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // MOBILE MENU MANAGEMENT
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const closeMenuBtn = document.getElementById('closeMenuBtn');

    function openMenu() {
        if (mobileMenu) mobileMenu.classList.add('active');
        if (mobileMenuOverlay) mobileMenuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        if (mobileMenu) mobileMenu.classList.remove('active');
        if (mobileMenuOverlay) mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMenu);
    if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeMenu);
    if (mobileMenuOverlay) mobileMenuOverlay.addEventListener('click', closeMenu);

    if (mobileMenu) {
        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => link.addEventListener('click', closeMenu));
    }

    // Scroll to Top Button
    const scrollToTopBtn = document.getElementById('scrollToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollToTopBtn.classList.remove('opacity-0', 'invisible');
            scrollToTopBtn.classList.add('opacity-100', 'visible');
        } else {
            scrollToTopBtn.classList.add('opacity-0', 'invisible');
            scrollToTopBtn.classList.remove('opacity-100', 'visible');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // UTILITY FUNCTIONS
    function sanitizeInput(input) {
        return input.trim()
            .replace(/[<>\"'`;()&|]/g, '')
            .replace(/javascript:/gi, '')
            .replace(/on\w+=/gi, '');
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email.trim());
    }

    function isValidPhone(phone) {
        const phoneRegex = /^[\d\s+\-()]*$/;
        const digitsOnly = phone.replace(/\D/g, '');
        return phoneRegex.test(phone) && digitsOnly.length >= 8;
    }

    // INLINE FORM FEEDBACK
    function showFormFeedback(type, title, message, duration = 5000) {
        const feedbackContainer = document.getElementById('formFeedback');
        const feedbackIcon = document.getElementById('feedbackIcon');
        const feedbackTitle = document.getElementById('feedbackTitle');
        const feedbackMessage = document.getElementById('feedbackMessage');

        feedbackContainer.className = 'form-feedback px-6 py-4 rounded-lg border-l-4 flex items-start gap-4';

        switch (type) {
            case 'success':
                feedbackContainer.classList.add('feedback-success');
                feedbackIcon.innerHTML = '<i class="fas fa-check-circle text-green-400"></i>';
                break;
            case 'error':
                feedbackContainer.classList.add('feedback-error');
                feedbackIcon.innerHTML = '<i class="fas fa-times-circle text-red-400"></i>';
                break;
            case 'warning':
                feedbackContainer.classList.add('feedback-warning');
                feedbackIcon.innerHTML = '<i class="fas fa-exclamation-circle text-yellow-400"></i>';
                break;
            case 'info':
                feedbackContainer.classList.add('feedback-info');
                feedbackIcon.innerHTML = '<i class="fas fa-info-circle text-blue-400"></i>';
                break;
        }

        feedbackTitle.textContent = title;
        feedbackMessage.textContent = message;
        feedbackContainer.classList.remove('hidden', 'feedback-fade-out');
        feedbackContainer.classList.add('feedback-fade-in');

        if (duration > 0) {
            clearTimeout(feedbackContainer.autoHideTimer);
            feedbackContainer.autoHideTimer = setTimeout(() => hideFormFeedback(), duration);
        }
    }

    function hideFormFeedback() {
        const feedbackContainer = document.getElementById('formFeedback');
        feedbackContainer.classList.add('feedback-fade-out');
        setTimeout(() => {
            feedbackContainer.classList.add('hidden');
            feedbackContainer.classList.remove('feedback-fade-in', 'feedback-fade-out');
        }, 300);
    }

    const closeFeedbackBtn = document.getElementById('closeFeedback');
    if (closeFeedbackBtn) closeFeedbackBtn.addEventListener('click', hideFormFeedback);

    // CONTACT FORM HANDLING
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            const name = sanitizeInput(this.querySelector('input[name="name"]').value);
            const email = sanitizeInput(this.querySelector('input[name="email"]').value);
            const phone = sanitizeInput(this.querySelector('input[name="phone"]').value);
            const projectType = sanitizeInput(this.querySelector('select[name="project_type"]').value);
            const message = sanitizeInput(this.querySelector('textarea[name="message"]').value);

            if (!name || name.length < 2) {
                showFormFeedback('warning', 'ØªÙ†Ø¨ÙŠÙ‡!', 'Ø§Ù„Ø±Ø¬Ø§Ø¡ Ø¥Ø¯Ø®Ø§Ù„ Ø§Ø³Ù… ØµØ­ÙŠØ­ (Ù„Ø§ ÙŠÙ‚Ù„ Ø¹Ù† Ø­Ø±ÙÙŠÙ†)', 5000);
                return;
            }

            if (email && !isValidEmail(email)) {
                showFormFeedback('warning', 'ØªÙ†Ø¨ÙŠÙ‡!', 'Ø§Ù„Ø±Ø¬Ø§Ø¡ Ø¥Ø¯Ø®Ø§Ù„ Ø¨Ø±ÙŠØ¯ Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ ØµØ­ÙŠØ­', 5000);
                return;
            }

            if (phone && !isValidPhone(phone)) {
                showFormFeedback('warning', 'ØªÙ†Ø¨ÙŠÙ‡!', 'Ø§Ù„Ø±Ø¬Ø§Ø¡ Ø¥Ø¯Ø®Ø§Ù„ Ø±Ù‚Ù… Ù‡Ø§ØªÙ ØµØ­ÙŠØ­', 5000);
                return;
            }

            if (!message || message.length < 10) {
                showFormFeedback('warning', 'ØªÙ†Ø¨ÙŠÙ‡!', 'Ø§Ù„Ø±Ø¬Ø§Ø¡ Ø¥Ø¯Ø®Ø§Ù„ ØªÙØ§ØµÙŠÙ„ Ø§Ù„Ù…Ø´Ø±ÙˆØ¹', 5000);
                return;
            }

            submitBtn.innerHTML = '<span class="loader"></span> Ø¬Ø§Ø±ÙŠ Ø§Ù„Ø¥Ø±Ø³Ø§Ù„...';
            submitBtn.disabled = true;

            try {
                const formData = new FormData();
                formData.append('name', name);
                formData.append('email', email);
                formData.append('phone', phone);
                formData.append('project_type', projectType);
                formData.append('message', message);

                const response = await fetch('https://formspree.io/f/mvzblzep', {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    showFormFeedback('success', 'ØªÙ… Ø¨Ù†Ø¬Ø§Ø­! âœ“', 'ØªÙ… Ø¥Ø±Ø³Ø§Ù„ Ø±Ø³Ø§Ù„ØªÙƒ Ø¨Ù†Ø¬Ø§Ø­', 8000);
                    contactForm.reset();
                } else {
                    showFormFeedback('error', 'Ø®Ø·Ø£!', 'Ø¹Ø°Ø±Ø§Ù‹! Ø­Ø¯Ø« Ø®Ø·Ø£', 6000);
                }
            } catch (error) {
                showFormFeedback('error', 'Ø®Ø·Ø£ ÙÙŠ Ø§Ù„Ø§ØªØµØ§Ù„', 'ÙŠØ±Ø¬Ù‰ Ø§Ù„ØªØ­Ù‚Ù‚ Ù…Ù† Ø§ØªØµØ§Ù„Ùƒ Ø¨Ø§Ù„Ø¥Ù†ØªØ±Ù†Øª', 6000);
            } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // TESTIMONIAL FORM HANDLING
    const testimonialForm = document.getElementById('testimonialForm');
    let selectedRating = 0;

    if (testimonialForm) {
        const starButtons = document.querySelectorAll('.star-btn');
        const ratingInput = document.getElementById('testimonialRating');

        starButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                selectedRating = parseInt(button.getAttribute('data-rating'));
                ratingInput.value = selectedRating;

                starButtons.forEach((btn, index) => {
                    if (index < selectedRating) {
                        btn.innerHTML = '<i class="fas fa-star"></i>';
                        btn.classList.add('text-accent');
                        btn.classList.remove('text-primary/30');
                    } else {
                        btn.innerHTML = '<i class="far fa-star"></i>';
                        btn.classList.remove('text-accent');
                        btn.classList.add('text-primary/30');
                    }
                });
            });
        });

        function showTestimonialFeedback(type, title, message, duration = 5000) {
            const feedbackContainer = document.getElementById('testimonialFeedback');
            const feedbackIcon = document.getElementById('testimonialIcon');
            const feedbackTitle = document.getElementById('testimonialTitle');
            const feedbackMessage = document.getElementById('testimonialMessage');

            feedbackContainer.className = 'form-feedback px-6 py-4 rounded-lg border-l-4 flex items-start gap-4';

            switch (type) {
                case 'success':
                    feedbackContainer.classList.add('feedback-success');
                    feedbackIcon.innerHTML = '<i class="fas fa-check-circle text-green-400"></i>';
                    break;
                case 'error':
                    feedbackContainer.classList.add('feedback-error');
                    feedbackIcon.innerHTML = '<i class="fas fa-times-circle text-red-400"></i>';
                    break;
                case 'warning':
                    feedbackContainer.classList.add('feedback-warning');
                    feedbackIcon.innerHTML = '<i class="fas fa-exclamation-circle text-yellow-400"></i>';
                    break;
            }

            feedbackTitle.textContent = title;
            feedbackMessage.textContent = message;
            feedbackContainer.classList.remove('hidden', 'feedback-fade-out');
            feedbackContainer.classList.add('feedback-fade-in');

            if (duration > 0) {
                clearTimeout(feedbackContainer.autoHideTimer);
                feedbackContainer.autoHideTimer = setTimeout(() => {
                    feedbackContainer.classList.add('feedback-fade-out');
                    setTimeout(() => {
                        feedbackContainer.classList.add('hidden');
                        feedbackContainer.classList.remove('feedback-fade-in', 'feedback-fade-out');
                    }, 300);
                }, duration);
            }
        }

        function createStarHTML(rating) {
            let stars = '';
            for (let i = 0; i < 5; i++) {
                stars += i < rating ? '<i class="fas fa-star text-accent"></i>' : '<i class="far fa-star text-accent"></i>';
            }
            return stars;
        }

        // DISPLAY TESTIMONIAL - Enhanced Style matching Testimonials Grid
        function displayTestimonial(testimonial) {
            const container = document.getElementById('newTestimonials');
            const nameInitials = testimonial.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

            const card = document.createElement('div');
            card.className = 'testimonial-enhanced-card';
            card.setAttribute('data-aos', 'fade-up');
            card.innerHTML = `
                <i class="fas fa-quote-right testimonial-quote-icon"></i>
                <div class="flex items-center gap-1 text-accent mb-4 testimonial-stars">
                    ${createStarHTML(testimonial.rating)}
                </div>
                <p class="text-primary/80 leading-relaxed mb-6 testimonial-text">
                    "${testimonial.comment}"
                </p>
                <div class="flex items-center gap-4">
                    <div class="testimonial-avatar">${nameInitials}</div>
                    <div>
                        <h4 class="font-bold text-primary testimonial-name">${sanitizeInput(testimonial.name)}</h4>
                        <p class="text-sm text-primary/60 testimonial-location">${testimonial.location || 'Ø§Ù„Ù…ØºØ±Ø¨'}</p>
                    </div>
                </div>
            `;
            container.insertBefore(card, container.firstChild);
        }

        function loadStoredTestimonials() {
            const stored = localStorage.getItem('testimonials');
            if (stored) {
                try {
                    const testimonials = JSON.parse(stored);
                    testimonials.slice(0, 6).forEach(displayTestimonial);
                } catch (e) {
                    console.error('Error loading testimonials:', e);
                }
            }
        }

        loadStoredTestimonials();

        testimonialForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const name = sanitizeInput(document.getElementById('testimonialName').value);
            const location = sanitizeInput(document.getElementById('testimonialLocation').value);
            const rating = parseInt(ratingInput.value);
            const comment = sanitizeInput(document.getElementById('testimonialComment').value);

            if (!name || name.length < 2) {
                showTestimonialFeedback('warning', 'ØªÙ†Ø¨ÙŠÙ‡!', 'Ø§Ù„Ø±Ø¬Ø§Ø¡ Ø¥Ø¯Ø®Ø§Ù„ Ø§Ø³Ù… ØµØ­ÙŠØ­', 5000);
                return;
            }

            if (rating < 1 || rating > 5) {
                showTestimonialFeedback('warning', 'ØªÙ†Ø¨ÙŠÙ‡!', 'Ø§Ù„Ø±Ø¬Ø§Ø¡ Ø§Ø®ØªÙŠØ§Ø± ØªÙ‚ÙŠÙŠÙ…', 5000);
                return;
            }

            if (!comment || comment.length < 10) {
                showTestimonialFeedback('warning', 'ØªÙ†Ø¨ÙŠÙ‡!', 'Ø§Ù„ØªØ¹Ù„ÙŠÙ‚ ÙŠØ¬Ø¨ Ø£Ù† ÙŠÙƒÙˆÙ† 10 Ø£Ø­Ø±Ù', 5000);
                return;
            }

            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="loader"></span> Ø¬Ø§Ø±ÙŠ Ø§Ù„Ø¥Ø±Ø³Ø§Ù„...';
            submitBtn.disabled = true;

            try {
                const testimonials = JSON.parse(localStorage.getItem('testimonials') || '[]');
                const newTestimonial = {
                    name: name,
                    location: location || 'Ø§Ù„Ù…ØºØ±Ø¨',
                    rating: rating,
                    comment: comment,
                    date: new Date().toISOString()
                };

                testimonials.unshift(newTestimonial);
                localStorage.setItem('testimonials', JSON.stringify(testimonials.slice(0, 50)));

                // Send to Formspree
                const formData = new FormData();
                formData.append('name', name);
                formData.append('location', location || 'Ø§Ù„Ù…ØºØ±Ø¨');
                formData.append('rating', rating.toString());
                formData.append('comment', comment);

                await fetch('https://formspree.io/f/mvzblzep', {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                displayTestimonial(newTestimonial);
                showTestimonialFeedback('success', 'Ø´ÙƒØ±Ø§Ù‹ Ù„Ùƒ! âœ“', 'ØªÙ… Ø¥Ø±Ø³Ø§Ù„ ØªÙ‚ÙŠÙŠÙ…Ùƒ Ø¨Ù†Ø¬Ø§Ø­', 6000);

                this.reset();
                selectedRating = 0;
                ratingInput.value = 0;
                document.querySelectorAll('.star-btn').forEach(btn => {
                    btn.innerHTML = '<i class="far fa-star"></i>';
                    btn.classList.remove('text-accent');
                    btn.classList.add('text-primary/30');
                });

            } catch (error) {
                showTestimonialFeedback('error', 'Ø®Ø·Ø£!', 'Ø­Ø¯Ø« Ø®Ø·Ø£', 5000);
            } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // Footer Status Update
    function updateStoreStatus() {
        const now = new Date();
        const day = now.getDay();
        const hour = now.getHours();

        const dayNameElement = document.getElementById('current-day-name');
        const statusElement = document.getElementById('status-badge');

        const daysArabic = ["Ø§Ù„Ø£Ø­Ø¯", "Ø§Ù„Ø¥Ø«Ù†ÙŠÙ†", "Ø§Ù„Ø«Ù„Ø§Ø«Ø§Ø¡", "Ø§Ù„Ø£Ø±Ø¨Ø¹Ø§Ø¡", "Ø§Ù„Ø®Ù…ÙŠØ³", "Ø§Ù„Ø¬Ù…Ø¹Ø©", "Ø§Ù„Ø³Ø¨Øª"];

        if (dayNameElement) dayNameElement.innerText = daysArabic[day];

        let isOpen = false;
        if (day >= 1 && day <= 4 && hour >= 8 && hour < 19) isOpen = true;

        if (statusElement) {
            statusElement.innerText = isOpen ? "Ù…ÙØªÙˆØ­ Ø§Ù„Ø¢Ù†" : "Ù…ØºÙ„Ù‚ Ø­Ø§Ù„ÙŠØ§Ù‹";
            statusElement.className = isOpen ? "px-2 py-1 rounded text-sm font-medium bg-green-500/20 text-green-400" : "px-2 py-1 rounded text-sm font-medium bg-red-500/20 text-red-400";
        }

        const yearElement = document.getElementById('year');
        if (yearElement) yearElement.textContent = new Date().getFullYear();
    }

    updateStoreStatus();
    setInterval(updateStoreStatus, 60000);

    // NEWSLETTER FORM
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const submitBtn = this.querySelector('button');
            const email = emailInput.value.trim();

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                emailInput.style.borderColor = '#ef4444';
                setTimeout(() => emailInput.style.borderColor = '', 3000);
                return;
            }

            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;

            try {
                const formData = new FormData();
                formData.append('email', email);
                await fetch('https://formspree.io/f/mvzblzep', {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });
                submitBtn.innerHTML = '<i class="fas fa-check"></i>';
                submitBtn.style.backgroundColor = '#10b981';
                emailInput.value = '';
            } catch (error) {
                submitBtn.innerHTML = '<i class="fas fa-times"></i>';
                submitBtn.style.backgroundColor = '#ef4444';
            }

            setTimeout(() => {
                submitBtn.innerHTML = submitBtn.querySelector('i')?.classList.contains('fa-spinner') ? '<i class="fas fa-envelope"></i>' : submitBtn.innerHTML;
                submitBtn.style.backgroundColor = '';
                submitBtn.disabled = false;
            }, 3000);
        });
    }
});

// ================================================
// HERO SECTION ENHANCEMENTS
// ================================================

function createWoodParticles() {
    const particlesContainer = document.getElementById('woodParticles');
    if (!particlesContainer) return;

    const particleCount = 15;
    const particleShapes = [
        '<svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 2L2 22h20L12 2zm0 3l6.5 14h-13L12 5z"/></svg>',
        '<svg viewBox="0 0 24 24" width="18" height="18"><path d="M21 16.5c0 .38-.21.71-.53.88l-7.9 4.44c-.16.12-.36.18-.57.18-.21 0-.41-.06-.57-.18l-7.9-4.44A.991.991 0 013 16.5v-9c0-.38.21-.71.53-.88l7.9-4.44c.16-.12.36-.18.57-.18.21 0 .41.06.57.18l7.9 4.44c.32.17.53.5.53.88v9z"/></svg>',
        '<svg viewBox="0 0 24 24" width="22" height="22"><path d="M18.5 2h-1.5l-1.5 1.5L18.5 5 20 3.5 18.5 2zm-2 2l-1.5 1.5L17 7.5l1.5-1.5L16.5 4zM14 4.5l1.5 1.5L14 7.5l-1.5-1.5L14 4.5zM3 20h18v2H3v-2z"/></svg>',
        '<svg viewBox="0 0 24 24" width="24" height="24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/></svg>'
    ];

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'wood-particle';
        particle.innerHTML = particleShapes[Math.floor(Math.random() * particleShapes.length)];

        const left = Math.random() * 100;
        const delay = Math.random() * 15;
        const duration = 15 + Math.random() * 10;
        const size = 15 + Math.random() * 20;

        particle.style.left = `${left}%`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        particlesContainer.appendChild(particle);
    }
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');

    const observerOptions = { threshold: 0.5, rootMargin: '0px' };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const suffix = counter.getAttribute('data-suffix') || '';
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;

                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current) + suffix;
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target + suffix;
                    }
                };

                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

function initTiltEffect() {
    const heroContent = document.getElementById('heroContent');
    if (!heroContent) return;

    document.addEventListener('mousemove', (e) => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const moveX = (e.clientX - centerX) / 50;
        const moveY = (e.clientY - centerY) / 50;
        heroContent.style.transform = `perspective(1000px) rotateX(${moveY * -0.5}deg) rotateY(${moveX * 0.5}deg)`;
    });

    document.addEventListener('mouseleave', () => {
        heroContent.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
}

// Initialize Hero Enhancements
createWoodParticles();
animateCounters();
// initTiltEffect(); // Disabled - Mouse movement effect deactivated

