import React, { ReactNode, createContext, useEffect, useState } from "react";
import { ProdutoT } from "../types/types";
export const ProdutosContext = createContext<ProdutoContextDataT>(
    {
        produtos: [] ,
        setProdutos: () => { }
    }
)

type ProdutoContextDataT = {
    produtos: ProdutoT[],
    setProdutos: React.Dispatch<React.SetStateAction<ProdutoT[]>>
}

function ProdutoProvider({ children }: { children: ReactNode }) {
    const [produtos, setProdutos] = useState<ProdutoT[]>(() => {
        const localProdutos = localStorage.getItem('produtos');
        return localProdutos ? JSON.parse(localProdutos) : []
    }) 
    useEffect(()=>{
        localStorage.setItem('produtos',JSON.stringify(produtos))
    },[produtos])
    return (
        <ProdutosContext.Provider value={{ produtos, setProdutos }}>
            {children}
        </ProdutosContext.Provider>
    )
}

export default ProdutoProvider