import React, { ReactNode, createContext, useEffect, useState } from "react";
import { SalesT } from "../types/types";
export const VendasContext = createContext<VendasContextDataT>(
    {
        vendas: [] ,
        setVendas: () => { }
    }
)

type VendasContextDataT = {
    vendas: SalesT[],
    setVendas: React.Dispatch<React.SetStateAction<SalesT[]>>
}

function VendasProvider({ children }: { children: ReactNode }) {
    const [vendas, setVendas] = useState<SalesT[]>(() => {
        const localVendas = localStorage.getItem('vendas');
        return localVendas ? JSON.parse(localVendas) : []} ) 
    useEffect(()=>{
        localStorage.setItem('vendas',JSON.stringify(vendas))
    },[vendas])
    return (
        <VendasContext.Provider value={{ vendas, setVendas }}>
            {children}
        </VendasContext.Provider>
    )
}

export default VendasProvider