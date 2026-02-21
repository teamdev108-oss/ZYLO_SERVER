import z from "zod";

const registerUserValidator = z.object({
  name: z
    .string()
    .trim()
    .min(3, {
      message: "name should be minimum 3 characters",
    })
    .max(50, {
      message: "name should be maximum 50 characters",
    }),

  email: z
    .email({
      message: "email must be valid",
    })
    .trim(),

  password: z.string().min(6, {
    message: "password must be minimum 6 characters",
  }),
});

export default registerUserValidator;
