// Intersection Observer for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const reveals = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Trigger only once
            }
        });
    }, revealOptions);

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.background = 'rgba(11, 15, 25, 0.95)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.padding = '15px 0';
            navbar.style.background = 'rgba(11, 15, 25, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Run once on load to trigger hero animations if already in view
    setTimeout(() => {
        const heroReveals = document.querySelectorAll('.hero .reveal');
        heroReveals.forEach(reveal => reveal.classList.add('active'));
    }, 100);

    // Reviews Slider Logic
    const sliderContainer = document.getElementById('sliderContainer');
    const track = document.getElementById('reviewSlider');
    
    if (track && sliderContainer) {
        let isMobile = window.innerWidth <= 768;
        
        // Helper to update container height on mobile so exactly 3 cards fit
        const updateMobileHeight = () => {
            if (isMobile) {
                const cards = track.children;
                if (cards.length >= 3) {
                    let height = 0;
                    for (let i = 0; i < 3; i++) {
                        height += cards[i].offsetHeight;
                    }
                    height += 60; // 2 gaps of 30px
                    sliderContainer.style.height = height + 'px';
                }
            } else {
                sliderContainer.style.height = 'auto';
            }
        };

        window.addEventListener('resize', () => {
            isMobile = window.innerWidth <= 768;
            track.style.transition = 'none';
            track.style.transform = 'none';
            updateMobileHeight();
        });

        // Initial setup
        setTimeout(updateMobileHeight, 500); // wait for styles to apply

        // Sliding interval
        setInterval(() => {
            const card = track.firstElementChild;
            if (!card) return;
            
            track.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
            
            if (isMobile) {
                const cardHeight = card.offsetHeight;
                const gap = 30;
                track.style.transform = `translateY(-${cardHeight + gap}px)`;
            } else {
                const cardWidth = card.offsetWidth;
                const gap = 30;
                track.style.transform = `translateX(-${cardWidth + gap}px)`;
            }

            // Wait for transition to finish, then move element to back
            setTimeout(() => {
                track.style.transition = 'none';
                track.style.transform = 'none';
                track.appendChild(card);
                updateMobileHeight(); // update height in case text lengths changed it
            }, 600);
            
        }, 4000); // Slide every 4 seconds
    }
});
