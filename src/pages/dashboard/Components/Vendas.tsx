import React, { useContext } from 'react'
import { VendasContext } from '../../../context/vendasContext'

const Vendas = () => {
    const { vendas: sales } = useContext(VendasContext)
    return (
        <div className='bg-white rounded-2xl col-span-3 row-span-3 m-5 h-[400px] overflow-y-scroll shadow-xl scroll-smooth'>
            <div className='  h-full relative p-4' >
                <div className='py-4 px-12 border-b-2 border-gray-500/25'>
                    <span className=' text-2xl font-semibold'>Vendas em andamento</span>
                </div>
                <table className='w-full border-0 '>
                    <tbody className='relative'>
                        <tr className='text-2xl  '>
                            <th className='py-1 '>ID</th>
                            <th>Produto</th>
                            <th>Quantidade</th>
                            <th>Cliente</th>
                            <th>Status</th>
                        </tr>
                    </tbody>
                    <tbody className='scroll-smooth'>
                        {
                            sales.map((sales) => {
                                return (
                                    sales.status === "Em andamento" &&
                                    <tr className='text-xl text-gray-500' key={sales.codigo} >
                                        <th>#{sales.codigo}</th>
                                        <th className='py-2'>
                                            {(sales.produto).slice(0, 1).toLocaleUpperCase() + (sales.produto).slice(1).toLocaleLowerCase()}
                                        </th>
                                        <th>{sales.quantidade}</th>
                                        <th>{(sales.cliente).slice(0, 1).toLocaleUpperCase() + (sales.cliente).slice(1).toLocaleLowerCase()}</th>
                                        <th
                                            className='text-[#FCA30F]'>{(sales.status).slice(0, 1).toLocaleUpperCase() + (sales.status).slice(1).toLocaleLowerCase()}
                                        </th>
                                    </tr>

                                )
                            }
                            )
                        }

                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default Vendas