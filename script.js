class CursorEffect {
    constructor() {
        this.cursor = document.querySelector('.cursor-effect');
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

document.addEventListener('DOMContentLoaded', () => {
    new CursorEffect();
});

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

document.addEventListener('DOMContentLoaded', () => {
    new CursorEffect();
    new ScrollAnimator();
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
});

// فیلتر نمونه کارها بر اساس دسته‌بندی
document.querySelectorAll('.portfolio-filter button').forEach(button => {
    button.addEventListener('click', () => {
        // حذف کلاس active از همه دکمه‌ها
        document.querySelectorAll('.portfolio-filter button').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // افزودن کلاس active به دکمه انتخاب شده
        button.classList.add('active');
        
        // دریافت فیلتر انتخاب شده
        const filter = button.dataset.filter;
        
        // نمایش/مخفی کردن نمونه‌ها
        document.querySelectorAll('.portfolio-item').forEach(item => {
            if (filter === 'all' || item.classList.contains(filter)) {
                item.style.display = 'block';
                item.classList.add('animate__fadeIn');
            } else {
                item.style.display = 'none';
            }
        });
    });
});


// salam

class Slider {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.navButtons = document.querySelectorAll('.nav-btn');
        this.currentSlide = 0;
        this.autoPlayInterval = null;
        this.init();
    }

    init() {
        // شروع اتوپلی
        this.startAutoPlay();

        // کنترل دکمه‌های ناوبری
        this.navButtons.forEach((button, index) => {
            button.addEventListener('click', () => this.goToSlide(index));
        });
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
}

// راه‌اندازی اسلایدر
document.addEventListener('DOMContentLoaded', () => new Slider());