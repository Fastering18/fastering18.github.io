document.addEventListener('DOMContentLoaded', () => {
  const navCollapse = document.getElementById('navbarNav');
  const navToggler = document.getElementById('navbarTogglerBtn');
  const navLinks = document.querySelectorAll('.custom-navbar .nav-link');

  if (window.location.protocol === 'file:') {
    const fileMap = {
      '/quiz1': 'index.html',
      '/quiz1/': 'index.html',
      '/quiz1/profile': 'profile.html',
      '/quiz1/hometown': 'hometown.html',
      '/quiz1/food': 'food.html',
      '/quiz1/tourist': 'tourist.html'
    };
    document.querySelectorAll('a').forEach((link) => {
      const href = link.getAttribute('href');
      if (href && fileMap[href]) {
        link.setAttribute('href', fileMap[href]);
      }
    });
  }

  if (navToggler && navCollapse) {
    navToggler.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = navCollapse.classList.contains('show');
      if (isExpanded) {
        navCollapse.classList.remove('show');
        navToggler.classList.add('collapsed');
        navToggler.setAttribute('aria-expanded', 'false');
      } else {
        navCollapse.classList.add('show');
        navToggler.classList.remove('collapsed');
        navToggler.setAttribute('aria-expanded', 'true');
      }
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (navCollapse && navCollapse.classList.contains('show')) {
        navCollapse.classList.remove('show');
        if (navToggler) {
          navToggler.classList.add('collapsed');
          navToggler.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

  document.addEventListener('click', (event) => {
    const navbar = document.querySelector('.custom-navbar');
    if (!navbar || !navCollapse) return;
    const isClickInside = navbar.contains(event.target);
    if (!isClickInside && navCollapse.classList.contains('show')) {
      navCollapse.classList.remove('show');
      if (navToggler) {
        navToggler.classList.add('collapsed');
        navToggler.setAttribute('aria-expanded', 'false');
      }
    }
  });

  const currentPath = window.location.pathname.toLowerCase().replace(/\/$/, "");
  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (!href) return;
    const cleanHref = href.toLowerCase().replace(/\/$/, "");

    const isHome = (cleanHref === '/quiz1' || cleanHref === 'index.html') &&
                   (currentPath === '/quiz1' || currentPath.endsWith('index.html') || currentPath === '');
    
    const isMatch = cleanHref !== '/quiz1' && cleanHref !== 'index.html' && (
      currentPath === cleanHref ||
      currentPath.endsWith(cleanHref) ||
      (currentPath.includes('profile') && cleanHref.includes('profile')) ||
      (currentPath.includes('hometown') && cleanHref.includes('hometown')) ||
      (currentPath.includes('food') && cleanHref.includes('food')) ||
      (currentPath.includes('tourist') && cleanHref.includes('tourist'))
    );

    if (isHome || isMatch) {
      navLinks.forEach((l) => l.classList.remove('active'));
      link.classList.add('active');
    }
  });

  if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
    window.addEventListener('load', () => {
      const swUrl = window.location.pathname.startsWith('/quiz1') ? '/quiz1/sw.js' : '/sw.js';
      navigator.serviceWorker.register(swUrl).catch(() => {
        navigator.serviceWorker.register('sw.js').catch(() => {});
      });
    });
  }
});
