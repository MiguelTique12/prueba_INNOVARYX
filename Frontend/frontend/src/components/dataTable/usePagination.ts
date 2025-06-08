import { useState, useMemo } from 'react';

interface UsePaginationProps<T> {
    data: T[];
    itemsPerPage?: number;
    initialPage?: number;
}

interface UsePaginationReturn<T> {
    currentData: T[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    goToPage: (page: number) => void;
    nextPage: () => void;
    previousPage: () => void;
    setItemsPerPage: (items: number) => void;
    startIndex: number;
    endIndex: number;
}

export const usePagination = <T>({
                                     data,
                                     itemsPerPage = 10,
                                     initialPage = 1
                                 }: UsePaginationProps<T>): UsePaginationReturn<T> => {
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [itemsPerPageState, setItemsPerPageState] = useState(itemsPerPage);

    const totalPages = Math.ceil(data.length / itemsPerPageState);
    const totalItems = data.length;

    // Calcular datos de la página actual
    const currentData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPageState;
        const endIndex = startIndex + itemsPerPageState;
        return data.slice(startIndex, endIndex);
    }, [data, currentPage, itemsPerPageState]);

    // Indices para mostrar info
    const startIndex = (currentPage - 1) * itemsPerPageState + 1;
    const endIndex = Math.min(currentPage * itemsPerPageState, totalItems);

    // Navegación
    const hasNextPage = currentPage < totalPages;
    const hasPreviousPage = currentPage > 1;

    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const nextPage = () => {
        if (hasNextPage) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const previousPage = () => {
        if (hasPreviousPage) {
            setCurrentPage(prev => prev - 1);
        }
    };

    const setItemsPerPage = (items: number) => {
        setItemsPerPageState(items);
        setCurrentPage(1); // Reset a la primera página
    };

    return {
        currentData,
        currentPage,
        totalPages,
        totalItems,
        itemsPerPage: itemsPerPageState,
        hasNextPage,
        hasPreviousPage,
        goToPage,
        nextPage,
        previousPage,
        setItemsPerPage,
        startIndex,
        endIndex
    };
};