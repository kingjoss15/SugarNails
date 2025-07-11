
  // 1) Slider
  const slides = document.querySelectorAll('.slide'),
        navDots = document.querySelectorAll('.dot');
  let current = 0;

  function showSlide(n) {
    slides[current].classList.remove('active');
    navDots[current].classList.remove('active');

    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
    navDots[current].classList.add('active');

    // Reiniciar animación de fade-in para el nuevo slide
    // Quitar "visible" de todos los hero-content
document.querySelectorAll('.hero-content.fade-in').forEach(el => {
  el.classList.remove('visible');
});

// Aplicar "visible" solo al slide activo
const content = slides[current].querySelector('.hero-content.fade-in');
if (content) {
  void content.offsetWidth; // reinicia la animación
  content.classList.add('visible');
}

  }

  document.querySelector('.nav.next')
    .addEventListener('click', () => showSlide(current + 1));
  document.querySelector('.nav.prev')
    .addEventListener('click', () => showSlide(current - 1));

  navDots.forEach(dot =>
    dot.addEventListener('click', e => showSlide(+e.target.dataset.slide))
  );
  // 2) Interactive-dots
  const iDots = document.querySelectorAll('.i-dot');
  const popup = document.getElementById('dot-popup');
  const cardImg = popup.querySelector('img');
  const cardTitle = popup.querySelector('h5');

  iDots.forEach(dot => {
    dot.addEventListener('mouseenter', () => {
      const name = dot.dataset.serviceName || dot.dataset.productName;
      const src  = dot.dataset.serviceImg   || dot.dataset.productImg;

      cardTitle.textContent = name;
      cardImg.src           = src;
      cardImg.alt           = name;

      const r = dot.getBoundingClientRect();
      popup.style.top     = (r.top + r.height / 2) + 'px';
      popup.style.left    = (r.left + r.width / 2) + 'px';
      popup.style.display = 'block';
    });

    dot.addEventListener('mouseleave', () => {
      popup.style.display = 'none';
    });
  });

  // 3) Menú móvil
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileMenu   = document.getElementById('mobile-menu');

  hamburgerBtn.addEventListener('click', () => {
    const isVisible = mobileMenu.style.display === 'block';
    mobileMenu.style.display = isVisible ? 'none' : 'block';
  });

  // 4) Animación de fade-in
  const fadeElements = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  fadeElements.forEach(el => observer.observe(el));

  document.querySelectorAll('a[href="#contacto"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();

      // Oculta el resto de secciones
      document.querySelector('.hero-slider').style.display = 'none';

      // Muestra la sección de contacto
      const contactSection = document.getElementById('contacto');
      contactSection.classList.add('visible');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxxdsGZ5Nb2SY7UNsitXj0qnoUIOc45cBFKVk0-HrKNV-KWRLnjrohrJar2ZG6OP-gp/exec';

document.getElementById("contact-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const form = e.target;
  const fd = new FormData();

  // Solo nombre, correo y mensaje
  const nombre = form.querySelector('#name').value;
  const correo = form.querySelector('#email').value;
  const nota   = form.querySelector('#message').value;

  fd.append('nombre', nombre);
  fd.append('correo', correo);
  fd.append('notas', nota);

  fetch(SCRIPT_URL, {
    method: 'POST',
    body: fd
  })
  .then(res => {
    if (!res.ok) throw new Error(res.status);
    alert("¡Gracias! Tu mensaje fue enviado.");
    form.reset();
  })
  .catch(err => {
    console.error('Error al enviar:', err);
    alert("Hubo un error al enviar el mensaje.");
  });
});


