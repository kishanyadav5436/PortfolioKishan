// ============================
// TYPING EFFECT
// ============================
const typingText = document.querySelector(".typing");
const words = ["Kishan Kumar", "a Full-Stack Developer", "an AI Enthusiast", "a Problem Solver"];
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
function initBirdCanvas() {
    const canvas = document.getElementById('bird-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Detect mobile for performance optimization
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

    // Brain skeleton (normalized 0 to 1)
    const segments = [
        // Outer cortex ridge
        {x1: 0.25, y1: 0.35}, {x1: 0.35, y1: 0.2}, {x1: 0.5, y1: 0.15}, {x1: 0.65, y1: 0.2}, {x1: 0.75, y1: 0.35},
        {x1: 0.8, y1: 0.5}, {x1: 0.75, y1: 0.7}, {x1: 0.6, y1: 0.75}, {x1: 0.5, y1: 0.65},
        {x1: 0.4, y1: 0.7}, {x1: 0.25, y1: 0.65}, {x1: 0.2, y1: 0.5},
        // Brain stem
        {x1: 0.6, y1: 0.75}, {x1: 0.55, y1: 0.9}, {x1: 0.65, y1: 0.9},
        // Inner network (Sulci)
        {x1: 0.35, y1: 0.2}, {x1: 0.45, y1: 0.4}, {x1: 0.5, y1: 0.15}, {x1: 0.5, y1: 0.4},
        {x1: 0.65, y1: 0.2}, {x1: 0.55, y1: 0.4}, {x1: 0.25, y1: 0.35}, {x1: 0.35, y1: 0.5},
        {x1: 0.75, y1: 0.35}, {x1: 0.65, y1: 0.5}, {x1: 0.45, y1: 0.4}, {x1: 0.55, y1: 0.4},
        {x1: 0.35, y1: 0.5}, {x1: 0.45, y1: 0.6}, {x1: 0.65, y1: 0.5}, {x1: 0.55, y1: 0.6},
        {x1: 0.45, y1: 0.6}, {x1: 0.55, y1: 0.6}, {x1: 0.5, y1: 0.4}, {x1: 0.5, y1: 0.65}
    ];

    // Convert to segments
    const brainSegments = [];
    for (let i = 0; i < 11; i++) {
        brainSegments.push({x1: segments[i].x1, y1: segments[i].y1, x2: segments[i+1].x1, y2: segments[i+1].y1});
    }
    brainSegments.push({x1: segments[11].x1, y1: segments[11].y1, x2: segments[0].x1, y2: segments[0].y1});
    brainSegments.push({x1: segments[12].x1, y1: segments[12].y1, x2: segments[13].x1, y2: segments[13].y1});
    brainSegments.push({x1: segments[12].x1, y1: segments[12].y1, x2: segments[14].x1, y2: segments[14].y1});
    for (let i = 15; i < segments.length; i += 2) {
        if (segments[i+1]) {
            brainSegments.push({x1: segments[i].x1, y1: segments[i].y1, x2: segments[i+1].x1, y2: segments[i+1].y1});
        }
    }

    // Generate nodes — reduced on mobile
    const pointsPerSegment = isMobile ? 18 : 35;
    const baseNodes = [];
    brainSegments.forEach(seg => {
        for (let i = 0; i < pointsPerSegment; i++) {
            const t = Math.random();
            baseNodes.push({
                x: seg.x1 + (seg.x2 - seg.x1) * t + (Math.random() - 0.5) * 0.04,
                y: seg.y1 + (seg.y2 - seg.y1) * t + (Math.random() - 0.5) * 0.04
            });
        }
    });

    baseNodes.sort((a, b) => a.y - b.y);

    // Color palette
    const palette = [
        [0, 242, 254],    // Cyan
        [79, 172, 254],   // Blue
        [161, 140, 209],  // Purple
        [251, 194, 235],  // Pink
        [245, 158, 11]    // Amber accent
    ];

    const nodes = baseNodes.map(n => ({
        bx: n.x, by: n.y,
        x: n.x, y: n.y,
        vx: (Math.random() - 0.5) * 0.0005,
        vy: (Math.random() - 0.5) * 0.0005,
        color: palette[Math.floor(Math.random() * palette.length)]
    }));

    let scrollProgress = 0;
    let lastScrollY = window.scrollY;
    let rainSpeedMultiplier = 1;

    // Rain drops — reduced on mobile
    const rainCount = isMobile ? 60 : 150;
    const rainDrops = [];
    for (let i = 0; i < rainCount; i++) {
        rainDrops.push({
            x: Math.random() * width,
            y: Math.random() * height,
            length: Math.random() * 20 + 10,
            speed: Math.random() * 5 + 3,
            opacity: Math.random() * 0.4 + 0.05
        });
    }

    function updateProgress() {
        const heroHeight = window.innerHeight * 0.5;
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY) {
            rainSpeedMultiplier = 1;
        } else if (currentScrollY < lastScrollY) {
            rainSpeedMultiplier = -1;
        }
        lastScrollY = currentScrollY;

        if (currentScrollY < heroHeight) {
            scrollProgress = 0;
        } else {
            scrollProgress = (currentScrollY - heroHeight) / (maxScroll - heroHeight);
        }
        scrollProgress = Math.max(0, Math.min(1, scrollProgress));
    }

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    // Connection distance — reduced on mobile
    const connectDist = isMobile ? 0.06 : 0.08;

    function draw() {
        ctx.clearRect(0, 0, width, height);

        // Draw Rain
        ctx.lineWidth = 1.5;
        rainDrops.forEach(drop => {
            ctx.beginPath();
            ctx.moveTo(drop.x, drop.y);
            ctx.lineTo(drop.x, drop.y - (drop.length * rainSpeedMultiplier));
            ctx.strokeStyle = `rgba(0, 242, 254, ${drop.opacity})`;
            ctx.stroke();
            
            drop.y += drop.speed * rainSpeedMultiplier;
            
            if (drop.y > height + drop.length) {
                drop.y = -drop.length;
                drop.x = Math.random() * width;
            } else if (drop.y < -drop.length) {
                drop.y = height + drop.length;
                drop.x = Math.random() * width;
            }
        });

        if (scrollProgress > 0) {
            nodes.forEach(n => {
                n.x += n.vx;
                n.y += n.vy;
                if (Math.abs(n.x - n.bx) > 0.01) n.vx *= -1;
                if (Math.abs(n.y - n.by) > 0.01) n.vy *= -1;
            });

            const activeNodeCount = Math.floor(nodes.length * scrollProgress);
            const activeNodes = nodes.slice(0, activeNodeCount);

            const scaleX = width * 0.9;
            const scaleY = height * 0.9;
            const offsetX = (width - scaleX) / 2;
            const breatheOffset = Math.sin(Date.now() / 1500) * 20;
            const offsetY = ((height - scaleY) / 2) + breatheOffset;

            ctx.lineWidth = 0.5;

            // Draw connections
            for (let i = 0; i < activeNodes.length; i++) {
                for (let j = i + 1; j < activeNodes.length; j++) {
                    const n1 = activeNodes[i];
                    const n2 = activeNodes[j];
                    const dx = n1.x - n2.x;
                    const dy = n1.y - n2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < connectDist) {
                        ctx.beginPath();
                        ctx.moveTo(offsetX + n1.x * scaleX, offsetY + n1.y * scaleY);
                        ctx.lineTo(offsetX + n2.x * scaleX, offsetY + n2.y * scaleY);
                        const alpha = 0.4 * (1 - dist / connectDist);
                        ctx.strokeStyle = `rgba(${n1.color[0]}, ${n1.color[1]}, ${n1.color[2]}, ${alpha})`;
                        ctx.stroke();
                    }
                }
            }

            // Draw nodes
            activeNodes.forEach(n => {
                const px = offsetX + n.x * scaleX;
                const py = offsetY + n.y * scaleY;

                ctx.beginPath();
                ctx.arc(px, py, 1.2, 0, Math.PI * 2);
                ctx.fillStyle = `rgb(${n.color[0]}, ${n.color[1]}, ${n.color[2]})`;
                ctx.fill();

                // Glow
                if (!isMobile) {
                    const pulseRadius = 4 + Math.sin((Date.now() / 200) + (n.x * 20)) * 2;
                    ctx.beginPath();
                    ctx.arc(px, py, Math.max(0, pulseRadius), 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(${n.color[0]}, ${n.color[1]}, ${n.color[2]}, 0.2)`;
                    ctx.fill();
                }
            });
        }

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

document.addEventListener("DOMContentLoaded", () => {
    type();
    initRevealObserver();
    initActiveNav();
    initNavbarScroll();
    initMobileNav();
    initContactForm();
    initSmoothScroll();
    initBirdCanvas();
    initProjectFilter();
    initLivePreview();
});

// ============================
// PROJECT FILTER TABS
// ============================
function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (!filterBtns.length || !projectCards.length) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category') || '';

                if (filter === 'all' || categories.includes(filter)) {
                    card.classList.remove('hidden');
                    // Trigger reflow for animation
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