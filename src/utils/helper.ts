export const formatWhatsApp = (number: string) => {
  if (number) return number.replace(/(\d{2})(\d{2})(\d{5})(\d{4})/, '+$1 ($2) $3-$4');
};
