const root = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const year = document.getElementById('year');
const filterButtons = document.querySelectorAll('.filter-button');
const projectCards = document.querySelectorAll('.project-card');
const projectStrip = document.getElementById('project-grid');
const prevButton = document.getElementById('projects-prev');
const nextButton = document.getElementById('projects-next');

const storedTheme = localStorage.getItem('theme');
if (storedTheme === 'dark') {
  root.setAttribute('data-theme', 'dark');
}

const applyToggleText = () => {
  const darkModeEnabled = root.getAttribute('data-theme') === 'dark';
  themeToggle.querySelector('.toggle-label').textContent = darkModeEnabled ? 'Light mode' : 'Dark mode';
};

const updateProjectNavState = () => {
  const maxScrollLeft = projectStrip.scrollWidth - projectStrip.clientWidth;
  prevButton.disabled = projectStrip.scrollLeft <= 2;
  nextButton.disabled = projectStrip.scrollLeft >= maxScrollLeft - 2;
};

const scrollProjects = (direction) => {
  const card = projectStrip.querySelector('.project-card:not(.hidden)');
  const step = card ? card.getBoundingClientRect().width + 16 : 320;
  projectStrip.scrollBy({ left: direction * step, behavior: 'smooth' });
};

applyToggleText();

themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  const nextTheme = current === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', nextTheme);
  localStorage.setItem('theme', nextTheme);
  applyToggleText();
});

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const selectedFilter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');

    projectCards.forEach((card) => {
      const stack = card.dataset.stack.split(' ');
      const shouldShow = selectedFilter === 'all' || stack.includes(selectedFilter);
      card.classList.toggle('hidden', !shouldShow);
    });

    projectStrip.scrollTo({ left: 0, behavior: 'smooth' });
    requestAnimationFrame(updateProjectNavState);
  });
});

prevButton.addEventListener('click', () => scrollProjects(-1));
nextButton.addEventListener('click', () => scrollProjects(1));
projectStrip.addEventListener('scroll', updateProjectNavState);
window.addEventListener('resize', updateProjectNavState);

year.textContent = new Date().getFullYear();
updateProjectNavState();
