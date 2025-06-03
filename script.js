const testimonialTrack = document.getElementById('testimonialTrack');
const testimonialCards = document.querySelectorAll('.testimonial-card');
const testimonialScrollButtons = document.querySelectorAll('.scroll-btn');

let testimonialCurrentIndex = 0;

// Scroll to a specific testimonial
function scrollToTestimonial(index) {
  const cardWidth = testimonialCards[0].offsetWidth;
  testimonialTrack.style.transform = `translateX(-${index * cardWidth}px)`;
}

// Scroll with button click
testimonialScrollButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    testimonialCurrentIndex = (testimonialCurrentIndex + 1) % testimonialCards.length;
    scrollToTestimonial(testimonialCurrentIndex);
  });
});

// Adjust on resize
window.addEventListener('resize', () => {
  scrollToTestimonial(testimonialCurrentIndex);
});

// Auto-slide for mobile
function startTestimonialAutoSlide() {
  if (window.innerWidth <= 768) {
    setInterval(() => {
      testimonialCurrentIndex = (testimonialCurrentIndex + 1) % testimonialCards.length;
      scrollToTestimonial(testimonialCurrentIndex);
    }, 2000);
  }
}
startTestimonialAutoSlide();

// Manual swipe
let testimonialTouchStartX = 0;
let testimonialTouchEndX = 0;

testimonialTrack.addEventListener('touchstart', (e) => {
  testimonialTouchStartX = e.touches[0].clientX;
});

testimonialTrack.addEventListener('touchmove', (e) => {
  testimonialTouchEndX = e.touches[0].clientX;
});

testimonialTrack.addEventListener('touchend', () => {
  const swipeDistance = testimonialTouchStartX - testimonialTouchEndX;

  if (swipeDistance > 50) {
    // Swipe left
    testimonialCurrentIndex = (testimonialCurrentIndex + 1) % testimonialCards.length;
    scrollToTestimonial(testimonialCurrentIndex);
  } else if (swipeDistance < -50) {
    // Swipe right
    testimonialCurrentIndex = (testimonialCurrentIndex - 1 + testimonialCards.length) % testimonialCards.length;
    scrollToTestimonial(testimonialCurrentIndex);
  }
});


const portfolioTrack = document.getElementById('portfolioTrack');
const portfolioButtons = document.querySelectorAll('.portfolio-scroll-btn');
let portfolioIndex = 0;
const totalPortfolioCards = portfolioTrack.children.length;
let autoSlideInterval = null;

// Move to specific card
function moveToPortfolio(index) {
  if (index < 0) index = totalPortfolioCards - 1;
  if (index >= totalPortfolioCards) index = 0;
  portfolioIndex = index;
  portfolioTrack.style.transform = `translateX(-${portfolioIndex * 100}%)`;
}

// Scroll on button click
portfolioButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    moveToPortfolio(portfolioIndex + 1);
  });
});

// Auto-slide for mobile
function startAutoSlide() {
  if (window.innerWidth <= 768) {
    autoSlideInterval = setInterval(() => {
      moveToPortfolio(portfolioIndex + 1);
    }, 2000);
  }
}

function stopAutoSlide() {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval);
    autoSlideInterval = null;
  }
}

// Touch sliding (mobile swipe)
let startX = 0;
let endX = 0;
let isTouchOnIframe = false;

portfolioTrack.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
  isTouchOnIframe = e.target.classList.contains('video-overlay');
});

portfolioTrack.addEventListener('touchmove', (e) => {
  endX = e.touches[0].clientX;
});

portfolioTrack.addEventListener('touchend', () => {
  if (isTouchOnIframe) return;
  if (startX - endX > 50) {
    moveToPortfolio(portfolioIndex + 1); // swipe left
  } else if (endX - startX > 50) {
    moveToPortfolio(portfolioIndex - 1); // swipe right
  }
});


document.querySelectorAll('.video-overlay').forEach((overlay) => {
  overlay.addEventListener('click', () => {
    stopAutoSlide();
    overlay.style.display = 'none'; 
  });
});

// Start auto-slide
startAutoSlide();







//faq

document.querySelectorAll('.faq-trigger').forEach(trigger => {
  const targetId = trigger.getAttribute('data-target');
  const answer = document.getElementById(targetId);

  trigger.style.cursor = 'pointer';

  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isVisible = answer.style.display === 'block';
    answer.style.display = isVisible ? 'none' : 'block';

    if (!isVisible) {
      answer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

document.querySelectorAll('.faq-trigger').forEach(trigger => {
  trigger.setAttribute('title', 'Click here to expand');
});




document.querySelectorAll('.info-card .card-header').forEach(header => {
  const cardBody = header.nextElementSibling;

  header.style.cursor = 'pointer';

  header.addEventListener('click', () => {
    const isOpen = cardBody.style.display === 'block';

    // Toggle visibility of the card body
    cardBody.style.display = isOpen ? 'none' : 'block';
  });
});


document.querySelectorAll('.card-header').forEach(header => {
  header.setAttribute('title', 'Click here to expand');
});


//menu-Toggle
function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('active');
}


//animation number
// Number Animations
// Number Animations
function animateCount(el, target, duration = 2000) {
  let start = 1;
  const stepTime = Math.max(Math.floor(duration / (target - start)), 20);

  const counter = setInterval(() => {
    el.textContent = start;
    start++;

    if (start > target) {
      clearInterval(counter);
    }
  }, stepTime);
}

function animateCount(el, target, duration = 2000, suffix = "+") {
  let start = 1;
  let current = start;

  const increment = target > 500 ? Math.ceil(target / (duration / 30)) : 1;
  const intervalTime = 30;

  const counter = setInterval(() => {
    current += increment;
    if (current >= target) {
      el.textContent = target.toLocaleString() + suffix;
      clearInterval(counter);
    } else {
      el.textContent = current.toLocaleString() + suffix;
    }
  }, intervalTime);
}

// scrolling animation
const animatedElements = document.querySelectorAll('.sm-boxes p');
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.textContent.replace(/,/g, '').trim());

      if (!el.dataset.animated) {
        animateCount(el, target);
        el.dataset.animated = "true";
      }

      obs.unobserve(el);
    }
  });
}, { threshold: 0.5 });

animatedElements.forEach(p => {
  observer.observe(p);
});
