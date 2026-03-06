export function sanitizeText(input) {
  const div = document.createElement("div");
  div.textContent = input;
  return div.innerHTML;
}
