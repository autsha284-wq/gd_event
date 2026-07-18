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

  // Tap a service card -> show only that service's page (single index.html, no reload)
  function openServicePage(id) {
    document.querySelectorAll('.service-page-inline').forEach(el => el.classList.remove('active'));
    const target = document.getElementById(id);
    if (target) target.classList.add('active');
    document.body.classList.add('detail-open');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function closeServicePage() {
    document.body.classList.remove('detail-open');
    document.querySelectorAll('.service-page-inline').forEach(el => el.classList.remove('active'));
  }

  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', e => {
      e.preventDefault();
      openServicePage(card.dataset.target);
    });
  });

  document.querySelectorAll('.back-to-services').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      closeServicePage();
      document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
    });
  });

  document.querySelectorAll('.go-to-contact').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      closeServicePage();
      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Header logo -> always takes you back to the main home page
  document.getElementById('logoHome').addEventListener('click', () => {
    closeServicePage();
    window.scrollTo({ top: 0, behavior: 'instant' });
  });

  // Top nav links -> close any open service page first so the target section is visible
  document.querySelectorAll('.nav-links a, .nav-cta').forEach(link => {
    link.addEventListener('click', e => {
      const hash = link.getAttribute('href');
      if (hash && hash.startsWith('#')) {
        e.preventDefault();
        closeServicePage();
        const target = document.querySelector(hash);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  (function(){
  emailjs.init("DXUgvz-eYN69tya74");
})();

document.getElementById('bookForm').addEventListener('submit', function(e){
  e.preventDefault();

  emailjs.send("service_pqg89yy", "template_okyb9y3", {
    name: document.getElementById('name').value,
    phone: document.getElementById('phone').value,
    date: document.getElementById('date').value,
    package: document.getElementById('package').value,
    notes: document.getElementById('notes').value
  })
  .then(function(){
    document.getElementById('bookMsg').innerHTML = "✅ Enquiry sent successfully!";
    document.getElementById('bookForm').reset();
  })
  .catch(function(error){
    document.getElementById('bookMsg').innerHTML = "❌ Failed to send. Try again.";
    console.error("EmailJS Error:", error);
  });
});