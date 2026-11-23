/**
 * GoTogether - TP Front End (Grupo 35 - IFTS 29)
 * Etapa 5: Interacciones completas, Modo Oscuro con persistencia,
 *          Menú Hamburguesa accesible, animaciones y simulador interactivo.
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. Modo Oscuro (Dark Theme) con Persistencia y Sombras Blancas
     ========================================================================== */
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const themeText = document.getElementById('theme-text');
  const htmlRoot = document.documentElement;

  // Recupera la preferencia guardada o el esquema del sistema
  const savedTheme = localStorage.getItem('gotogether-theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

  aplicarTema(initialTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      aplicarTema(newTheme);
      localStorage.setItem('gotogether-theme', newTheme);
    });
  }

  function aplicarTema(theme) {
    htmlRoot.setAttribute('data-theme', theme);
    if (!themeIcon || !themeText) return;

    if (theme === 'dark') {
      themeIcon.textContent = '☀️';
      themeText.textContent = 'Modo Claro';
      themeToggle.setAttribute('aria-label', 'Cambiar a modo claro');
      themeToggle.setAttribute('title', 'Cambiar a modo claro');
    } else {
      themeIcon.textContent = '🌙';
      themeText.textContent = 'Modo Oscuro';
      themeToggle.setAttribute('aria-label', 'Cambiar a modo oscuro');
      themeToggle.setAttribute('title', 'Cambiar a modo oscuro');
    }
  }


  /* ==========================================================================
     2. Menú Hamburguesa Responsivo
     ========================================================================== */
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const siteNav = document.getElementById('site-nav');

  if (hamburgerBtn && siteNav) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = siteNav.classList.contains('is-open');
      toggleMenu(!isOpen);
    });

    // Cerrar al presionar la tecla Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && siteNav.classList.contains('is-open')) {
        toggleMenu(false);
        hamburgerBtn.focus();
      }
    });

    // Cerrar al hacer clic fuera del menú en pantallas móviles
    document.addEventListener('click', (e) => {
      if (siteNav.classList.contains('is-open')) {
        if (!siteNav.contains(e.target) && !hamburgerBtn.contains(e.target)) {
          toggleMenu(false);
        }
      }
    });
  }

  function toggleMenu(abrir) {
    if (!hamburgerBtn || !siteNav) return;
    if (abrir) {
      siteNav.classList.add('is-open');
      hamburgerBtn.classList.add('is-active');
      hamburgerBtn.setAttribute('aria-expanded', 'true');
      hamburgerBtn.setAttribute('aria-label', 'Cerrar menú de navegación');
    } else {
      siteNav.classList.remove('is-open');
      hamburgerBtn.classList.remove('is-active');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      hamburgerBtn.setAttribute('aria-label', 'Abrir menú de navegación');
    }
  }


  /* ==========================================================================
     3. Desplegables <details> / <summary> y Botón "Abrir / Cerrar todos"
     ========================================================================== */
  const detailsElements = document.querySelectorAll('.propuesta-detalles');
  const btnToggleAll = document.getElementById('btn-toggle-all-details');
  const btnToggleText = document.getElementById('btn-toggle-text');

  // Soporte accesible por teclado (Enter y Espacio) en summary
  detailsElements.forEach((details) => {
    const summary = details.querySelector('summary');
    if (!summary) return;

    summary.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault(); // Evita scroll indeseado al presionar Espacio
        details.open = !details.open;
        actualizarEstadoBotonToggle();
      } else if (e.key === 'Enter') {
        setTimeout(actualizarEstadoBotonToggle, 20);
      }
    });

    summary.addEventListener('click', () => {
      setTimeout(actualizarEstadoBotonToggle, 20);
    });
  });

  function actualizarEstadoBotonToggle() {
    if (!btnToggleAll || !btnToggleText) return;
    const todosAbiertos = Array.from(detailsElements).every((d) => d.open);

    if (todosAbiertos) {
      btnToggleAll.setAttribute('aria-expanded', 'true');
      btnToggleText.textContent = 'Cerrar todos los detalles';
    } else {
      btnToggleAll.setAttribute('aria-expanded', 'false');
      btnToggleText.textContent = 'Abrir todos los detalles';
    }
  }

  if (btnToggleAll) {
    btnToggleAll.addEventListener('click', () => {
      const todosAbiertos = Array.from(detailsElements).every((d) => d.open);
      const nuevoEstado = !todosAbiertos;

      detailsElements.forEach((details) => {
        details.open = nuevoEstado;
      });

      actualizarEstadoBotonToggle();
    });
  }


  /* ==========================================================================
     4. Navegación Sticky con Scroll Suave y Resaltado Activo
     ========================================================================== */
  const navLinks = document.querySelectorAll('.site-nav .nav-link');
  const secciones = [
    document.getElementById('presentacion'),
    document.getElementById('propuestas'),
    document.getElementById('diagramas'),
    document.getElementById('detalles')
  ].filter(Boolean);

  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();

          // Si el ancla es #detalles, desplegar ambos details y apuntar al inicio del bloque
          if (targetId === '#detalles') {
            detailsElements.forEach((d) => (d.open = true));
            actualizarEstadoBotonToggle();

            const targetDetail = document.getElementById('detalles-r5') || targetElement;
            const headerOffset = 100;
            const elementPosition = targetDetail.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });

            const summaryEl = targetDetail.querySelector('summary');
            if (summaryEl) summaryEl.focus();

            toggleMenu(false);
            history.pushState(null, null, targetId);
            actualizarLinkActivo('detalles');
            return;
          }

          const headerOffset = 85;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });

          // Cierra menú móvil al hacer clic
          toggleMenu(false);

          history.pushState(null, null, targetId);
          actualizarLinkActivo(targetId.substring(1));
        }
      }
    });
  });

  function actualizarLinkActivo(idActivo) {
    navLinks.forEach((link) => {
      const href = link.getAttribute('href').replace('#', '');
      if (href === idActivo) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });
  }

  // Detección automática de sección visible
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          actualizarLinkActivo(entry.target.id);
        }
      });
    }, observerOptions);

    secciones.forEach((sec) => sectionObserver.observe(sec));
  } else {
    window.addEventListener('scroll', () => {
      let actual = '';
      const scrollPos = window.pageYOffset + 150;

      secciones.forEach((sec) => {
        if (sec.offsetTop <= scrollPos) {
          actual = sec.getAttribute('id');
        }
      });

      if (actual) {
        actualizarLinkActivo(actual);
      }
    });
  }


  /* ==========================================================================
     5. Mini Simulador Visual "Probar un caso" (Resaltado en SVG)
     ========================================================================== */

  // Mapeo de casos para el Diagrama 1 (R5)
  const casosR5 = {
    'r5-exito': {
      nodes: [
        'r5-step-inicio',
        'r5-step-datos',
        'r5-step-agente',
        'r5-step-deca',
        'r5-step-decb',
        'r5-step-decc',
        'r5-step-reserva',
        'r5-step-registro',
        'r5-step-fin-ok'
      ],
      edges: [
        'r5-edge-1',
        'r5-edge-2',
        'r5-edge-3',
        'r5-edge-deca-si',
        'r5-edge-decb-si',
        'r5-edge-decc-si',
        'r5-edge-exito-1',
        'r5-edge-exito-2'
      ],
      tipo: 'success',
      mensaje: '🟢 <strong>Caso 1: Cumplimiento total.</strong> Se validaron datos, condición de edad (mayor de edad o menor con autorización) y cupo libre en tiempo real. Se reserva el asiento y se registra la incorporación exitosa.'
    },
    'r5-incompleto': {
      nodes: [
        'r5-step-inicio',
        'r5-step-datos',
        'r5-step-agente',
        'r5-step-deca',
        'r5-step-rechazo-ab',
        'r5-step-humano',
        'r5-step-fin-ab'
      ],
      edges: [
        'r5-edge-1',
        'r5-edge-2',
        'r5-edge-3',
        'r5-edge-deca-no',
        'r5-edge-rechazo-1',
        'r5-edge-rechazo-2'
      ],
      tipo: 'purple',
      mensaje: '🟣 <strong>Caso 2: Requisitos faltantes.</strong> No se reserva cupo; se solicita lo faltante y se deriva a revisión humana ante discrepancias (Decisión del grupo).'
    },
    'r5-sin-cupo': {
      nodes: [
        'r5-step-inicio',
        'r5-step-datos',
        'r5-step-agente',
        'r5-step-deca',
        'r5-step-decb',
        'r5-step-decc',
        'r5-step-rechazo-c',
        'r5-step-deriva-r6'
      ],
      edges: [
        'r5-edge-1',
        'r5-edge-2',
        'r5-edge-3',
        'r5-edge-deca-si',
        'r5-edge-decb-si',
        'r5-edge-decc-no',
        'r5-edge-deriva-r6'
      ],
      tipo: 'danger',
      mensaje: '🔵 <strong>Caso 3 (Caso límite R5):</strong> Cumple identidad y tutoría, pero el cupo se agotó justo al confirmar. No se reserva y pasa de inmediato al Flujo R6.'
    }
  };

  // Mapeo de casos para el Diagrama 2 (R6)
  const casosR6 = {
    'r6-alternativas': {
      nodes: [
        'r6-step-inicio',
        'r6-step-datos',
        'r6-step-agente',
        'r6-step-decision',
        'r6-step-informa',
        'r6-step-opciones',
        'r6-step-solicita',
        'r6-step-rojo',
        'r6-step-espera',
        'r6-step-fin-ok'
      ],
      edges: [
        'r6-edge-1',
        'r6-edge-2',
        'r6-edge-3',
        'r6-edge-si',
        'r6-edge-si-opciones',
        'r6-edge-con-alt',
        'r6-edge-a-rojo',
        'r6-edge-espera',
        'r6-edge-fin'
      ],
      tipo: 'danger',
      mensaje: '🟠 <strong>Caso 1: Cupo perdido con opciones.</strong> Se informa el cambio, se muestran grupos compatibles y <strong>NO se asigna otro automáticamente</strong>. El usuario elige.'
    },
    'r6-sin-opciones': {
      nodes: [
        'r6-step-inicio',
        'r6-step-datos',
        'r6-step-agente',
        'r6-step-decision',
        'r6-step-informa',
        'r6-step-opciones',
        'r6-step-sin-alt',
        'r6-step-fin-sin-alt'
      ],
      edges: [
        'r6-edge-1',
        'r6-edge-2',
        'r6-edge-3',
        'r6-edge-si',
        'r6-edge-si-opciones',
        'r6-edge-sin-alt',
        'r6-edge-sin-alt-fin'
      ],
      tipo: 'purple',
      mensaje: '🟣 <strong>Caso 2 (Caso límite R6):</strong> No hay grupos alternativos compatibles. No se asigna nada; se informa y se ofrece ajustar la búsqueda (Decisión del grupo).'
    },
    'r6-normal': {
      nodes: [
        'r6-step-inicio',
        'r6-step-datos',
        'r6-step-agente',
        'r6-step-decision',
        'r6-step-continua',
        'r6-step-fin-normal'
      ],
      edges: [
        'r6-edge-1',
        'r6-edge-2',
        'r6-edge-3',
        'r6-edge-no',
        'r6-edge-no-fin'
      ],
      tipo: 'success',
      mensaje: '🟢 <strong>Caso 3: Incorporación estándar.</strong> El grupo conservó su vacante (NO perdió cupo). La incorporación continúa de forma habitual sin interrupciones.'
    }
  };

  const botonesCaso = document.querySelectorAll('.btn-caso');

  botonesCaso.forEach((btn) => {
    btn.addEventListener('click', () => {
      const diagramaId = btn.getAttribute('data-diagrama');
      const casoId = btn.getAttribute('data-caso');
      const contenedorSimulador = document.getElementById(`simulador-${diagramaId}`);
      const svg = document.getElementById(`svg-${diagramaId}`);
      const feedback = document.getElementById(`feedback-${diagramaId}`);

      if (!svg || !feedback) return;

      contenedorSimulador.querySelectorAll('.btn-caso').forEach((b) => b.classList.remove('active'));

      if (casoId === 'reset') {
        svg.classList.remove('is-simulating');
        svg.querySelectorAll('.svg-step, .svg-edge').forEach((el) => {
          el.classList.remove('is-path-node', 'is-path-edge', 'is-path-node-success', 'is-path-node-danger', 'is-path-node-purple');
        });
        feedback.innerHTML = 'Diagrama restablecido a la vista estándar. Seleccioná un caso para probar otro camino.';
        return;
      }

      btn.classList.add('active');

      const dataCaso = diagramaId === 'r5' ? casosR5[casoId] : casosR6[casoId];
      if (!dataCaso) return;

      svg.classList.add('is-simulating');

      svg.querySelectorAll('.svg-step, .svg-edge').forEach((el) => {
        el.classList.remove('is-path-node', 'is-path-edge', 'is-path-node-success', 'is-path-node-danger', 'is-path-node-purple');
      });

      dataCaso.nodes.forEach((nodeId) => {
        const nodeEl = svg.getElementById(nodeId);
        if (nodeEl) {
          nodeEl.classList.add('is-path-node');
          if (dataCaso.tipo === 'success') nodeEl.classList.add('is-path-node-success');
          if (dataCaso.tipo === 'danger') nodeEl.classList.add('is-path-node-danger');
          if (dataCaso.tipo === 'purple') nodeEl.classList.add('is-path-node-purple');
        }
      });

      dataCaso.edges.forEach((edgeId) => {
        const edgeEl = svg.getElementById(edgeId);
        if (edgeEl) {
          edgeEl.classList.add('is-path-edge');
        }
      });

      feedback.innerHTML = dataCaso.mensaje;
    });
  });

});
