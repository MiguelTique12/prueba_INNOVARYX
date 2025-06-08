import React, { useState, useEffect } from 'react';
import type {Presupuesto, PresupuestoRequestDTO, PresupuestoFormData, EstadoPresupuesto} from '../types/presupuesto';

interface PresupuestoFormProps {
    presupuesto?: Presupuesto;
    onSubmit: (data: PresupuestoRequestDTO) => void;
    onCancel: () => void;
    isLoading?: boolean;
}

const PresupuestoForm: React.FC<PresupuestoFormProps> = ({
                                                             presupuesto,
                                                             onSubmit,
                                                             onCancel,
                                                             isLoading = false
                                                         }) => {
    const [formData, setFormData] = useState<PresupuestoFormData>({
        nombre: '',
        montoTotal: '',
        estado: 'PENDIENTE' as EstadoPresupuesto,
        fecha: new Date().toISOString().split('T')[0]
    });

    const [errors, setErrors] = useState<Partial<PresupuestoFormData>>({});

    useEffect(() => {
        if (presupuesto) {
            const fechaString = presupuesto.fecha
                ? new Date(presupuesto.fecha).toISOString().split('T')[0]
                : new Date().toISOString().split('T')[0];

            setFormData({
                nombre: presupuesto.nombre,
                montoTotal: presupuesto.montoTotal.toString(),
                estado: presupuesto.estado || 'PENDIENTE',
                fecha: fechaString
            });
        }
    }, [presupuesto]);

    const validateForm = (): boolean => {
        const newErrors: Partial<PresupuestoFormData> = {};

        if (!formData.nombre.trim()) {
            newErrors.nombre = 'El nombre es requerido';
        }

        if (!formData.montoTotal.trim()) {
            newErrors.montoTotal = 'El monto es requerido';
        } else if (isNaN(Number(formData.montoTotal)) || Number(formData.montoTotal) <= 0) {
            newErrors.montoTotal = 'El monto debe ser un número mayor a 0';
        }

        if (!formData.fecha) {
            newErrors.fecha = 'La fecha es requerida';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        const submitData: PresupuestoRequestDTO = {
            nombre: formData.nombre.trim(),
            montoTotal: Number(formData.montoTotal),
            estado: formData.estado,
            fecha: formData.fecha ? new Date(formData.fecha).toISOString() : null
        };

        onSubmit(submitData);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (errors[name as keyof PresupuestoFormData]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleMontoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === '' || /^\d*\.?\d*$/.test(value)) {
            setFormData(prev => ({ ...prev, montoTotal: value }));
            if (errors.montoTotal) {
                setErrors(prev => ({ ...prev, montoTotal: undefined }));
            }
        }
    };

    const estadoOptions = [
        { value: 'PENDIENTE', label: 'Pendiente' },
        { value: 'EN_REVISION', label: 'En Revisión' },
        { value: 'APROBADO', label: 'Aprobado' },
        { value: 'RECHAZADO', label: 'Rechazado' }
    ];

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
                <div>
                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre del Presupuesto *
                    </label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.nombre ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Ej: Presupuesto Marketing 2024"
                        disabled={isLoading}
                    />
                    {errors.nombre && (
                        <p className="mt-1 text-sm text-red-600">{errors.nombre}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="montoTotal" className="block text-sm font-medium text-gray-700 mb-1">
                        Monto Total (COP) *
                    </label>
                    <div className="relative">
                        <span className="absolute left-3 top-2 text-gray-500">$</span>
                        <input
                            type="text"
                            id="montoTotal"
                            name="montoTotal"
                            value={formData.montoTotal}
                            onChange={handleMontoChange}
                            className={`w-full pl-8 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                errors.montoTotal ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="1000000"
                            disabled={isLoading}
                        />
                    </div>
                    {errors.montoTotal && (
                        <p className="mt-1 text-sm text-red-600">{errors.montoTotal}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="estado" className="block text-sm font-medium text-gray-700 mb-1">
                        Estado *
                    </label>
                    <select
                        id="estado"
                        name="estado"
                        value={formData.estado}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.estado ? 'border-red-500' : 'border-gray-300'
                        }`}
                        disabled={isLoading}
                    >
                        {estadoOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    {errors.estado && (
                        <p className="mt-1 text-sm text-red-600">{errors.estado}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="fecha" className="block text-sm font-medium text-gray-700 mb-1">
                        Fecha del Presupuesto *
                    </label>
                    <input
                        type="date"
                        id="fecha"
                        name="fecha"
                        value={formData.fecha}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.fecha ? 'border-red-500' : 'border-gray-300'
                        }`}
                        disabled={isLoading}
                    />
                    {errors.fecha && (
                        <p className="mt-1 text-sm text-red-600">{errors.fecha}</p>
                    )}
                </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    disabled={isLoading}
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLoading}
                >
                    {isLoading ? 'Guardando...' : presupuesto ? 'Actualizar' : 'Crear'}
                </button>
            </div>
        </form>
    );
};

export default PresupuestoForm;