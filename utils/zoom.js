export function zoomCard(cardElement) {
  // Remove any existing zoom overlay
  const existingOverlay = document.querySelector('.zoom-overlay');
  if (existingOverlay) existingOverlay.remove();

  // Create overlay
  const overlay = document.createElement('div');
  overlay.className = 'zoom-overlay fixed inset-0 bg-black/60 flex items-center justify-center z-50';
  overlay.style.transition = 'background 0.3s ease';

  // Clone the card
  const clone = cardElement.cloneNode(true);
  clone.classList.add('tilt-card', 'rounded-xl', 'transition-transform', 'duration-500');
  clone.style.width = '285px';
  clone.style.height = '400px';
  clone.style.transform = 'scale(1)';
  clone.style.transformStyle = 'preserve-3d';

  // Ensure buttons remain interactive
  clone.querySelectorAll('button').forEach(btn => btn.disabled = false);

  overlay.appendChild(clone);
  document.body.appendChild(overlay);

  requestAnimationFrame(() => {
    clone.style.transform = 'scale(1.5)';
  });

  overlay.addEventListener('click', () => {
    overlay.remove();
  });

  // Reapply VanillaTilt to the clone
  if (window.VanillaTilt) {
    VanillaTilt.init(clone, {
      max: 15,
      speed: 200,
      glare: true,
      "max-glare": 0.75,
      easing: "cubic-bezier(.03,.98,.52,.99)",
      gyroscope: true,
      reverse: true,
      perspective: 2000,
    });
  }
}