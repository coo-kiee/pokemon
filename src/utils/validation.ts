export const REG = {
  NATURAL_NUMBER: /^[1-9]{1}[0-9]*$/,
  NOT_NUMBER: /\D/g,
};

export const isNaturalNumber = (x: string) => {
  return REG.NATURAL_NUMBER.test(x);
};
