import axios from 'axios';
import type {Presupuesto, PresupuestoRequestDTO} from '../types/presupuesto';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL: `${API_BASE_URL}/api/presupuestos`,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 segundos
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error);

        // Manejar diferentes tipos de errores
        if (error.code === 'ECONNABORTED') {
            throw new Error('Tiempo de espera agotado. Por favor, intenta nuevamente.');
        }

        if (!error.response) {
            throw new Error('Error de conexión. Verifica que el servidor esté funcionando.');
        }

        const { status, data } = error.response;

        switch (status) {
            case 400:
                throw new Error(data?.message || 'Datos inválidos. Por favor, verifica la información ingresada.');
            case 404:
                throw new Error('Presupuesto no encontrado.');
            case 500:
                throw new Error('Error interno del servidor. Por favor, contacta al administrador.');
            default:
                throw new Error(data?.message || 'Error desconocido. Por favor, intenta nuevamente.');
        }
    }
);

export const presupuestoService = {

    // Obtener todos los presupuestos
    async getAll(): Promise<Presupuesto[]> {
        try {
            const response = await api.get<Presupuesto[]>('');
            return response.data;
        } catch (error) {
            console.error('Error al obtener presupuestos:', error);
            throw error;
        }
    },

    // Obtener presupuesto por ID
    async getById(id: string): Promise<Presupuesto> {
        try {
            const response = await api.get<Presupuesto>(`/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error al obtener presupuesto ${id}:`, error);
            throw error;
        }
    },

    // Crear nuevo presupuesto
    async create(data: PresupuestoRequestDTO): Promise<Presupuesto> {
        try {
            const response = await api.post<Presupuesto>('', data);
            return response.data;
        } catch (error) {
            console.error('Error al crear presupuesto:', error);
            throw error;
        }
    },

    // Actualizar presupuesto existente
    async update(id: string, data: PresupuestoRequestDTO): Promise<Presupuesto> {
        try {
            const response = await api.put<Presupuesto>(`/${id}`, data);
            return response.data;
        } catch (error) {
            console.error(`Error al actualizar presupuesto ${id}:`, error);
            throw error;
        }
    },

    // Eliminar presupuesto
    async delete(id: string): Promise<void> {
        try {
            await api.delete(`/${id}`);
        } catch (error) {
            console.error(`Error al eliminar presupuesto ${id}:`, error);
            throw error;
        }
    }
};

export default presupuestoService;