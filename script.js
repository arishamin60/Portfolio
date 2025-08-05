   // Toggle mobile menu
    const toggleButton = document.querySelector('.navbar__toggle');
    const navLinks = document.querySelector('.navbar__links');
    const cta = document.querySelector('.navbar__cta');

    toggleButton.addEventListener('click', () => {
      const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true';
      toggleButton.setAttribute('aria-expanded', !isExpanded);
      toggleButton.textContent = isExpanded ? '☰' : '✕';
      navLinks.classList.toggle('active');
      cta.classList.toggle('active');
    });

    // Active link highlighting
    const links = document.querySelectorAll('.navbar__links a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        links.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      });
    });

    // Scroll effect
    window.addEventListener('scroll', () => {
      const navbar = document.querySelector('.navbar');
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
    const slides = document.querySelectorAll('.hero__slide');
    const navDots = document.querySelectorAll('.hero__nav-dot');
    const prevArrow = document.querySelector('.hero__nav-arrow--prev');
    const nextArrow = document.querySelector('.hero__nav-arrow--next');
    let currentSlide = 0;
    let autoSlideInterval;
    let touchStartX = 0;
    let touchEndX = 0;

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
        slide.setAttribute('aria-hidden', i !== index);
      });
      navDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
        dot.setAttribute('aria-selected', i === index);
      });
      currentSlide = index;

      // Trigger typing animation for active slide
      const activeSlide = slides[index];
      const spans = activeSlide.querySelectorAll('h1 span');
      spans.forEach((span, i) => {
        span.style.animation = 'none';
        span.offsetHeight; // Trigger reflow
        span.style.animation = `typeEffect 1s cubic-bezier(0.4, 0, 0.2, 1) ${i * 0.2}s forwards`;
      });
    }

    function nextSlide() {
      const next = (currentSlide + 1) % slides.length;
      showSlide(next);
    }

    function prevSlide() {
      const prev = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(prev);
    }

    function startAutoSlide() {
      autoSlideInterval = setInterval(nextSlide, 6000);
    }

    function stopAutoSlide() {
      clearInterval(autoSlideInterval);
    }

    // Navigation dots
    navDots.forEach(dot => {
      dot.addEventListener('click', () => {
        stopAutoSlide();
        showSlide(parseInt(dot.dataset.slide));
        startAutoSlide();
      });
      dot.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          stopAutoSlide();
          showSlide(parseInt(dot.dataset.slide));
          startAutoSlide();
        }
      });
    });

    // Arrow navigation
    prevArrow.addEventListener('click', () => {
      stopAutoSlide();
      prevSlide();
      startAutoSlide();
    });

    nextArrow.addEventListener('click', () => {
      stopAutoSlide();
      nextSlide();
      startAutoSlide();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        stopAutoSlide();
        prevSlide();
        startAutoSlide();
      } else if (e.key === 'ArrowRight') {
        stopAutoSlide();
        nextSlide();
        startAutoSlide();
      }
    });

    // Swipe support for mobile
    document.querySelector('.hero').addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    document.querySelector('.hero').addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 50) {
        stopAutoSlide();
        nextSlide();
        startAutoSlide();
      } else if (touchEndX - touchStartX > 50) {
        stopAutoSlide();
        prevSlide();
        startAutoSlide();
      }
    });

    // Preload images
    const images = [
      'https://via.placeholder.com/600x400?text=Code+Editor',
      'https://via.placeholder.com/600x400?text=Project+Showcase',
      'https://via.placeholder.com/600x400?text=Contact+Illustration'
    ];
    images.forEach(src => {
      const img = new Image();
      img.src = src;
    });

    // Start auto-slide
    startAutoSlide();

    // Pause auto-slide on hover or focus
    document.querySelector('.hero').addEventListener('mouseenter', stopAutoSlide);
    document.querySelector('.hero').addEventListener('mouseleave', startAutoSlide);
    document.querySelector('.hero').addEventListener('focusin', stopAutoSlide);
    document.querySelector('.hero').addEventListener('focusout', startAutoSlide);