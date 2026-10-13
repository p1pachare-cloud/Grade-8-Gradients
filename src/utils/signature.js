// Uniqueness hash for procedural questions
export const signatureOf = (q) =>
  `${q.type}|${JSON.stringify(q.params?.core || q.params || {})}`;
