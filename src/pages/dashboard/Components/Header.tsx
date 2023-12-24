import React, { useContext, useEffect, useState } from 'react'
import { VendasContext } from '../../../context/vendasContext'
import { ProdutosContext } from '../../../context/produtosContext'

const Header = () => {

    const { vendas } = useContext(VendasContext)
    const { produtos } = useContext(ProdutosContext)
    const [valores, setValores] = useState({
        receitaBruta: 0,
        gastos: 0,
        receitaLiquida: 0
    })
    const receitaBruta = vendas.reduce((acumulador, currentItem) => {
        if (currentItem.status !== 'cancelado')
            return acumulador + currentItem.precoDeVenda
        else
            return acumulador
    }, 0)
    const gastos = produtos.reduce((acumulador, currentItem) => {
        return acumulador + currentItem.precoDeCompra
    }, 0)
    const getValores = () => {
        setValores({
            ...valores,
            receitaBruta,
            gastos,
            receitaLiquida: receitaBruta - gastos
        })

    }

    useEffect(() => {
        getValores()
    }, [vendas, produtos,])

    return (
        <div className='grid grid-cols-3 col-span-5 '>
            <div className='m-5 bg-white rounded-2xl shadow-xl relative flex flex-col'>
                <span className='m-2 text-xl font-semibold ml-3'>Receita Bruta</span>
                <span className='m-2 text-4xl font-semibold ml-6 '>+R${valores.receitaBruta.toFixed(2)}</span>
            </div>
            <div className='m-5 bg-white rounded-2xl shadow-xl relative flex flex-col'>
                <span className='m-2 text-xl font-semibold ml-3'>Gastos</span>
                <span className='m-2 text-4xl font-semibold text-[#e51b00] ml-6'>-R${valores.gastos.toFixed(2)}</span>
            </div>
            <div className='m-5 bg-white rounded-2xl shadow-xl relative flex flex-col'>
                <span className='m-2 text-xl font-semibold ml-3'>Receita Líquida</span>
                <span className={`m-2 text-4xl font-semibold ${valores.receitaLiquida>=0?'text-[#64ff64]':'text-[#e51b00]'} ml-6`}>R${valores.receitaLiquida.toFixed(2)}</span>
            </div>

        </div>
    )
}

export default Header