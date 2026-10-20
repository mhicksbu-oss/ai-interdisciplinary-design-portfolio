const flowerField = document.querySelector('.flower-field');

function swayAndGrow(flower) {
  flower.classList.remove('is-swaying');
  void flower.getBoundingClientRect();
  flower.classList.add('is-swaying');

  const sprout = flower.cloneNode(true);
  sprout.className.baseVal = 'flower flower--sprout';
  sprout.setAttribute('aria-label', 'Grow another flower');

  const fieldWidth = flowerField.clientWidth;
  const isSmallScreen = fieldWidth < 600;
  const width = isSmallScreen
    ? Math.round(72 + Math.random() * 34)
    : Math.round(105 + Math.random() * 70);
  const safeEdge = width / 2 + 8;
  const left = safeEdge + Math.random() * Math.max(1, fieldWidth - safeEdge * 2);

  sprout.style.setProperty('--sprout-width', `${width}px`);
  sprout.style.setProperty('--sprout-left', `${left}px`);
  sprout.style.setProperty('z-index', String(2 + flowerField.querySelectorAll('.flower--sprout').length));

  flowerField.appendChild(sprout);
}

flowerField.addEventListener('click', (event) => {
  const flower = event.target.closest('.flower');
  if (flower) swayAndGrow(flower);
});

flowerField.addEventListener('keydown', (event) => {
  if (event.key !== 'Enter' && event.key !== ' ') return;
  const flower = event.target.closest('.flower');
  if (!flower) return;
  event.preventDefault();
  swayAndGrow(flower);
});

flowerField.addEventListener('animationend', (event) => {
  if (event.animationName === 'flower-sway') {
    event.target.classList.remove('is-swaying');
  }
});
