document.addEventListener('DOMContentLoaded', () => {
  const h1 = document.querySelector('h1');
  setInterval(() => {
    h1.textContent = h1.textContent.endsWith('...') 
      ? 'Próximamente Skull Studio Web' 
      : h1.textContent + '.';
  }, 700);
});