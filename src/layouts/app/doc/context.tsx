import React, { createContext, useContext, useState, ReactNode } from 'react';
import { DocType } from './types';
import sampleData from "./sample/doc"
interface DocContextType {
    docData: DocType;
    updateDocData: (newData: DocType) => void;
}

const DocContext = createContext<DocContextType | undefined>(undefined);

export const useDocContext = (): DocContextType => {
    const context = useContext(DocContext);
    if (!context) {
        throw new Error('useDocContext must be used within a DocProvider');
    }
    return context;
};

interface DocProviderProps {
    children: ReactNode;
    doc: DocType;
}

export const DocProvider: React.FC<DocProviderProps> = ({ children, doc }) => {
    const [docData, setDocData] = useState<DocType>(doc ?? sampleData);

    const updateDocData = (newData: DocType) => {
        setDocData({ ...docData, ...newData });
    };

    return (
        <DocContext.Provider value={{ docData, updateDocData }}>
            {children}
        </DocContext.Provider>
    );
};
