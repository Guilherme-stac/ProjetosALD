document.addEventListener('DOMContentLoaded', () => {

  // ===== 1. Cursor Customizado =====
  const cursor = document.getElementById('cursor');
  const cursorDot = document.getElementById('cursorDot');
  let mouseX = 0, mouseY = 0;
  let curX = 0, curY = 0;

  if (window.innerWidth > 768 && cursor && cursorDot) {
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.transform = `translate(${mouseX - 3}px, ${mouseY - 3}px)`;
    });

    function animateCursor() {
      curX += (mouseX - curX) * 0.18;
      curY += (mouseY - curY) * 0.18;
      cursor.style.transform = `translate(${curX - 18}px, ${curY - 18}px)`;
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    const interactiveElements = document.querySelectorAll('a, button, .magnetic, .project-card, .timeline-content, .skills span, .form-input, .form-textarea');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('cursor-grow'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-grow'));
    });
  }

  // ===== 2. Barra de Progresso & Nav Scroll =====
  const progress = document.getElementById('scrollProgress');
  const nav = document.getElementById('nav');

  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const scrollTop = h.scrollTop || document.body.scrollTop;
    const scrollHeight = h.scrollHeight - h.clientHeight;
    
    // Atualiza a barra de progresso no topo
    if (progress && scrollHeight > 0) {
      const scrolled = (scrollTop / scrollHeight) * 100;
      progress.style.width = scrolled + '%';
    }

    // Adiciona classe de rolagem na navegação (caso queira estilizar no CSS)
    if (nav) {
      if (scrollTop > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }
  });

  // ===== 3. Filtro de Projetos =====
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterBtns.length > 0 && projectCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove a classe active de todos os botões e adiciona no clicado
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
          const category = card.getAttribute('data-category') || '';
          if (filterValue === 'all' || category.includes(filterValue)) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // ===== 4. Animação de Revelação ao Rolar (Scroll Reveal) =====
  const revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length > 0) {
    const revealOnScroll = () => {
      const triggerBottom = window.innerHeight * 0.85;

      revealElements.forEach(el => {
        const boxTop = el.getBoundingClientRect().top;
        if (boxTop < triggerBottom) {
          el.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Executa uma vez ao carregar para mostrar os elementos visíveis
  }

});
