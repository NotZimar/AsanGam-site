// همه کلاس‌ها
class CursorEffect {
    constructor() {
        this.cursor = document.querySelector('.cursor-effect');
        if (!this.cursor) return;
        
        this.init();
    }

    init() {
        document.addEventListener('mousemove', this.moveCursor.bind(this));
        this.addHoverEffects();
        this.cursor.classList.add('visible'); // نمایش افکت موس
    }

    moveCursor(e) {
        const { clientX, clientY } = e;
        const { style } = this.cursor;
        
        style.left = `${clientX}px`;
        style.top = `${clientY}px`;
        
        style.transition = 'transform 0.2s ease-out';
        style.transform = `translate(-50%, -50%) scale(1.2)`;
        
        setTimeout(() => {
            style.transition = 'transform 0.4s cubic-bezier(0.22, 0.61, 0.36, 1)';
            style.transform = `translate(-50%, -50%) scale(1)`;
        }, 100);
    }

    addHoverEffects() {
        const hoverElements = document.querySelectorAll('.animate-hover, a, button, .price-card');
        
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.style.transform = `translate(-50%, -50%) scale(2)`;
                this.cursor.style.background = 'radial-gradient(circle, rgba(155,126,222,0.4) 0%, rgba(155,126,222,0) 70%)';
            });
            
            el.addEventListener('mouseleave', () => {
                this.cursor.style.transform = `translate(-50%, -50%) scale(1)`;
                this.cursor.style.background = 'radial-gradient(circle, rgba(155,126,222,0.2) 0%, rgba(155,126,222,0) 70%)';
            });
        });
    }
}

class ScrollAnimator {
    constructor() {
        this.observer = new IntersectionObserver(this.handleIntersect.bind(this), {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });
        this.init();
    }

    init() {
        document.querySelectorAll('[data-animate], .ai-message').forEach(el => {
            this.observer.observe(el);
        });
    }

    handleIntersect(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', entry.target.dataset.animate);
                if (entry.target.classList.contains('ai-message')) {
                    entry.target.classList.add('visible');
                }
            }
        });
    }
}

class Slider {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.navButtons = document.querySelectorAll('.nav-btn');
        this.sliderContent = document.querySelector('.slider-content');
        
        if (!this.slides.length || !this.sliderContent) return;
        
        this.currentSlide = 0;
        this.autoPlayInterval = null;
        this.touchStartX = 0;
        this.touchEndX = 0;
        this.init();
    }

    init() {
        // شروع اتوپلی
        this.startAutoPlay();

        // کنترل دکمه‌های ناوبری
        this.navButtons.forEach((button, index) => {
            button.addEventListener('click', () => this.goToSlide(index));
        });

        // اضافه کردن پشتیبانی از swipe
        this.setupSwipeSupport();
    }

    setupSwipeSupport() {
        // تشخیص لمس برای موبایل
        this.sliderContent.addEventListener('touchstart', (e) => {
            this.touchStartX = e.changedTouches[0].screenX;
        }, {passive: true});
        
        this.sliderContent.addEventListener('touchend', (e) => {
            this.touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        }, {passive: true});

        // تشخیص درگ برای دسکتاپ
        this.sliderContent.addEventListener('mousedown', (e) => {
            this.touchStartX = e.screenX;
            // فعال کردن حالت درگ
            this.sliderContent.style.cursor = 'grabbing';
            document.addEventListener('mouseup', this.handleMouseUp);
        });

        const handleMouseUp = (e) => {
            this.touchEndX = e.screenX;
            this.handleSwipe();
            // غیرفعال کردن حالت درگ
            this.sliderContent.style.cursor = 'grab';
            document.removeEventListener('mouseup', this.handleMouseUp);
        };

        this.handleMouseUp = handleMouseUp.bind(this);
    }

    handleSwipe() {
        // محاسبه فاصله swipe
        const swipeDistance = this.touchEndX - this.touchStartX;
        const threshold = 50; // آستانه برای تشخیص swipe

        // اگر به اندازه کافی swipe شده باشد
        if (Math.abs(swipeDistance) > threshold) {
            // اگر RTL است، جهت‌ها را برعکس می‌کنیم
            if (swipeDistance > 0) {
                // swipe به راست در RTL به معنی حرکت به اسلاید قبلی است
                this.prevSlide();
            } else {
                // swipe به چپ در RTL به معنی حرکت به اسلاید بعدی است
                this.nextSlide();
            }
        }
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => this.nextSlide(), 5000);
    }

    resetAutoPlay() {
        clearInterval(this.autoPlayInterval);
        this.startAutoPlay();
    }

    goToSlide(index) {
        this.slides[this.currentSlide].classList.remove('active');
        this.navButtons[this.currentSlide].classList.remove('active');
        
        this.currentSlide = index;
        
        this.slides[this.currentSlide].classList.add('active');
        this.navButtons[this.currentSlide].classList.add('active');
        
        this.resetAutoPlay();
    }

    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }

    prevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
    }
}

class MobileMenu {
    constructor() {
        this.hamburger = document.getElementById('mobile-menu-toggle');
        this.navMenu = document.getElementById('mobile-menu');
        this.body = document.body;
        this.navLinks = document.querySelectorAll('.nav-link');
        
        if (!this.hamburger || !this.navMenu) return;
        
        this.init();
    }
    
    init() {
        this.closeMenu();
        
        this.hamburger.addEventListener('click', this.toggleHandler.bind(this));
        
        // Close menu when clicking on nav links
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMenu();
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.navMenu.contains(e.target) && !this.hamburger.contains(e.target) && this.navMenu.classList.contains('active')) {
                this.closeMenu();
            }
        });
    }
    
    toggleHandler() {
        if (this.navMenu.classList.contains('active')) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }
    
    openMenu() {
        this.hamburger.classList.add('active');
        this.navMenu.classList.add('active');
        this.body.classList.add('no-scroll');
    }
    
    closeMenu() {
        this.hamburger.classList.remove('active');
        this.navMenu.classList.remove('active');
        this.body.classList.remove('no-scroll');
    }
}

class PortfolioFilter {
    constructor() {
        this.filterButtons = document.querySelectorAll('.portfolio-filter button');
        this.portfolioItems = document.querySelectorAll('.portfolio-item');
        
        if (!this.filterButtons.length) return;
        
        this.init();
    }
    
    init() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // حذف کلاس active از همه دکمه‌ها
                this.filterButtons.forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // افزودن کلاس active به دکمه انتخاب شده
                button.classList.add('active');
                
                // دریافت فیلتر انتخاب شده
                const filter = button.dataset.filter;
                
                // نمایش/مخفی کردن نمونه‌ها
                this.portfolioItems.forEach(item => {
                    if (filter === 'all' || item.classList.contains(filter)) {
                        item.style.display = 'block';
                        item.classList.add('animate__fadeIn');
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
}

class SmoothScroll {
    constructor() {
        this.anchors = document.querySelectorAll('a[href^="#"]');
        if (!this.anchors.length) return;
        
        this.init();
    }
    
    init() {
        this.anchors.forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                
                if (targetId === '#') return;
                
                const target = document.querySelector(targetId);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// راه‌اندازی همه کامپوننت‌ها در لود صفحه - فقط یک بار
document.addEventListener('DOMContentLoaded', () => {
    new CursorEffect();
    new ScrollAnimator();
    new MobileMenu();
    new Slider();
    new PortfolioFilter();
    new SmoothScroll();
    AOS.init();
});