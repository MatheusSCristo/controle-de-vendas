import React, { useContext, useEffect, useState } from 'react'
import { VendasContext } from '../../../context/vendasContext'
import { ProdutosContext } from '../../../context/produtosContext'
import { PedidosProdutosT } from '../../../types/types'

const TopProdutos = () => {
  const { vendas } = useContext(VendasContext)
  const { produtos } = useContext(ProdutosContext)
  const [pedidosProduto, setPedidosProduto] = useState<PedidosProdutosT[]>([])

  const getPedidosProdutos = () => {
    
    const pedidos = produtos.map((produto) => {
      let quantidade = 0
      let ganhos=0
      vendas.forEach((venda) => {
        if (venda.produto === produto.produto) {
          quantidade += venda.quantidade
          ganhos+=venda.quantidade*venda.precoDeVenda
        }
       }) 
            
      return { nome: produto.produto, quantidade,ganhos }
    })

    pedidos.sort((a,b)=>{
      if(a.quantidade>b.quantidade){
        return -1
      }
      else if(a.quantidade<b.quantidade){
        return 1
      }
      else{
        return 0
      }

    })
    setPedidosProduto(pedidos.filter((valor)=>valor.quantidade!==0).slice(0,6))
  }
  useEffect(() => {
    getPedidosProdutos()
  }, [produtos, vendas,]
  )

  return (
    <div className='col-span-2 row-span-3 m-5'>
      <div className='h-full rounded-2xl shadow-xl  bg-white p-4' >
        <div className='py-4 px-12 border-b-2 border-gray-500/25'>
          <span className='text-2xl font-semibold'>Produtos mais vendidos</span>
          </div>
          <table className='w-full border-0 '>
                    <tbody className='relative'>
                        <tr className='text-2xl  '>
                            <th>Produto</th>
                            <th>Vendido</th>
                            <th>Ganhos brutos</th>
                        </tr>
                    </tbody>
                    <tbody className='scroll-smooth'>
                        {
                            pedidosProduto.map((pedidos,i) => {
                                return (
                                    <tr className='text-xl text-gray-500' key={i} >
                                        <th className='py-2'>
                                            {(pedidos.nome).slice(0, 1).toLocaleUpperCase() + (pedidos.nome).slice(1).toLocaleLowerCase()}
                                        </th>
                                        <th>{pedidos.quantidade}</th>
                                        <th>R${pedidos.ganhos}</th>
                                       
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

export default TopProdutos