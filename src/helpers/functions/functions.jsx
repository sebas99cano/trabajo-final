export function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  const a = Math.random().toFixed(1); // Valor alfa aleatorio entre 0 y 1

  return `rgba(${r}, ${g}, ${b}, ${a})`;
}
