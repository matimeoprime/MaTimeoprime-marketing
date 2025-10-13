// MaTimeo Prime Marketing Custom JavaScript

$(document).ready(function () {
    
    // ---------------------------------------------
    // 1. Initialization for Third-Party Libraries
    // ---------------------------------------------

    // AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        once: true
    });

    // Ekko Lightbox (Gallery images)
    $(document).on('click', '[data-toggle="lightbox"]', function(event) {
        event.preventDefault();
        $(this).ekkoLightbox();
    });

    // ---------------------------------------------
    // 2. Accessibility & Skip Link
    // ---------------------------------------------

    // Ensures keyboard focus lands correctly on the main content area after skip link use
    $('.skip-link').on('click', function(e) {
        e.preventDefault();
        $('#main-content').attr('tabindex', '-1').focus();
    });
    
    // ---------------------------------------------
    // 3. Dual-Action Scroll Button Logic
    // ---------------------------------------------
    
    const $button = $('.btn-scroll-top');
    const scrollThreshold = 400; 
    const $upArrow = $button.find('.up-arrow');
    const $downArrow = $button.find('.down-arrow');
    const $contact = $('#contact'); 
    const $home = $('#home');

    function updateScrollButton() {
        const scrollPosition = $(window).scrollTop();
        
        // 1. Hide the button at the very top (scrollPosition === 0)
        if (scrollPosition < 50) { // Slight buffer at the top
            $button.fadeOut(300);
            return; 
        }
        
        // 2. Show the button
        $button.fadeIn(300);

        if (scrollPosition < scrollThreshold) {
            // Logic for slightly scrolled down (Show DOWN arrow, link to contact)
            $upArrow.hide();
            $downArrow.show();
            $button.attr('href', '#contact').attr('aria-label', 'Scroll Down to Contact');
            
        } else {
            // Logic for middle/bottom of the page (Show UP arrow, link to home)
            $upArrow.show();
            $downArrow.hide();
            $button.attr('href', '#home').attr('aria-label', 'Scroll Up to Top');
        }
    }

    // Attach the update function to the scroll event and run once on load
    $(window).scroll(updateScrollButton);
    updateScrollButton(); 

    // Smooth scrolling click handler for the scroll button and Navbar
    $button.on('click', function(e) {
        const target = $(this).attr('href');
        if (target && target.startsWith('#')) {
            e.preventDefault();
            let scrollTopTarget = 0;
            
            if (target === '#contact') {
                scrollTopTarget = $contact.offset().top;
            } else if (target === '#home') {
                scrollTopTarget = 0; // Target the absolute top
            }
            
            // Animate the scroll using jQuery Easing
            $('html, body').animate({
                scrollTop: scrollTopTarget
            }, 800, 'swing'); 
        }
    });

});
