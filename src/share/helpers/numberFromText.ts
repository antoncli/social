export const numberFromText = (text: string): number => {
  const charCodes = text
    .split("")
    .map((char) => char.charCodeAt(0))
    .join("");
  return parseInt(charCodes, 10);
};
