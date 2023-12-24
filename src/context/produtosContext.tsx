import React, { ReactNode, createContext, useEffect, useState } from "react";
import { ProdutoT } from "../types/types";
export const ProdutoContexto = createContext<ProdutoContextoDataT>(
    {
        produtos: [] ,
        setProdutos: () => { }
    }
)

type ProdutoContextoDataT = {
    produtos: ProdutoT[],
    setProdutos: React.Dispatch<React.SetStateAction<ProdutoT[]>>
}

function VendasProvider({ children }: { children: ReactNode }) {
    const [produtos, setProdutos] = useState<ProdutoT[]>(() => {
        const localProdutos = localStorage.getItem('produtos');
        return localProdutos ? JSON.parse(localProdutos) : [] 
    })
    useEffect(()=>{
        localStorage.setItem('produtos',JSON.stringify(produtos))
    },[produtos])
    return (
        <ProdutoContexto.Provider value={{ produtos, setProdutos }}>
            {children}
        </ProdutoContexto.Provider>
    )
}

export default VendasProvider