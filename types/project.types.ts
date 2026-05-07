import type {
    Currency,
    DateString,
    DateTimeString,
    ID,
  } from "./common.types";
  
  export type EstadoProyecto =
    | "Borrador"
    | "EnCurso"
    | "Pausado"
    | "Finalizado"
    | "Cancelado";
  
  export type EstadoTecnico =
    | "Pendiente"
    | "EnCurso"
    | "Terminado"
    | "Observado"
    | "Subsanacion"
    | "Aprobado";
  
  export type TipoEntregable =
    | "Informe"
    | "Plano"
    | "Expediente"
    | "Documento"
    | "Servicio"
    | "Otro";
  
  export interface Proyecto {
    idProyecto: ID;
    idCliente: ID;
    idResponsableGeneral: ID;
    codigo: string;
    nombre: string;
    descripcion?: string | null;
    montoTotal: number;
    moneda: Currency;
    estadoProyecto: EstadoProyecto;
    fechaInicio?: DateString | null;
    fechaFinEstimada?: DateString | null;
    creadoEn: DateTimeString;
    actualizadoEn: DateTimeString;
  }
  
  export interface EntregableTecnico {
    idEntregable: ID;
    idProyecto: ID;
    idResponsableTecnico: ID;
    nombre: string;
    tipoEntregable: TipoEntregable;
    estadoTecnico: EstadoTecnico;
    fechaEstimada?: DateString | null;
    fechaTerminado?: DateString | null;
    observacionActual?: string | null;
    creadoEn: DateTimeString;
    actualizadoEn: DateTimeString;
  }