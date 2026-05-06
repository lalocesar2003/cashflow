

import { prisma } from "@/lib/prisma";
import {
  createClientSchema,
  createContactSchema,
  updateClientSchema,
} from "./clients.schema";

export async function createClient(input: unknown) {
  const data = createClientSchema.parse(input);

  return prisma.cliente.create({
    data: {
      tipoDocumento: data.tipoDocumento,
      numeroDocumento: data.numeroDocumento,
      razonSocial: data.razonSocial,
      telefonoPrincipal: data.telefonoPrincipal,
      emailPrincipal: data.emailPrincipal || null,
      direccion: data.direccion,
      estado: data.estado,
    },
  });
}

export async function updateClient(input: unknown) {
  const data = updateClientSchema.parse(input);

  const { id, ...updateData } = data;

  return prisma.cliente.update({
    where: { id },
    data: updateData,
  });
}

export async function createClientContact(input: unknown) {
  const data = createContactSchema.parse(input);

  return prisma.contactoCliente.create({
    data: {
      clienteId: data.clienteId,
      nombres: data.nombres,
      cargo: data.cargo,
      telefono: data.telefono,
      email: data.email || null,
      esContactoPrincipal: data.esContactoPrincipal,
      recibeCobranza: data.recibeCobranza,
      recibeRecordatorios: data.recibeRecordatorios,
      activo: data.activo,
    },
  });
}