
import { z } from "zod";
const latestDate = new Date();

export const businessFormSchema = z.object({
  name: z
    .string()
    .nonempty("Name is required"),

  address: z
    .string()
    .nonempty("Address is required"),

  pincode: z
    .string()
    .nonempty("Pincode is required")
    .max(6, "Length must be a maximum of 6 characters")

  ,
  estYear: z.coerce
    .date()
    .refine((date) => date.getFullYear() <= latestDate.getFullYear(), {
      message: "Establishment Date cannot be in the future",
    }),


  businessEmail: z
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