const year = document.getElementById('year');
const timelineItems = document.querySelectorAll('[data-timeline-zoom]');

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const activateTimelineZoom = (item, event) => {
  const rect = item.getBoundingClientRect();
  const pointerX = event.clientX - rect.left;
  const normalized = clamp(pointerX / rect.width, 0, 1);
  const edgeDistance = Math.abs(normalized - 0.5);
  const intensity = 1 - edgeDistance * 2;
  const zoom = (1 + intensity * 0.05).toFixed(3);

  item.style.setProperty('--zoom-factor', zoom);
  item.classList.add('is-active');
};

timelineItems.forEach((item) => {
  item.addEventListener('mousemove', (event) => activateTimelineZoom(item, event));
  item.addEventListener('mouseenter', (event) => activateTimelineZoom(item, event));
  item.addEventListener('mouseleave', () => {
    item.style.setProperty('--zoom-factor', '1');
    item.classList.remove('is-active');
  });
});

year.textContent = new Date().getFullYear();
