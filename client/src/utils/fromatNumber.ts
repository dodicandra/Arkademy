export const format = (val: string) => {
  const num = new Intl.NumberFormat('id').format(parseInt(val));
  return num;
};
