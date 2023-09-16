export const formatPrice = (
  price: number,
  locale: string | undefined = "ua"
) => {
  return price.toLocaleString(locale, {
    style: "currency",
    currency: "uah",
  });
};
