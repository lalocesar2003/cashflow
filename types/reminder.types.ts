import type { Channel, DateTimeString, ID } from "./common.types";

export type TipoDestinatarioPlantilla =
  | "Cliente"
  | "EquipoInterno";

export type TipoRecordatorio =
  | "ClientePorVencer"
  | "ClienteVencido"
  | "ClienteMora"
  | "EquipoCobranza"
  | "EquipoTecnico"
  | "CompromisoPago";

export type EstadoRecordatorio =
  | "Pendiente"
  | "Enviado"
  | "Fallido"
  | "Cancelado";

export type OrigenRecordatorio =
  | "Manual"
  | "Sistema"
  | "N8N";

export interface PlantillaMensaje {
  idPlantilla: ID;
  nombre: string;
  tipoDestinatario: TipoDestinatarioPlantilla;
  canal: Channel;
  asunto?: string | null;
  cuerpo: string;
  activa: boolean;
  creadoEn: DateTimeString;
}

export interface Recordatorio {
  idRecordatorio: ID;
  idHito: ID;

  /**
   * Si el recordatorio es al cliente, se usa idContactoCliente.
   * Si es interno, se usa idUsuarioDestino.
   */
  idContactoCliente?: ID | null;
  idUsuarioDestino?: ID | null;

  idUsuarioCreador: ID;
  idPlantilla: ID;

  tipoRecordatorio: TipoRecordatorio;
  canal: Channel;

  destinatario: string;
  mensajeGenerado: string;

  estadoRecordatorio: EstadoRecordatorio;

  fechaProgramada: DateTimeString;
  fechaEnvio?: DateTimeString | null;

  origen: OrigenRecordatorio;
  errorEnvio?: string | null;

  creadoEn: DateTimeString;
}