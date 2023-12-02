export const numThousand = (number) => {
  return Intl.NumberFormat("es-CO").format(number);
};

export const parserNumber = (val) => {
  if (!val) return 0;
  return Number.parseFloat(
    val.replace(/\$\s?|(\.*)/g, "").replace(/(\\,{1})/g, ".")
  ).toFixed(10);
};
