import { createContext, useContext, useState } from 'react';
import { EnumTabs } from '@/utils';

const TabsContext = createContext(null);

export const TabsProvider = ({ children }) => {
    const [activeTab, setActiveTab] = useState(EnumTabs.home)

    return (
        <TabsContext.Provider value={{ activeTab, setActiveTab }}>
            {children}
        </TabsContext.Provider>
    );
};

export const useTabs = () => useContext(TabsContext);
