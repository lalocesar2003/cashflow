// modules/clients/clients.schema.ts

import { z } from "zod";

export const createClientSchema = z.object({
  tipoDocumento: z.enum(["RUC", "DNI", "CE", "PASAPORTE", "OTRO"]),
  numeroDocumento: z
    .string()
    .min(8, "El número de documento es obligatorio"),
  razonSocial: z
    .string()
    .min(2, "La razón social es obligatoria"),
  telefonoPrincipal: z
    .string()
    .optional()
    .nullable(),
  emailPrincipal: z
    .string()
    .email("Email inválido")
    .optional()
    .nullable(),
  direccion: z
    .string()
    .optional()
    .nullable(),
  estadoCliente: z
    .enum(["Activo", "Inactivo"])
    .default("Activo"),
});

export const updateClientSchema = createClientSchema.partial();

export type CreateClientInput = z.infer<typeof createClientSchema>;
export type UpdateClientInput = z.infer<typeof updateClientSchema>;