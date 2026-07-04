 // Nav shadow on scroll
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  });

  // 3D tilt on service cards
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'rotateY(0) rotateX(0) translateY(0)';
    });
  });

  // Booking form (front-end only demo)
  document.getElementById('bookForm').addEventListener('submit', function(e){
    e.preventDefault();
    document.getElementById('bookMsg').textContent = 'Thanks — your enquiry has been noted. We\'ll be in touch soon.';
    this.reset();
  });
