export const generateRandomKey = () => {
  const keyCombination = Array.from({ length: 6 }, () =>
    Math.floor(Math.random() * 10)
  ).join("");
  return keyCombination;
};
