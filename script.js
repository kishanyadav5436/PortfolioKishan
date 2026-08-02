// ============================
// TYPING EFFECT
// ============================
const typingText = document.querySelector(".typing");
const words = ["an AI/ML Engineer", "a Data Scientist", "a Full-Stack Developer", "a Hackathon Winner", "a Problem Solver"];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    if (!typingText) return;
    
    const currentWord = words[wordIndex];
    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(type, 2500);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 400);
    } else {
        setTimeout(type, isDeleting ? 40 : 80);
    }
}

// ============================
// INTERSECTION OBSERVER REVEAL
// ============================
function initRevealObserver() {
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Don't unobserve — allows re-triggering if needed
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });
}

// ============================
// ACTIVE NAV LINK ON SCROLL
// ============================
function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!sections.length || !navLinks.length) return;

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
}

// ============================
// NAVBAR SCROLL EFFECT
// ============================
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    let lastScroll = 0;
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                lastScroll = window.scrollY;
                ticking = false;
            });
            ticking = true;
        }
    });
}

// ============================
// MOBILE NAVIGATION
// ============================
function initMobileNav() {
    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav-links');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!burger || !nav) return;

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
        document.body.style.overflow = nav.classList.contains('nav-active') ? 'hidden' : '';
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                document.body.style.overflow = '';
            }
        });
    });
}

// ============================
// CONTACT FORM VALIDATION
// ============================
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        let valid = true;

        // Simple validation
        [name, email, message].forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = 'rgba(255, 80, 80, 0.6)';
                valid = false;
            } else {
                field.style.borderColor = '';
            }
        });

        if (email.value && !isValidEmail(email.value)) {
            email.style.borderColor = 'rgba(255, 80, 80, 0.6)';
            valid = false;
        }

        if (valid) {
            // Show success feedback
            const btn = form.querySelector('button[type="submit"]');
            const originalHTML = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.style.background = '';
                btn.disabled = false;
                form.reset();
            }, 3000);

            // Build mailto link as fallback (since formspree placeholder)
            const subject = document.getElementById('subject')?.value || 'Portfolio Contact';
            const mailtoLink = `mailto:kishankumar13580@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name.value} (${email.value})\n\n${message.value}`)}`;
            window.open(mailtoLink, '_blank');
        }
    });
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ============================
// NEURAL NETWORK BRAIN CANVAS
// ============================
// ============================
// DYNAMIC SCROLL-DRIVEN HUMAN BRAIN CANVAS
// ============================
function initBirdCanvas() {
    const canvas = document.getElementById('bird-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const isMobile = window.innerWidth <= 768;

    let width, height;
    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    window.addEventListener('resize', resize);
    resize();

    // 1. Define Anatomical Human Brain Skeleton contour points (normalized 0 to 1)
    const brainContour = [
        // Frontal Lobe & Top Cortex
        {x: 0.28, y: 0.48}, {x: 0.32, y: 0.35}, {x: 0.38, y: 0.25}, {x: 0.46, y: 0.20},
        {x: 0.55, y: 0.18}, {x: 0.65, y: 0.22}, {x: 0.74, y: 0.30}, {x: 0.80, y: 0.42},
        // Occipital & Temporal Lobe Curves
        {x: 0.82, y: 0.55}, {x: 0.78, y: 0.68}, {x: 0.70, y: 0.76}, {x: 0.60, y: 0.72},
        {x: 0.52, y: 0.65}, {x: 0.44, y: 0.70}, {x: 0.36, y: 0.68}, {x: 0.28, y: 0.60},
        // Cerebellum & Brain Stem details
        {x: 0.68, y: 0.78}, {x: 0.64, y: 0.88}, {x: 0.58, y: 0.88}, {x: 0.56, y: 0.76},
        // Inner Cortex Sulci / Neural folds
        {x: 0.42, y: 0.32}, {x: 0.50, y: 0.30}, {x: 0.60, y: 0.32}, {x: 0.68, y: 0.40},
        {x: 0.36, y: 0.44}, {x: 0.48, y: 0.42}, {x: 0.58, y: 0.45}, {x: 0.72, y: 0.48},
        {x: 0.40, y: 0.56}, {x: 0.52, y: 0.55}, {x: 0.64, y: 0.58}, {x: 0.48, y: 0.62}
    ];

    // Generate smooth dense brain node positions around segments
    const nodeCount = isMobile ? 120 : 260;
    const palette = [
        [0, 242, 254],    // Cyan
        [79, 172, 254],   // Bright Blue
        [161, 140, 209],  // Purple
        [245, 158, 11],   // Amber Gold
        [16, 185, 129]    // Emerald
    ];

    const particles = [];
    for (let i = 0; i < nodeCount; i++) {
        // Target brain position (normalized 0 to 1)
        const targetPoint = brainContour[i % brainContour.length];
        const jitterX = (Math.random() - 0.5) * 0.08;
        const jitterY = (Math.random() - 0.5) * 0.08;

        particles.push({
            // Target coordinates (Brain shape)
            bx: targetPoint.x + jitterX,
            by: targetPoint.y + jitterY,
            // Initial scattered coordinates (Random screen positions)
            sx: Math.random(),
            sy: Math.random(),
            // Current render position
            x: Math.random() * (window.innerWidth || 1000),
            y: Math.random() * (window.innerHeight || 800),
            seed: Math.random() * Math.PI * 2,
            size: Math.random() * 1.8 + 1.8,
            color: palette[Math.floor(Math.random() * palette.length)]
        });
    }

    const rainDrops = Array.from({ length: isMobile ? 150 : 260 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        length: Math.random() * 22 + 14,
        speed: Math.random() * 7 + 6,
        sway: Math.random() * 1.8 + 0.9,
        opacity: Math.random() * 0.35 + 0.16
    }));

    // Scroll state & smoothing ratio
    let targetRatio = 0;  // 0 = scattered ambient particles, 1 = fully assembled human brain
    let currentRatio = 0; // Lerped value for smooth 60fps assembly & dissolution
    let lastScrollY = window.scrollY;
    let targetRainIntensity = 0.08;
    let currentRainIntensity = 0.08;

    function onScroll() {
        const currentScroll = window.scrollY;
        const delta = currentScroll - lastScrollY;
        lastScrollY = currentScroll;

        // As user scrolls down from hero (0px) into Projects & Case Studies (~1400px):
        // 0px => targetRatio = 0.0 (particles scattered across screen)
        // 700px => targetRatio = 0.5 (particles converging towards brain contour)
        // 1400px+ => targetRatio = 1.0 (fully formed human brain with glowing neural synapses)
        // Scrolling BACK UP smoothly reverses targetRatio back to 0.0, disassembling the brain!
        const assembleDist = Math.min(window.innerHeight * 1.5, 1400);
        const rawRatio = currentScroll / assembleDist;
        targetRatio = Math.min(1.0, Math.max(0.0, rawRatio));

        const directionBoost = delta > 0 ? 0.7 : delta < 0 ? 0.25 : 0;
        const scrollProgress = Math.min(1, currentScroll / (window.innerHeight * 1.5));
        targetRainIntensity = Math.min(1, 0.2 + scrollProgress * 0.7 + directionBoost);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const maxConnectDist = isMobile ? 80 : 120;

    function draw() {
        ctx.clearRect(0, 0, width, height);

        // Smoothly interpolate current ratio towards target ratio (lerp)
        currentRatio += (targetRatio - currentRatio) * 0.06;
        currentRainIntensity += (targetRainIntensity - currentRainIntensity) * 0.06;

        const time = Date.now() * 0.0015;

        // Calculate responsive brain scale & centering offsets
        const brainScaleX = Math.min(width * 0.75, 700);
        const brainScaleY = Math.min(height * 0.7, 600);
        const offsetX = (width - brainScaleX) / 2;
        const breatheY = Math.sin(time * 0.8) * 12;
        const offsetY = ((height - brainScaleY) / 2) + breatheY;

        // Update particle positions based on current assembly ratio
        particles.forEach(p => {
            p.seed += 0.01;
            // Float offsets when scattered vs assembled
            const floatAmpX = (1 - currentRatio * 0.6) * 15;
            const floatAmpY = (1 - currentRatio * 0.6) * 15;
            const floatX = Math.sin(time + p.seed) * floatAmpX;
            const floatY = Math.cos(time + p.seed * 0.7) * floatAmpY;

            // Scattered coordinates across screen
            const scatterX = p.sx * width + floatX;
            const scatterY = p.sy * height + floatY;

            // Brain coordinates centered in viewport
            const brainX = offsetX + p.bx * brainScaleX + floatX * 0.3;
            const brainY = offsetY + p.by * brainScaleY + floatY * 0.3;

            // Interpolate between scattered position and brain target
            const targetPixelX = (1 - currentRatio) * scatterX + currentRatio * brainX;
            const targetPixelY = (1 - currentRatio) * scatterY + currentRatio * brainY;

            // Soft position updating
            p.x += (targetPixelX - p.x) * 0.12;
            p.y += (targetPixelY - p.y) * 0.12;
        });

        // 2. Draw rain streaks, intensified by scroll motion
        ctx.save();
        ctx.lineCap = 'round';
        ctx.strokeStyle = `rgba(173, 216, 255, ${0.2 + currentRainIntensity * 0.4})`;
        ctx.lineWidth = 1.1 + currentRainIntensity * 0.5;
        rainDrops.forEach(drop => {
            drop.y += drop.speed * (0.95 + currentRainIntensity * 1.3);
            drop.x += Math.sin(time * 0.95 + drop.y * 0.01) * drop.sway * (0.28 + currentRainIntensity * 0.7);

            if (drop.y > height + 20) {
                drop.y = -20;
                drop.x = Math.random() * width;
            }
            if (drop.x < -20) drop.x = width + 20;
            if (drop.x > width + 20) drop.x = -20;

            ctx.beginPath();
            ctx.moveTo(drop.x, drop.y);
            ctx.lineTo(drop.x - drop.sway * 1.2, drop.y + drop.length);
            ctx.stroke();
        });
        ctx.restore();

        // 3. Draw Synaptic Neural Connections
        const connectThreshold = maxConnectDist * (0.35 + 0.65 * currentRatio);
        ctx.lineWidth = 0.8;

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const p1 = particles[i];
                const p2 = particles[j];
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < connectThreshold) {
                    const alpha = (1 - dist / connectThreshold) * (0.2 + 0.4 * currentRatio);
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(${p1.color[0]}, ${p1.color[1]}, ${p1.color[2]}, ${alpha})`;
                    ctx.stroke();
                }
            }
        }

        // 4. Draw Brain Particles & Glow Pulses
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            const particleAlpha = 0.6 + 0.4 * currentRatio;
            ctx.fillStyle = `rgba(${p.color[0]}, ${p.color[1]}, ${p.color[2]}, ${particleAlpha})`;
            ctx.fill();

            // Glow aura on brain nodes
            if (!isMobile) {
                const glowRadius = p.size * (2.2 + Math.sin(time * 2 + p.seed) * 1.2);
                ctx.beginPath();
                ctx.arc(p.x, p.y, Math.max(0.1, glowRadius), 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${p.color[0]}, ${p.color[1]}, ${p.color[2]}, ${0.15 * (0.4 + 0.6 * currentRatio)})`;
                ctx.fill();
            }
        });

        requestAnimationFrame(draw);
    }

    draw();
}

// ============================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offset = 80;
                const position = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({
                    top: position,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================
// PROJECT CATEGORY FILTERS
// ============================
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (!filterBtns.length || !projectCards.length) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category') || '';

                if (filter === 'all' || categories.includes(filter)) {
                    card.classList.remove('hidden');
                    void card.offsetWidth;
                    card.classList.add('fade-in');
                    setTimeout(() => card.classList.remove('fade-in'), 500);
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

// ============================
// INITIALIZE EVERYTHING
// ============================
document.addEventListener("DOMContentLoaded", () => {
    type();
    initRevealObserver();
    initActiveNav();
    initNavbarScroll();
    initMobileNav();
    initContactForm();
    initSmoothScroll();
    initBirdCanvas();
    initProjectFilters();
    if (typeof initLivePreview === 'function') initLivePreview();
});

// ============================
// LIVE PREVIEW ENGINE
// ============================
function initLivePreview() {
    const IFRAME_TIMEOUT_MS = 5000; // fall back to thumbnail after 5 s

    // Map of project icons used for gradient fallback
    const projectIcons = {
        'Neighbourhood Service Marketplace': 'fa-store',
        'Inclusivity AI Chatbot': 'fa-robot',
        'Banking System': 'fa-university',
        'Analytics Dashboard': 'fa-chart-bar',
        'E-Commerce Store': 'fa-shopping-cart',
        'Student Management System': 'fa-graduation-cap',
    };

    document.querySelectorAll('.project-card').forEach(card => {
        const wrapper   = card.querySelector('.project-preview-wrapper');
        if (!wrapper) return;

        const previewType = card.dataset.previewType || 'image';
        const liveUrl     = card.dataset.liveUrl     || '';
        const gradient    = card.dataset.gradient    || 'linear-gradient(135deg, #0a0a12, #161b22)';
        const title       = card.dataset.title       || '';

        const imageSrc    = card.dataset.imageSrc    || '';

        // Create and insert loader
        const loader = document.createElement('div');
        loader.className = 'preview-loader';
        loader.innerHTML = '<div class="preview-spinner"></div>';
        wrapper.insertBefore(loader, wrapper.firstChild);

        if (previewType === 'iframe' && liveUrl) {
            _buildIframe(wrapper, loader, liveUrl, gradient, title, projectIcons);
        } else if (previewType === 'thumbnail' && liveUrl) {
            _buildThumbnail(wrapper, loader, liveUrl, gradient, title, projectIcons);
        } else if (previewType === 'static' && imageSrc) {
            _buildStaticImage(wrapper, loader, imageSrc, gradient, title, projectIcons);
        } else {
            _buildGradientFallback(wrapper, loader, gradient, title, projectIcons);
        }
    });
}

/** Try an iframe; if it fails to load within timeout, swap to Thum.io thumbnail */
function _buildIframe(wrapper, loader, liveUrl, gradient, title, icons) {
    const iframe = document.createElement('iframe');
    iframe.className = 'preview-iframe';
    iframe.setAttribute('loading', 'lazy');
    iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms');
    iframe.setAttribute('title', title + ' preview');
    iframe.setAttribute('aria-label', title + ' live preview');
    wrapper.insertBefore(iframe, loader);

    let loaded = false;

    // Set a timeout — if the iframe hasn't signalled load, assume X-Frame-Options blocked it
    const timer = setTimeout(() => {
        if (!loaded) {
            // Silently swap to Thum.io thumbnail
            iframe.remove();
            _buildThumbnail(wrapper, loader, liveUrl, gradient, title, icons);
        }
    }, 5000);

    iframe.addEventListener('load', () => {
        // Page loaded — check if it's a blank/error page (best-effort, cross-origin safe)
        loaded = true;
        clearTimeout(timer);
        // Hide loader
        loader.classList.add('hidden');
        setTimeout(() => loader.remove(), 450);
    });

    iframe.addEventListener('error', () => {
        loaded = true;
        clearTimeout(timer);
        iframe.remove();
        _buildThumbnail(wrapper, loader, liveUrl, gradient, title, icons);
    });

    // Actually set src to trigger the load
    iframe.src = liveUrl;
}

/** Build a Thum.io screenshot thumbnail; fall back to gradient on image error */
function _buildThumbnail(wrapper, loader, liveUrl, gradient, title, icons) {
    const img = document.createElement('img');
    img.className = 'preview-thumb';
    img.setAttribute('loading', 'lazy');
    img.setAttribute('alt', title + ' screenshot');
    // Thum.io free-tier screenshot: 1280×720 cropped
    img.src = `https://image.thum.io/get/width/1280/crop/720/noanimate/${encodeURIComponent(liveUrl)}`;

    img.addEventListener('load', () => {
        loader.classList.add('hidden');
        setTimeout(() => loader.remove(), 450);
    });

    img.addEventListener('error', () => {
        // Thum.io failed — fall back to gradient
        img.remove();
        _buildGradientFallback(wrapper, loader, gradient, title, icons);
    });

    wrapper.insertBefore(img, loader);
}

/** Build a static image preview using a local file path */
function _buildStaticImage(wrapper, loader, imageSrc, gradient, title, icons) {
    const img = document.createElement('img');
    img.className = 'preview-thumb';
    img.setAttribute('loading', 'lazy');
    img.setAttribute('alt', title + ' screenshot');
    img.src = imageSrc;

    img.addEventListener('load', () => {
        loader.classList.add('hidden');
        setTimeout(() => loader.remove(), 450);
    });

    img.addEventListener('error', () => {
        // Local image failed — fall back to gradient
        img.remove();
        _buildGradientFallback(wrapper, loader, gradient, title, icons);
    });

    wrapper.insertBefore(img, loader);
}

/** Build a beautiful gradient fallback with the project's icon if no image/iframe can load */
function _buildGradientFallback(wrapper, loader, gradient, title, icons) {
    const fallback = document.createElement('div');
    fallback.className = 'preview-gradient-fallback';
    fallback.style.background = gradient;

    const iconClass = icons[title] || 'fa-code';
    fallback.innerHTML = `
        <i class="fas ${iconClass}"></i>
        <span>${title}</span>
    `;

    wrapper.insertBefore(fallback, loader);

    // No async loading needed — hide loader immediately
    loader.classList.add('hidden');
    setTimeout(() => loader.remove(), 450);
}

// ============================
// CERTIFICATIONS SHOW MORE
// ============================
function toggleWorkshops() {
    const extras = document.querySelectorAll('.cert-extra');
    const btn = document.getElementById('cert-toggle');
    const icon = document.getElementById('cert-toggle-icon');
    const isOpen = btn.classList.contains('open');

    extras.forEach(el => {
        if (isOpen) {
            el.style.display = 'none';
        } else {
            el.style.display = 'flex';
            void el.offsetWidth;
            el.style.animation = 'cardFadeIn 0.35s ease forwards';
        }
    });

    btn.classList.toggle('open');
    btn.innerHTML = isOpen
        ? '<i class="fas fa-chevron-down" id="cert-toggle-icon"></i> Show 2 more'
        : '<i class="fas fa-chevron-up" id="cert-toggle-icon"></i> Show less';
}
