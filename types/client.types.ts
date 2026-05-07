import type { BaseStatus, DateTimeString, ID } from "./common.types";

export type TipoDocumentoCliente =
  | "RUC"
  | "DNI"
  | "CE"
  | "PASAPORTE"
  | "OTRO";

export interface Cliente {
  idCliente: ID;
  tipoDocumento: TipoDocumentoCliente;
  numeroDocumento: string;
  razonSocial: string;
  telefonoPrincipal?: string | null;
  emailPrincipal?: string | null;
  direccion?: string | null;
  estadoCliente: BaseStatus;
  creadoEn: DateTimeString;
  actualizadoEn: DateTimeString;
}

export interface ContactoCliente {
  idContacto: ID;
  idCliente: ID;
  nombres: string;
  cargo?: string | null;
  telefono?: string | null;
  email?: string | null;
  esContactoPrincipal: boolean;
  recibeCobranza: boolean;
  recibeRecordatorios: boolean;
  activo: boolean;
  creadoEn: DateTimeString;
}