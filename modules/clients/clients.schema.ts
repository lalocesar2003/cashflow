// modules/clients/clients.schema.ts

import { z } from "zod";

export const estadoClienteSchema = z.enum(["ACTIVO", "INACTIVO"]);

export const createClientSchema = z.object({
  tipoDocumento: z
    .string()
    .trim()
    .max(20, "El tipo de documento no debe superar 20 caracteres")
    .optional()
    .nullable(),

  numeroDocumento: z
    .string()
    .trim()
    .min(8, "El número de documento debe tener al menos 8 caracteres")
    .max(20, "El número de documento no debe superar 20 caracteres")
    .optional()
    .nullable(),

  razonSocial: z
    .string()
    .trim()
    .min(2, "La razón social es obligatoria")
    .max(150, "La razón social no debe superar 150 caracteres"),

  telefonoPrincipal: z
    .string()
    .trim()
    .max(30, "El teléfono no debe superar 30 caracteres")
    .optional()
    .nullable(),

  emailPrincipal: z
    .string()
    .trim()
    .email("El correo principal no es válido")
    .optional()
    .nullable()
    .or(z.literal("")),

  direccion: z
    .string()
    .trim()
    .max(250, "La dirección no debe superar 250 caracteres")
    .optional()
    .nullable(),

  estado: estadoClienteSchema.default("ACTIVO"),
});

export const updateClientSchema = createClientSchema.partial().extend({
  id: z.string().uuid("El ID del cliente no es válido"),
});

export const createContactSchema = z.object({
  clienteId: z.string().uuid("El ID del cliente no es válido"),

  nombres: z
    .string()
    .trim()
    .min(2, "El nombre del contacto es obligatorio")
    .max(120, "El nombre no debe superar 120 caracteres"),

  cargo: z
    .string()
    .trim()
    .max(100, "El cargo no debe superar 100 caracteres")
    .optional()
    .nullable(),

  telefono: z
    .string()
    .trim()
    .max(30, "El teléfono no debe superar 30 caracteres")
    .optional()
    .nullable(),

  email: z
    .string()
    .trim()
    .email("El correo del contacto no es válido")
    .optional()
    .nullable()
    .or(z.literal("")),

  esContactoPrincipal: z.boolean().default(false),

  recibeCobranza: z.boolean().default(true),

  recibeRecordatorios: z.boolean().default(true),

  activo: z.boolean().default(true),
});

export const updateContactSchema = createContactSchema.partial().extend({
  id: z.string().uuid("El ID del contacto no es válido"),
});

export const getClientByIdSchema = z.object({
  id: z.string().uuid("El ID del cliente no es válido"),
});

export const deleteOrDeactivateClientSchema = z.object({
  id: z.string().uuid("El ID del cliente no es válido"),
});

export const listClientsQuerySchema = z.object({
  search: z.string().trim().optional().default(""),
  estado: estadoClienteSchema.optional(),
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(10),
});

export type CreateClientInput = z.infer<typeof createClientSchema>;
export type UpdateClientInput = z.infer<typeof updateClientSchema>;
export type CreateContactInput = z.infer<typeof createContactSchema>;
export type UpdateContactInput = z.infer<typeof updateContactSchema>;
export type ListClientsQueryInput = z.infer<typeof listClientsQuerySchema>;