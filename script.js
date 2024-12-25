document.addEventListener('DOMContentLoaded', function() {
    // Get all nav items
    const navItems = document.querySelectorAll('.nav-item');

    // Handle nav item clicks
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            navItems.forEach(navItem => {
                navItem.classList.remove('nav-item--active');
            });
            
            // Add active class to clicked item
            this.classList.add('nav-item--active');
        });

        // Handle hover effects
        item.addEventListener('mouseenter', function() {
            const dropdownIcon = this.querySelector('.dropdown-icon');
            dropdownIcon.style.transform = 'rotate(180deg)';
        });

        item.addEventListener('mouseleave', function() {
            const dropdownIcon = this.querySelector('.dropdown-icon');
            dropdownIcon.style.transform = 'rotate(0deg)';
        });
    });

    // Mobile menu functionality
    function createMobileMenu() {
        const navbar = document.querySelector('.navbar__container');
        const navLinks = document.querySelector('.nav-links');
        
        // Create mobile menu button if it doesn't exist
        if (!document.querySelector('.mobile-menu-button')) {
            const mobileMenuButton = document.createElement('button');
            mobileMenuButton.classList.add('mobile-menu-button');
            mobileMenuButton.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M3 12H21" stroke="#FF8C00" stroke-width="2"/>
                    <path d="M3 6H21" stroke="#FF8C00" stroke-width="2"/>
                    <path d="M3 18H21" stroke="#FF8C00" stroke-width="2"/>
                </svg>
            `;
            
            navbar.appendChild(mobileMenuButton);

            // Toggle mobile menu
            mobileMenuButton.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                mobileMenuButton.classList.toggle('active');
            });
        }
    }

    // Handle window resize
    function handleResize() {
        if (window.innerWidth <= 768) {
            createMobileMenu();
        } else {
            const mobileMenuButton = document.querySelector('.mobile-menu-button');
            if (mobileMenuButton) {
                mobileMenuButton.remove();
            }
            document.querySelector('.nav-links').classList.remove('active');
        }
    }

    // Initial check
    handleResize();

    // Listen for window resize
    window.addEventListener('resize', handleResize);

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        const navLinks = document.querySelector('.nav-links');
        const mobileMenuButton = document.querySelector('.mobile-menu-button');
        
        if (navLinks.classList.contains('active') && 
            !e.target.closest('.nav-links') && 
            !e.target.closest('.mobile-menu-button')) {
            navLinks.classList.remove('active');
            mobileMenuButton?.classList.remove('active');
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const cityButtons = document.querySelectorAll('.city-btn');
    const clubTitle = document.querySelector('.club-info__title');
    const clubAddress = document.querySelector('.club-info__address');

    // Club information for each city
    const clubInfo = {
        moscow: {
            title: 'FIVE CLUB',
            address: 'г. Москва, Лиственничная аллея 16А, к. 3'
        },
        spb: {
            title: 'FIVE CLUB',
            address: 'г. Санкт-Петербург, ул. Бабушкина 14'
        },
        volgograd: {
            title: 'FIVE CLUB',
            address: 'г. Волгоград, пр. имени В.И. Ленина, 49Б'
        },
        kamyshin: {
            title: 'FIVE CLUB',
            address: 'г. Камышин, пр. Феактистова, 8'
        },
        kazan: {
            title: 'FIVE CLUB',
            address: 'г. Казань, ул. Батаническая, 14А'
        },
        krasnodar: {
            title: 'FIVE CLUB',
            address: 'г. Краснодар, ул. Садовая, 1'
        }
    };

    cityButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            cityButtons.forEach(btn => btn.classList.remove('city-btn--active'));
            
            // Add active class to clicked button
            button.classList.add('city-btn--active');
            
            // Update club information
            const cityData = clubInfo[button.dataset.city];
            clubTitle.textContent = cityData.title;
            clubAddress.textContent = cityData.address;
        });
    });
});
class Carousel {
    constructor() {
        this.carousel = document.querySelector('.carousel');
        this.track = this.carousel.querySelector('.carousel-track');
        this.slides = Array.from(this.carousel.querySelectorAll('.carousel-slide'));
        this.indicators = Array.from(this.carousel.querySelectorAll('.indicator'));
        this.prevButton = this.carousel.querySelector('.prev');
        this.nextButton = this.carousel.querySelector('.next');
        
        this.currentIndex = 0;
        this.slideCount = this.slides.length;
        this.touchStartX = 0;
        this.touchEndX = 0;

        this.init();
    }

    init() {
        // Event listeners
        this.prevButton.addEventListener('click', () => this.prev());
        this.nextButton.addEventListener('click', () => this.next());
        
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
        });

        // Touch events
        this.track.addEventListener('touchstart', (e) => {
            this.touchStartX = e.touches[0].clientX;
        });

        this.track.addEventListener('touchend', (e) => {
            this.touchEndX = e.changedTouches[0].clientX;
            this.handleSwipe();
        });

        // Initial state
        this.updateCarousel();
    }

    handleSwipe() {
        const swipeDistance = this.touchEndX - this.touchStartX;
        const minSwipeDistance = 50;

        if (Math.abs(swipeDistance) > minSwipeDistance) {
            if (swipeDistance > 0) {
                this.prev();
            } else {
                this.next();
            }
        }
    }

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.slideCount) % this.slideCount;
        this.updateCarousel();
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.slideCount;
        this.updateCarousel();
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.updateCarousel();
    }

    updateCarousel() {
        // Update slide positions
        this.track.style.transform = `translateX(-${this.currentIndex * 100}%)`;

        // Update slides' aria-hidden
        this.slides.forEach((slide, index) => {
            slide.setAttribute('aria-hidden', index !== this.currentIndex);
        });

        // Update indicators
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentIndex);
            indicator.setAttribute('aria-selected', index === this.currentIndex);
        });
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Carousel();
});
// Add hover effect to grid items
document.querySelectorAll('.grid-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.querySelector('.image-container').style.transform = 'scale(1.02)';
        this.querySelector('.image-container').style.transition = 'transform 0.3s ease';
    });

    item.addEventListener('mouseleave', function() {
        this.querySelector('.image-container').style.transform = 'scale(1)';
    });
});

// Ensure images are loaded before displaying
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.grid-image');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
    });
});
document.querySelectorAll('.app-store-link').forEach(link => {
    link.addEventListener('click', () => {
      alert('Переход в магазин приложений');
    });
  });