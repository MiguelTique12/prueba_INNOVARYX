import React, { useState, useEffect } from 'react';
import type { Presupuesto, PresupuestoRequestDTO } from '../types/presupuesto';
import PresupuestoTable from '../components/PresupuestoTable';
import PresupuestoModal from '../components/PresupuestoModal';
import { presupuestoService } from '../services/presupuestoService';

const Presupuestos: React.FC = () => {
    const [presupuestos, setPresupuestos] = useState<Presupuesto[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedPresupuesto, setSelectedPresupuesto] = useState<Presupuesto>();
    const [actionLoading, setActionLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadPresupuestos();
    }, []);

    const loadPresupuestos = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await presupuestoService.getAll();
            setPresupuestos(data);
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Error al cargar presupuestos');
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        setSelectedPresupuesto(undefined);
        setModalOpen(true);
    };

    const handleEdit = (presupuesto: Presupuesto) => {
        setSelectedPresupuesto(presupuesto);
        setModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('¿Está seguro de eliminar este presupuesto?')) return;

        try {
            setActionLoading(true);
            setError(null);
            await presupuestoService.delete(id);
            setPresupuestos(prev => prev.filter(p => p.id !== id));
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Error al eliminar presupuesto');
        } finally {
            setActionLoading(false);
        }
    };

    const handleModalSubmit = async (data: PresupuestoRequestDTO) => {
        try {
            setActionLoading(true);
            setError(null);

            if (selectedPresupuesto) {
                await presupuestoService.update(selectedPresupuesto.id, data);
            } else {
                await presupuestoService.create(data);
            }

            setModalOpen(false);
            setSelectedPresupuesto(undefined);
            await loadPresupuestos();
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Error al guardar presupuesto');
        } finally {
            setActionLoading(false);
        }
    };

    const handleModalClose = () => {
        setModalOpen(false);
        setSelectedPresupuesto(undefined);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Gestión de Presupuestos
                    </h1>
                    <p className="text-gray-600">
                        Administra los presupuestos de tu organización
                    </p>
                </div>

                {error && (
                    <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
                        <div className="flex items-center">
                            <div className="text-red-800">
                                <strong>Error:</strong> {error}
                            </div>
                            <button
                                onClick={loadPresupuestos}
                                className="ml-auto text-red-600 hover:text-red-800 text-sm underline"
                            >
                                Reintentar
                            </button>
                        </div>
                    </div>
                )}

                <div className="mb-6 flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                        {loading ? 'Cargando...' : `${presupuestos.length} presupuesto(s) encontrado(s)`}
                    </span>
                    <button
                        onClick={handleCreate}
                        disabled={actionLoading}
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        + Agregar Presupuesto
                    </button>
                </div>

                <div className="bg-white rounded-lg shadow">
                    {loading ? (
                        <div className="p-8 text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                            <p className="mt-4 text-gray-500">Cargando presupuestos...</p>
                        </div>
                    ) : (
                        <PresupuestoTable
                            presupuestos={presupuestos}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    )}
                </div>

                <PresupuestoModal
                    isOpen={modalOpen}
                    presupuesto={selectedPresupuesto}
                    onSubmit={handleModalSubmit}
                    onClose={handleModalClose}
                    isLoading={actionLoading}
                />
            </div>
        </div>
    );
};

export default Presupuestos;