import React, { useContext, useEffect, useState } from 'react'
import { ProdutosContext } from '../../../context/produtosContext'
import { ProdutoT } from '../../../types/types'

const Produtos = () => {
    const { produtos } = useContext(ProdutosContext)
    const [compras,setCompras]=useState<ProdutoT[]>([])

    const handleDate = (date: string) => {
        let partesDaData1 = date.split('T');
        let partesDaData2 = partesDaData1[0].split('-');
        let dataJS = partesDaData2[2] + "/" + partesDaData2[1] + "/" + partesDaData2[0];
        return dataJS
    }

    useEffect(()=>{
        createDataCompras()
    },[produtos,])
    

    const createDataCompras=()=>{
        const compras=produtos.sort((a,b)=>{
            const aDate=new Date(a.dataDaCompra)
            const bDate=new Date(b.dataDaCompra)
            if(aDate<bDate){
                return 1
            }
            else if(aDate >bDate){
                return -1
            }
            else{
                return 0
            }
            
        })
        
        setCompras(compras.slice(0,3))
    }


    return (
        <div className='col-span-3 row-span-2 m-5'>
            <div className=' bg-white h-full rounded-2xl shadow-xl relative p-4' >
                <div className='py-4 px-12 border-b-2 border-gray-500/25'>
                <span className=' text-2xl font-semibold '>Compras recentes</span>
                </div>
                <table className=' w-full '>
                    <tbody>
                        <tr className='text-2xl   '>
                            <th className='py-1'>Código</th>
                            <th>Produto</th>
                            <th>Preço de Compra</th>
                            <th>Data de Compra</th>
                        </tr>
                        {compras.map((produto) => (
                            <tr className='text-xl text-gray-500' key={produto.codigo}>
                                <th>#{produto.codigo}</th>
                                <th className='py-2'>{(produto.produto).slice(0, 1).toLocaleUpperCase() + (produto.produto).slice(1).toLocaleLowerCase()}</th>
                                <th>R${produto.precoDeCompra.toFixed(2)}</th>
                                <th>{handleDate(produto.dataDaCompra)}</th>
                            </tr>
                        )
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Produtos