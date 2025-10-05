// Enhanced animations with GSAP and interactions
document.addEventListener('DOMContentLoaded', function() {
    // Loading animation
    gsap.set("body", {autoAlpha: 0});
    gsap.to("body", {autoAlpha: 1, duration: 0.5});

    // Hero section single animation
    gsap.from(".hero-content > *", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        onComplete: () => {
            gsap.from(".hero-content > *", {rotation: 5, yoyo: true, repeat: 1, duration: 0.3, ease: "power2.inOut", delay: 0.5});
        }
    });

    // Section and card animations with GSAP
    const sections = document.querySelectorAll('main section');
    sections.forEach((section, index) => {
        gsap.set(section, {y: 50, opacity: 0, scale: 0.95});
    });

    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    };

    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                gsap.to(entry.target, {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    ease: "power2.out"
                });

                // Animate child elements if they are cards
                const cards = entry.target.querySelectorAll('.exp-card, .contact-card, .skills-card, .projects-card, .edu-card');
                if (cards.length > 0) {
                    gsap.fromTo(cards,
                        { y: 30, opacity: 0, scale: 0.9 },
                        {
                            y: 0,
                            opacity: 1,
                            scale: 1,
                            duration: 0.6,
                            stagger: 0.1,
                            ease: "power2.out",
                            delay: 0.4
                        }
                    );
                }
            }
        });
    }, observerOptions);

    // Observe all sections
    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Smooth scroll for navigation
    document.querySelectorAll('header a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Smooth scroll with GSAP
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {y: target.offsetTop - 80}, // Offset for header
                    ease: "power2.inOut"
                });
            }
        });
    });

    // Hover effects with GSAP
    document.querySelectorAll('.exp-card, .contact-card, .skills-card, .projects-card, .edu-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {scale: 1.05, y: -5, duration: 0.3, ease: "power2.out"});
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {scale: 1, y: 0, duration: 0.3, ease: "power2.out"});
        });
    });

    // Parallax effect for hero image with GSAP
    gsap.set(".hero-image", {transformOrigin: "center center"});
    gsap.to(".hero-image", {
        y: "+=20",
        rotation: 2,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: "power2.inOut"
    });

    // Button animations
    document.querySelectorAll('.resume-btn').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            gsap.to(btn, {scale: 1.05, duration: 0.2, ease: "power2.out"});
        });
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {scale: 1, duration: 0.2, ease: "power2.out"});
        });
    });

    // Mobile menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('header ul');

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show');
        navToggle.classList.toggle('open');
    });

    // Close menu when link clicked
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show');
            navToggle.classList.remove('open');
        });
    });

    // Overall page animation on load
    gsap.from("header", {y: -100, duration: 0.8, ease: "power2.out"});
    gsap.from("footer", {y: 100, duration: 0.8, ease: "power2.out", delay: 0.2});
});
