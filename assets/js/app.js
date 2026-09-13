/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");


if (menuToggle && navLinks) {

    /* Open / Close */

    menuToggle.addEventListener("click", () => {

        menuToggle.classList.toggle("active");
        navLinks.classList.toggle("active");

        const menuOpen = navLinks.classList.contains("active");

        menuToggle.setAttribute(
            "aria-expanded",
            menuOpen
        );

    });


    /* Close after clicking link */

    const navItems = navLinks.querySelectorAll("a");

    navItems.forEach((item) => {

        item.addEventListener("click", () => {

            menuToggle.classList.remove("active");
            navLinks.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });


    /* Reset when returning to desktop */

    window.addEventListener("resize", () => {

        if (window.innerWidth > 768) {

            menuToggle.classList.remove("active");
            navLinks.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });

}


/* =========================================================
   CONTACT FORM
========================================================= */

const contactForm = document.getElementById("contactForm");

const formSuccessMessage =
    document.getElementById("formSuccessMessage");


if (contactForm) {

    contactForm.addEventListener("submit", (event) => {

        event.preventDefault();


        /* =====================================================
           FORM FIELDS
        ====================================================== */

        const nameInput =
            document.getElementById("name");

        const emailInput =
            document.getElementById("email");

        const subjectInput =
            document.getElementById("subject");

        const messageInput =
            document.getElementById("message");


        let formIsValid = true;


        /* Remove previous errors */

        const formGroups =
            contactForm.querySelectorAll(".form-group");

        formGroups.forEach((group) => {

            group.classList.remove("error");

            const errorMessage =
                group.querySelector(".form-error");

            if (errorMessage) {
                errorMessage.textContent = "";
            }

        });


        /* Hide previous success message */

        if (formSuccessMessage) {
            formSuccessMessage.classList.remove("show");
        }


        /* =====================================================
           VALIDATE NAME
        ====================================================== */

        if (nameInput.value.trim().length < 2) {

            showFormError(
                nameInput,
                "Please enter your name."
            );

            formIsValid = false;

        }


        /* =====================================================
           VALIDATE EMAIL
        ====================================================== */

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(emailInput.value.trim())) {

            showFormError(
                emailInput,
                "Please enter a valid email address."
            );

            formIsValid = false;

        }


        /* =====================================================
           VALIDATE SUBJECT
        ====================================================== */

        if (subjectInput.value.trim().length < 2) {

            showFormError(
                subjectInput,
                "Please enter a subject."
            );

            formIsValid = false;

        }


        /* =====================================================
           VALIDATE MESSAGE
        ====================================================== */

        if (messageInput.value.trim().length < 10) {

            showFormError(
                messageInput,
                "Please enter a message of at least 10 characters."
            );

            formIsValid = false;

        }


        /* =====================================================
           SUCCESS
        ====================================================== */

        if (formIsValid) {

            if (formSuccessMessage) {
                formSuccessMessage.classList.add("show");
            }


            /* Clear form */

            contactForm.reset();


            /* Scroll success message into view on small screens */

            if (
                formSuccessMessage &&
                window.innerWidth <= 768
            ) {

                formSuccessMessage.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }

        }

    });

}


/* =========================================================
   FORM ERROR FUNCTION
========================================================= */

function showFormError(input, message) {

    const formGroup =
        input.closest(".form-group");

    if (!formGroup) {
        return;
    }


    formGroup.classList.add("error");


    const errorElement =
        formGroup.querySelector(".form-error");

    if (errorElement) {
        errorElement.textContent = message;
    }

}

/* =========================================================
   HOME HERO SLIDER
========================================================= */

const homeSlider = document.getElementById("homeSlider");

const homeSliderTrack =
    document.getElementById("homeSliderTrack");

const homeSliderPrev =
    document.getElementById("homeSliderPrev");

const homeSliderNext =
    document.getElementById("homeSliderNext");


if (homeSlider && homeSliderTrack) {

    const slides =
        homeSliderTrack.querySelectorAll(".home-slide");

    const dots =
        document.querySelectorAll(".home-slider-dot");


    let currentSlide = 0;

    let sliderInterval;


    /* =====================================================
       SHOW SLIDE
    ====================================================== */

    function showHomeSlide(index) {

        if (index >= slides.length) {
            currentSlide = 0;
        }

        else if (index < 0) {
            currentSlide = slides.length - 1;
        }

        else {
            currentSlide = index;
        }


        homeSliderTrack.style.transform =
            `translateX(-${currentSlide * 100}%)`;


        dots.forEach((dot) => {
            dot.classList.remove("active");
        });


        if (dots[currentSlide]) {
            dots[currentSlide].classList.add("active");
        }

    }


    /* =====================================================
       NEXT SLIDE
    ====================================================== */

    function nextHomeSlide() {

        showHomeSlide(currentSlide + 1);

    }


    /* =====================================================
       PREVIOUS SLIDE
    ====================================================== */

    function previousHomeSlide() {

        showHomeSlide(currentSlide - 1);

    }


    /* =====================================================
       AUTO PLAY - EVERY 3 SECONDS
    ====================================================== */

    function startHomeSlider() {

        sliderInterval = setInterval(
            nextHomeSlide,
            3000
        );

    }


    function stopHomeSlider() {

        clearInterval(sliderInterval);

    }


    function restartHomeSlider() {

        stopHomeSlider();

        startHomeSlider();

    }


    /* =====================================================
       NEXT ARROW
    ====================================================== */

    if (homeSliderNext) {

        homeSliderNext.addEventListener("click", () => {

            nextHomeSlide();

            restartHomeSlider();

        });

    }


    /* =====================================================
       PREVIOUS ARROW
    ====================================================== */

    if (homeSliderPrev) {

        homeSliderPrev.addEventListener("click", () => {

            previousHomeSlide();

            restartHomeSlider();

        });

    }


    /* =====================================================
       DOTS
    ====================================================== */

    dots.forEach((dot, index) => {

        dot.addEventListener("click", () => {

            showHomeSlide(index);

            restartHomeSlider();

        });

    });


    /* =====================================================
       PAUSE WHEN MOUSE IS OVER SLIDER
    ====================================================== */

    homeSlider.addEventListener(
        "mouseenter",
        stopHomeSlider
    );


    homeSlider.addEventListener(
        "mouseleave",
        startHomeSlider
    );


    /* =====================================================
       MOBILE SWIPE
    ====================================================== */

    let touchStartX = 0;

    let touchEndX = 0;


    homeSlider.addEventListener(
        "touchstart",
        (event) => {

            touchStartX =
                event.changedTouches[0].screenX;

        },
        {
            passive: true
        }
    );


    homeSlider.addEventListener(
        "touchend",
        (event) => {

            touchEndX =
                event.changedTouches[0].screenX;


            handleHomeSwipe();

        },
        {
            passive: true
        }
    );


    function handleHomeSwipe() {

        const swipeDistance =
            touchStartX - touchEndX;


        /* Swipe left -> next */

        if (swipeDistance > 50) {

            nextHomeSlide();

            restartHomeSlider();

        }


        /* Swipe right -> previous */

        else if (swipeDistance < -50) {

            previousHomeSlide();

            restartHomeSlider();

        }

    }


    /* Start slider */

    showHomeSlide(0);

    startHomeSlider();

}

/* =========================================================
   HOME IMPACT COUNTERS
========================================================= */

const impactSection =
    document.querySelector(".home-impact");

const impactItems =
    document.querySelectorAll(".impact-item");

const impactNumbers =
    document.querySelectorAll(".impact-number");


let impactStarted = false;


if (impactSection) {

    const impactObserver =
        new IntersectionObserver(

            (entries) => {

                entries.forEach((entry) => {

                    if (
                        entry.isIntersecting &&
                        !impactStarted
                    ) {

                        impactStarted = true;


                        /* Show items */

                        impactItems.forEach((item) => {

                            item.classList.add("show");

                        });


                        /* Start counters */

                        impactNumbers.forEach((number) => {

                            animateImpactNumber(number);

                        });


                        impactObserver.unobserve(
                            impactSection
                        );

                    }

                });

            },

            {
                threshold: 0.25
            }

        );


    impactObserver.observe(
        impactSection
    );

}


/* =========================================================
   COUNTER ANIMATION
========================================================= */

function animateImpactNumber(element) {

    const target =
        Number(element.dataset.target);

    const suffix =
        element.dataset.suffix || "";


    const duration = 1600;

    const startTime =
        performance.now();


    function updateNumber(currentTime) {

        const elapsed =
            currentTime - startTime;


        const progress =
            Math.min(
                elapsed / duration,
                1
            );


        /* Smooth easing */

        const easedProgress =
            1 - Math.pow(1 - progress, 3);


        const currentValue =
            Math.floor(
                target * easedProgress
            );


        element.textContent =
            currentValue.toLocaleString() +
            suffix;


        if (progress < 1) {

            requestAnimationFrame(
                updateNumber
            );

        }

        else {

            element.textContent =
                target.toLocaleString() +
                suffix;

        }

    }


    requestAnimationFrame(
        updateNumber
    );

}