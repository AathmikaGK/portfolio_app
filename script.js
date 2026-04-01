const year = document.getElementById('year');
const filterButtons = document.querySelectorAll('.filter-button');
const projectCards = document.querySelectorAll('.project-card');

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
