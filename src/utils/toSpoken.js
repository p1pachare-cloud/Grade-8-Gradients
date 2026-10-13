const NUMBERS = [
  'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
  'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen',
  'seventeen', 'eighteen', 'nineteen', 'twenty'
];

function numberToWords(n) {
  const abs = Math.abs(n);
  if (abs <= 20) return NUMBERS[abs];
  return String(abs);
}

function fractionWords(n, d) {
  if (d === 2) return n === 1 ? 'one half' : `${numberToWords(n)} halves`;
  if (d === 3) return n === 1 ? 'one third' : `${numberToWords(n)} thirds`;
  if (d === 4) return n === 1 ? 'one quarter' : `${numberToWords(n)} quarters`;
  return `${numberToWords(n)} over ${numberToWords(d)}`;
}

export function toSpoken(text) {
  if (!text) return '';
  return text
    .replace(/\u2212/g, 'negative ')
    .replace(/-(?=\d)/g, 'negative ')
    .replace(/(\d+)\/(\d+)/g, (_, n, d) => fractionWords(Number(n), Number(d)))
    .replace(/\((\s*-?\d+\s*),\s*(-?\d+\s*)\)/g, (_, x, y) => `point ${x}, ${y}`)
    .replace(/y\s*=\s*(-?\d*)\s*x\s*([+-]\s*\d+)?/g, (_, m, c) => `y equals ${m || '1'} x ${c || ''}`)
    .replace(/(\d+)\s*%/g, '$1 percent')
    .replace(/1\s+in\s+(\d+)/gi, 'one in $1');
}
