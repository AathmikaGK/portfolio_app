const root = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const year = document.getElementById('year');
const filterButtons = document.querySelectorAll('.filter-button');
const projectCards = document.querySelectorAll('.project-card');

const storedTheme = localStorage.getItem('theme');
if (storedTheme === 'dark') {
  root.setAttribute('data-theme', 'dark');
}

const applyToggleText = () => {
  const darkModeEnabled = root.getAttribute('data-theme') === 'dark';
  themeToggle.querySelector('.toggle-label').textContent = darkModeEnabled ? 'Light mode' : 'Dark mode';
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
  });
});

year.textContent = new Date().getFullYear();
