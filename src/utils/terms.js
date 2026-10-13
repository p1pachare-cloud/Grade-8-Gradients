const TERMS = {
  gradient: {
    gradient: 'gradient',
    Gradient: 'Gradient',
    gradients: 'gradients',
    Gradients: 'Gradients',
  },
  slope: {
    gradient: 'slope',
    Gradient: 'Slope',
    gradients: 'slopes',
    Gradients: 'Slopes',
  },
};

export const resolveTerms = (text, term = 'gradient') => {
  if (!text) return '';
  const map = TERMS[term] || TERMS.gradient;
  return text.replace(/\{\{(gradient|Gradient|gradients|Gradients)\}\}/g, (_, k) => map[k] || k);
};
