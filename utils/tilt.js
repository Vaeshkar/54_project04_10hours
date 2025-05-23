export function applyTiltEffect(elements) {
  VanillaTilt.init(elements, {
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