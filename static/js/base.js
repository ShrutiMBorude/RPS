// Shared script entry for all static pages.
window.rpsFormatNumber = function rpsFormatNumber(value){
  const num = Number(value);
  return Number.isFinite(num) ? num.toLocaleString() : String(value);
};
