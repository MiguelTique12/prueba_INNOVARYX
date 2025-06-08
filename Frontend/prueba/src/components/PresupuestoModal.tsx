import React, { useEffect } from 'react';
import type { Presupuesto, PresupuestoRequestDTO } from '../types/presupuesto';
import PresupuestoForm from './PresupuestoForm';

interface PresupuestoModalProps {
    isOpen: boolean;
    presupuesto?: Presupuesto;
    onSubmit: (data: PresupuestoRequestDTO) => void;
    onClose: () => void;
    isLoading?: boolean;
}

const PresupuestoModal: React.FC<PresupuestoModalProps> = ({
                                                               isOpen,
                                                               presupuesto,
                                                               onSubmit,
                                                               onClose,
                                                               isLoading = false
                                                           }) => {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) onClose();
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div
                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={handleBackdropClick}
            />

            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900">
                            {presupuesto ? 'Editar Presupuesto' : 'Crear Nuevo Presupuesto'}
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                            disabled={isLoading}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="p-6">
                        <PresupuestoForm
                            presupuesto={presupuesto}
                            onSubmit={onSubmit}
                            onCancel={onClose}
                            isLoading={isLoading}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PresupuestoModal;