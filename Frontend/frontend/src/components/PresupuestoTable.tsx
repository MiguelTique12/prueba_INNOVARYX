import React from 'react';
import type { Presupuesto } from '../types/presupuesto';

interface PresupuestoTableProps {
    presupuestos: Presupuesto[];
    onEdit: (presupuesto: Presupuesto) => void;
    onDelete: (id: string) => void;
}

const PresupuestoTable: React.FC<PresupuestoTableProps> = ({
                                                               presupuestos,
                                                               onEdit,
                                                               onDelete
                                                           }) => {
    const formatMonto = (monto: number) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP'
        }).format(monto);
    };

    const formatFecha = (fecha: string) => {
        try {
            return new Date(fecha).toLocaleDateString('es-CO');
        } catch {
            return fecha;
        }
    };

    const getEstadoBadge = (estado: string) => {
        const badges = {
            PENDIENTE: 'bg-yellow-100 text-yellow-800',
            APROBADO: 'bg-green-100 text-green-800',
            RECHAZADO: 'bg-red-100 text-red-800',
            EN_REVISION: 'bg-blue-100 text-blue-800'
        };

        return `inline-flex px-2 py-1 text-xs font-semibold rounded-full ${badges[estado as keyof typeof badges] || 'bg-gray-100 text-gray-800'}`;
    };

    const getEstadoLabel = (estado: string) => {
        const labels = {
            PENDIENTE: 'Pendiente',
            APROBADO: 'Aprobado',
            RECHAZADO: 'Rechazado',
            EN_REVISION: 'En Revisión'
        };

        return labels[estado as keyof typeof labels] || estado;
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
                <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nombre
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Monto
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Estado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fecha
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                    </th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {presupuestos.length === 0 ? (
                    <tr>
                        <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                            No hay presupuestos disponibles
                        </td>
                    </tr>
                ) : (
                    presupuestos.map((presupuesto) => (
                        <tr key={presupuesto.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                    {presupuesto.nombre}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-semibold text-green-600">
                                    {formatMonto(presupuesto.montoTotal)}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={getEstadoBadge(presupuesto.estado)}>
                                        {getEstadoLabel(presupuesto.estado)}
                                    </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                    {formatFecha(presupuesto.fecha)}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                <div className="flex justify-center space-x-2">
                                    <button
                                        onClick={() => onEdit(presupuesto)}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm transition-colors"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => onDelete(presupuesto.id)}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-sm transition-colors"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
};

export default PresupuestoTable;