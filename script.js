// === Hamburger Menu Toggle ===
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = hamburger.querySelector('i');
    icon.classList.toggle('fa-xmark');
    icon.classList.toggle('fa-bars');
  });
}

// === Mega Dropdown Hover + Delay Logic ===
const megaDropdowns = document.querySelectorAll('.dropdown.mega');
let hoverTimeout = null;

megaDropdowns.forEach((dropdown) => {
  const button = dropdown.querySelector('.drop-btn');

  // For desktop hover
  dropdown.addEventListener('mouseenter', () => {
    clearTimeout(hoverTimeout);
    dropdown.classList.add('open');
  });

  dropdown.addEventListener('mouseleave', () => {
    clearTimeout(hoverTimeout);
    hoverTimeout = setTimeout(() => {
      dropdown.classList.remove('open');
    }, 200); // keeps it open for 200ms to prevent flicker
  });

  // For keyboard navigation (accessibility)
  const focusables = dropdown.querySelectorAll('button, a');
  focusables.forEach((el) => {
    el.addEventListener('focus', () => {
      clearTimeout(hoverTimeout);
      dropdown.classList.add('open');
    });
    el.addEventListener('blur', () => {
      clearTimeout(hoverTimeout);
      hoverTimeout = setTimeout(() => {
        dropdown.classList.remove('open');
      }, 200);
    });
  });

  // For mobile: tap to open
  if (button) {
    button.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        dropdown.classList.toggle('open');
      }
    });
  }
});

// === Close dropdowns when resizing between mobile and desktop ===
window.addEventListener('resize', () => {
  megaDropdowns.forEach((dropdown) => dropdown.classList.remove('open'));
});

// === Popular Collection Slider for Products Mega Menu ===
const slider = document.querySelector('.popular-slider');
if (slider) {
  const prevBtn = document.querySelector('.nav-prev');
  const nextBtn = document.querySelector('.nav-next');

  if (prevBtn && nextBtn) {
    nextBtn.addEventListener('click', () => {
      slider.scrollBy({ left: 120, behavior: 'smooth' });
    });
    prevBtn.addEventListener('click', () => {
      slider.scrollBy({ left: -120, behavior: 'smooth' });
    });
  }
}

// === General Dropdown Toggle (for safety) ===
document.querySelectorAll('.drop-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    const dropdown = btn.closest('.dropdown');
    dropdown.classList.toggle('open');
  });
});


// === Pages Dropdown Logic (with submenus) ===
const pagesDropdown = document.querySelector('.dropdown.pages');
let pagesTimeout = null;

if (pagesDropdown) {
  const button = pagesDropdown.querySelector('.drop-btn');

  // Hover for desktop
  pagesDropdown.addEventListener('mouseenter', () => {
    clearTimeout(pagesTimeout);
    pagesDropdown.classList.add('open');
  });

  pagesDropdown.addEventListener('mouseleave', () => {
    clearTimeout(pagesTimeout);
    pagesTimeout = setTimeout(() => {
      pagesDropdown.classList.remove('open');
    }, 200);
  });

  // Mobile tap toggle
  if (button) {
    button.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        pagesDropdown.classList.toggle('open');
      }
    });
  }

  // === Submenu logic ===
  const submenuParents = pagesDropdown.querySelectorAll('.has-submenu');
  submenuParents.forEach((item) => {
    const arrow = item.querySelector('.submenu-arrow');
    const submenu = item.querySelector('.submenu');

    if (arrow && submenu) {
      // Desktop hover
      item.addEventListener('mouseenter', () => {
        submenu.classList.add('show');
      });
      item.addEventListener('mouseleave', () => {
        submenu.classList.remove('show');
      });

      // Mobile tap
      arrow.addEventListener('click', (e) => {
        e.preventDefault();
        submenu.classList.toggle('show');
      });
    }
  });
}


// HERO SLIDER: manual controls only
document.addEventListener('DOMContentLoaded', () => {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const slides = Array.from(hero.querySelectorAll('.slide'));
  if (!slides.length) return;

  const nextBtn = hero.querySelector('.next');
  const prevBtn = hero.querySelector('.prev');

  let current = 0;

  function show(index) {
    slides.forEach((s, i) => s.classList.toggle('active', i === index));
    current = index;
  }

  function next() {
    show((current + 1) % slides.length);
  }

  function prev() {
    show((current - 1 + slides.length) % slides.length);
  }

  // Init first slide
  show(0);

  // Button handlers
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      next();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      prev();
    });
  }
});


// reels video 

document.querySelectorAll('.reel-card video').forEach(video => {
  video.addEventListener('mouseenter', () => video.play());
  video.addEventListener('mouseleave', () => video.pause());
});


// cart sidebar toggle
function openCart() {
  document.getElementById("cartSidebar").classList.add("open");
  document.getElementById("overlay").classList.add("show");
}

function closeCart() {
  document.getElementById("cartSidebar").classList.remove("open");
  document.getElementById("overlay").classList.remove("show");
}