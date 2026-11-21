/* =========================================================
   ANKIT & SUJATA — WEDDING INVITATION
   GSAP Cinematic Interaction Layer
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ---------------------------------------------------------
       0. Split the couple's names into animatable letters
    --------------------------------------------------------- */
    document.querySelectorAll(".letters").forEach((el) => {
        const text = el.dataset.text || el.textContent;
        el.innerHTML = "";
        [...text].forEach((ch) => {
            const span = document.createElement("span");
            span.className = "char";
            span.style.display = "inline-block";
            span.textContent = ch === " " ? "\u00A0" : ch;
            el.appendChild(span);
        });
    });

    /* ---------------------------------------------------------
       1. PRELOADER -> HERO ENTRANCE TIMELINE
    --------------------------------------------------------- */
    const master = gsap.timeline({
        defaults: { ease: "power3.out" },
    });

    master
        .to(".flame", {
            scaleY: 1.15,
            duration: 0.5,
            repeat: 3,
            yoyo: true,
            transformOrigin: "bottom center",
            ease: "sine.inOut",
        })
        .to("#preloader", {
            opacity: 0,
            duration: 0.8,
            pointerEvents: "none",
            ease: "power2.inOut",
            onComplete: () => document.getElementById("preloader").remove(),
        })
        .from(
            ".frame-corner", { opacity: 0, duration: 1, stagger: 0.15 },
            "-=0.4"
        )
        .from(
            ".hero-marigold-string", { opacity: 0, scaleX: 0, duration: 0.8, ease: "power2.out" },
            "-=0.6"
        )
        .from("#hero-ganesh", { opacity: 0, y: 10, duration: 0.7 }, "-=0.5")
        .from(
            ".name-groom .char", { opacity: 0, yPercent: 120, rotate: 6, duration: 0.9, stagger: 0.04 },
            "-=0.3"
        )
        .from(
            ".hero-and", { opacity: 0, scale: 0.6, duration: 0.6, ease: "back.out(2)" },
            "-=0.5"
        )
        .from(
            ".name-bride .char", { opacity: 0, yPercent: 120, rotate: -6, duration: 0.9, stagger: 0.04 },
            "-=0.7"
        )
        .from(".hero-sub", { opacity: 0, y: 12, duration: 0.6 }, "-=0.3")
        .from(".hero-date", { opacity: 0, y: 12, duration: 0.6 }, "-=0.4")
        .from(".hero-cta", { opacity: 0, y: 12, duration: 0.6 }, "-=0.3")
        .from(".hero-scroll-cue", { opacity: 0, duration: 0.6 }, "-=0.3");

    /* subtle ambient flame flicker forever */
    gsap.to(".flame", {
        scaleX: 0.92,
        skewX: 3,
        duration: 0.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        transformOrigin: "bottom center",
    });

    /* ---------------------------------------------------------
       2. SCROLL-TRIGGERED REVEALS
    --------------------------------------------------------- */
    gsap.utils.toArray(".section-title.reveal-title").forEach((el) => {
        gsap.from(el, {
            opacity: 0,
            y: 40,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
        });
    });

    gsap.utils.toArray(".reveal-copy").forEach((el) => {
        gsap.from(el, {
            opacity: 0,
            y: 24,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
        });
    });

    gsap.utils.toArray(".event-card").forEach((card, i) => {
        const fromX = window.innerWidth < 720 ? 0 : i % 2 === 0 ? 60 : -60;
        gsap.from(card, {
            opacity: 0,
            x: fromX,
            y: 20,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 85%" },
        });
        gsap.from(card.querySelector(".event-icon"), {
            scale: 0,
            duration: 0.6,
            ease: "back.out(2.5)",
            scrollTrigger: { trigger: card, start: "top 85%" },
        });
    });

    gsap.utils.toArray(".reveal-fam").forEach((card, i) => {
        gsap.from(card, {
            opacity: 0,
            y: 30,
            duration: 0.9,
            delay: i * 0.15,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 85%" },
        });
    });

    gsap.from(".om-symbol", {
        rotate: -180,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".family-divider", start: "top 85%" },
    });

    gsap.from(".kalash-line path", {
        drawSVG: "0%",
        duration: 1.2,
        ease: "power2.inOut",
        scrollTrigger: { trigger: ".story-motif", start: "top 90%" },
        // Fallback if DrawSVG plugin isn't loaded (it's a paid plugin) — use opacity instead:
        onStart: function() {
            if (!gsap.plugins || !gsap.plugins.drawSVG) {
                gsap.fromTo(".kalash-line path", { opacity: 0 }, { opacity: 1, duration: 1 });
            }
        },
    });
    gsap.utils.toArray(".gallery-item").forEach((item, i) => {
        gsap.from(item, {
            opacity: 0,
            y: 30,
            scale: 0.96,
            duration: 0.8,
            delay: (i % 3) * 0.08,
            ease: "power2.out",
            scrollTrigger: { trigger: item, start: "top 90%" },
        });
    });

    gsap.from(".map-link", {
        opacity: 0,
        y: 16,
        duration: 0.8,
        scrollTrigger: { trigger: ".map-link", start: "top 90%" },
    });

    gsap.from(".footer-motif, .footer-names, .footer-line, .footer-credit", {
        opacity: 0,
        y: 16,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: { trigger: ".site-footer", start: "top 92%" },
    });

    /* ---------------------------------------------------------
       3. SIDE NAV — active dot + smooth click
    --------------------------------------------------------- */
    const navLinks = document.querySelectorAll(".section-nav a");
    const navSections = [...navLinks].map((a) =>
        document.querySelector(a.getAttribute("href"))
    );

    navSections.forEach((section, i) => {
        if (!section) return;
        ScrollTrigger.create({
            trigger: section,
            start: "top center",
            end: "bottom center",
            onEnter: () => setActiveNav(i),
            onEnterBack: () => setActiveNav(i),
        });
    });

    function setActiveNav(i) {
        navLinks.forEach((l) => l.classList.remove("active"));
        if (navLinks[i]) navLinks[i].classList.add("active");
    }

    /* ---------------------------------------------------------
       4. PETAL CURSOR (desktop only)
    --------------------------------------------------------- */
    if (!prefersReducedMotion && window.matchMedia("(hover:hover)").matches) {
        const cursor = document.getElementById("petal-cursor");
        let mouseX = 0,
            mouseY = 0,
            curX = 0,
            curY = 0;

        window.addEventListener("mousemove", (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            gsap.to(cursor, { opacity: 1, duration: 0.3 });
        });

        gsap.ticker.add(() => {
            curX += (mouseX - curX) * 0.15;
            curY += (mouseY - curY) * 0.15;
            gsap.set(cursor, { x: curX, y: curY, rotate: (mouseX - curX) * 2 });
        });
    }

    /* ---------------------------------------------------------
       5. COUNTDOWN TIMER
    --------------------------------------------------------- */
    const WEDDING_DATE = new Date("2026-12-10T09:11:00+05:30").getTime();

    function updateCountdown() {
        const now = Date.now();
        const diff = Math.max(0, WEDDING_DATE - now);

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const mins = Math.floor((diff / (1000 * 60)) % 60);
        const secs = Math.floor((diff / 1000) % 60);

        const set = (id, val) => {
            const el = document.getElementById(id);
            if (el) el.textContent = String(val).padStart(2, "0");
        };
        set("cd-days", days);
        set("cd-hours", hours);
        set("cd-mins", mins);
        set("cd-secs", secs);
    }
    updateCountdown();
    setInterval(updateCountdown, 1000);
});

const music = document.getElementById("bg-music");
const musicBtn = document.getElementById("music-toggle");

musicBtn.addEventListener("click", () => {
    if (music.paused) {
        music.play();
        musicBtn.classList.add("playing");
        musicBtn.setAttribute("aria-label", "Pause music");
    } else {
        music.pause();
        musicBtn.classList.remove("playing");
        musicBtn.setAttribute("aria-label", "Play music");
    }
});