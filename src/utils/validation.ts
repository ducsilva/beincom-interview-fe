import * as yup from "yup";

const emailMessage = "Email is not valid";
const requireEmail = "Email is required";
const requirePassword = "Password is required";
const minlengthPassword = "Password must be at least 8 characters";
const maxLengthPassword = "Password must not exceed 20 characters";
const uppercasePassword = "Password must not exceed 20 characters";
const lowercasePassword = "At least one lowercase letter (a-z)";
const numberPassword = "At least one digit (0-9)";
const specialPassword = "At least one special character (!@#$%^&*)";
const whitespacePassword = "no-leading-trailing-whitespace";
const startEndPassword = "Password must not start or end with whitespace";
const requireFullName = "Full Name is required";
const betweenFullName = "Full Name must be between 3 to 64 characters";
const requireUsername = "User Name is required";
const betweenUsername = "User Name must be between 5 to 50 characters";
const requirePolicy = "You must accept Our Privacy and Terms";
const requireTitle = "Title is required";
const requireContent = "Content is required";
const requireCategory = "Category is required";
const requireBanner = "Banner image is required";
const unsupportedFormat = "Unsupported file format";
const requireCategoryName = "Category name is required";
const requireComment = "Comment is required";

const signUpSchema = yup.object().shape({
  email: yup.string().required(requireEmail).email(emailMessage),
  fullname: yup
    .string()
    .required(requireFullName)
    .min(3, betweenFullName)
    .max(64, betweenFullName),
  username: yup
    .string()
    .required(requireUsername)
    .min(3, betweenUsername)
    .max(64, betweenUsername),
  password: yup
    .string()
    .required(requirePassword)
    .min(8, minlengthPassword)
    .max(20, maxLengthPassword)
    .matches(/[A-Z]/, uppercasePassword)
    .matches(/[a-z]/, lowercasePassword)
    .matches(/\d/, numberPassword)
    .matches(/[!@#$%^&*]/, specialPassword)
    .test(
      whitespacePassword,
      startEndPassword,
      (value) => value && !/^\s|\s$/.test(value)
    ),
  terms: yup.bool().oneOf([true], requirePolicy),
});

const loginSchema = yup.object().shape({
  email: yup.string().required(requireEmail).email(emailMessage),
  password: yup.string().required(requirePassword),
});

const createPostSChema = yup.object().shape({
  title: yup.string().required(requireTitle),
  content: yup.string().required(requireContent),
  category: yup
    .object()
    .shape({
      value: yup.string().required(requireCategory),
    })
    .nullable()
    .required(requireCategory),
  banner: yup
    .mixed()
    .required(requireBanner)
    .test("fileType", unsupportedFormat, (value: File) => {
      return value && ["image/jpeg", "image/png"].includes(value.type);
    })
    .test("fileSize", "File too large", (value: File) => {
      return value && value.size <= 5 * 1024 * 1024;
    }),
});

const createCategorySChema = yup.object().shape({
  name: yup.string().required(requireCategoryName),
});

const commentSchema = yup.object().shape({
  content: yup.string().required(requireComment),
});

export {
  signUpSchema,
  loginSchema,
  createPostSChema,
  createCategorySChema,
  commentSchema,
};
