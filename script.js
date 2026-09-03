/* =========================================
   ZEINA PORTFOLIO - CINEMATIC JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       ELEMENTS
    ========================================= */

    const body = document.body;

    const themeBtn = document.getElementById("themeBtn");
    const langBtn = document.getElementById("langBtn");

    const loader =
        document.querySelector(".cinematic-loader");



    /* =========================================
       THEME SYSTEM
    ========================================= */

    const savedTheme =
        localStorage.getItem("portfolio-theme") || "dark";


    function updateTheme() {

        const isLight =
            body.classList.contains("light");


        if (themeBtn) {

            themeBtn.textContent =
                isLight ? "🌙" : "☀️";

        }


        localStorage.setItem(
            "portfolio-theme",
            isLight ? "light" : "dark"
        );

    }


    if (savedTheme === "light") {

        body.classList.add("light");

    } else {

        body.classList.remove("light");

    }


    updateTheme();


    if (themeBtn) {

        themeBtn.addEventListener("click", () => {

            body.classList.toggle("light");

            updateTheme();

        });

    }



    /* =========================================
       LANGUAGE SYSTEM
    ========================================= */

    const savedLanguage =
        localStorage.getItem("portfolio-language") || "ar";


    function setLanguage(language) {

        const elements =
            document.querySelectorAll(
                "[data-ar][data-en]"
            );


        elements.forEach((element) => {

            const text =
                language === "en"
                    ? element.dataset.en
                    : element.dataset.ar;


            if (text) {

                element.textContent = text;

            }

        });



        if (language === "en") {

            document.documentElement.lang = "en";

            document.documentElement.dir = "ltr";


            if (langBtn) {

                langBtn.textContent = "AR";

            }

        } else {

            document.documentElement.lang = "ar";

            document.documentElement.dir = "rtl";


            if (langBtn) {

                langBtn.textContent = "EN";

            }

        }


        localStorage.setItem(
            "portfolio-language",
            language
        );

    }


    setLanguage(savedLanguage);


    if (langBtn) {

        langBtn.addEventListener("click", () => {

            const currentLanguage =
                document.documentElement.lang;


            setLanguage(
                currentLanguage === "ar"
                    ? "en"
                    : "ar"
            );

        });

    }



    /* =========================================
       CINEMATIC LOADER
       SAFE VERSION
    ========================================= */

    let websiteShown = false;


    function showWebsite() {

        /* Prevent running twice */

        if (websiteShown) return;

        websiteShown = true;



        /* Enable scrolling */

        document.documentElement.style.overflowY =
            "auto";

        body.style.overflowY =
            "auto";


        body.classList.remove(
            "cinematic-loading"
        );


        body.classList.add(
            "cinematic-ready"
        );



        /* =====================================
           SHOW EVERYTHING SAFELY
        ===================================== */

        document
            .querySelectorAll(
                "section, .reveal"
            )
            .forEach((element) => {

                element.style.visibility =
                    "visible";


                /* Don't force transform here
                   because your design may use
                   rotate / translate */

                element.style.opacity =
                    "1";

            });



        /* =====================================
           HERO CINEMATIC SEQUENCE
           (name -> photo -> details) is now
           handled purely by CSS via the
           .intro-seq-1/2/3 classes once
           body gets .cinematic-ready
        ===================================== */



        /* =====================================
           HIDE LOADER
        ===================================== */

        if (loader) {

            loader.classList.add(
                "is-hidden"
            );


            setTimeout(() => {

                loader.remove();

            }, 900);

        }

    }



    /* Fast fallback */

    setTimeout(
        showWebsite,
        900
    );


    /* Extra safety */

    window.addEventListener(
        "load",
        () => {

            setTimeout(
                showWebsite,
                300
            );

        },
        { once: true }
    );



    /* =========================================
       SCROLL PROGRESS BAR
    ========================================= */

    let progressLine =
        document.querySelector(
            ".scroll-progress"
        );


    if (!progressLine) {

        progressLine =
            document.createElement("div");


        progressLine.className =
            "scroll-progress";


        body.appendChild(
            progressLine
        );

    }



    function updateProgress() {

        const scrollTop =
            window.scrollY;


        const scrollHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;


        const progress =
            scrollHeight > 0
                ? (scrollTop / scrollHeight) * 100
                : 0;


        progressLine.style.width =
            `${progress}%`;

    }


    window.addEventListener(
        "scroll",
        updateProgress,
        { passive: true }
    );


    updateProgress();



    /* =========================================
       SAFE REVEAL ANIMATION
    ========================================= */

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    /* IMPORTANT:
       We never hide sections completely */

    revealElements.forEach((element) => {

        element.classList.add(
            "reveal-ready"
        );

    });



    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(

                (entries) => {

                    entries.forEach((entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "show"
                            );


                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    });

                },

                {
                    threshold: 0.08,

                    rootMargin:
                        "0px 0px -80px 0px"
                }

            );


        revealElements.forEach((element) => {

            revealObserver.observe(
                element
            );

        });

    } else {

        /* Old browser fallback */

        revealElements.forEach((element) => {

            element.classList.add(
                "show"
            );

        });

    }



    /* =========================================
       STAGGER ANIMATION
       FOR CARDS
    ========================================= */

    const staggerContainers =
        document.querySelectorAll(
            ".skills-grid, .projects-grid, .education-grid, .experience-grid, .services-grid"
        );


    staggerContainers.forEach((container) => {

        const children =
            Array.from(container.children);


        children.forEach((child, index) => {

            child.style.transitionDelay =
                `${index * 0.12}s`;

        });

    });



    /* =========================================
       ACTIVE NAVIGATION
       (FIXED: position-based scroll-spy
       instead of IntersectionObserver)

       Why the old version was buggy:
       an IntersectionObserver with a narrow
       rootMargin band could have TWO sections
       "intersecting" at the same time when a
       section (like Skills) is tall. Whichever
       entry the browser happened to fire last
       won the "active" class — not necessarily
       the section actually at the top of the
       screen. That's why clicking "Projects"
       could leave "Skills" highlighted.

       Fix: on every scroll, look at each
       section's real position on the page and
       pick whichever section's top has most
       recently passed a fixed offset below the
       navbar. This always matches what the user
       is actually looking at.
    ========================================= */

    const sections =
        document.querySelectorAll(
            "main section[id], section[id]"
        );


    const navLinks =
        document.querySelectorAll(
            ".nav-links a[href^='#']"
        );


    function getNavOffset() {

        const navbarEl =
            document.querySelector(".navbar, nav");


        const navbarHeight =
            navbarEl ? navbarEl.offsetHeight : 0;


        /* small extra buffer so the section
           has to be clearly under the navbar
           before it's considered "current" */

        return navbarHeight + 40;

    }


    function setActiveLink(sectionId) {

        navLinks.forEach((link) => {

            const href =
                link.getAttribute("href");


            link.classList.toggle(
                "active",
                href === `#${sectionId}`
            );

        });

    }


    let scrollSpyTicking = false;


    function updateActiveSection() {

        scrollSpyTicking = false;


        if (!sections.length) return;


        const offset = getNavOffset();

        const scrollPosition =
            window.scrollY + offset;


        /* Special case: if we're at the very
           bottom of the page, force-activate
           the last section (handles short
           sections like Contact that may never
           pass the offset threshold) */

        const atBottom =
            window.innerHeight + window.scrollY >=
            document.documentElement.scrollHeight - 2;


        if (atBottom) {

            setActiveLink(
                sections[sections.length - 1].id
            );

            return;

        }


        let currentSectionId =
            sections[0].id;


        sections.forEach((section) => {

            if (
                section.offsetTop <=
                scrollPosition
            ) {

                currentSectionId =
                    section.id;

            }

        });


        setActiveLink(currentSectionId);

    }


    function requestScrollSpyUpdate() {

        if (scrollSpyTicking) return;

        scrollSpyTicking = true;


        window.requestAnimationFrame(
            updateActiveSection
        );

    }


    window.addEventListener(
        "scroll",
        requestScrollSpyUpdate,
        { passive: true }
    );


    window.addEventListener(
        "resize",
        requestScrollSpyUpdate
    );


    updateActiveSection();



    /* =========================================
       SMOOTH SCROLL
    ========================================= */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach((link) => {

            link.addEventListener(
                "click",
                (event) => {

                    const targetId =
                        link.getAttribute("href");


                    if (
                        !targetId ||
                        targetId === "#"
                    ) return;


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) return;


                    event.preventDefault();


                    /* Instantly mark this link as
                       active on click so there's
                       no flicker/mismatch while the
                       smooth scroll animation is
                       still in progress */

                    if (
                        link.classList.contains(
                            "nav-links".split(" ")[0]
                        ) ||
                        link.closest(".nav-links")
                    ) {

                        setActiveLink(
                            targetId.replace("#", "")
                        );

                    }


                    target.scrollIntoView({

                        behavior: "smooth",

                        block: "start"

                    });

                }

            );

        });



    /* =========================================
       NAVBAR SCROLL EFFECT
    ========================================= */

    const navbar =
        document.querySelector(
            ".navbar, nav"
        );


    function updateNavbar() {

        if (!navbar) return;


        if (window.scrollY > 40) {

            navbar.classList.add(
                "scrolled"
            );

        } else {

            navbar.classList.remove(
                "scrolled"
            );

        }

    }


    window.addEventListener(
        "scroll",
        updateNavbar,
        { passive: true }
    );


    updateNavbar();



    /* =========================================
       FINAL SAFETY
       NEVER HIDE SECTIONS
    ========================================= */

    setTimeout(() => {

        document
            .querySelectorAll(
                "main section, section"
            )
            .forEach((section) => {

                section.style.visibility =
                    "visible";


                const opacity =
                    getComputedStyle(section)
                        .opacity;


                if (opacity === "0") {

                    section.style.opacity =
                        "1";

                }

            });


        /* Make every reveal element safe */

        document
            .querySelectorAll(
                ".reveal"
            )
            .forEach((element) => {

                element.classList.add(
                    "show"
                );

            });


    }, 1800);

});
