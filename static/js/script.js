// JavaScript for interactive elements
// Add your JavaScript code here

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Current year in footer
const yearSpan = document.querySelector('#current-year');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// Dark mode toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// Projects Carousel - Simplified implementation
document.addEventListener('DOMContentLoaded', function() {
  // Get all required elements
  const carousel = document.querySelector('.projects-carousel');
  const projectCards = document.querySelectorAll('.project-card');
  const indicatorsContainer = document.querySelector('.carousel-indicators');
  
  // Exit if elements don't exist
  if (!carousel || !indicatorsContainer || projectCards.length === 0) {
    console.error('Carousel elements not found');
    return;
  }
  
  // Clear any existing indicators
  indicatorsContainer.innerHTML = '';
  
  // Create indicator dots (one for each project)
  projectCards.forEach((_, index) => {
    const indicator = document.createElement('div');
    indicator.classList.add('indicator');
    indicator.addEventListener('click', () => scrollToCard(index));
    indicatorsContainer.appendChild(indicator);
  });

  let currentIndex = 0;

  // Function to scroll to a specific card
  function scrollToCard(index) {
    if (index < 0) {
      index = projectCards.length - 1;
    } else if (index >= projectCards.length) {
      index = 0;
    }

    currentIndex = index;
    const card = projectCards[index];
    card.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });

    // Update active indicator
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, i) => {
      indicator.classList.toggle('active', i === index);
    });
  }

  // Handle keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
      scrollToCard(currentIndex - 1);
    } else if (e.key === 'ArrowRight') {
      scrollToCard(currentIndex + 1);
    }
  });

  // Initialize first card
  scrollToCard(0);

  // Initialize modal
  const modal = document.getElementById('project-modal');
  const modalImage = document.getElementById('modal-image');
  const modalTitle = document.getElementById('modal-title');
  const modalDescription = document.getElementById('modal-description');
  const modalLink = document.getElementById('modal-link');
  const closeModal = document.querySelector('.close-modal');

  // Show project details modal
  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img').src;
      const title = card.querySelector('h3').textContent;
      const description = card.querySelector('p').textContent;
      const link = card.querySelector('a').href;

      modalImage.src = img;
      modalTitle.textContent = title;
      modalDescription.textContent = description;
      modalLink.href = link;
      modal.style.display = 'block';
    });
  });

  // Close modal
  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // Drag-to-scroll functionality
  let isDragging = false;
  let startX, scrollLeft;

  carousel.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
  });

  carousel.addEventListener('mouseleave', () => {
    isDragging = false;
  });

  carousel.addEventListener('mouseup', () => {
    isDragging = false;
  });

  carousel.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 2;
    carousel.scrollLeft = scrollLeft - walk;
  });
});
