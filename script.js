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
    document.getElementById('bookMsg').innerHTML =
      alert("✅ Enquiry sent successfully!");
    document.getElementById('bookForm').reset();
  })
  .catch(function(error){
    document.getElementById('bookMsg').innerHTML =
      alert("❌ Failed to send. Try again.");
    console.error("EmailJS Error:", error);
  });
});
