// Typing Effect
const typingText = document.querySelector(".typing");
const words = ["Kishan Kumar", "a Full-Stack Developer", "an AI Enthusiast", "a MERN Stack Developer", "a Problem Solver", "a Hackathon Winner"];
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
        setTimeout(type, 2000); // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 500); // Pause before new word
    } else {
        setTimeout(type, isDeleting ? 50 : 100);
    }
}

// Scroll Reveal Animation
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 100;
        
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

// Mobile Navigation Toggle
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

function toggleNav() {
    if (!burger || !nav) return;
    
    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');
        
        // Burger Animation
        burger.classList.toggle('toggle');
    });
}

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if(nav.classList.contains('nav-active')) {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.padding = '15px 5%';
        navbar.style.background = 'rgba(10, 10, 10, 0.9)';
        navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.5)';
    } else {
        navbar.style.padding = '20px 5%';
        navbar.style.background = 'rgba(10, 10, 10, 0.6)';
        navbar.style.boxShadow = 'none';
    }
});

// Event Listeners
window.addEventListener("scroll", reveal);
document.addEventListener("DOMContentLoaded", () => {
    type();
    reveal(); // Initial check
    toggleNav();
    initBirdCanvas();
});

// Neural Network Bird Animation
function initBirdCanvas() {
    const canvas = document.getElementById('bird-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width, height;
    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    window.addEventListener('resize', resize);
    resize();

    // Define the skeleton of a Mind (Brain profile) (normalized 0 to 1)
    const segments = [
        // Outer cortex ridge (Left to right)
        {x1: 0.25, y1: 0.35}, {x1: 0.35, y1: 0.2}, {x1: 0.5, y1: 0.15}, {x1: 0.65, y1: 0.2}, {x1: 0.75, y1: 0.35},
        {x1: 0.8, y1: 0.5}, {x1: 0.75, y1: 0.7}, {x1: 0.6, y1: 0.75}, {x1: 0.5, y1: 0.65},
        {x1: 0.4, y1: 0.7}, {x1: 0.25, y1: 0.65}, {x1: 0.2, y1: 0.5},
        // Brain stem
        {x1: 0.6, y1: 0.75}, {x1: 0.55, y1: 0.9}, {x1: 0.65, y1: 0.9},
        // Inner network lines (Sulci)
        {x1: 0.35, y1: 0.2}, {x1: 0.45, y1: 0.4}, {x1: 0.5, y1: 0.15}, {x1: 0.5, y1: 0.4},
        {x1: 0.65, y1: 0.2}, {x1: 0.55, y1: 0.4}, {x1: 0.25, y1: 0.35}, {x1: 0.35, y1: 0.5},
        {x1: 0.75, y1: 0.35}, {x1: 0.65, y1: 0.5}, {x1: 0.45, y1: 0.4}, {x1: 0.55, y1: 0.4},
        {x1: 0.35, y1: 0.5}, {x1: 0.45, y1: 0.6}, {x1: 0.65, y1: 0.5}, {x1: 0.55, y1: 0.6},
        {x1: 0.45, y1: 0.6}, {x1: 0.55, y1: 0.6}, {x1: 0.5, y1: 0.4}, {x1: 0.5, y1: 0.65}
    ];

    // Convert the point array into segments
    const brainSegments = [];
    // Outer perimeter
    for(let i=0; i<11; i++) {
        brainSegments.push({x1: segments[i].x1, y1: segments[i].y1, x2: segments[i+1].x1, y2: segments[i+1].y1});
    }
    // Close the loop
    brainSegments.push({x1: segments[11].x1, y1: segments[11].y1, x2: segments[0].x1, y2: segments[0].y1});
    // Brain stem
    brainSegments.push({x1: segments[12].x1, y1: segments[12].y1, x2: segments[13].x1, y2: segments[13].y1});
    brainSegments.push({x1: segments[12].x1, y1: segments[12].y1, x2: segments[14].x1, y2: segments[14].y1});
    // Inner network
    for(let i=15; i<segments.length; i+=2) {
        if (segments[i+1]) {
            brainSegments.push({x1: segments[i].x1, y1: segments[i].y1, x2: segments[i+1].x1, y2: segments[i+1].y1});
        }
    }

    const baseNodes = [];
    // Generate nodes along the skeleton
    brainSegments.forEach(seg => {
        // Increased to 35 points per line segment for VERY high density
        for (let i = 0; i < 35; i++) {
            const t = Math.random();
            baseNodes.push({
                x: seg.x1 + (seg.x2 - seg.x1) * t + (Math.random() - 0.5) * 0.04, // slight scatter
                y: seg.y1 + (seg.y2 - seg.y1) * t + (Math.random() - 0.5) * 0.04
            });
        }
    });

    // Sort nodes from top to bottom so it builds down like a scanning effect
    baseNodes.sort((a, b) => a.y - b.y);

    // Color palette (RGB arrays for easy alpha manipulation)
    // Cyan, Blue, Purple, Pink, Neon Pink
    const palette = [
        [0, 242, 254], 
        [79, 172, 254], 
        [161, 140, 209], 
        [251, 194, 235], 
        [255, 8, 68]
    ];

    // Add random floating velocities and colors
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

    // Initialize rain drops
    const rainDrops = [];
    for (let i = 0; i < 150; i++) {
        rainDrops.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            length: Math.random() * 20 + 10,
            speed: Math.random() * 5 + 3,
            opacity: Math.random() * 0.5 + 0.1
        });
    }

    function updateProgress() {
        const heroHeight = window.innerHeight * 0.5; // Start earlier
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY) {
            rainSpeedMultiplier = 1; // Scroll down -> fall down
        } else if (currentScrollY < lastScrollY) {
            rainSpeedMultiplier = -1; // Scroll up -> fall up
        }
        lastScrollY = currentScrollY;

        if (currentScrollY < heroHeight) {
            scrollProgress = 0;
        } else {
            scrollProgress = (currentScrollY - heroHeight) / (maxScroll - heroHeight);
        }
        scrollProgress = Math.max(0, Math.min(1, scrollProgress));
    }

    window.addEventListener('scroll', updateProgress);
    updateProgress();

    function draw() {
        ctx.clearRect(0, 0, width, height);

        // Draw Rain
        ctx.lineWidth = 1.5;
        rainDrops.forEach(drop => {
            ctx.beginPath();
            ctx.moveTo(drop.x, drop.y);
            // Draw line extending in the opposite direction of movement to create a trail
            ctx.lineTo(drop.x, drop.y - (drop.length * rainSpeedMultiplier));
            ctx.strokeStyle = `rgba(0, 242, 254, ${drop.opacity})`;
            ctx.stroke();
            
            // Move drop
            drop.y += drop.speed * rainSpeedMultiplier;
            
            // Wrap around screen
            if (drop.y > height + drop.length) {
                drop.y = -drop.length;
                drop.x = Math.random() * width;
            } else if (drop.y < -drop.length) {
                drop.y = height + drop.length;
                drop.x = Math.random() * width;
            }
        });

        if (scrollProgress > 0) {
            // Update node floating positions
            nodes.forEach(n => {
                n.x += n.vx;
                n.y += n.vy;
                // Keep them very close to base position to preserve bird shape
                if (Math.abs(n.x - n.bx) > 0.01) n.vx *= -1;
                if (Math.abs(n.y - n.by) > 0.01) n.vy *= -1;
            });

            const activeNodeCount = Math.floor(nodes.length * scrollProgress);
            const activeNodes = nodes.slice(0, activeNodeCount);

            // Scale drawing to cover the whole screen
            const scaleX = width * 0.9;
            const scaleY = height * 0.9;
            const offsetX = (width - scaleX) / 2;
            
            // Add a global "breathing" floating animation to the entire bird
            const breatheOffset = Math.sin(Date.now() / 1500) * 20; 
            const offsetY = ((height - scaleY) / 2) + breatheOffset;

            ctx.lineWidth = 0.5; // Even thinner lines for very high density

            // Draw connections (edges)
            for (let i = 0; i < activeNodes.length; i++) {
                for (let j = i + 1; j < activeNodes.length; j++) {
                    const n1 = activeNodes[i];
                    const n2 = activeNodes[j];
                    
                    const dx = n1.x - n2.x;
                    const dy = n1.y - n2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    // Connect if close enough
                    if (dist < 0.08) {
                        ctx.beginPath();
                        ctx.moveTo(offsetX + n1.x * scaleX, offsetY + n1.y * scaleY);
                        ctx.lineTo(offsetX + n2.x * scaleX, offsetY + n2.y * scaleY);
                        // Use n1's color for the line with calculated alpha
                        const alpha = 0.4 * (1 - dist/0.08);
                        ctx.strokeStyle = `rgba(${n1.color[0]}, ${n1.color[1]}, ${n1.color[2]}, ${alpha})`;
                        ctx.stroke();
                    }
                }
            }

            // Draw points (nodes)
            activeNodes.forEach(n => {
                ctx.beginPath();
                ctx.arc(offsetX + n.x * scaleX, offsetY + n.y * scaleY, 1.2, 0, Math.PI * 2); 
                ctx.fillStyle = `rgb(${n.color[0]}, ${n.color[1]}, ${n.color[2]})`;
                ctx.fill();
                
                // Add a pulsating glow animation to each node
                const pulseRadius = 4 + Math.sin((Date.now() / 200) + (n.x * 20)) * 2;
                
                // Glow effect
                ctx.beginPath();
                ctx.arc(offsetX + n.x * scaleX, offsetY + n.y * scaleY, Math.max(0, pulseRadius), 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${n.color[0]}, ${n.color[1]}, ${n.color[2]}, 0.25)`;
                ctx.fill();
            });
        }

        requestAnimationFrame(draw);
    }
    
    draw();
}