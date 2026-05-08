// modules/clients/clients.service.ts

import { prisma } from "@/lib/prisma";
import type {
  CreateClientInput,
  UpdateClientInput,
} from "./clients.schema";

export async function getClients() {
  return prisma.cliente.findMany({
    orderBy: {
      creadoEn: "desc",
    },
  });
}

export async function getClientById(id: string) {
  return prisma.cliente.findUnique({
    where: {
      idCliente: id,
    },
    include: {
      contactos: true,
      proyectos: true,
    },
  });
}

export async function createClient(data: CreateClientInput) {
  return prisma.cliente.create({
    data: {
      tipoDocumento: data.tipoDocumento,
      numeroDocumento: data.numeroDocumento,
      razonSocial: data.razonSocial,
      telefonoPrincipal: data.telefonoPrincipal,
      emailPrincipal: data.emailPrincipal,
      direccion: data.direccion,
      estadoCliente: data.estadoCliente,
    },
  });
}

export async function updateClient(
  id: string,
  data: UpdateClientInput
) {
  return prisma.cliente.update({
    where: {
      idCliente: id,
    },
    data,
  });
}