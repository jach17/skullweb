document.addEventListener('DOMContentLoaded', () => {
  // Animación del h1 (si la tienes)
  const h1 = document.querySelector('h1');
  if (h1) {
    setInterval(() => {
      h1.textContent = h1.textContent.endsWith('...')
        ? 'Próximamente Skull Studio Web'
        : h1.textContent + '.';
    }, 700);
  }

  // Menú responsive
  const menuToggle = document.getElementById('menuToggle');
  const navOptions = document.getElementById('navOptions');
  if (menuToggle && navOptions) {
    menuToggle.addEventListener('click', () => {
      navOptions.classList.toggle('active');
    });
  }
});