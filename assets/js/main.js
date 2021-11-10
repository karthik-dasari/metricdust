(function() {
    "use strict";

    /**
     * Easy selector helper function
     */
    const select = (el, all = false) => {
        el = el.trim()
        if (all) {
            return [...document.querySelectorAll(el)]
        } else {
            return document.querySelector(el)
        }
    }

    /**
     * Easy event listener function
     */
    const on = (type, el, listener, all = false) => {
        let selectEl = select(el, all)
        if (selectEl) {
            if (all) {
                selectEl.forEach(e => e.addEventListener(type, listener))
            } else {
                selectEl.addEventListener(type, listener)
            }
        }
    }

    /**
     * Easy on scroll event listener 
     */
    const onscroll = (el, listener) => {
        el.addEventListener('scroll', listener)
    }

    let heroCarouselIndicators = select("#hero-carousel-indicators")
    let heroCarouselItems = select('#heroCarousel .carousel-item', true)

    heroCarouselItems.forEach((item, index) => {
        (index === 0) ?
        heroCarouselIndicators.innerHTML += "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "' class='active'></li>":
            heroCarouselIndicators.innerHTML += "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "'></li>"
    });

    /**
     * Back to top button
     */
    let backtotop = select('.back-to-top')
    if (backtotop) {
        const toggleBacktotop = () => {
            if (window.scrollY > 100) {
                backtotop.classList.add('active')
            } else {
                backtotop.classList.remove('active')
            }
        }
        window.addEventListener('load', toggleBacktotop)
        onscroll(document, toggleBacktotop)
    }

    /**
     * Preloader
     */
    let preloader = select('#preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.remove()
        });
    }

    /**
     * Search window open/close
     */
    let body = select('body');
    on('click', '.navbar-toggle-box', function(e) {
        e.preventDefault()
        body.classList.add('box-collapse-open')
        body.classList.remove('box-collapse-closed')
    })

    on('click', '.close-box-collapse', function(e) {
        e.preventDefault()
        body.classList.remove('box-collapse-open')
        body.classList.add('box-collapse-closed')
    })


    /**
     * Property carousel
     */
    new Swiper('#property-carousel', {
        speed: 600,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        slidesPerView: 'auto',
        pagination: {
            el: '.propery-carousel-pagination',
            type: 'bullets',
            clickable: true
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 20
            },

            1200: {
                slidesPerView: 3,
                spaceBetween: 20
            }
        }
    });



    new Swiper('.testimonials-slider', {
        speed: 600,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        slidesPerView: 'auto',
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
        }
    });

    /**
     * Property Single carousel
     */
    new Swiper('#property-single-carousel', {
        speed: 600,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        pagination: {
            el: '.property-single-carousel-pagination',
            type: 'bullets',
            clickable: true
        }
    });

})()

$(document).ready(function() {
    var currentGfgStep, nextGfgStep, previousGfgStep;
    var opacity;
    var current = 1;
    var steps = $("fieldset").length;

    setProgressBar(current);

    $(".next-step").click(function() {

        currentGfgStep = $(this).parent();
        nextGfgStep = $(this).parent().next();

        $("#progressbar li").eq($("fieldset")
            .index(nextGfgStep)).addClass("active");

        nextGfgStep.show();
        currentGfgStep.animate({ opacity: 0 }, {
            step: function(now) {
                opacity = 1 - now;

                currentGfgStep.css({
                    'display': 'none',
                    'position': 'relative'
                });
                nextGfgStep.css({ 'opacity': opacity });
            },
            duration: 500
        });
        setProgressBar(++current);
    });

    $(".previous-step").click(function() {

        currentGfgStep = $(this).parent();
        previousGfgStep = $(this).parent().prev();

        $("#progressbar li").eq($("fieldset")
            .index(currentGfgStep)).removeClass("active");

        previousGfgStep.show();

        currentGfgStep.animate({ opacity: 0 }, {
            step: function(now) {
                opacity = 1 - now;

                currentGfgStep.css({
                    'display': 'none',
                    'position': 'relative'
                });
                previousGfgStep.css({ 'opacity': opacity });
            },
            duration: 500
        });
        setProgressBar(--current);
    });

    function setProgressBar(currentStep) {
        var percent = parseFloat(100 / steps) * current;
        percent = percent.toFixed();
        $(".progress-bar")
            .css("width", percent + "%")
    }

    $(".submit").click(function() {
        return false;
    })
});