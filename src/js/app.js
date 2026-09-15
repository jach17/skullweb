/**
 * Skull Studio — Single Page App
 * Store central + API persistente + Router + CRUD + Catálogo público
 */

/* ============================================================
   1. STORE CENTRAL
   ============================================================ */
const SkullStore = {
  _nextId: 100,
  catalogVersion: 0,

  categories: ['Tatuajes', 'Piercing', 'Piezas'],

  isLoggedIn: false,

  products: [
    // ——— Tatuajes (13) ———
    { id: 1, name: 'Blackwork Geométrico', description: 'Diseño geométrico en blackwork con patrones simétricos. Trabajo detallado en antebrazo, sesión de 3 horas.', image: 'assets/tattos/tatto_01.jpg', category: 'Tatuajes', price: '', active: true },
    { id: 2, name: 'Realismo en Sombras', description: 'Retrato en estilo realista con técnica de sombras suaves. Pieza única trabajada con referencias fotográficas.', image: 'assets/tattos/tatto_02.jpg', category: 'Tatuajes', price: '', active: true },
    { id: 3, name: 'Lettering Caligráfico', description: 'Tipografía personalizada con trazos fluidos. Diseño elegante ideal para frases con significado especial.', image: 'assets/tattos/tatto_03.jpg', category: 'Tatuajes', price: '', active: true },
    { id: 4, name: 'Manga Japonés', description: 'Composición de manga completa con motivos tradicionales japoneses: olas, flores de cerezo y koi.', image: 'assets/tattos/tatto_04.jpg', category: 'Tatuajes', price: '', active: true },
    { id: 5, name: 'Minimalista Fino', description: 'Líneas finas y delicadas en estilo minimalista. Diseño sutil perfecto para muñeca o tobillo.', image: 'assets/tattos/tatto_05.jpg', category: 'Tatuajes', price: '', active: true },
    { id: 6, name: 'Neotradicional Color', description: 'Diseño neotradicional vibrante con colores saturados y líneas bold. Pieza llamativa de gran formato.', image: 'assets/tattos/tatto_06.jpg', category: 'Tatuajes', price: '', active: true },
    { id: 7, name: 'Dotwork Mandala', description: 'Mandala elaborado con técnica dotwork punto por punto. Requiere precisión y paciencia — resultado hipnótico.', image: 'assets/tattos/tatto_07.jpg', category: 'Tatuajes', price: '', active: true },
    { id: 8, name: 'Acuarela Abstracta', description: 'Explosión de color en estilo acuarela sin líneas definidas. Arte fluido que simula pintura sobre piel.', image: 'assets/tattos/tatto_08.jpg', category: 'Tatuajes', price: '', active: true },
    { id: 9, name: 'Ornamental Floral', description: 'Diseño ornamental con elementos florales entrelazados. Elegante y femenino, ideal para espalda o costillas.', image: 'assets/tattos/tatto_09.jpg', category: 'Tatuajes', price: '', active: true },
    { id: 10, name: 'Trash Polka', description: 'Estilo trash polka con mezcla de realismo y elementos gráficos abstractos en rojo y negro.', image: 'assets/tattos/tatto_10.jpg', category: 'Tatuajes', price: '', active: true },
    { id: 11, name: 'Sketch Artístico', description: 'Tatuaje en estilo sketch que conserva la estética de un boceto a lápiz. Natural y espontáneo.', image: 'assets/tattos/tatto_11.jpg', category: 'Tatuajes', price: '', active: true },
    { id: 12, name: 'Chicano Lettering', description: 'Lettering estilo chicano con sombras dramáticas y detalles ornamentales. Clásico y con carácter.', image: 'assets/tattos/tatto_12.jpg', category: 'Tatuajes', price: '', active: true },
    { id: 13, name: 'Cover Up Creativo', description: 'Trabajo de cover up transformando un tatuaje antiguo en una pieza completamente nueva y renovada.', image: 'assets/tattos/tatto_13.jpg', category: 'Tatuajes', price: '', active: true },

    // ——— Piercing (6) ———
    { id: 14, name: 'Septum Clásico', description: 'Piercing septum con aro quirúrgico de alta calidad. Procedimiento seguro y con cuidados post incluidos.', image: 'assets/piercing/piercing_01.jpeg', category: 'Piercing', price: '', active: true },
    { id: 15, name: 'Hélix Doble', description: 'Doble perforación en hélix superior con barras de titanio. Look moderno y versátil para combinar accesorios.', image: 'assets/piercing/piercing_02.jpeg', category: 'Piercing', price: '', active: true },
    { id: 16, name: 'Nostril Delicado', description: 'Piercing nostril con gema brillante. Perforación precisa con aguja estéril y joyería hipoalergénica.', image: 'assets/piercing/piercing_03.jpeg', category: 'Piercing', price: '', active: true },
    { id: 17, name: 'Industrial Bar', description: 'Piercing industrial con barra recta de acero quirúrgico. Pieza statement que atraviesa la oreja completa.', image: 'assets/piercing/piercing_04.jpeg', category: 'Piercing', price: '', active: true },
    { id: 18, name: 'Tragus Brillante', description: 'Piercing en tragus con micro gema cristalina. Perforación delicada con equipo profesional certificado.', image: 'assets/piercing/piercing_05.jpeg', category: 'Piercing', price: '', active: true },
    { id: 19, name: 'Labret Vertical', description: 'Piercing labret vertical con barra curva de titanio. Cicatrización rápida y resultado estético impecable.', image: 'assets/piercing/piercing_06.jpeg', category: 'Piercing', price: '', active: true },

    // ——— Piezas (6) ———
    { id: 20, name: 'Anillo Calavera Plata', description: 'Anillo artesanal con detalle de calavera en plata 925. Diseño exclusivo del estudio, acabado pulido.', image: 'assets/piezas/piezas_01.jpg', category: 'Piezas', price: '', active: true },
    { id: 21, name: 'Cadena Serpiente', description: 'Cadena estilo serpiente en acero inoxidable con baño dorado. Resistente al agua y uso diario.', image: 'assets/piezas/piezas_02.jpg', category: 'Piezas', price: '', active: true },
    { id: 22, name: 'Arete Gótico', description: 'Par de aretes con diseño gótico elaborado. Joyería oscura con acabado antiguo y detalles en relieve.', image: 'assets/piezas/piezas_03.jpg', category: 'Piezas', price: '', active: true },
    { id: 23, name: 'Pulsera Viking', description: 'Pulsera con nudo vikingo en acero inoxidable. Pieza robusta y masculina con cierre de presión seguro.', image: 'assets/piezas/piezas_04.jpg', category: 'Piezas', price: '', active: true },
    { id: 24, name: 'Dije Pentagrama', description: 'Dije con pentagrama detallado en acero con cadena incluida. Símbolo clásico con manufactura de calidad.', image: 'assets/piezas/piezas_05.jpg', category: 'Piezas', price: '', active: true },
    { id: 25, name: 'Expansor Orgánico', description: 'Expansor tallado en material orgánico con diseño tribal. Disponible en varias medidas bajo pedido.', image: 'assets/piezas/piezas_06.jpg', category: 'Piezas', price: '', active: true },
  ],

  // ——— CRUD ———
  getProducts(filter) {
    let list = this.products;
    if (filter && filter !== 'Todos') {
      list = list.filter(p => p.category === filter);
    }
    return list;
  },

  getActiveProducts(filter) {
    return this.getProducts(filter).filter(p => p.active);
  },

  getProductById(id) {
    return this.products.find(p => String(p.id) === String(id));
  },

  addProduct(data) {
    const id = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${this._nextId++}`;
    const product = { id, ...data, active: data.active !== false };
    this.products.push(product);
    return product;
  },

  updateProduct(id, data) {
    const idx = this.products.findIndex(p => String(p.id) === String(id));
    if (idx === -1) return null;
    this.products[idx] = { ...this.products[idx], ...data };
    return this.products[idx];
  },

  deleteProduct(id) {
    const idx = this.products.findIndex(p => String(p.id) === String(id));
    if (idx === -1) return false;
    this.products.splice(idx, 1);
    return true;
  }
};

const Api = {
  async request(path, options = {}) {
    const response = await fetch(path, {
      credentials: 'same-origin',
      ...options,
      headers: {
        ...(options.body && !(options.body instanceof Blob) ? { 'Content-Type': 'application/json' } : {}),
        ...(options.headers || {}),
      },
    });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) {
      const error = new Error(body.error || 'No se pudo completar la operación.');
      error.status = response.status;
      throw error;
    }
    return body;
  },

  getCatalog() {
    return this.request('/api/catalog');
  },

  saveCatalog(products, version) {
    return this.request('/api/catalog', {
      method: 'PUT',
      body: JSON.stringify({ products, version }),
    });
  },

  login(username, password) {
    return this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  },

  logout() {
    return this.request('/api/auth/logout', { method: 'POST' });
  },

  session() {
    return this.request('/api/auth/session');
  },

  uploadImage(file) {
    return this.request('/api/upload', {
      method: 'POST',
      body: file,
      headers: { 'Content-Type': file.type },
    });
  },

  deleteImage(url) {
    return this.request(`/api/upload?url=${encodeURIComponent(url)}`, { method: 'DELETE' });
  },
};


/* ============================================================
   2. APP CONTROLLER
   ============================================================ */
document.addEventListener('DOMContentLoaded', async () => {

  // ——— DOM References ———
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  const publicView = $('#publicView');
  const adminView = $('#adminView');
  const adminLogin = $('#adminLogin');
  const adminDashboard = $('#adminDashboard');

  async function refreshCatalog() {
    try {
      const catalog = await Api.getCatalog();
      if (catalog.initialized && Array.isArray(catalog.products)) {
        SkullStore.products = catalog.products;
        SkullStore.catalogVersion = catalog.version;
      }
      renderCatalogTabs();
      renderCatalog();
    } catch (error) {
      console.error('No se pudo cargar el catálogo persistente:', error);
      showToast('Se está mostrando el catálogo local.', 'error');
    }
  }

  async function persistProducts(products) {
    const catalog = await Api.saveCatalog(products, SkullStore.catalogVersion);
    SkullStore.products = catalog.products;
    SkullStore.catalogVersion = catalog.version;
    renderAdminTable();
    renderAdminStats();
    renderCatalog();
  }

  function handleAdminError(error) {
    if (error.status === 401) {
      SkullStore.isLoggedIn = false;
      showAdminLogin();
      showToast('Tu sesión expiró. Inicia sesión de nuevo.', 'error');
      return;
    }
    showToast(error.message || 'No se pudo completar la operación.', 'error');
  }

  // ——— Toast helper ———
  function showToast(msg, type = 'success') {
    const container = $('#toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = msg;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }

  // ——— Confirm dialog helper ———
  function showConfirm(title, message) {
    return new Promise(resolve => {
      const overlay = $('#confirmOverlay');
      $('#confirmTitle').textContent = title;
      $('#confirmMessage').textContent = message;
      overlay.classList.remove('hidden');

      const onYes = () => { cleanup(); resolve(true); };
      const onNo = () => { cleanup(); resolve(false); };

      function cleanup() {
        overlay.classList.add('hidden');
        $('#confirmYes').removeEventListener('click', onYes);
        $('#confirmNo').removeEventListener('click', onNo);
      }

      $('#confirmYes').addEventListener('click', onYes);
      $('#confirmNo').addEventListener('click', onNo);
    });
  }


  /* ============================================================
     3. ROUTER
     ============================================================ */
  function navigate(hash) {
    if (hash === '#/admin') {
      publicView.style.display = 'none';
      adminView.classList.add('active');
      if (SkullStore.isLoggedIn) {
        showAdminDashboard();
      } else {
        showAdminLogin();
      }
    } else {
      // Public
      adminView.classList.remove('active');
      publicView.style.display = 'block';
      renderCatalog();
    }
  }

  window.addEventListener('hashchange', () => navigate(location.hash));

  // Back-to-public buttons
  $('#backToPublic').addEventListener('click', () => { location.hash = '#/'; });
  $('#adminBackToSite').addEventListener('click', () => { location.hash = '#/'; });


  /* ============================================================
     4. PUBLIC VIEW — Hero Gallery
     ============================================================ */
  const galleryImages = [
    'assets/home_gallery/gallery_01.png',
    'assets/home_gallery/gallery_02.png',
    'assets/home_gallery/gallery_03.png',
  ];
  let currentGallery = 0;
  const galleryImage = $('#galleryImage');

  if (galleryImage && galleryImages.length > 1) {
    setInterval(() => {
      galleryImage.style.opacity = 0;
      setTimeout(() => {
        currentGallery = (currentGallery + 1) % galleryImages.length;
        galleryImage.src = galleryImages[currentGallery];
        galleryImage.style.opacity = 1;
      }, 800);
    }, 4500);
  }


  /* ============================================================
     5. PUBLIC VIEW — Catalog
     ============================================================ */
  let currentFilter = 'Todos';

  function renderCatalogTabs() {
    const container = $('#catalogTabs');
    container.innerHTML = '';

    const allFilters = ['Todos', ...SkullStore.categories];
    allFilters.forEach(cat => {
      const btn = document.createElement('button');
      btn.className = `tab-btn${cat === currentFilter ? ' active' : ''}`;
      btn.textContent = cat;
      btn.addEventListener('click', () => {
        currentFilter = cat;
        renderCatalogTabs();
        renderCatalog();
      });
      container.appendChild(btn);
    });
  }

  function renderCatalog() {
    const container = $('#catalogImages');
    container.innerHTML = '';

    const products = SkullStore.getActiveProducts(currentFilter);

    if (products.length === 0) {
      container.innerHTML = '<p style="color: var(--text-muted); grid-column: 1/-1; padding: 3rem;">No hay productos en esta categoría.</p>';
      return;
    }

    products.forEach(product => {
      const card = document.createElement('div');
      card.className = 'product-card';
      if (!product.description) card.classList.add('product-card--image-only');
      card.dataset.id = product.id;

      let imageHTML = '';
      if (product.image) {
        imageHTML = `
          <div class="product-card-image-wrapper">
            <img src="${product.image}" alt="${product.name}" class="product-card-image" loading="lazy">
          </div>`;
      } else {
        imageHTML = `
          <div class="product-card-no-image">
            <svg viewBox="0 0 24 24" fill="none"><path d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2zM8.5 13.5l2.5 3 3.5-4.5 4.5 6H5l3.5-4.5z" fill="currentColor" opacity="0.3"/></svg>
          </div>`;
      }

      let bodyHTML = '';
      if (product.name || product.description) {
        bodyHTML = `
          <div class="product-card-body">
            <span class="product-card-name">${product.name || ''}</span>
            ${product.description ? `<span class="product-card-desc">${product.description}</span>` : ''}
            <span class="product-card-category">${product.category}</span>
          </div>`;
      }

      card.innerHTML = imageHTML + bodyHTML;
      card.addEventListener('click', () => openProductModal(product.id));
      container.appendChild(card);
    });
  }


  /* ============================================================
     6. PUBLIC VIEW — Product Modal
     ============================================================ */
  const catalogModal = $('#catalogModal');
  const modalContent = $('#modalContent');
  const closeCatalogModal = $('#closeCatalogModal');

  function openProductModal(id) {
    const product = SkullStore.getProductById(id);
    if (!product) return;

    let html = '';

    if (product.image) {
      html += `<img src="${product.image}" alt="${product.name}">`;
    }

    html += `<div class="modal-body">`;
    html += `<div class="modal-category">${product.category}</div>`;
    html += `<h3>${product.name}</h3>`;
    if (product.description) {
      html += `<p>${product.description}</p>`;
    }
    html += `<br><a href="#contacto" class="btn btn-primary" onclick="document.getElementById('catalogModal').style.display='none'">Cotizar este diseño →</a>`;
    html += `</div>`;

    modalContent.innerHTML = html;
    catalogModal.style.display = 'flex';
  }

  closeCatalogModal.addEventListener('click', () => {
    catalogModal.style.display = 'none';
    modalContent.innerHTML = '';
  });

  catalogModal.addEventListener('click', (e) => {
    if (e.target === catalogModal) {
      catalogModal.style.display = 'none';
      modalContent.innerHTML = '';
    }
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (catalogModal.style.display === 'flex') {
        catalogModal.style.display = 'none';
        modalContent.innerHTML = '';
      }
    }
  });


  /* ============================================================
     7. PUBLIC VIEW — Contact / WhatsApp
     ============================================================ */
  $$('.tipo-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      $$('.tipo-btn').forEach(b => b.classList.remove('selected'));
      this.classList.add('selected');
      $('#tipo').value = this.dataset.value;
    });
  });

  $('#contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre = $('#nombre').value;
    const medio = $('#medio').value;
    const tipo = $('#tipo').value;
    const descripcion = $('#descripcion').value;

    if (!tipo) {
      alert('Por favor selecciona el tipo de cotización.');
      return;
    }

    const number = 'Nzc2MTIzNDk0MA==';
    const numeroWhatsApp = atob(number);
    const mensaje = encodeURIComponent(
      `Hola Skull Studio, quiero solicitar una cotización.\n\nNombre: ${nombre}\nMedio de contacto: ${medio}\nTipo de cotización: ${tipo}\nDescripción: ${descripcion}`
    );

    window.open(`https://wa.me/${numeroWhatsApp}?text=${mensaje}`, '_blank');
  });


  /* ============================================================
     8. PUBLIC VIEW — Responsive Menu
     ============================================================ */
  const menuToggle = $('#menuToggle');
  const navOptions = $('#navOptions');
  const hamburgerIcon = $('#hamburgerIcon');

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

  // Auto-expand nav on mobile
  if (window.innerWidth <= 600) {
    navOptions.classList.add('active');
  }


  /* ============================================================
     9. PUBLIC VIEW — Copy to Clipboard (Payments)
     ============================================================ */
  {
    const feedbackRegion = $('#copyFeedback');

    function showFeedback(text) {
      if (!feedbackRegion) return;
      feedbackRegion.textContent = text || '';
    }

    async function copyText(text) {
      if (!text) throw new Error('Texto vacío');
      if (navigator.clipboard?.writeText && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return;
      }
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

    $$('.copy-btn').forEach((btn) => {
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
          btn.innerHTML = '<svg class="icon-check" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 16.2L4.8 12 3.4 13.4 9 19 21 7 19.6 5.6z"/></svg>';
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
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handler();
        }
      });
    });
  }


  /* ============================================================
     10. ADMIN — Login
     ============================================================ */
  function showAdminLogin() {
    adminLogin.style.display = 'flex';
    adminDashboard.classList.add('hidden');
    $('#loginError').textContent = '';
    $('#loginUser').value = '';
    $('#loginPass').value = '';
  }

  function showAdminDashboard() {
    adminLogin.style.display = 'none';
    adminDashboard.classList.remove('hidden');
    showAdminList();
    renderAdminStats();
    renderAdminTable();
  }

  $('#loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const user = $('#loginUser').value.trim();
    const pass = $('#loginPass').value;
    const button = e.submitter || $('#loginForm button[type="submit"]');
    button.disabled = true;
    $('#loginError').textContent = '';

    try {
      await Api.login(user, pass);
      SkullStore.isLoggedIn = true;
      showAdminDashboard();
      showToast('Sesión iniciada correctamente');
    } catch (error) {
      $('#loginError').textContent = error.message;
    } finally {
      button.disabled = false;
    }
  });

  $('#adminLogout').addEventListener('click', async () => {
    try {
      await Api.logout();
    } catch (error) {
      console.error('No se pudo cerrar la sesión en el servidor:', error);
    }
    SkullStore.isLoggedIn = false;
    showAdminLogin();
    showToast('Sesión cerrada', 'success');
  });


  /* ============================================================
     11. ADMIN — Dashboard Stats
     ============================================================ */
  function renderAdminStats() {
    const total = SkullStore.products.length;
    const active = SkullStore.products.filter(p => p.active).length;
    const inactive = total - active;

    const categoryCounts = {};
    SkullStore.categories.forEach(cat => {
      categoryCounts[cat] = SkullStore.products.filter(p => p.category === cat).length;
    });

    let html = `
      <div class="stat-card">
        <div class="stat-number">${total}</div>
        <div class="stat-label">Total productos</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">${active}</div>
        <div class="stat-label">Activos</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">${inactive}</div>
        <div class="stat-label">Inactivos</div>
      </div>
    `;

    SkullStore.categories.forEach(cat => {
      html += `
        <div class="stat-card">
          <div class="stat-number">${categoryCounts[cat]}</div>
          <div class="stat-label">${cat}</div>
        </div>
      `;
    });

    $('#adminStats').innerHTML = html;
  }


  /* ============================================================
     12. ADMIN — Product Table
     ============================================================ */
  function renderAdminTable() {
    const tbody = $('#adminTableBody');
    tbody.innerHTML = '';

    SkullStore.products.forEach(product => {
      const tr = document.createElement('tr');

      const imgCell = product.image
        ? `<img src="${product.image}" alt="${product.name}" class="table-img">`
        : `<div class="table-no-img">Sin img</div>`;

      const statusBadge = product.active
        ? '<span class="badge-active">Activo</span>'
        : '<span class="badge-inactive">Inactivo</span>';

      tr.innerHTML = `
        <td>${imgCell}</td>
        <td>
          <strong>${product.name}</strong>
          ${product.description ? `<br><small style="color: var(--text-muted)">${product.description.substring(0, 60)}${product.description.length > 60 ? '...' : ''}</small>` : ''}
        </td>
        <td>${product.category}</td>
        <td>${statusBadge}</td>
        <td>
          <div class="table-actions">
            <button class="btn btn-secondary btn-sm" data-edit="${product.id}">Editar</button>
            <button class="btn btn-danger btn-sm" data-delete="${product.id}">Eliminar</button>
          </div>
        </td>
      `;

      tbody.appendChild(tr);
    });

    // Bind edit buttons
    tbody.querySelectorAll('[data-edit]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.edit;
        openEditForm(id);
      });
    });

    // Bind delete buttons
    tbody.querySelectorAll('[data-delete]').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.dataset.delete;
        const product = SkullStore.getProductById(id);
        if (!product) return;

        const confirmed = await showConfirm(
          '¿Eliminar producto?',
          `Se eliminará "${product.name}" permanentemente.`
        );

        if (confirmed) {
          btn.disabled = true;
          const products = SkullStore.products.filter(item => String(item.id) !== String(id));
          try {
            await persistProducts(products);
            if (product.imagePath && product.image?.includes('.public.blob.vercel-storage.com')) {
              Api.deleteImage(product.image).catch(error => {
                console.error('No se pudo limpiar la imagen anterior:', error);
              });
            }
            showToast(`"${product.name}" eliminado`);
          } catch (error) {
            handleAdminError(error);
            btn.disabled = false;
          }
        }
      });
    });
  }


  /* ============================================================
     13. ADMIN — Show List / Show Form panels
     ============================================================ */
  function showAdminList() {
    $('#adminListPanel').style.display = 'block';
    $('#adminFormPanel').classList.remove('active');
  }

  function showAdminForm() {
    $('#adminListPanel').style.display = 'none';
    $('#adminFormPanel').classList.add('active');
  }


  /* ============================================================
     14. ADMIN — Add / Edit Product Form
     ============================================================ */
  let editingImage = '';
  let editingImagePath = '';
  let pendingImageFile = null;
  let previewObjectUrl = '';

  $('#addProductBtn').addEventListener('click', () => {
    openNewForm();
  });

  function openNewForm() {
    $('#formTitle').textContent = 'Nuevo producto';
    $('#productId').value = '';
    $('#productName').value = '';
    $('#productDescription').value = '';
    $('#productImage').value = '';
    $('#productCategory').value = '';
    $('#productActive').value = 'true';
    $('#imagePreview').classList.add('hidden');
    $('#imagePreview').src = '';
    $('#formError').classList.add('hidden');
    $('#formSubmitBtn').textContent = 'Crear producto';
    resetImageState();
    showAdminForm();
  }

  function openEditForm(id) {
    const product = SkullStore.getProductById(id);
    if (!product) return;

    $('#formTitle').textContent = 'Editar producto';
    $('#productId').value = product.id;
    $('#productName').value = product.name;
    $('#productDescription').value = product.description || '';
    $('#productImage').value = '';
    $('#productCategory').value = product.category;
    $('#productActive').value = product.active ? 'true' : 'false';
    $('#formSubmitBtn').textContent = 'Guardar cambios';

    resetImageState();
    editingImage = product.image || '';
    editingImagePath = product.imagePath || '';

    if (product.image) {
      $('#imagePreview').src = product.image;
      $('#imagePreview').classList.remove('hidden');
    } else {
      $('#imagePreview').classList.add('hidden');
      $('#imagePreview').src = '';
    }

    $('#formError').classList.add('hidden');
    showAdminForm();
  }

  // La vista previa es local; el archivo se sube a Blob al guardar.
  $('#productImage').addEventListener('change', function () {
    const file = this.files[0];
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/webp', 'image/avif'].includes(file.type)) {
      this.value = '';
      showFormError('Usa una imagen JPG, PNG, WebP o AVIF.');
      return;
    }
    pendingImageFile = file;
    if (previewObjectUrl) URL.revokeObjectURL(previewObjectUrl);
    previewObjectUrl = URL.createObjectURL(file);
    $('#imagePreview').src = previewObjectUrl;
    $('#imagePreview').classList.remove('hidden');
  });

  // Cancel
  $('#formCancelBtn').addEventListener('click', () => {
    showAdminList();
  });

  // Submit
  $('#productForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = $('#productId').value || null;
    const name = $('#productName').value.trim();
    const description = $('#productDescription').value.trim();
    const category = $('#productCategory').value;
    const active = $('#productActive').value === 'true';

    // Validation
    if (!name) {
      showFormError('El nombre es obligatorio.');
      return;
    }
    if (!category) {
      showFormError('La categoría es obligatoria.');
      return;
    }
    if (!editingImage && !pendingImageFile && !description) {
      showFormError('Debe tener al menos una imagen o una descripción.');
      return;
    }

    const submitButton = $('#formSubmitBtn');
    submitButton.disabled = true;
    submitButton.textContent = pendingImageFile ? 'Subiendo imagen…' : 'Guardando…';
    $('#formError').classList.add('hidden');

    let uploadedImage = null;
    try {
      if (pendingImageFile) {
        const optimizedFile = await optimizeImage(pendingImageFile);
        if (optimizedFile.size > 4 * 1024 * 1024) {
          throw new Error('La imagen sigue superando 4 MB después de optimizarla.');
        }
        uploadedImage = await Api.uploadImage(optimizedFile);
      }

      const data = {
        name,
        description,
        image: uploadedImage?.url || editingImage || '',
        imagePath: uploadedImage?.pathname || editingImagePath || '',
        category,
        active,
      };
      const oldProduct = id ? SkullStore.getProductById(id) : null;
      let products;
      if (id) {
        products = SkullStore.products.map(product =>
          String(product.id) === String(id) ? { ...product, ...data } : product
        );
      } else {
        const newId = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}`;
        products = [...SkullStore.products, { id: newId, ...data, price: '' }];
      }

      submitButton.textContent = 'Guardando…';
      await persistProducts(products);

      if (
        uploadedImage &&
        oldProduct?.imagePath &&
        oldProduct.image?.includes('.public.blob.vercel-storage.com')
      ) {
        Api.deleteImage(oldProduct.image).catch(error => {
          console.error('No se pudo limpiar la imagen reemplazada:', error);
        });
      }

      showAdminList();
      resetImageState();
      showToast(id ? `"${name}" actualizado` : `"${name}" creado`);
    } catch (error) {
      if (uploadedImage?.url) {
        Api.deleteImage(uploadedImage.url).catch(() => {});
      }
      if (error.status === 401) handleAdminError(error);
      else showFormError(error.message || 'No se pudo guardar el producto.');
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = id ? 'Guardar cambios' : 'Crear producto';
    }
  });

  function resetImageState() {
    if (previewObjectUrl) URL.revokeObjectURL(previewObjectUrl);
    previewObjectUrl = '';
    pendingImageFile = null;
    editingImage = '';
    editingImagePath = '';
  }

  async function optimizeImage(file) {
    const bitmap = await createImageBitmap(file);
    const maxDimension = 1920;
    const scale = Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();

    const blob = await new Promise((resolve, reject) => {
      canvas.toBlob(
        result => result ? resolve(result) : reject(new Error('No se pudo optimizar la imagen.')),
        'image/webp',
        0.84
      );
    });
    return new File([blob], `${file.name.replace(/\.[^.]+$/, '') || 'imagen'}.webp`, {
      type: 'image/webp',
    });
  }

  function showFormError(msg) {
    const el = $('#formError');
    el.textContent = msg;
    el.classList.remove('hidden');
  }


  /* ============================================================
     15. INITIALIZATION
     ============================================================ */
  renderCatalogTabs();
  renderCatalog();
  await refreshCatalog();

  try {
    const session = await Api.session();
    SkullStore.isLoggedIn = session.authenticated;
  } catch (error) {
    SkullStore.isLoggedIn = false;
  }

  // Route on load
  if (location.hash === '#/admin') {
    navigate('#/admin');
  } else {
    navigate('#/');
  }

});
