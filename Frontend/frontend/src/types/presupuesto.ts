export const EstadoPresupuesto = {
    PENDIENTE: 'PENDIENTE',
    APROBADO: 'APROBADO',
    RECHAZADO: 'RECHAZADO',
    EN_REVISION: 'EN_REVISION'
} as const;

export type EstadoPresupuesto = typeof EstadoPresupuesto[keyof typeof EstadoPresupuesto];

export interface Presupuesto {
    id: string;
    nombre: string;
    montoTotal: number;
    estado: EstadoPresupuesto;
    fecha: string;
}

export interface PresupuestoRequestDTO {
    nombre: string;
    montoTotal: number;
    estado: EstadoPresupuesto;
    fecha: string | null;
}

export interface PresupuestoFormData {
    nombre: string;
    montoTotal: string;
    estado: EstadoPresupuesto;
    fecha: string;
}