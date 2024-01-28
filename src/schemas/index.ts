import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

export const GadgetSchema = z.object({
  name: z.string({ required_error: "name is required" }),
  price: z.string({ required_error: "price is required" }),
  releaseDate: z.string({ required_error: "release Date is required" }),
  brand: z.string({ required_error: "brand is required" }),
  modelNumber: z.string({ required_error: "model Number is required" }),
  category: z.string({ required_error: "category is required" }),
  operatingSystem: z
    .string({ required_error: "operating System is required" })
    .optional(),
  connectivity: z
    .string({ required_error: "connectivity is required" })
    .optional(),
  powerSource: z
    .string({ required_error: "power Source is required" })
    .optional(),
  cameraResolution: z.number().optional(),
  storageCapacity: z.number().optional(),
  screenSize: z.number().optional(),
  weight: z.number().optional(),
  height: z.number().optional(),
  width: z.number().optional(),
  depth: z.number().optional(),
});
