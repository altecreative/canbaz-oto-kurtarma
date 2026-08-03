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
        let slideInterval;
        let isAnimating = false;
        
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

        const slideNext = () => {
            if (isAnimating) return;
            isAnimating = true;
            const card = track.firstElementChild;
            if (!card) return;
            
            track.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
            
            if (isMobile) {
                const cardHeight = card.offsetHeight;
                track.style.transform = `translateY(-${cardHeight + 30}px)`;
            } else {
                const cardWidth = card.offsetWidth;
                track.style.transform = `translateX(-${cardWidth + 30}px)`;
            }

            setTimeout(() => {
                track.style.transition = 'none';
                track.style.transform = 'none';
                track.appendChild(card);
                updateMobileHeight();
                isAnimating = false;
            }, 600);
        };

        const slidePrev = () => {
            if (isAnimating) return;
            isAnimating = true;
            const card = track.lastElementChild;
            if (!card) return;
            
            track.style.transition = 'none';
            track.insertBefore(card, track.firstElementChild);
            
            if (isMobile) {
                const cardHeight = card.offsetHeight;
                track.style.transform = `translateY(-${cardHeight + 30}px)`;
                setTimeout(() => {
                    track.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
                    track.style.transform = 'none';
                }, 10);
            } else {
                const cardWidth = card.offsetWidth;
                track.style.transform = `translateX(-${cardWidth + 30}px)`;
                setTimeout(() => {
                    track.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
                    track.style.transform = 'none';
                }, 10);
            }

            setTimeout(() => {
                updateMobileHeight();
                isAnimating = false;
            }, 600);
        };

        const startAutoSlide = () => {
            clearInterval(slideInterval);
            slideInterval = setInterval(slideNext, 4000);
        };

        const resetAutoSlide = () => {
            startAutoSlide();
        };

        // Attach buttons
        document.getElementById('nextReview')?.addEventListener('click', () => { slideNext(); resetAutoSlide(); });
        document.getElementById('prevReview')?.addEventListener('click', () => { slidePrev(); resetAutoSlide(); });
        document.getElementById('nextReviewMobile')?.addEventListener('click', () => { slideNext(); resetAutoSlide(); });
        document.getElementById('prevReviewMobile')?.addEventListener('click', () => { slidePrev(); resetAutoSlide(); });

        // Start auto slide
        startAutoSlide();
    }
});
