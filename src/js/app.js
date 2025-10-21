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
  const hamburgerIcon = document.getElementById('hamburgerIcon');
  if (menuToggle && navOptions && hamburgerIcon) {
    menuToggle.addEventListener('click', () => {
      navOptions.classList.toggle('active');
      if (navOptions.classList.contains('active')) {
        hamburgerIcon.innerHTML = `
          <rect x="6" y="6" width="16" height="3" rx="1.5" fill="#fff" transform="rotate(45 14 14)"></rect>
          <rect x="6" y="6" width="16" height="3" rx="1.5" fill="#fff" transform="rotate(-45 14 14)"></rect>
        `;
      } else {
        hamburgerIcon.innerHTML = `
          <rect y="6" width="28" height="3" rx="1.5" fill="#fff"></rect>
          <rect y="13" width="28" height="3" rx="1.5" fill="#fff"></rect>
          <rect y="20" width="28" height="3" rx="1.5" fill="#fff"></rect>
        `;
      }
    });
  }

  // Galería automática con transición
  const galleryImages = [
    'assets/home_gallery/gallery_01.png',
    'assets/home_gallery/gallery_02.png',
    'assets/home_gallery/gallery_03.png',
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
      'assets/tattos/tatto_02.jpg',
      'assets/tattos/tatto_03.jpg',
      'assets/tattos/tatto_04.jpg',
      'assets/tattos/tatto_05.jpg',
      'assets/tattos/tatto_06.jpg',
      'assets/tattos/tatto_07.jpg',
      'assets/tattos/tatto_08.jpg',
      'assets/tattos/tatto_09.jpg',
      'assets/tattos/tatto_10.jpg',
      'assets/tattos/tatto_11.jpg',
      'assets/tattos/tatto_12.jpg',
      'assets/tattos/tatto_13.jpg',
      // Agrega más imágenes aquí
    ],
    piercing: [
      'assets/piercing/piercing_01.jpeg',
      'assets/piercing/piercing_02.jpeg',
      'assets/piercing/piercing_03.jpeg',
      'assets/piercing/piercing_04.jpeg',
      'assets/piercing/piercing_05.jpeg',
      'assets/piercing/piercing_06.jpeg',
      // Agrega más imágenes aquí
    ],
    piezas: [
      'assets/piezas/piezas_01.jpg',
      'assets/piezas/piezas_02.jpg',
      'assets/piezas/piezas_03.jpg',
      'assets/piezas/piezas_04.jpg',
      'assets/piezas/piezas_05.jpg',
      'assets/piezas/piezas_06.jpg',
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

  // Inicializar con piercing
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

  // Botones de tipo de cotización
  document.querySelectorAll('.tipo-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.tipo-btn').forEach(b => b.classList.remove('selected'));
      this.classList.add('selected');
      document.getElementById('tipo').value = this.dataset.value;
    });
  });

  // Validación y envío a WhatsApp
  document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const medio = document.getElementById('medio').value;
    const tipo = document.getElementById('tipo').value;
    const descripcion = document.getElementById('descripcion').value;

    if (!tipo) {
      alert('Por favor selecciona el tipo de cotización.');
      return;
    }

    const number = "Nzc2MTIzNDk0MA==";
    const numeroWhatsApp = atob(number);
    const mensaje = encodeURIComponent(
      `Hola Skull Studio, quiero solicitar una cotización.\n\nNombre: ${nombre}\nMedio de contacto: ${medio}\nTipo de cotización: ${tipo}\nDescripción: ${descripcion}`
    );

    window.open(`https://wa.me/${numeroWhatsApp}?text=${mensaje}`, '_blank');
  });

  // Mostrar navbar desplegado en móviles al cargar
  if (window.innerWidth <= 600) {
    document.getElementById('navOptions').classList.add('active');
  }

  // ============================
  // Copy-to-clipboard (corregido)
  // ============================
  {
    const feedbackRegion = document.getElementById('copyFeedback');

    function showFeedback(text) {
      if (!feedbackRegion) return;
      feedbackRegion.textContent = text || '';
      // Si quieres mostrarlo como toast visible:
      // feedbackRegion.style.left = text ? 'auto' : '-9999px';
      // if (text) setTimeout(() => feedbackRegion.style.left = '-9999px', 2000);
    }

    async function copyText(text) {
      if (!text) throw new Error('Texto vacío');
      // HTTPS/localhost → Clipboard API
      if (navigator.clipboard?.writeText && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return;
      }
      // Fallback para HTTP / file://
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      if (!ok) throw new Error('execCommand falló');
    }

    document.querySelectorAll('.copy-btn').forEach((btn) => {
      const originalInner = btn.innerHTML;

      const handler = async () => {
        const value =
          btn.getAttribute('data-value')?.trim() ||
          btn.parentElement?.querySelector('.copy-value')?.textContent?.trim() ||
          '';

        if (!value) return;

        try {
          await copyText(value);
          btn.classList.add('copied');
          btn.innerHTML =
            '<svg class="icon-check" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 16.2L4.8 12 3.4 13.4 9 19 21 7 19.6 5.6z"/></svg>';
          showFeedback(`Copiado: ${value}`);
          setTimeout(() => {
            btn.classList.remove('copied');
            btn.innerHTML = originalInner;
            showFeedback('');
          }, 2000);
        } catch (err) {
          showFeedback('No se pudo copiar. Selecciona y copia manualmente.');
        }
      };

      btn.addEventListener('click', handler);
      // Accesible vía teclado
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handler();
        }
      });
    });
  }
});
