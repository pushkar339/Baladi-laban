/* ============================================
   Feel Laban — Website JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // ---- Full-Screen Menu Overlay ----
    const menuLinkDesktop = document.getElementById('menu-link-desktop');
    const mobileToggle = document.getElementById('mobile-toggle');
    const menuOverlay = document.getElementById('menu-overlay');
    const menuOverlayClose = document.getElementById('menu-overlay-close');
    const menuNavLinks = document.querySelectorAll('[data-menu-close]');

    function openMenu() {
        if (menuOverlay) {
            menuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeMenu() {
        if (menuOverlay) {
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    if (menuLinkDesktop) {
        menuLinkDesktop.addEventListener('click', (e) => {
            e.preventDefault();
            openMenu();
        });
    }

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            openMenu();
        });
    }

    if (menuOverlayClose) {
        menuOverlayClose.addEventListener('click', closeMenu);
    }

    menuNavLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menuOverlay?.classList.contains('active')) {
            closeMenu();
        }
    });

    // ---- Product Tabs ----
    const productTabs = document.querySelectorAll('.product-tab');
    
    productTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            productTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });

    // ---- Products Carousel (Premium Implementation) ----
    const carousel = document.getElementById('products-carousel');
    const arrowRight = document.getElementById('carousel-arrow-right');
    const arrowLeft = document.getElementById('carousel-arrow-left');
    const progressBar = document.getElementById('products-progress-bar');

    if (carousel) {
        let isDown = false;
        let startX;
        let scrollLeft;

        // Update Progress Bar & Arrow States
        const updateCarouselState = () => {
            if (!carousel) return;
            
            // Progress Bar
            const maxScroll = carousel.scrollWidth - carousel.clientWidth;
            const progress = (carousel.scrollLeft / maxScroll) * 100;
            if (progressBar) progressBar.style.width = `${progress}%`;

            // Arrow States
            if (arrowLeft) {
                arrowLeft.disabled = carousel.scrollLeft <= 5;
                arrowLeft.style.opacity = arrowLeft.disabled ? '0.3' : '1';
                arrowLeft.style.pointerEvents = arrowLeft.disabled ? 'none' : 'auto';
            }
            if (arrowRight) {
                arrowRight.disabled = carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 5;
                arrowRight.style.opacity = arrowRight.disabled ? '0.3' : '1';
                arrowRight.style.pointerEvents = arrowRight.disabled ? 'none' : 'auto';
            }
        };

        // Scroll Events
        carousel.addEventListener('scroll', updateCarouselState);
        window.addEventListener('resize', updateCarouselState);
        
        // Initial state
        setTimeout(updateCarouselState, 100);

        // Click to Scroll
        const scrollAmount = 400;
        if (arrowRight) {
            arrowRight.addEventListener('click', () => {
                carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            });
        }
        if (arrowLeft) {
            arrowLeft.addEventListener('click', () => {
                carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            });
        }

        // Drag to Scroll
        carousel.addEventListener('mousedown', (e) => {
            isDown = true;
            carousel.classList.add('active');
            startX = e.pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
        });

        carousel.addEventListener('mouseleave', () => {
            isDown = false;
            carousel.classList.remove('active');
        });

        carousel.addEventListener('mouseup', () => {
            isDown = false;
            carousel.classList.remove('active');
        });

        carousel.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - carousel.offsetLeft;
            const walk = (x - startX) * 2; // Scroll speed multiplier
            carousel.scrollLeft = scrollLeft - walk;
        });

        // Touch support
        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
        }, { passive: true });

        // Dynamic Skew Effect on Scroll
        let lastPos = carousel.scrollLeft;
        let skewVelocity = 0;
        
        const skewEffect = () => {
            const newPos = carousel.scrollLeft;
            const diff = newPos - lastPos;
            skewVelocity = diff * 0.15; // Intensity
            lastPos = newPos;

            const cards = carousel.querySelectorAll('.product-card');
            cards.forEach(card => {
                // Apply skew and a slight scale based on velocity
                card.style.transform = `rotate(${-1 + skewVelocity * 0.1}deg) skewX(${skewVelocity * 0.5}deg)`;
            });

            requestAnimationFrame(skewEffect);
        };
        
        // Start the effect loop
        requestAnimationFrame(skewEffect);
    }

    // ---- Explore Location Arrows ----
    const explorePrev = document.getElementById('explore-prev');
    const exploreNext = document.getElementById('explore-next');
    const locations = [
        {
            city: 'New Delhi',
            email: 'feellaban@gmail.com',
            phone: '+91 77366 60688',
            hours: 'Open 2:00 PM - 1:00 AM',
            address: 'Shop no. 78, Municipal Market, Connaught Cir, Connaught Lane, Connaught Place, New Delhi, Delhi 110001'
        }
    ];
    let currentLocation = 0;

    function updateLocation() {
        const loc = locations[currentLocation];
        const cityEl = document.querySelector('.store-city');
        const emailEl = document.querySelector('.store-email');
        const phoneEl = document.querySelector('.store-phone');
        const hoursEl = document.querySelector('.store-hours');
        
        if (cityEl) cityEl.textContent = loc.city;
        if (emailEl) emailEl.textContent = loc.email;
        if (phoneEl) phoneEl.textContent = loc.phone;
        if (hoursEl) hoursEl.textContent = loc.hours;
    }

    if (explorePrev) {
        explorePrev.addEventListener('click', () => {
            currentLocation = (currentLocation - 1 + locations.length) % locations.length;
            updateLocation();
        });
    }

    if (exploreNext) {
        exploreNext.addEventListener('click', () => {
            currentLocation = (currentLocation + 1) % locations.length;
            updateLocation();
        });
    }

    // ---- Footer Form ----
    const footerForm = document.getElementById('footer-form');
    if (footerForm) {
        footerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('footer-email-input')?.value;
            if (email) {
                alert('Thank you for subscribing!');
                footerForm.reset();
            }
        });
    }

    // ---- Smooth Scroll for Anchor Links ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const navHeight = document.querySelector('.navbar')?.offsetHeight || 70;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ---- Navbar Scroll Effect ----
    let lastScrollY = 0;
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (navbar) {
            if (currentScrollY > 100) {
                navbar.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)';
            } else {
                navbar.style.boxShadow = 'none';
            }
        }
        
        lastScrollY = currentScrollY;
    });

    // ---- Intersection Observer for Premium Animations ----
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-actions, .hero-floating-image, .hero-image-blob, .product-card, .section-heading, .visit-content, .about-content, .franchise-content');
    
    revealElements.forEach((el, index) => {
        el.classList.add('reveal-init');
        revealObserver.observe(el);
    });

    // CSS for Premium Transitions
    const style = document.createElement('style');
    style.textContent = `
        .reveal-init {
            opacity: 0;
            transform: translateY(40px);
            transition: all 1.2s cubic-bezier(0.2, 1, 0.3, 1);
        }
        
        .reveal-init.is-revealed {
            opacity: 1;
            transform: translateY(0);
        }

        .hero-floating-image.reveal-init {
            transform: translateY(40px) scale(0.95);
            transition: all 1.4s cubic-bezier(0.2, 1, 0.3, 1);
        }

        .hero-floating-image.is-revealed {
            transform: translateY(0) scale(1);
        }

        .hero-image-blob.reveal-init {
            opacity: 0;
            transform: scale(0.8) rotate(-10deg);
            transition: all 1.6s cubic-bezier(0.2, 1, 0.3, 1);
        }

        .hero-image-blob.is-revealed {
            opacity: 1;
            transform: scale(1) rotate(-5deg);
        }

        .product-card {
            transition-delay: 0.1s;
        }

        .product-card:nth-child(2) { transition-delay: 0.2s; }
        .product-card:nth-child(3) { transition-delay: 0.3s; }
        .product-card:nth-child(4) { transition-delay: 0.4s; }

        .hero-title { transition-delay: 0.1s; }
        .hero-subtitle { transition-delay: 0.2s; }
        .hero-actions { transition-delay: 0.3s; }
    `;
    document.head.appendChild(style);
});
