document.addEventListener('DOMContentLoaded', () => {
  // Animación del h1
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

  // Galería automática con transición
  const galleryImages = [
    'assets/home_gallery/gallery_01.png',
    'assets/home_gallery/gallery_02.png',
    // Agrega más imágenes si tienes
  ];
  let current = 0;
  const galleryImage = document.getElementById('galleryImage');
  if (galleryImage && galleryImages.length > 1) {
    setInterval(() => {
      // Fade out
      galleryImage.style.opacity = 0;
      setTimeout(() => {
        current = (current + 1) % galleryImages.length;
        galleryImage.src = galleryImages[current];
        // Fade in
        galleryImage.style.opacity = 1;
      }, 700); // Debe coincidir con el tiempo de la transición CSS
    }, 4000);
  }
});