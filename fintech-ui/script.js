// Mobile menu toggle
const mobileBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
if (mobileBtn && mobileMenu) {
  mobileBtn.addEventListener('click', () => { mobileMenu.classList.toggle('hidden'); });
  mobileMenu.addEventListener('click', (e) => { if (e.target === mobileMenu) mobileMenu.classList.add('hidden'); });
}

// Small parallax tilt effect for the phone mock
const phoneWrap = document.getElementById('phoneWrap');
if (phoneWrap) {
  phoneWrap.addEventListener('mousemove', (e) => {
    const rect = phoneWrap.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 .. 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const rx = (y * 10).toFixed(2);
    const ry = (x * -15).toFixed(2);
    phoneWrap.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(8px)`;
  });
  phoneWrap.addEventListener('mouseleave', () => { phoneWrap.style.transform = 'rotateX(0deg) rotateY(0deg)'; });
}

// Lazy load phone image
document.addEventListener('DOMContentLoaded', () => {
  const phoneImg = document.getElementById('phoneMock');
  if (phoneImg && 'loading' in HTMLImageElement.prototype) {
    phoneImg.loading = 'lazy';
  }
});
