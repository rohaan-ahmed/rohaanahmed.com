/**
 * Personal Website - JavaScript
 * Handles config loading, navigation, smooth scrolling, and animations
 */

document.addEventListener('DOMContentLoaded', () => {
    // Load config and initialize
    loadConfig();

    // DOM Elements
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const currentYearEl = document.getElementById('current-year');

    // Set current year in footer
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    /**
     * Mobile Navigation Toggle
     */
    function toggleMobileMenu() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    }

    if (navToggle) {
        navToggle.addEventListener('click', toggleMobileMenu);
    }

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });

    // Close mobile menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    });

    /**
     * Theme Toggle
     */
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleIcon = themeToggle?.querySelector('.theme-toggle-icon');
    const themeToggleText = themeToggle?.querySelector('.theme-toggle-text');

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'military') {
        document.body.classList.add('military-theme');
        updateThemeButton(true);
    }

    function updateThemeButton(isMilitary) {
        if (themeToggleIcon && themeToggleText) {
            if (isMilitary) {
                themeToggleIcon.textContent = '✨';
                themeToggleText.textContent = 'Cyber Mode';
            } else {
                themeToggleIcon.textContent = '⚔️';
                themeToggleText.textContent = 'Military Mode';
            }
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isMilitary = document.body.classList.toggle('military-theme');
            localStorage.setItem('theme', isMilitary ? 'military' : 'cyber');
            updateThemeButton(isMilitary);
        });
    }

    /**
     * Navbar Scroll Effect
     */
    let lastScrollY = window.scrollY;

    function handleNavbarScroll() {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScrollY = currentScrollY;
    }

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });

    /**
     * Smooth Scrolling for Navigation Links
     */
    function smoothScroll(targetId) {
        const target = document.querySelector(targetId);
        if (!target) return;

        const navHeight = navbar.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }

    // Add smooth scroll to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = anchor.getAttribute('href');
            if (targetId && targetId !== '#') {
                smoothScroll(targetId);
            }
        });
    });

    /**
     * Active Navigation Link Highlighting
     */
    const sections = document.querySelectorAll('section[id]');

    function highlightNavLink() {
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink, { passive: true });

    /**
     * Parallax Effect for Hero Background
     */
    const heroBackground = document.querySelector('.hero-background');

    function parallaxEffect() {
        if (heroBackground && window.innerWidth > 768) {
            const scrolled = window.scrollY;
            heroBackground.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    }

    window.addEventListener('scroll', parallaxEffect, { passive: true });

    /**
     * Console Easter Egg
     */
    console.log('%c Welcome to the Matrix... ', 'background: #0a0a0f; color: #00ffff; font-size: 20px; padding: 10px;');
    console.log('%c Built with passion for the future. ', 'background: #0a0a0f; color: #ff00ff; font-size: 14px; padding: 5px;');
});

/**
 * Load configuration from config.json and populate the page
 * Falls back to HTML default content if config fails to load
 */
async function loadConfig() {
    try {
        const response = await fetch('config.json');
        if (!response.ok) {
            throw new Error('Failed to load config.json');
        }
        const config = await response.json();
        populatePage(config);
    } catch (error) {
        // Config loading failed (likely file:// protocol)
        // Use default HTML content and just initialize animations
        console.info('Using default HTML content (config.json not loaded)');
        initAnimations();
    }
}

/**
 * Populate the page with data from config
 */
function populatePage(config) {
    // Personal info
    if (config.personal) {
        const { firstName, lastName, logoInitials, tagline } = config.personal;

        setTextContent('logo-text', logoInitials);
        setTextContent('first-name', firstName);
        setTextContent('last-name', lastName);
        setTextContent('footer-name', `${firstName} ${lastName}`);

        // Update page title
        document.title = `${firstName} ${lastName} | AI • Space • Defence`;

        // Update tagline (preserve the HTML structure with highlights)
        const taglineEl = document.getElementById('tagline');
        if (taglineEl && tagline) {
            taglineEl.innerHTML = formatTagline(tagline);
        }
    }

    // About section
    if (config.about) {
        // Bio
        const aboutText = document.getElementById('about-text');
        if (aboutText && config.about.bio) {
            aboutText.innerHTML = config.about.bio
                .map(paragraph => `<p>${paragraph}</p>`)
                .join('');
        }

        // Focus areas
        const focusGrid = document.getElementById('focus-grid');
        if (focusGrid && config.about.focusAreas) {
            focusGrid.innerHTML = config.about.focusAreas
                .map(area => `
                    <div class="focus-card">
                        <div class="focus-icon">${area.icon}</div>
                        <h4>${area.title}</h4>
                        <p>${area.description}</p>
                    </div>
                `)
                .join('');
        }
    }

    // Projects section
    const projectsGrid = document.getElementById('projects-grid');
    if (projectsGrid && config.projects) {
        projectsGrid.innerHTML = config.projects
            .map(project => `
                <article class="project-card">
                    <div class="project-content">
                        <div class="project-header">
                            <h3 class="project-title">${project.title}</h3>
                            <a href="${project.link}" class="project-link" aria-label="View project" target="_blank" rel="noopener noreferrer">→</a>
                        </div>
                        <p class="project-description">${project.description}</p>
                        ${project.image ? `
                            <div class="project-image">
                                <img src="${project.image}" alt="${project.title}">
                            </div>
                            ${project.imageCredit ? `<p class="project-image-credit">${project.imageCredit}</p>` : ''}
                        ` : ''}
                    </div>
                    <div class="project-tags">
                        ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </article>
            `)
            .join('');
    }

    // Footer
    if (config.footer) {
        setTextContent('footer-tagline', config.footer.tagline);
    }

    // Initialize animations after content is loaded
    initAnimations();
}

/**
 * Helper to set text content of an element by ID
 */
function setTextContent(id, text) {
    const element = document.getElementById(id);
    if (element && text) {
        element.textContent = text;
    }
}

/**
 * Format tagline with highlighted keywords
 */
function formatTagline(tagline) {
    // Add highlights to key terms and format separators
    return tagline
        .replace(/Artificial Intelligence/g, '<span class="highlight-cyan">Artificial Intelligence</span>')
        .replace(/Advanced Technologies/g, '<span class="highlight-purple">Advanced Technologies</span>')
        .replace(/Space/g, '<span class="highlight-magenta">Space</span>')
        .replace(/Defence/g, '<span class="highlight-cyan">Defence</span>')
        .replace(/\s\|\s/g, ' <span class="tagline-separator">|</span> ');
}

/**
 * Initialize scroll-triggered animations after dynamic content is loaded
 */
function initAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Add fade-in class to elements that should animate
    const animatedElements = document.querySelectorAll('.focus-card, .project-card');

    animatedElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
}

/**
 * Add CSS for active nav link
 */
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--accent-cyan);
        text-shadow: 0 0 10px var(--accent-cyan);
    }
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);
