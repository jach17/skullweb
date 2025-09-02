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

  // Catálogo dinámico
  const catalogImages = {
    tattos: [
      'assets/tattos/tatto_01.jpg',
      // 'assets/tattos/tattoo2.png',
      // Agrega más imágenes aquí
    ],
    piercing: [
      'assets/piercing/piercing_01.jpeg',
      'assets/piercing/piercing_02.jpeg',
      'assets/piercing/piercing_03.jpeg',
      // Agrega más imágenes aquí
    ],
    piezas: [
      'assets/piezas/piezas_01.jpg',
      'assets/piezas/piezas_02.jpg',
      'assets/piezas/piezas_03.jpg',
      // Agrega más imágenes aquí
    ]
  };

  function showCatalog(section) {
    const container = document.getElementById('catalogImages');
    container.innerHTML = '';
    catalogImages[section].forEach(src => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = section;
      container.appendChild(img);
    });
  }

  // Inicializar con tattos
  showCatalog('piercing');

  // Tabs
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      showCatalog(this.dataset.section);
    });
  });

  // Modal para catálogo
  const catalogModal = document.getElementById('catalogModal');
  const modalCatalogImg = document.getElementById('modalCatalogImg');
  const closeCatalogModal = document.getElementById('closeCatalogModal');

  document.getElementById('catalogImages').addEventListener('click', function(e) {
    if (e.target.tagName === 'IMG') {
      modalCatalogImg.src = e.target.src;
      catalogModal.style.display = 'flex';
    }
  });

  closeCatalogModal.addEventListener('click', () => {
    catalogModal.style.display = 'none';
    modalCatalogImg.src = '';
  });

  // Opcional: cerrar modal al hacer click fuera de la imagen
  catalogModal.addEventListener('click', (e) => {
    if (e.target === catalogModal) {
      catalogModal.style.display = 'none';
      modalCatalogImg.src = '';
    }
  });
});