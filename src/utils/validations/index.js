import * as yup from "yup";

const productValidation = {
  category: "Category is required",
  description: "Description is required",
  image: "Image URL is required",
  price: "Price is required",
};

export const productValidationSchema = yup.object().shape({
  category: yup.string().required(productValidation.category),
  description: yup.string().required(productValidation.description),
  image: yup.string().required(productValidation.image),
  price: yup.number().required(productValidation.price),
});
