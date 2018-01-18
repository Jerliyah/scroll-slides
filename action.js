// DOM Grab
const slides = Array.from( [...document.querySelectorAll('img.slide-in')] );


// Functions
function debounce(func, wait = 20, immediate = true) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };

        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

function peek_slides() {
    let scroll_bottom = window.scrollY + window.innerHeight;
    let center_screen = window.innerHeight / 2

    slides.forEach( (slide) => {
        // Ugh, I don't quie understand the math
        let scroll_in_at = scroll_bottom - (slide.height / 2)
        let slide_bottom = slide.offsetTop + slide.height
        
        let is_half_shown = scroll_in_at > slide.offsetTop;
        let is_not_scrolled_past = window.scrollY < slide_bottom

        if( is_half_shown && is_not_scrolled_past ) {
            slide.classList.add('active')
        }
        else {
            slide.classList.remove('active')
        }
    })
}

// Events
window.addEventListener('scroll', debounce(peek_slides))