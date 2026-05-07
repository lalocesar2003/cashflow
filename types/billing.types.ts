import type {
    Currency,
    DateString,
    DateTimeString,
    ID,
  } from "./common.types";
  
  export type TipoActivacionHito =
    | "Adelanto"
    | "FirmaContrato"
    | "Entregable"
    | "FechaProgramada"
    | "AprobacionCliente"
    | "AprobacionEntidad"
    | "Manual";
  
  export type EstadoFinancieroHito =
    | "Bloqueado"
    | "Suspendido"
    | "Exigible"
    | "Notificado"
    | "EnMora"
    | "CompromisoPago"
    | "PagoEnRevision"
    | "PagadoParcial"
    | "Pagado"
    | "Conciliado";
  
  export type EstadoPago =
    | "Registrado"
    | "EnRevision"
    | "Observado"
    | "Validado"
    | "Conciliado";
  
  export type MedioPago =
    | "Transferencia"
    | "Deposito"
    | "Yape"
    | "Plin"
    | "Efectivo"
    | "Cheque"
    | "Otro";
  
  export type EstadoSuspension =
    | "Activa"
    | "Subsanada"
    | "Cancelada";
  
  export type EstadoCompromiso =
    | "Activo"
    | "Cumplido"
    | "Incumplido"
    | "Cancelado";
  
  export interface HitoCobro {
    idHito: ID;
    idProyecto: ID;
  
    /**
     * Puede ser null porque no todo hito depende de un entregable.
     * Ejemplo: adelanto inicial, firma de contrato o activación manual.
     */
    idEntregable?: ID | null;
  
    idResponsableCobranza: ID;
    idContactoCobranza?: ID | null;
  
    nombre: string;
    tipoActivacion: TipoActivacionHito;
  
    monto: number;
    saldoPendiente: number;
    moneda: Currency;
  
    estadoFinanciero: EstadoFinancieroHito;
  
    fechaProgramada?: DateString | null;
    fechaActivacion?: DateString | null;
    fechaVencimiento?: DateString | null;
  
    habilitadoCobranza: boolean;
    observacion?: string | null;
  
    creadoEn: DateTimeString;
    actualizadoEn: DateTimeString;
  }
  
  export interface Pago {
    idPago: ID;
    idHito: ID;
    idUsuarioRegistra: ID;
  
    montoPagado: number;
    montoAplicado: number;
    saldoAnterior: number;
    saldoResultante: number;
  
    fechaPago: DateString;
    medioPago: MedioPago;
    referenciaOperacion?: string | null;
  
    estadoPago: EstadoPago;
    observacion?: string | null;
  
    registradoEn: DateTimeString;
    actualizadoEn: DateTimeString;
  }
  
  export interface ComprobantePago {
    idComprobante: ID;
    idPago: ID;
  
    urlArchivo: string;
    nombreArchivo: string;
    tipoArchivo: string;
  
    banco?: string | null;
    numeroOperacion?: string | null;
  
    subidoEn: DateTimeString;
  }
  
  export interface SuspensionHito {
    idSuspension: ID;
    idHito: ID;
  
    idUsuarioRegistra: ID;
    idResponsableInterno: ID;
  
    motivo: string;
    estadoSuspension: EstadoSuspension;
  
    fechaInicio: DateString;
    fechaTentativaReactivacion?: DateString | null;
    fechaFin?: DateString | null;
  
    creadoEn: DateTimeString;
  }
  
  export interface CompromisoPago {
    idCompromiso: ID;
    idHito: ID;
    idUsuarioRegistra: ID;
  
    montoComprometido: number;
    fechaPrometida: DateString;
  
    estadoCompromiso: EstadoCompromiso;
    observacion?: string | null;
  
    creadoEn: DateTimeString;
    actualizadoEn: DateTimeString;
  }