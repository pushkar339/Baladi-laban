/* ============================================
   Feel Laban — Website JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // ---- Full-Screen Menu Overlay ----
    const menuLink = document.getElementById('menu-link');
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

    if (menuLink) {
        menuLink.addEventListener('click', (e) => {
            e.preventDefault();
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

    // ---- Products Carousel ----
    const carousel = document.getElementById('products-carousel');
    const carouselArrow = document.getElementById('carousel-arrow-right');

    if (carouselArrow && carousel) {
        carouselArrow.addEventListener('click', () => {
            const cardWidth = carousel.querySelector('.product-card')?.offsetWidth || 300;
            carousel.scrollBy({
                left: cardWidth + 16,
                behavior: 'smooth'
            });
            
            // Loop back to start if at end
            if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 50) {
                setTimeout(() => {
                    carousel.scrollTo({ left: 0, behavior: 'smooth' });
                }, 400);
            }
        });
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

    // ---- Intersection Observer for Animations ----
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                animateOnScroll.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add animation targets
    const animatables = document.querySelectorAll(
        '.section-heading, .visit-description, .about-description, .franchise-description, .outline-btn, .visit-image-arch, .about-image-arch, .franchise-image-arch, .instagram-header, .instagram-item'
    );

    animatables.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
        animateOnScroll.observe(el);
    });

    // CSS class for animation
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});
