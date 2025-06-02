const track = document.getElementById('testimonialTrack');
const testimonialCards = document.querySelectorAll('.testimonial-card');
const scrollButtons = document.querySelectorAll('.scroll-btn');

let testimonialIndex = 0;

function scrollToTestimonial(index) {
  const cardWidth = testimonialCards[0].offsetWidth;
  track.style.transform = `translateX(-${index * cardWidth}px)`;
}

scrollButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    testimonialIndex = (testimonialIndex + 1) % testimonialCards.length;
    scrollToTestimonial(testimonialIndex);
  });
});

window.addEventListener('resize', () => {
  scrollToTestimonial(testimonialIndex);
});

function startAutoSlide() {
  if (window.innerWidth <= 768) {
    setInterval(() => {
      testimonialIndex = (testimonialIndex + 1) % testimonialCards.length;
      scrollToTestimonial(testimonialIndex);
    }, 2000); 
    }
}

startAutoSlide();


const portfolioTrack = document.getElementById('portfolioTrack');
const portfolioButtons = document.querySelectorAll('.portfolio-scroll-btn');
let portfolioIndex = 0;
const totalPortfolioCards = portfolioTrack.children.length;

function moveToPortfolio(index) {
  if (index < 0) index = 0;
  if (index >= totalPortfolioCards) index = 0; 
  portfolioIndex = index;
  portfolioTrack.style.transform = `translateX(-${portfolioIndex * 100}%)`;
}

portfolioButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    moveToPortfolio(portfolioIndex + 1);
  });
});

function startPortfolioAutoSlide() {
  if (window.innerWidth <= 768) {
    setInterval(() => {
      moveToPortfolio(portfolioIndex + 1);
    }, 2000);
  }
}

startPortfolioAutoSlide();



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
