export const validateString = (string: string): boolean => {
  const stringRegex =
    /^[а-яА-ЯґҐєЄіІїЇa-zA-Z''ʼ.,]+(?:[\s-][а-яА-ЯґҐєЄіІїЇa-zA-Z''ʼ.,]+)*$/;
  return stringRegex.test(string);
};

export const validateAge = (age: string): boolean => {
  const ageRegex = /^(0?[1-9]|[1-9][0-9]+)$/;
  return ageRegex.test(age);
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  return phoneRegex.test(phone);
};

export const validateImageURL = (url: string): boolean => {
  const imgUrlRegex =
    /^https:\/\/i\.imgur\.com\/[a-zA-Z0-9]+\.(jpg|jpeg|png|webp)$/;
  return imgUrlRegex.test(url);
};
