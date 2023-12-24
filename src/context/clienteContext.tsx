import React, { ReactNode, createContext, useEffect, useState } from "react";
import { ClienteT } from "../types/types";
export const ClienteContexto = createContext<ClienteContextoDataT>(
    {
        clientes: [] ,
        setClientes: () => { }
    }
)

type ClienteContextoDataT = {
    clientes: ClienteT[],
    setClientes: React.Dispatch<React.SetStateAction<ClienteT[]>>
}

function ClientesProvider({ children }: { children: ReactNode }) {
    const [clientes, setClientes] = useState<ClienteT[]>(() => {
        const localClientes = localStorage.getItem('clientes');
        return localClientes ? JSON.parse(localClientes) : [] 
    })
    useEffect(()=>{
        localStorage.setItem('clientes',JSON.stringify(clientes))
    },[clientes])
    return (
        <ClienteContexto.Provider value={{ clientes, setClientes }}>
            {children}
        </ClienteContexto.Provider>
    )
}

export default ClientesProvider