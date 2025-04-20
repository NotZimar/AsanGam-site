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

// اسلایدر سایر خدمات
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.services-slide');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    
    let currentSlide = 1; // شروع با اسلاید وسط
    
    // تابع به‌روزرسانی اسلایدها
    function updateSlides() {
        slides.forEach((slide, index) => {
            slide.classList.remove('active');
            slide.querySelector('.service-card').classList.remove('highlighted');
            
            // محاسبه فاصله نسبت به اسلاید فعال
            const distance = index - currentSlide;
            
            if (index === currentSlide) {
                slide.classList.add('active');
                slide.querySelector('.service-card').classList.add('highlighted');
                slide.style.transform = 'scale(1.1) translateX(0)';
                slide.style.opacity = '1';
                slide.style.zIndex = '2';
            } else if (distance < 0) {
                // اسلایدهای سمت راست (قبلی)
                slide.style.transform = `translateX(${60 * Math.abs(distance)}%) scale(${0.8 - (Math.abs(distance) - 1) * 0.1})`;
                slide.style.opacity = Math.max(0.7 - (Math.abs(distance) - 1) * 0.2, 0.3);
                slide.style.zIndex = '1';
            } else {
                // اسلایدهای سمت چپ (بعدی)
                slide.style.transform = `translateX(${-60 * Math.abs(distance)}%) scale(${0.8 - (Math.abs(distance) - 1) * 0.1})`;
                slide.style.opacity = Math.max(0.7 - (Math.abs(distance) - 1) * 0.2, 0.3);
                slide.style.zIndex = '1';
            }
            
            // مخفی کردن اسلایدهایی که خیلی دور هستند
            if (Math.abs(distance) > 2) {
                slide.style.opacity = '0';
            }
        });
    }
    
    // رویداد کلیک دکمه قبلی
    prevArrow.addEventListener('click', function() {
        if (currentSlide > 0) {
            currentSlide--;
            updateSlides();
        }
    });
    
    // رویداد کلیک دکمه بعدی
    nextArrow.addEventListener('click', function() {
        if (currentSlide < slides.length - 1) {
            currentSlide++;
            updateSlides();
        }
    });
    
    // کلیک روی اسلایدها
    slides.forEach((slide, index) => {
        slide.addEventListener('click', function() {
            currentSlide = index;
            updateSlides();
        });
    });
    
    // اجرای اولیه
    updateSlides();
});

