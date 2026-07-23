(() => {
  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    mainNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Collections mega-menu dropdown
  const dropdown = document.getElementById('collectionsDropdown');
  const dropdownTrigger = document.getElementById('collectionsTrigger');
  const dropdownPanel = document.getElementById('collectionsPanel');

  if (dropdown && dropdownTrigger && dropdownPanel) {
    const closeDropdown = () => {
      dropdown.classList.remove('open');
      dropdownTrigger.setAttribute('aria-expanded', 'false');
    };
    const toggleDropdown = () => {
      const isOpen = dropdown.classList.toggle('open');
      dropdownTrigger.setAttribute('aria-expanded', String(isOpen));
    };

    dropdownTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleDropdown();
    });
    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target)) closeDropdown();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeDropdown();
    });
    dropdownPanel.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeDropdown);
    });
  }

  // Classics tabs (Men's / Women's), also triggerable from the mega-menu links
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = {
    men: document.getElementById('panelMen'),
    women: document.getElementById('panelWomen'),
  };

  const activateTab = (tab) => {
    if (!tabPanels[tab]) return;
    tabBtns.forEach((btn) => {
      const isActive = btn.dataset.tab === tab;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-selected', String(isActive));
    });
    Object.entries(tabPanels).forEach(([key, panel]) => {
      if (panel) panel.hidden = key !== tab;
    });
  };

  tabBtns.forEach((btn) => btn.addEventListener('click', () => activateTab(btn.dataset.tab)));

  document.querySelectorAll('.mega-panel a[data-gender]').forEach((link) => {
    link.addEventListener('click', () => activateTab(link.dataset.gender));
  });

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in-view'));
  }

  // Animated stat counters
  const statEls = document.querySelectorAll('.stat-num');
  const animateCount = (el) => {
    const target = parseInt(el.dataset.count, 10) || 0;
    const duration = 1400;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  if ('IntersectionObserver' in window) {
    const statIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            statIo.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    statEls.forEach((el) => statIo.observe(el));
  }

  // Header shadow on scroll
  const header = document.getElementById('siteHeader');
  const onScroll = () => {
    if (window.scrollY > 10) {
      header.style.boxShadow = '0 8px 24px -12px rgba(18,19,28,0.15)';
    } else {
      header.style.boxShadow = 'none';
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  // Wholesale inquiry form (client-side only — wire to a backend/email service to go live)
  const form = document.getElementById('wholesaleForm');
  const formNote = document.getElementById('formNote');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      formNote.textContent = 'Thank you — your request has been noted. Our team will reply within one business day.';
      form.reset();
    });
  }

  // Newsletter form
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input');
      input.value = '';
      input.placeholder = 'Subscribed ✓';
    });
  }

  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
