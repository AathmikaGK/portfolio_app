const year = document.getElementById('year');
const viewport = document.getElementById('stack-viewport');
const track = document.getElementById('stack-track');

if (year) {
  year.textContent = new Date().getFullYear();
}

if (viewport && track) {
  const original = [...track.children].map((node) => node.cloneNode(true));
  original.forEach((node) => track.appendChild(node));

  let speed = 0.6;
  let x = -(track.scrollWidth / 4);

  const setDirectionFromPointer = (event) => {
    const rect = viewport.getBoundingClientRect();
    const pointerRatio = (event.clientX - rect.left) / rect.width;

    if (pointerRatio > 0.7) {
      speed = Math.min(2.2, 0.6 + (pointerRatio - 0.7) * 4.5);
    } else if (pointerRatio < 0.3) {
      speed = -Math.min(2.2, 0.6 + (0.3 - pointerRatio) * 4.5);
    } else {
      speed = speed >= 0 ? 0.6 : -0.6;
    }
  };

  viewport.addEventListener('mousemove', setDirectionFromPointer);
  viewport.addEventListener('touchmove', (event) => {
    if (event.touches[0]) {
      setDirectionFromPointer(event.touches[0]);
    }
  });

  const animate = () => {
    const halfWidth = track.scrollWidth / 2;
    x += speed;

    if (x <= -halfWidth) x += halfWidth;
    if (x > 0) x -= halfWidth;

    track.style.transform = `translateX(${x}px)`;
    requestAnimationFrame(animate);
  };

  requestAnimationFrame(animate);
}
