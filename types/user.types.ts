import type { DateTimeString, ID } from "./common.types";

export type UserRole =
  | "ADMIN"
  | "COBRANZA"
  | "TECNICO"
  | "CONTABILIDAD"
  | "LECTOR";

export interface Usuario {
  idUsuario: ID;
  nombres: string;
  email: string;
  telefono?: string | null;
  cargo?: string | null;
  rol: UserRole;
  activo: boolean;
  creadoEn: DateTimeString;
}