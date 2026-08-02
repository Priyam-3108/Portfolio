/* ========================================
   DATA & CONFIGURATION
   ======================================== */

// About section content data
const discription = {
    "about-me": [
        "IT Engineer",
        "Developer and Problem Solver",
        "I like to play outdoor games",
        "I am a 4th year IT engineering student from SSGEC Bhavnagar. I like to solve competitive problems. I am a quick learner."
    ],
    "hobby": [
        "Playing Cricket, Volleyball, Kabaddi",
        "Listening to Music",
        "Traveling, Trekking and Exploring New Things",
        "Taking amazing Photographs"
    ],
    "education": [
        "SSC completed from Jamjodhpur",
        "HSC completed from Jamjodhpur",
        "Cyber Security course by Cisco",
        "IT Engineering from SSGEC Bhavnagar"
    ],
    "achivements": [
        "Python Programming Course by Google",
        "Java Course by IIT-Bombay",
        "Ethical Hacking by Simplilearn",
        "Participated in National Game 2022 as a Volunteer"
    ],
};

/* ========================================
   ABOUT SECTION - TAB SWITCHING
   ======================================== */

/**
 * Updates the about section content based on selected tab
 * @param {string} id - The ID of the clicked tab button
 */
function updateAbout(id) {
    // Update content
    const details = discription[id];
    if (!details) return;

    details.forEach((detail, index) => {
        const element = document.getElementById(`detail${index + 1}`);
        if (element) {
            element.textContent = detail;
        }
    });

    // Update ARIA attributes for accessibility
    const allTabs = document.querySelectorAll('.about-list-items');
    allTabs.forEach(tab => {
        tab.setAttribute('aria-selected', 'false');
    });

    const activeTab = document.getElementById(id);
    if (activeTab) {
        activeTab.setAttribute('aria-selected', 'true');
    }
}

/* ========================================
   NAVIGATION - MOBILE MENU
   ======================================== */

let menuOpen = false;

/**
 * Toggles the mobile navigation menu
 */
function toggleMenu() {
    const navitems = document.getElementById("navitems");
    const menuButton = document.querySelector(".nev-menu");

    menuOpen = !menuOpen;

    if (menuOpen) {
        navitems.classList.add("active");
        menuButton.setAttribute("aria-expanded", "true");
        // Prevent body scroll when menu is open
        document.body.style.overflow = "hidden";
    } else {
        navitems.classList.remove("active");
        menuButton.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
    }
}

/**
 * Closes the mobile navigation menu
 */
function closeMenu() {
    const navitems = document.getElementById("navitems");
    const menuButton = document.querySelector(".nev-menu");

    if (window.innerWidth <= 768 && menuOpen) {
        navitems.classList.remove("active");
        menuButton.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
        menuOpen = false;
    }
}

/**
 * Close menu when clicking outside
 */
document.addEventListener('click', function (event) {
    const navitems = document.getElementById("navitems");
    const menuButton = document.querySelector(".nev-menu");

    if (menuOpen &&
        !navitems.contains(event.target) &&
        !menuButton.contains(event.target)) {
        closeMenu();
    }
});

/**
 * Handle window resize - close menu if switching to desktop
 */
window.addEventListener('resize', function () {
    if (window.innerWidth > 768 && menuOpen) {
        closeMenu();
    }
});

/* ========================================
   SCROLL ANIMATIONS - INTERSECTION OBSERVER
   ======================================== */

/**
 * Observes elements and adds reveal animation when they enter viewport
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                // Optional: unobserve after revealing to improve performance
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Observe skill boxes
    const skillBoxes = document.querySelectorAll('.skill-box, .other-skills-list, .ongoing-skills-list');
    skillBoxes.forEach((box, index) => {
        box.style.opacity = '0';
        box.style.transform = 'translateY(20px)';
        box.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        observer.observe(box);
    });

    // Observe project cards
    const projects = document.querySelectorAll('.project1');
    projects.forEach((project, index) => {
        project.style.opacity = '0';
        project.style.transform = 'translateY(30px)';
        project.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
        observer.observe(project);
    });
}

// Add reveal class styles
const style = document.createElement('style');
style.textContent = `
    .reveal {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

/* ========================================
   ACTIVE NAVIGATION HIGHLIGHT
   ======================================== */

/**
 * Highlights the active navigation item based on scroll position
 */
function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navitems a');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Debounce function for scroll events
function debounce(func, wait = 10) {
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

// Add scroll event listener with debouncing
window.addEventListener('scroll', debounce(updateActiveNavigation));

/* ========================================
   SMOOTH SCROLL BEHAVIOR
   ======================================== */

/**
 * Adds smooth scrolling to anchor links
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Skip if it's just "#"
            if (href === '#') return;

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();

                // Close mobile menu if open
                closeMenu();

                // Smooth scroll to target
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Update URL without jumping
                history.pushState(null, null, href);
            }
        });
    });
}

/* ========================================
   SCROLL TO TOP BUTTON
   ======================================== */

/**
 * Creates and manages scroll-to-top button
 */
function initScrollToTop() {
    // Create button
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: var(--color-primary);
        color: white;
        border: none;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    `;

    document.body.appendChild(scrollBtn);

    // Show/hide button based on scroll position
    window.addEventListener('scroll', debounce(() => {
        if (window.pageYOffset > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    }));

    // Scroll to top on click
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Hover effect
    scrollBtn.addEventListener('mouseenter', () => {
        scrollBtn.style.transform = 'translateY(-5px)';
        scrollBtn.style.backgroundColor = 'var(--color-secondary)';
    });

    scrollBtn.addEventListener('mouseleave', () => {
        scrollBtn.style.transform = 'translateY(0)';
        scrollBtn.style.backgroundColor = 'var(--color-primary)';
    });
}

/* ========================================
   NAVBAR BACKGROUND ON SCROLL
   ======================================== */

/**
 * Adds background to navbar when scrolling
 */
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', debounce(() => {
        if (window.pageYOffset > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }));
}

/* ========================================
   LAZY LOADING IMAGES
   ======================================== */

/**
 * Implements lazy loading for images
 */
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');

    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        images.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

/* ========================================
   FORM VALIDATION ENHANCEMENT
   ======================================== */

/**
 * Adds real-time form validation
 */
function initFormValidation() {
    const form = document.getElementById('form');
    const inputs = form.querySelectorAll('input, textarea');

    inputs.forEach(input => {
        input.addEventListener('blur', function () {
            validateField(this);
        });

        input.addEventListener('input', function () {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
}

/**
 * Validates a single form field
 * @param {HTMLElement} field - The form field to validate
 */
function validateField(field) {
    const value = field.value.trim();

    if (field.hasAttribute('required') && !value) {
        showError(field, 'This field is required');
        return false;
    }

    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showError(field, 'Please enter a valid email address');
            return false;
        }
    }

    clearError(field);
    return true;
}

/**
 * Shows error message for a field
 */
function showError(field, message) {
    field.classList.add('error');
    field.style.borderColor = 'var(--color-secondary)';

    let errorMsg = field.nextElementSibling;
    if (!errorMsg || !errorMsg.classList.contains('error-message')) {
        errorMsg = document.createElement('span');
        errorMsg.className = 'error-message';
        errorMsg.style.cssText = 'color: var(--color-secondary); font-size: 0.85rem; margin-top: 0.25rem; display: block;';
        field.parentNode.insertBefore(errorMsg, field.nextSibling);
    }
    errorMsg.textContent = message;
}

/**
 * Clears error message for a field
 */
function clearError(field) {
    field.classList.remove('error');
    field.style.borderColor = '';

    const errorMsg = field.nextElementSibling;
    if (errorMsg && errorMsg.classList.contains('error-message')) {
        errorMsg.remove();
    }
}

/* ========================================
   KEYBOARD NAVIGATION
   ======================================== */

/**
 * Enhances keyboard navigation for accessibility
 */
function initKeyboardNavigation() {
    // Escape key closes mobile menu
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menuOpen) {
            closeMenu();
        }
    });

    // Tab navigation for about section
    const aboutTabs = document.querySelectorAll('.about-list-items');
    aboutTabs.forEach((tab, index) => {
        tab.addEventListener('keydown', (e) => {
            let newIndex;

            if (e.key === 'ArrowRight') {
                e.preventDefault();
                newIndex = (index + 1) % aboutTabs.length;
                aboutTabs[newIndex].focus();
                aboutTabs[newIndex].click();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                newIndex = (index - 1 + aboutTabs.length) % aboutTabs.length;
                aboutTabs[newIndex].focus();
                aboutTabs[newIndex].click();
            }
        });
    });
}

/**
 * Loads configuration details from CONFIG object into the DOM
 */
function loadConfigDetails() {
    if (typeof CONFIG === 'undefined') return;

    // Update Contact Details
    const contactEmail = document.getElementById('contact-email');
    const contactPhone = document.getElementById('contact-phone');
    const contactLocation = document.getElementById('contact-location');

    if (contactEmail && CONFIG.CONTACT.EMAIL) {
        contactEmail.href = `mailto:${CONFIG.CONTACT.EMAIL}`;
        contactEmail.textContent = CONFIG.CONTACT.EMAIL;
    }
    if (contactPhone && CONFIG.CONTACT.PHONE) {
        contactPhone.href = `tel:${CONFIG.CONTACT.PHONE.replace(/\s/g, '')}`;
        contactPhone.textContent = CONFIG.CONTACT.PHONE;
    }
    if (contactLocation && CONFIG.CONTACT.LOCATION) {
        contactLocation.textContent = CONFIG.CONTACT.LOCATION;
    }

    // Update Footer Details
    const footerEmail = document.getElementById('footer-email');
    const footerPhone = document.getElementById('footer-phone');
    const footerLocation = document.getElementById('footer-location');

    if (footerEmail && CONFIG.CONTACT.EMAIL) {
        footerEmail.innerHTML = `<i class="fas fa-envelope"></i> ${CONFIG.CONTACT.EMAIL}`;
    }
    if (footerPhone && CONFIG.CONTACT.PHONE) {
        footerPhone.innerHTML = `<i class="fas fa-phone"></i> ${CONFIG.CONTACT.PHONE}`;
    }
    if (footerLocation && CONFIG.CONTACT.LOCATION) {
        footerLocation.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${CONFIG.CONTACT.LOCATION}`;
    }

    // Update Social Links
    const socialLinkedin = document.getElementById('social-linkedin');
    const socialGithub = document.getElementById('social-github');
    const socialTwitter = document.getElementById('social-twitter');
    const socialInstagram = document.getElementById('social-instagram');

    if (socialLinkedin && CONFIG.SOCIAL.LINKEDIN) socialLinkedin.href = CONFIG.SOCIAL.LINKEDIN;
    if (socialGithub && CONFIG.SOCIAL.GITHUB) socialGithub.href = CONFIG.SOCIAL.GITHUB;
    if (socialTwitter && CONFIG.SOCIAL.TWITTER) socialTwitter.href = CONFIG.SOCIAL.TWITTER;
    if (socialInstagram && CONFIG.SOCIAL.INSTAGRAM) socialInstagram.href = CONFIG.SOCIAL.INSTAGRAM;
}

/* ========================================
   INITIALIZATION
   ======================================== */

/**
 * Initialize all features when DOM is ready
 */
document.addEventListener('DOMContentLoaded', function () {
    // Initialize all features
    initScrollAnimations();
    initSmoothScroll();
    initScrollToTop();
    initNavbarScroll();
    initLazyLoading();
    initFormValidation();
    initKeyboardNavigation();

    // Load configuration details
    loadConfigDetails();

    // Set initial active nav item
    updateActiveNavigation();

    console.log('Portfolio initialized successfully! 🚀');
});

/* ========================================
   PERFORMANCE MONITORING (Optional)
   ======================================== */

// Log page load performance
window.addEventListener('load', () => {
    if ('performance' in window) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page loaded in ${pageLoadTime}ms`);
    }
});
