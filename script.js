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
           STAGGER HERO ELEMENTS
        ===================================== */

        const heroElements =
            document.querySelectorAll(
                ".hero .hero-content > *, .hero .hero-visual"
            );


        heroElements.forEach((element, index) => {

            element.style.animationDelay =
                `${index * 0.12}s`;

            element.classList.add(
                "cinematic-item"
            );

        });



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
            ".skills-grid, .projects-grid, .education-grid, .experience-grid"
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
    ========================================= */

    const sections =
        document.querySelectorAll(
            "main section[id], section[id]"
        );


    const navLinks =
        document.querySelectorAll(
            ".nav-links a[href^='#']"
        );


    if (
        "IntersectionObserver" in window &&
        sections.length
    ) {

        const navObserver =
            new IntersectionObserver(

                (entries) => {

                    entries.forEach((entry) => {

                        if (
                            !entry.isIntersecting
                        ) return;


                        const sectionId =
                            entry.target.id;


                        navLinks.forEach((link) => {

                            const href =
                                link.getAttribute("href");


                            link.classList.toggle(

                                "active",

                                href ===
                                `#${sectionId}`

                            );

                        });

                    });

                },

                {
                    threshold: 0.2,

                    rootMargin:
                        "-15% 0px -60% 0px"
                }

            );


        sections.forEach((section) => {

            navObserver.observe(section);

        });

    }



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
