
import { z } from "zod";

export const businessFormSchema = z.object({
  name: z
    .string()
    .nonempty("Name is required"),

  address: z
    .string()
    .nonempty("Address is required"),

  pincode: z
    .number({
      required_error: "Pincode is required",
      invalid_type_error: "Pincode must be a number"
    })
    .min(100000, "Pincode must be at least 6 digits")
    .max(999999, "Pincode must be 6 digits"),

  estYear: z
    .string({
      required_error: "Establishment year is required"
    }) ,


  email: z
    .string()
    .nonempty("Email cannot be empty")
    .email("Invalid email format"),

  businessType: z
    .string()
    .nonempty("Business type is required"),

  contact: z
    .string()
    .nonempty("Primary contact is required")
    .regex(/^\d{10}$/, "Contact must be a 10-digit number"),

  alternateContact: z
    .string()
    .nonempty("Alternate contact is required")
    .regex(/^\d{10}$/, "Alternate contact must be a 10-digit number"),
});


export type BusinessFormSchema = z.infer<typeof businessFormSchema>;