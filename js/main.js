// Mobile Menu Logic
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const closeMenuBtn = document.getElementById('close-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

function toggleMenu() {
    const isHidden = mobileMenu.classList.contains('translate-x-full');
    if (isHidden) {
        mobileMenu.classList.remove('translate-x-full');
        document.body.style.overflow = 'hidden';
    } else {
        mobileMenu.classList.add('translate-x-full');
        document.body.style.overflow = '';
    }
}

if (mobileMenuBtn && closeMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', toggleMenu);
    closeMenuBtn.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });
}

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('bg-background/80', 'backdrop-blur-md', 'shadow-lg');
        navbar.classList.remove('bg-transparent');
    } else {
        navbar.classList.remove('bg-background/80', 'backdrop-blur-md', 'shadow-lg');
        navbar.classList.add('bg-transparent');
    }
});

// GSAP Animations
document.addEventListener('DOMContentLoaded', () => {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Hero Text Stagger
    gsap.to('.hero-word', {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'power4.out',
        delay: 0.2
    });

    // Process Line Animation
    gsap.to('#process-line', {
        width: '100%',
        duration: 1.5,
        ease: 'none',
        scrollTrigger: {
            trigger: '#process-line',
            start: 'top 80%',
            end: 'bottom 40%',
            scrub: 1
        }
    });

    // Animate Sections on Scroll
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        gsap.fromTo(section.children,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                }
            }
        );
    });
});

// Modal Logic
const modal = document.getElementById('contact-modal');

function openModal() {
    if (!modal) return;
    modal.classList.remove('hidden');
    // Small delay to allow display:block to apply before opacity transition
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        modal.classList.add('opacity-100');
    }, 10);
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    if (!modal) return;
    modal.classList.remove('opacity-100');
    modal.classList.add('opacity-0');

    // Wait for transition to finish
    setTimeout(() => {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }, 300);
}

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

// Intercept #contact links
document.addEventListener('DOMContentLoaded', () => {
    const contactLinks = document.querySelectorAll('a[href="#contact"]');
    contactLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
            // Close mobile menu if open
            if (typeof toggleMenu === 'function' && !mobileMenu.classList.contains('translate-x-full')) {
                toggleMenu();
            }
        });
    });
});

// Case Studies Carousel Logic
document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('case-studies-track');
    const prevBtn = document.getElementById('prev-case-study');
    const nextBtn = document.getElementById('next-case-study');

    if (track && prevBtn && nextBtn) {
        const getScrollAmount = () => {
            const card = track.firstElementChild;
            // gap-8 is 2rem = 32px
            return card ? card.offsetWidth + 32 : 0;
        };

        const scrollNext = () => {
            const isAtEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 5;
            if (isAtEnd) {
                track.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                track.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
            }
        };

        nextBtn.addEventListener('click', () => {
            track.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
        });

        prevBtn.addEventListener('click', () => {
            track.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
        });

        const updateButtons = () => {
            // Use a small tolerance for float calculations
            const isAtStart = track.scrollLeft <= 5;
            const isAtEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 5;

            prevBtn.disabled = isAtStart;
            nextBtn.disabled = isAtEnd;

            prevBtn.style.opacity = isAtStart ? '0.5' : '1';
            prevBtn.style.cursor = isAtStart ? 'not-allowed' : 'pointer';

            nextBtn.style.opacity = isAtEnd ? '0.5' : '1';
            nextBtn.style.cursor = isAtEnd ? 'not-allowed' : 'pointer';
        };

        track.addEventListener('scroll', updateButtons);
        window.addEventListener('resize', updateButtons);

        // Initial check after a short delay to ensure layout is settled
        setTimeout(updateButtons, 100);

        // Auto Scroll Logic
        let autoScrollInterval;
        const startAutoScroll = () => {
            stopAutoScroll(); // Clear any existing interval
            autoScrollInterval = setInterval(scrollNext, 3000); // Scroll every 3 seconds
        };

        const stopAutoScroll = () => {
            if (autoScrollInterval) {
                clearInterval(autoScrollInterval);
            }
        };

        // Start auto-scroll initially
        startAutoScroll();

        // Pause on hover/interaction
        const container = track.parentElement; // The .relative.group container
        if (container) {
            container.addEventListener('mouseenter', stopAutoScroll);
            container.addEventListener('mouseleave', startAutoScroll);
            container.addEventListener('touchstart', stopAutoScroll);
            container.addEventListener('touchend', startAutoScroll);
        }
    }
});

// Savings Calculator Logic
document.addEventListener('DOMContentLoaded', () => {
    const hoursSlider = document.getElementById('hours-slider');
    const costSlider = document.getElementById('cost-slider');
    const hoursDisplay = document.getElementById('hours-display');
    const costDisplay = document.getElementById('cost-display');

    // New Elements
    const manualCostDisplay = document.getElementById('manual-cost-display');
    const fluintyCostDisplay = document.getElementById('fluinty-cost-display');
    const savingsDisplay = document.getElementById('savings-display');
    const fluintyBar = document.getElementById('fluinty-bar');

    if (hoursSlider && costSlider) {
        function updateCalculator() {
            const hours = parseInt(hoursSlider.value);
            const cost = parseInt(costSlider.value);

            // Calculations
            const monthlyManualCost = hours * cost;
            const annualManualCost = monthlyManualCost * 12;

            // Assumption: Fluinty reduces cost by 80% (Efficiency Gain)
            const annualFluintyCost = annualManualCost * 0.2;
            const annualSavings = annualManualCost - annualFluintyCost;

            // Update displays
            hoursDisplay.textContent = hours;
            costDisplay.textContent = cost;

            if (manualCostDisplay) manualCostDisplay.textContent = annualManualCost.toLocaleString('pl-PL') + ' PLN';
            if (fluintyCostDisplay) fluintyCostDisplay.textContent = annualFluintyCost.toLocaleString('pl-PL') + ' PLN';
            if (savingsDisplay) savingsDisplay.textContent = annualSavings.toLocaleString('pl-PL');

            // Update Visual Bars
            // Manual bar is always 100% (reference)
            // Fluinty bar is 20% (since cost is 20% of manual)
            if (fluintyBar) {
                // We keep it fixed at 20% to visually represent the 80% savings constant
                // Or we could make it dynamic if the efficiency factor changed, but for now it's static logic
                fluintyBar.style.width = '20%';
            }

            // Update slider backgrounds (Progress fill)
            updateSliderBackground(hoursSlider);
            updateSliderBackground(costSlider);
        }

        function updateSliderBackground(slider) {
            const min = parseInt(slider.min);
            const max = parseInt(slider.max);
            const val = parseInt(slider.value);
            const percentage = ((val - min) / (max - min)) * 100;

            // Linear gradient: Teal (filled) | White/10% (empty) for Dark Theme
            slider.style.background = `linear-gradient(to right, #00C4B4 ${percentage}%, rgba(255, 255, 255, 0.1) ${percentage}%)`;
        }

        // Event Listeners
        hoursSlider.addEventListener('input', updateCalculator);
        costSlider.addEventListener('input', updateCalculator);

        // Initial call
        updateCalculator();
    }
});
