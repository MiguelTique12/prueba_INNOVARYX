import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    startIndex: number;
    endIndex: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    onPageChange: (page: number) => void;
    onNext: () => void;
    onPrevious: () => void;
    onItemsPerPageChange: (items: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
                                                   currentPage,
                                                   totalPages,
                                                   totalItems,
                                                   itemsPerPage,
                                                   startIndex,
                                                   endIndex,
                                                   hasNextPage,
                                                   hasPreviousPage,
                                                   onPageChange,
                                                   onNext,
                                                   onPrevious,
                                                   onItemsPerPageChange
                                               }) => {

    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);
                pages.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            }
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
            {/* Info y selector de items por página */}
            <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-700">
                    Mostrando <span className="font-medium">{startIndex}</span> a{' '}
                    <span className="font-medium">{endIndex}</span> de{' '}
                    <span className="font-medium">{totalItems}</span> resultados
                </div>

                <div className="flex items-center space-x-2">
                    <label className="text-sm text-gray-700">Por página:</label>
                    <select
                        value={itemsPerPage}
                        onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
                        className="border border-gray-300 rounded-md text-sm px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                    </select>
                </div>
            </div>

            <div className="flex items-center space-x-1">
                {/* Botón anterior */}
                <button
                    onClick={onPrevious}
                    disabled={!hasPreviousPage}
                    className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Anterior
                </button>

                <div className="flex space-x-1">
                    {pageNumbers.map((page, index) => (
                        <React.Fragment key={index}>
                            {page === '...' ? (
                                <span className="px-3 py-2 text-sm text-gray-500">...</span>
                            ) : (
                                <button
                                    onClick={() => onPageChange(page as number)}
                                    className={`px-3 py-2 text-sm font-medium rounded-md ${
                                        currentPage === page
                                            ? 'bg-blue-600 text-white'
                                            : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                                    }`}
                                >
                                    {page}
                                </button>
                            )}
                        </React.Fragment>
                    ))}
                </div>

                <button
                    onClick={onNext}
                    disabled={!hasNextPage}
                    className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
};

export default Pagination;