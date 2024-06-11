import { createContext, useContext, useState } from 'react';
import { EnumTabs } from '@/utils';

const HeaderContext = createContext(null);

export const HeaderProvider = ({ children }) => {
    const [activeTab, setActiveTab] = useState(EnumTabs.home)
    const [currentPage, setCurrentPage] = useState(1)

    return (
        <HeaderContext.Provider value={{ activeTab, setActiveTab, currentPage, setCurrentPage }}>
            {children}
        </HeaderContext.Provider>
    );
};

export const useHeader = () => useContext(HeaderContext);
