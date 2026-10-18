(() => {
  'use strict';
  const root = document.documentElement;
  const hero = document.querySelector('.hero-art > img');
  const prepare = element => {
    if (element.matches('video[data-poster]')) {
      element.poster = element.dataset.poster;
      delete element.dataset.poster;
    } else element.classList.add('assets-ready');
  };
  const targets = document.querySelectorAll('.resume-card, .palace-artifacts, video[data-poster]');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        prepare(entry.target);
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '350px 0px' });
    targets.forEach(element => observer.observe(element));
  } else targets.forEach(prepare);
  // Restore the decorative rails after the main portrait has arrived.
  const finishHero = () => root.classList.add('hero-assets-ready');
  if (!hero || hero.complete) finishHero();
  else {
    hero.addEventListener('load', finishHero, { once: true });
    hero.addEventListener('error', finishHero, { once: true });
  }
})();
