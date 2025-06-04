const testimonialTrack = document.getElementById('testimonialTrack');
const testimonialCards = document.querySelectorAll('.testimonial-card');
const testimonialScrollButtons = document.querySelectorAll('.scroll-btn');

let testimonialCurrentIndex = 0;

function scrollToTestimonial(index) {
  const cardWidth = testimonialCards[0].offsetWidth;
  testimonialTrack.style.transform = `translateX(-${index * cardWidth}px)`;
}

testimonialScrollButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    testimonialCurrentIndex = (testimonialCurrentIndex + 1) % testimonialCards.length;
    scrollToTestimonial(testimonialCurrentIndex);
  });
});

window.addEventListener('resize', () => {
  scrollToTestimonial(testimonialCurrentIndex);
});

function startTestimonialAutoSlide() {
  if (window.innerWidth <= 768) {
    setInterval(() => {
      testimonialCurrentIndex = (testimonialCurrentIndex + 1) % testimonialCards.length;
      scrollToTestimonial(testimonialCurrentIndex);
    }, 2000);
  }
}
startTestimonialAutoSlide();

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
    testimonialCurrentIndex = (testimonialCurrentIndex + 1) % testimonialCards.length;
    scrollToTestimonial(testimonialCurrentIndex);
  } else if (swipeDistance < -50) {
    testimonialCurrentIndex = (testimonialCurrentIndex - 1 + testimonialCards.length) % testimonialCards.length;
    scrollToTestimonial(testimonialCurrentIndex);
  }
});



//portfolio

const portfolioTrack = document.getElementById('portfolioTrack');
const portfolioCards = document.querySelectorAll('.portfolio-card');
const totalCards = portfolioCards.length;
let currentIndex = 0;
let autoSlideInterval = null;

function scrollToCard(index) {
  if (index < 0) index = totalCards - 1;
  if (index >= totalCards) index = 0;
  currentIndex = index;
  const cardWidth = portfolioCards[0].offsetWidth;

  portfolioTrack.scrollTo({
    left: cardWidth * currentIndex,
    behavior: 'smooth',
  });
}

function startAutoSlide() {
  if (!autoSlideInterval) {
    autoSlideInterval = setInterval(() => {
      scrollToCard(currentIndex + 1);
    }, 5000);
  }
}

function stopAutoSlide() {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval);
    autoSlideInterval = null;
  }
}

// Scroll to current card on resize to keep alignment
window.addEventListener('resize', () => {
  scrollToCard(currentIndex);
});

// Start auto sliding initially
startAutoSlide();

// Pause auto-slide and play video on clicking thumbnail
document.querySelectorAll('.portfolio-thumbnail').forEach(thumbnail => {
  thumbnail.addEventListener('click', () => {
    thumbnail.style.opacity = '0';
    thumbnail.style.pointerEvents = 'none'; // So it can't be clicked again
    stopAutoSlide();
  });
});
const portfolioTrack = document.getElementById('portfolioTrack');
const portfolioCards = document.querySelectorAll('.portfolio-card');
const totalCards = portfolioCards.length;
let currentIndex = 0;
let autoSlideInterval = null;

function scrollToCard(index) {
  if (index < 0) index = totalCards - 1;
  if (index >= totalCards) index = 0;
  currentIndex = index;
  const cardWidth = portfolioCards[0].offsetWidth;

  portfolioTrack.scrollTo({
    left: cardWidth * currentIndex,
    behavior: 'smooth',
  });
}

function startAutoSlide() {
  if (!autoSlideInterval) {
    autoSlideInterval = setInterval(() => {
      scrollToCard(currentIndex + 1);
    }, 5000);
  }
}

function stopAutoSlide() {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval);
    autoSlideInterval = null;
  }
}

// Scroll to current card on resize to keep alignment
window.addEventListener('resize', () => {
  scrollToCard(currentIndex);
});

// Start auto sliding initially
startAutoSlide();

// Pause auto-slide and play video on clicking thumbnail
document.querySelectorAll('.portfolio-thumbnail').forEach(thumbnail => {
  thumbnail.addEventListener('click', () => {
    thumbnail.style.opacity = '0';
    thumbnail.style.pointerEvents = 'none'; // So it can't be clicked again
    stopAutoSlide();
  });
});




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
