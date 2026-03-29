(() => {
  const nav = document.querySelector('.nav');
  const toggle = nav?.querySelector('.menu-toggle');

  if (!nav || !toggle) {
    return;
  }

  const closeNav = () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  nav.querySelectorAll('nav a').forEach((link) => {
    link.addEventListener('click', closeNav);
  });
})();
