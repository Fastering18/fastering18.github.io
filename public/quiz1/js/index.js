document.addEventListener('DOMContentLoaded', () => {
  const navCollapse = document.getElementById('navbarNav');
  const navToggler = document.getElementById('navbarTogglerBtn');
  const navLinks = document.querySelectorAll('.custom-navbar .nav-link');

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

  const currentPath = window.location.pathname.toLowerCase();
  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (!href) return;
    const cleanHref = href.toLowerCase();

    const isHome = (cleanHref === 'index.html' || cleanHref === '#' || cleanHref === './' || cleanHref.endsWith('/quiz1') || cleanHref.endsWith('/quiz1/')) &&
                   (currentPath.endsWith('index.html') || currentPath.endsWith('/quiz1') || currentPath.endsWith('/quiz1/'));
    
    const isMatchingPage = cleanHref.length > 1 && cleanHref !== '#' && (
      currentPath.endsWith(cleanHref) || 
      currentPath.includes(cleanHref.replace('.html', ''))
    );

    if (isHome || isMatchingPage) {
      navLinks.forEach((l) => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
});
