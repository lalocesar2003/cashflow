import type { DateTimeString, ID } from "./common.types";

export type TipoEventoBitacora =
  | "ProyectoCreado"
  | "HitoCreado"
  | "HitoActivado"
  | "HitoSuspendido"
  | "HitoReactivado"
  | "RecordatorioCreado"
  | "RecordatorioEnviado"
  | "RecordatorioFallido"
  | "PagoRegistrado"
  | "PagoValidado"
  | "PagoObservado"
  | "PagoConciliado"
  | "CompromisoRegistrado"
  | "CompromisoIncumplido"
  | "EntregableActualizado"
  | "ComentarioInterno"
  | "CambioEstado";

export interface Bitacora {
  idBitacora: ID;

  idProyecto?: ID | null;
  idHito?: ID | null;
  idEntregable?: ID | null;
  idPago?: ID | null;

  idUsuario: ID;

  tipoEvento: TipoEventoBitacora;
  descripcion: string;

  fechaHora: DateTimeString;
}