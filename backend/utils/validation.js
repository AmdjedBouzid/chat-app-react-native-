const { z } = require("zod");

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" }) // Require the email field
    .nonempty({ message: "Email is required" }) // Ensure email is not empty
    .email({ message: "Invalid email address" }), // Validate email format

  password: z
    .string({ required_error: "Password is required" }) // Require the password field
    .nonempty({ message: "Password is required" }) // Ensure password is not empty
    .min(6, { message: "Password must be at least 6 characters long" }) // Validate minimum length
    .refine(
      (value) => /[0-9]/.test(value), // Ensure it contains at least one digit
      { message: "Password must contain at least one digit" }
    )
    .refine(
      (value) => /[a-z]/.test(value), // Ensure it contains at least one lowercase letter
      { message: "Password must contain at least one lowercase letter" }
    ),
});

const nameRegex = /^[a-zA-Z]+$/; // Only allows letters and numbers

const registrationSchema = z.object({
  first_name: z
    .string()
    .nonempty({ message: "first name is required" })
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(20, { message: "Username must be at most 20 characters long" })
    .regex(nameRegex, {
      message: "Username must not contain special characters",
    }),

  last_name: z
    .string()
    .nonempty({ message: "last name is required" })
    .min(2, { message: "Last name must be at least 2 characters long" })
    .max(50, { message: "Last name must be at most 50 characters long" })
    .regex(nameRegex, {
      message: "Last name must not contain special characters",
    }),

  email: z
    .string({ required_error: "Email is required" }) // Require the email field
    .nonempty({ message: "Email is required" }) // Ensure email is not empty
    .email({ message: "Invalid email address" }), // Validate email format

  password: z
    .string({ required_error: "Password is required" }) // Require the password field
    .nonempty({ message: "Password is required" }) // Ensure password is not empty
    .min(6, { message: "Password must be at least 6 characters long" }) // Validate minimum length
    .refine(
      (value) => /[0-9]/.test(value), // Ensure it contains at least one digit
      { message: "Password must contain at least one digit" }
    )
    .refine(
      (value) => /[a-z]/.test(value), // Ensure it contains at least one lowercase letter
      { message: "Password must contain at least one lowercase letter" }
    ),
});

const updateUserSchema = z.object({
  first_name: z
    .string()
    .nonempty({ message: "first name is required" })
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(20, { message: "Username must be at most 20 characters long" })
    .regex(nameRegex, {
      message: "Username must not contain special characters",
    }),

  last_name: z
    .string()
    .nonempty({ message: "last name is required" })
    .min(2, { message: "Last name must be at least 2 characters long" })
    .max(50, { message: "Last name must be at most 50 characters long" })
    .regex(nameRegex, {
      message: "Last name must not contain special characters",
    }),

  email: z
    .string({ required_error: "Email is required" }) // Require the email field
    .nonempty({ message: "Email is required" }) // Ensure email is not empty
    .email({ message: "Invalid email address" }), // Validate email format

  birthday: z
    .string()
    .regex(
      /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{2}$/,
      "Birthday must be in the format DD/MM/YY"
    ),
  bio: z.string().min(5, "Bio must be at least 5 characters long"),
});

module.exports = { loginSchema, registrationSchema, updateUserSchema };
