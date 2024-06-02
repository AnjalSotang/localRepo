document.addEventListener('DOMContentLoaded', function () {
    const secondSection = document.querySelector('.secondSection');
    const slider = secondSection.querySelector('.slider');
    const prevArrow = secondSection.querySelector('.prev');
    const nextArrow = secondSection.querySelector('.next');
    
    prevArrow.addEventListener('click', function () {
        console.log('Prev arrow clicked'); // Check if prevArrow click event is triggered
        slider.scrollLeft -= 350;
    });

    nextArrow.addEventListener('click', function () {
        console.log('Next arrow clicked'); // Check if nextArrow click event is triggered
        slider.scrollLeft += 350;
    });


    const slder = document.querySelector('.slder'); // Select the slider element

    // Get all testimonials within the slider
    const testimonials = slder.querySelectorAll('.testi');

    // Set initial index
    let currentIndex = 0;

    // Function to hide all testimonials
    function hideTestimonials() {
        testimonials.forEach(testimonial => {
            testimonial.style.display = 'none';
        });
    }

    // Function to show next testimonial
    function showNextTestimonial() {
        // Hide all testimonials
        hideTestimonials();

        // Show the next testimonial
        testimonials[currentIndex].style.display = 'block';

        // Move to the next testimonial
        currentIndex++;
        if (currentIndex >= testimonials.length) {
            currentIndex = 0; // Loop back to the first testimonial
        }
    }

    // Initially hide all testimonials except the first one
    hideTestimonials();
    testimonials[currentIndex].style.display = 'block';

    // Set interval to switch testimonials every 3 seconds
    setInterval(showNextTestimonial, 3000);
});

