import { ZodType, z } from "zod";

export interface RegisterCustomerSchemaI {
  cpf: string;
  name: string;
  socialName: string;
  rg: string;
  password: string;
  cnpj: string;
  birthDate: Date;    
  fantasyName: string;
  stateRegistration: string;
  municipalRegistration: string;
  establishmentDate: Date;    
}


export const registerCustomerSchema: ZodType<RegisterCustomerSchemaI> =
  z.object({
    cpf: z
      .string()
      .regex(new RegExp("/^[0-9]+$/"), "Only numbers from 0 to 9")
      .min(1, "The CPF field is required")
      .min(11, "The CPF needs 11 characters")
      .max(11, "The CPF needs 11 characters"),
    name: z.string().min(1, "The Name field is required"),
    socialName: z.string().min(1, "The Social Name field is required"),
    rg: z
      .string()
      .regex(new RegExp("/^[0-9]+$/"), "Only numbers from 0 to 9")
      .min(1, "The RG field is required")
      .min(9, "The RG needs 9 characters")
      .max(9, "The RG needs 9 characters"),
    password: z.string().min(1, "The Password field is required"),
    birthDate: z.date(),
    cnpj: z
      .string()
      .regex(new RegExp("/^[0-9]+$/"), "Only numbers from 0 to 9")
      .min(1, "The CNPJ field is required")
      .min(14, "The CNPJ needs 14 characters")
      .max(14, "The CNPJ needs 14 characters"),
    fantasyName: z.string().min(1, "The Fantasy Name field is required"),
    stateRegistration: z
      .string()
      .regex(new RegExp("/^[0-9]+$/"), "Only numbers from 0 to 9")
      .min(1, "The State Registration field is required")
      .min(9, "The State Registration needs 9 characters")
      .max(9, "The State Registration needs 9 characters"),
    municipalRegistration: z
      .string()
      .regex(new RegExp("/^[0-9]+$/"), "Only numbers from 0 to 9")
      .min(1, "The Municipal Registration field is required")
      .min(11, "The Municipal Registration needs 11 characters")
      .max(11, "The Municipal Registration needs 11 characters"),
    establishmentDate: z.date(),
  });
