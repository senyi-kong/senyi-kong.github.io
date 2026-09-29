// Native <details> keeps publication summaries accessible without JavaScript.
const navLinks = [...document.querySelectorAll('nav a')];
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      for (const link of navLinks) {
        const active = link.hash === '#' + entry.target.id;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      }
    }
  }, {rootMargin: '-15% 0px -65% 0px'});
  document.querySelectorAll('section[id], #about').forEach(el => observer.observe(el));
}
function revealLinkedStudy() {
  if (!location.hash.startsWith('#study-')) return;
  const study = document.getElementById(location.hash.slice(1));
  if (study instanceof HTMLDetailsElement) study.open = true;
}
window.addEventListener('hashchange', revealLinkedStudy);
revealLinkedStudy();
