import React, { useContext, useEffect, useState } from 'react'
import { VendasContext } from '../../../context/vendasContext'
import { ClienteContexto } from '../../../context/clienteContext'
import { ClintesTopT } from '../../../types/types'

const TopClientes = () => {
    const { vendas } = useContext(VendasContext)
    const { clientes } = useContext(ClienteContexto)
    const [clientesTop, setClientesTop] = useState<ClintesTopT[]>([])

    const getTopClientes = () => {
        const pedidos = clientes.map((cliente) => {
            let compras = 0
            vendas.forEach((venda) => {
                if (venda.cliente.toLocaleLowerCase() === cliente.empresa.toLocaleLowerCase()) {
                    compras++
                }
            })
            return { empresa: cliente.empresa, compras }
        })

        pedidos.sort((a, b) => {
            if (a.compras > b.compras) {
                return -1
            }
            else if (a.compras < b.compras) {
                return 1
            }
            else {
                return 0
            }

        })
        setClientesTop(pedidos.filter((valor) => valor.compras !== 0).slice(0, 6))
    }
    useEffect(() => {
        getTopClientes()
    }, [clientes, vendas,]
    )

    return (
        <div className='col-span-2 row-span-3 m-5 '>
            <div className='h-full rounded-2xl shadow-xl  bg-white'>
                <div className='py-4 px-12 border-b-2 border-gray-500/25'>
                    <span className='text-2xl font-semibold'>Top Clientes</span>
                </div>
                <table className='w-full border-0 '>
                    <tbody className='relative'>
                        <tr className='text-2xl  '>
                            <th>Empresa</th>
                            <th>Pedidos</th>
                        </tr>
                    </tbody>
                    <tbody className='scroll-smooth'>
                        {
                            clientesTop.map((cliente, i) => {
                                return (
                                    <tr className='text-xl text-gray-500' key={i} >
                                        <th className='py-2'>
                                            {(cliente.empresa).slice(0, 1).toLocaleUpperCase() + (cliente.empresa).slice(1).toLocaleLowerCase()}
                                        </th>
                                        <th>{cliente.compras}</th>
                                    </tr>
                                )
                            })
                        }


                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TopClientes