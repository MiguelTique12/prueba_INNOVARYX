import React from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome: React.FC = () => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/presupuestos');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Hero Section */}
                <div className="pt-20 pb-16 text-center">
                    <div className="max-w-3xl mx-auto">

                        {/* Logo/Icon */}
                        <div className="mb-8">
                            <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                            </div>
                        </div>

                        {/* Title */}
                        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                            Sistema de
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                {' '}Presupuestos
              </span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed">
                            Gestiona y controla los presupuestos de tu organización de manera
                            <span className="font-semibold text-gray-800"> eficiente y profesional</span>
                        </p>

                        {/* CTA Button */}
                        <button
                            onClick={handleGetStarted}
                            className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200"
                        >
                            Comenzar
                            <svg className="ml-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Features Section */}
                <div className="pb-20">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
                            Características principales
                        </h2>

                        <div className="grid md:grid-cols-3 gap-8">

                            {/* Feature 1 */}
                            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                    Crear Presupuestos
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Añade nuevos presupuestos con información detallada, montos y descripciones personalizadas.
                                </p>
                            </div>

                            {/* Feature 2 */}
                            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                    Editar y Actualizar
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Modifica la información de tus presupuestos existentes de forma rápida y sencilla.
                                </p>
                            </div>

                            {/* Feature 3 */}
                            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                    Visualizar Datos
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Consulta todos tus presupuestos organizados en una tabla clara y fácil de entender.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="border-t border-gray-200 py-8">
                    <div className="text-center text-gray-500 text-sm">
                        <p>© 2024 Sistema de Presupuestos. Desarrollado con React + TypeScript + Spring Boot</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Welcome;