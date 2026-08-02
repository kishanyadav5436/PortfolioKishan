// ============================
// TYPING EFFECT
// ============================
const typingText = document.querySelector(".typing");
const words = ["an AI/ML Engineer", "a Data Scientist", "a Full-Stack Developer", "a Hackathon Winner", "a Problem Solver"];
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    if (!typingText) return;

    if (prefersReducedMotion) {
        typingText.textContent = words[0];
        return;
    }
    
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
        setTimeout(type, 2200);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 350);
    } else {
        setTimeout(type, isDeleting ? 35 : 75);
    }
}

// ============================
// INTERSECTION OBSERVER REVEAL
// ============================
function initRevealObserver() {
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.08
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
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
        rootMargin: '-30% 0px -50% 0px',
        threshold: 0.15
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

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                navbar.classList.toggle('scrolled', window.scrollY > 40);
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

// ============================
// MOBILE NAVIGATION
// ============================
function initMobileNav() {
    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav-links');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!burger || !nav) return;

    let backdrop = document.querySelector('.nav-backdrop');
    if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.className = 'nav-backdrop';
        document.body.appendChild(backdrop);
    }

    function closeNav() {
        nav.classList.remove('nav-active');
        burger.classList.remove('toggle');
        backdrop.classList.remove('active');
        document.body.style.overflow = '';
    }

    function openNav() {
        nav.classList.add('nav-active');
        burger.classList.add('toggle');
        backdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    burger.addEventListener('click', () => {
        if (nav.classList.contains('nav-active')) {
            closeNav();
        } else {
            openNav();
        }
    });

    backdrop.addEventListener('click', closeNav);

    navLinks.forEach(link => {
        link.addEventListener('click', closeNav);
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
// CINEMATIC SCROLL-DRIVEN BRAIN + DIRECTIONAL RAIN
// ============================
function initBirdCanvas() {
    const canvas = document.getElementById('bird-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const isMobile = window.innerWidth <= 768;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ---- Canvas sizing ----
    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    window.addEventListener('resize', function () {
        W = window.innerWidth;
        H = window.innerHeight;
        canvas.width = W;
        canvas.height = H;
    });

    // ---- Mouse tracking ----
    let mx = -9999, my = -9999;
    if (!isMobile) {
        window.addEventListener('mousemove', function (e) { mx = e.clientX; my = e.clientY; }, { passive: true });
        window.addEventListener('mouseleave', function () { mx = my = -9999; }, { passive: true });
    }

    // ---- Color palette ----
    var colors = [
        [0, 242, 254],    // Electric cyan
        [79, 172, 254],   // Bright blue
        [138, 100, 255],  // Purple
        [161, 140, 209],  // Soft lavender
        [16, 185, 129],   // Emerald
        [220, 230, 255],  // White-blue highlight
    ];

    // ---- Detailed brain skeleton (side-view, normalized 0-1) ----
    // ~100 points covering outer cortex, sulci, internal structures,
    // cerebellum, and brain stem for a recognizable brain shape
    var brainPts = [
        // --- Outer cortex contour (frontal -> parietal -> occipital) ---
        {x:0.15,y:0.58},{x:0.12,y:0.52},{x:0.10,y:0.45},{x:0.10,y:0.38},
        {x:0.12,y:0.30},{x:0.16,y:0.24},{x:0.20,y:0.19},{x:0.26,y:0.15},
        {x:0.32,y:0.12},{x:0.38,y:0.10},{x:0.44,y:0.09},{x:0.50,y:0.08},
        {x:0.56,y:0.09},{x:0.62,y:0.12},{x:0.67,y:0.16},
        {x:0.72,y:0.22},{x:0.76,y:0.28},{x:0.79,y:0.35},{x:0.80,y:0.42},
        {x:0.79,y:0.49},{x:0.76,y:0.54},
        // --- Cerebellum ---
        {x:0.78,y:0.59},{x:0.80,y:0.64},{x:0.80,y:0.70},{x:0.77,y:0.75},
        {x:0.72,y:0.78},{x:0.66,y:0.79},{x:0.61,y:0.76},
        // --- Brain stem ---
        {x:0.58,y:0.80},{x:0.56,y:0.86},{x:0.54,y:0.91},{x:0.52,y:0.93},
        {x:0.50,y:0.91},{x:0.49,y:0.86},
        // --- Temporal lobe (bottom contour) ---
        {x:0.47,y:0.78},{x:0.44,y:0.73},{x:0.40,y:0.69},{x:0.35,y:0.66},
        {x:0.28,y:0.64},{x:0.22,y:0.62},{x:0.17,y:0.60},
        // --- Lateral sulcus (Sylvian fissure) ---
        {x:0.22,y:0.50},{x:0.28,y:0.46},{x:0.34,y:0.43},{x:0.40,y:0.41},
        {x:0.46,y:0.40},{x:0.52,y:0.39},
        // --- Central sulcus ---
        {x:0.43,y:0.12},{x:0.42,y:0.19},{x:0.40,y:0.26},{x:0.38,y:0.33},
        {x:0.36,y:0.39},
        // --- Superior frontal sulcus ---
        {x:0.20,y:0.23},{x:0.25,y:0.21},{x:0.30,y:0.18},{x:0.35,y:0.16},
        // --- Inferior frontal gyrus ---
        {x:0.16,y:0.36},{x:0.20,y:0.34},{x:0.24,y:0.31},{x:0.28,y:0.28},
        // --- Middle frontal ---
        {x:0.18,y:0.43},{x:0.23,y:0.39},{x:0.28,y:0.36},
        // --- Postcentral gyrus ---
        {x:0.48,y:0.14},{x:0.50,y:0.21},{x:0.52,y:0.27},
        // --- Parietal internal ---
        {x:0.55,y:0.17},{x:0.58,y:0.23},{x:0.62,y:0.29},{x:0.66,y:0.36},
        // --- Occipital internal ---
        {x:0.72,y:0.36},{x:0.74,y:0.43},{x:0.73,y:0.49},
        // --- Temporal gyri ---
        {x:0.25,y:0.56},{x:0.32,y:0.59},{x:0.38,y:0.61},{x:0.44,y:0.63},
        {x:0.50,y:0.65},
        // --- Corpus callosum (internal arc) ---
        {x:0.30,y:0.43},{x:0.36,y:0.38},{x:0.42,y:0.36},{x:0.48,y:0.35},
        {x:0.54,y:0.37},{x:0.60,y:0.41},{x:0.65,y:0.46},
        // --- Internal fill (frontal) ---
        {x:0.20,y:0.29},{x:0.26,y:0.26},{x:0.22,y:0.41},{x:0.30,y:0.33},
        {x:0.14,y:0.48},{x:0.18,y:0.32},{x:0.24,y:0.38},
        // --- Internal fill (central) ---
        {x:0.38,y:0.46},{x:0.42,y:0.51},{x:0.48,y:0.49},{x:0.52,y:0.46},
        {x:0.56,y:0.51},{x:0.60,y:0.56},{x:0.45,y:0.44},{x:0.50,y:0.42},
        // --- Internal fill (posterior) ---
        {x:0.64,y:0.43},{x:0.68,y:0.49},{x:0.70,y:0.56},{x:0.74,y:0.52},
        {x:0.69,y:0.38},{x:0.76,y:0.46},
        // --- Cerebellum folia ---
        {x:0.64,y:0.71},{x:0.68,y:0.73},{x:0.72,y:0.71},{x:0.74,y:0.68},
        {x:0.70,y:0.67},{x:0.66,y:0.69},{x:0.75,y:0.73},{x:0.69,y:0.76},
    ];

    // ---- Generate particles distributed across brain skeleton ----
    var TOTAL = isMobile ? 220 : 450;
    var particles = [];

    for (var i = 0; i < TOTAL; i++) {
        var bp = brainPts[i % brainPts.length];
        var jx = (Math.random() - 0.5) * 0.07;
        var jy = (Math.random() - 0.5) * 0.07;
        var bx = Math.max(0.04, Math.min(0.96, bp.x + jx));
        var by = Math.max(0.04, Math.min(0.96, bp.y + jy));

        // ~15% of particles are ambient (visible at top of page)
        var isAmbient = (i % 7 === 0);

        // Staggered reveal order based on brain height (top cortex -> bottom) + random scatter
        var revealAt = isAmbient ? 0 : (by * 0.7 + Math.random() * 0.3);

        particles.push({
            bx: bx, by: by,
            sx: Math.random(), sy: Math.random(),
            x: Math.random() * W, y: Math.random() * H,
            isAmbient: isAmbient,
            revealAt: revealAt,
            revealed: isAmbient ? 1 : 0,
            size: Math.random() * 2.2 + 1.2,
            color: colors[Math.floor(Math.random() * colors.length)],
            seed: Math.random() * Math.PI * 2,
            pulsePhase: Math.random() * Math.PI * 2
        });
    }

    // ---- Multi-layer rain system ----
    var layerDefs = [
        { count: isMobile ? 40 : 80,  minL:6,  maxL:14, minS:1.5, maxS:3.5, minO:0.05, maxO:0.12, w:0.4 },
        { count: isMobile ? 30 : 60,  minL:10, maxL:20, minS:3,   maxS:6,   minO:0.08, maxO:0.20, w:0.7 },
        { count: isMobile ? 15 : 35,  minL:16, maxL:28, minS:5,   maxS:9,   minO:0.12, maxO:0.30, w:1.0 },
    ];

    var rainLayers = [];
    for (var li = 0; li < layerDefs.length; li++) {
        var cfg = layerDefs[li];
        var drops = [];
        for (var di = 0; di < cfg.count; di++) {
            drops.push({
                x: Math.random() * W,
                y: Math.random() * H,
                len: cfg.minL + Math.random() * (cfg.maxL - cfg.minL),
                speed: cfg.minS + Math.random() * (cfg.maxS - cfg.minS),
                opacity: cfg.minO + Math.random() * (cfg.maxO - cfg.minO),
                sway: Math.random() * 1.5 + 0.5
            });
        }
        rainLayers.push({ drops: drops, width: cfg.w });
    }

    // ---- Scroll state ----
    var scrollProgress = 0;
    var smoothProgress = 0;
    var scrollVelocity = 0;
    var smoothVelocity = 0;
    var lastSY = window.scrollY;
    var lastST = performance.now();

    function onScroll() {
        var now = performance.now();
        var sy = window.scrollY;
        var delta = sy - lastSY;
        var dt = Math.max(1, now - lastST);

        scrollVelocity = (delta / dt) * 16;

        var maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        scrollProgress = Math.min(1, Math.max(0, sy / maxScroll));

        lastSY = sy;
        lastST = now;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // ---- Connection distance ----
    var MAX_CONN = isMobile ? 65 : 100;

    // ---- Main draw loop ----
    function drawFrame(time, absVel) {
        ctx.clearRect(0, 0, W, H);

        var brainW = Math.min(W * 0.62, 620);
        var brainH = Math.min(H * 0.60, 520);
        var brainX = (W - brainW) / 2;
        var pulse = Math.sin(time * 1.5) * 6 * smoothProgress;
        var brainY = (H - brainH) / 2 + pulse;

        // Assembly ratio (morphs scattered particles into brain shape as user scrolls down)
        var assembly = Math.min(1, smoothProgress * 1.15);

        // ---- 1. Rain (behind everything) ----
        var dir = smoothVelocity >= 0 ? 1 : -1;
        var rainMult = 0.25 + Math.min(absVel * 0.18, 2.5);

        for (var li = 0; li < rainLayers.length; li++) {
            var layer = rainLayers[li];
            ctx.lineWidth = layer.width;
            ctx.lineCap = 'round';

            for (var di = 0; di < layer.drops.length; di++) {
                var drop = layer.drops[di];

                var moveY = absVel > 0.3
                    ? dir * drop.speed * rainMult
                    : drop.speed * 0.12;

                drop.y += moveY;

                var swayAmt = 0.12 + Math.min(absVel * 0.05, 0.7);
                drop.x += Math.sin(time * 0.8 + drop.y * 0.008) * drop.sway * swayAmt;

                if (dir >= 0 && drop.y > H + 40) { drop.y = -40 - Math.random() * 30; drop.x = Math.random() * W; }
                if (dir < 0 && drop.y < -40) { drop.y = H + 40 + Math.random() * 30; drop.x = Math.random() * W; }
                if (drop.x < -20) drop.x = W + 20;
                if (drop.x > W + 20) drop.x = -20;

                var tailLen = drop.len * (0.4 + Math.min(absVel * 0.09, 1.1));
                var alpha = drop.opacity * (0.5 + Math.min(absVel * 0.06, 0.9));
                ctx.strokeStyle = 'rgba(160, 210, 255, ' + alpha + ')';
                ctx.beginPath();
                ctx.moveTo(drop.x, drop.y);
                ctx.lineTo(drop.x - drop.sway * 0.35, drop.y + tailLen * dir);
                ctx.stroke();
            }
        }

        // ---- 2. Update particles ----
        for (var i = 0; i < particles.length; i++) {
            var p = particles[i];

            // Progressive reveal targets
            var revealTarget = p.isAmbient ? 1 : 0;
            if (!p.isAmbient && assembly > p.revealAt * 0.6) {
                revealTarget = Math.min(1, (assembly - p.revealAt * 0.6) * 3.5);
            }
            p.revealed += (revealTarget - p.revealed) * 0.06;

            p.seed += 0.006;

            // Float motion
            var floatAmp = (1 - assembly * 0.65) * 12;
            var fx = Math.sin(time * 1.1 + p.seed) * floatAmp;
            var fy = Math.cos(time * 0.9 + p.seed * 0.7) * floatAmp;

            // Scattered screen position vs target brain position
            var scX = p.sx * W + fx;
            var scY = p.sy * H + fy;

            var brX = brainX + p.bx * brainW + fx * 0.15;
            var brY = brainY + p.by * brainH + fy * 0.15;

            // Interpolate position based on overall assembly progress
            var morphT = Math.min(1, Math.max(0, assembly));
            var tx = (1 - morphT) * scX + morphT * brX;
            var ty = (1 - morphT) * scY + morphT * brY;

            p.x += (tx - p.x) * 0.07;
            p.y += (ty - p.y) * 0.07;

            // Mouse repulsion
            if (mx > 0) {
                var ddx = p.x - mx, ddy = p.y - my;
                var dd = Math.sqrt(ddx * ddx + ddy * ddy);
                if (dd < 110) {
                    var ff = (1 - dd / 110) * 16;
                    var aa = Math.atan2(ddy, ddx);
                    p.x += Math.cos(aa) * ff * 0.2;
                    p.y += Math.sin(aa) * ff * 0.2;
                }
            }
        }

        // ---- 3. Neural connections ----
        var connDist = MAX_CONN * (0.25 + 0.75 * assembly);
        ctx.lineWidth = 0.6;

        for (var i = 0; i < particles.length; i++) {
            if (particles[i].revealed < 0.15) continue;
            for (var j = i + 1; j < particles.length; j++) {
                if (particles[j].revealed < 0.15) continue;
                var a = particles[i], b = particles[j];
                var dx = a.x - b.x, dy = a.y - b.y;
                var d = Math.sqrt(dx * dx + dy * dy);
                if (d < connDist) {
                    var al = (1 - d / connDist) * 0.28 * Math.min(a.revealed, b.revealed);
                    ctx.strokeStyle = 'rgba(' + a.color[0] + ',' + a.color[1] + ',' + a.color[2] + ',' + al + ')';
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.stroke();
                }
            }
        }

        // ---- 4. Draw particles + glow ----
        for (var i = 0; i < particles.length; i++) {
            var p = particles[i];
            if (p.revealed < 0.015) continue;

            var pAlpha = 0.35 + 0.65 * p.revealed;
            var pulseSz = 1 + Math.sin(time * 2 + p.pulsePhase) * 0.25 * p.revealed;
            var sz = p.size * pulseSz;

            // Outer glow (bloom effect)
            if (!isMobile && p.revealed > 0.25) {
                var glowR = sz * (2.8 + Math.sin(time * 1.8 + p.seed) * 1.0);
                ctx.beginPath();
                ctx.arc(p.x, p.y, Math.max(0.1, glowR), 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(' + p.color[0] + ',' + p.color[1] + ',' + p.color[2] + ',' + (0.06 * p.revealed) + ')';
                ctx.fill();
            }

            // Core particle
            ctx.beginPath();
            ctx.arc(p.x, p.y, sz, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(' + p.color[0] + ',' + p.color[1] + ',' + p.color[2] + ',' + pAlpha + ')';
            ctx.fill();
        }
    }

    function animate() {
        var time = Date.now() * 0.001;

        // Smooth scroll progress
        smoothProgress += (scrollProgress - smoothProgress) * 0.035;

        // Smooth velocity with decay
        smoothVelocity += (scrollVelocity - smoothVelocity) * 0.07;
        scrollVelocity *= 0.88;

        var absVel = Math.abs(smoothVelocity);

        drawFrame(time, absVel);
        requestAnimationFrame(animate);
    }

    animate();
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
                const matches = filter === 'all' || categories.includes(filter);

                card.classList.toggle('hidden', !matches);
                if (matches) {
                    card.classList.add('fade-in');
                    requestAnimationFrame(() => {
                        card.classList.remove('fade-in');
                    });
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
