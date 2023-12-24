import React, { useContext, useEffect, useState } from 'react'
import AddSales from './Components/AddSales'
import { SalesT } from '../../types/types'
import { VendasContext } from '../../context/vendasContext'


const Sales = () => {
  const { setVendas } = useContext(VendasContext)
  const [sales, setSales] = useState<SalesT[]>([])
  const [search, setSearch] = useState('')
  const [isActive, setIsActive] = useState(
    {
      adicionar: false,
      editar: false
    })

  const getSales = () => {
    fetch("http://localhost:3000/api/vendas")
      .then((res) => res.json())
      .then((data) => {
        reorganizeSalesStatus(data.result)
      })
      .catch((error) => console.log(error))
  }


  const updateSales = (venda: SalesT, status: string) => {
    fetch(`http://localhost:3000/api/venda/${venda.codigo}`, {
      method: "PUT"
      ,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...venda,
        status: status
      })
    }
    )
      .then((res) => res.json())
      .then(() => getSales())
      .catch((error) => console.log(error))
  }

  const handleOnClickAddVendas = () => {
    setIsActive({ ...isActive, adicionar: true })
  }

  const handleDate = (date: string) => {

    let partesDaData1 = date.split('T');
    let partesDaData2 = partesDaData1[0].split('-');
    let dataJS = partesDaData2[2] + "/" + partesDaData2[1] + "/" + partesDaData2[0];
    return dataJS
  }


  useEffect(() => {
    getSales()
  }, [])

  const reorganizeSalesStatus = (data: SalesT[]) => {
    const organize = data
    if (data.length > 0) {
      if (organize.length>0) {
        organize.sort((a, b) => {
          if (a.status === 'cancelado' && b.status !== 'cancelado') {
            return 1;
          } else if (a.status !== 'cancelado' && b.status === 'cancelado') {
            return -1;
          } else {
            return 0;
          }
        })
      }
    }
      setSales(organize)
      setVendas(organize)
  }


  return (

    <div className='grow bg-white m-4 rounded shadow-2xl relative'>
      {isActive.adicionar && <AddSales isActive={isActive} setIsActive={setIsActive} getSales={getSales} />}
      <div className='flex justify-between items-baseline h-16 border-b-2 border-grey m-20 mb-0'>
        <h1 className='text-4xl font-medium '>Vendas</h1>
        <button className='bg-gradient-to-r from-blue-500 to-cyan-500 text-2xl text-white rounded font-normal p-2 hover:scale-[1.1]' onClick={handleOnClickAddVendas}>Cadastrar venda</button>
      </div>
      <div className='flex justify-between m-10 mr-20 ml-20'>
        <div className='flex border-2 border-grey w-[30%] items-center rounded-lg'>
          <img src='src\assets\imgs\search.svg' className='absolute ml-1' />
          <input type='text' placeholder='Procure um produto' className=' p-4 pl-8 w-full ' value={search} onChange={(e) => setSearch(e.target.value)}></input>
        </div>
      </div>
      <table className=' m-20 w-4/5 '>
        <tbody className='relative'>
          <tr className='text-3xl border-[1px] border-b-black grow-2 '>
            <th className='py-4 '>ID</th>
            <th>Produto</th>
            <th>Quantidade</th>
            <th>Preço de Venda</th>
            <th>Data da Venda</th>
            <th>Cliente</th>
            <th>Status</th>
            <th>
              <img src='src\assets\imgs\refresh.svg' className='w-12 cursor-pointer hover:scale-[1.15]'
                onClick={getSales}
              />
            </th>
          </tr>

          {
            sales.map((sales) => {
              return (
                (sales.codigo.includes(search) || sales.produto.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
                &&
                <tr className={`text-xl border-[1px] border-b-black ${sales.status === 'cancelado' ? 'opacity-50' : 'opacity-100'}`} key={sales.codigo} >
                  <th >#{sales.codigo}</th>
                  <th className='py-4'>{(sales.produto).slice(0, 1).toLocaleUpperCase() + (sales.produto).slice(1).toLocaleLowerCase()}</th>
                  <th>{sales.quantidade}</th>
                  <th>R${sales.precoDeVenda}</th>
                  <th>{handleDate(sales.dataDaVenda)}</th>
                  <th>{(sales.cliente).slice(0, 1).toLocaleUpperCase() + (sales.cliente).slice(1).toLocaleLowerCase()}</th>
                  {sales.status !== "cancelado" &&
                    <th className={sales.status === "concluido" ? 'text-[#62FC0F]' : 'text-[#FCA30F]'}>{(sales.status).slice(0, 1).toLocaleUpperCase() + (sales.status).slice(1).toLocaleLowerCase()}
                    </th>}
                  {sales.status === "cancelado" &&
                    <th className='text-[#F00]'>
                      {(sales.status).slice(0, 1).toLocaleUpperCase() + (sales.status).slice(1).toLocaleLowerCase()}

                    </th>}
                  <th className='flex items-center justify-center py-4'>
                    <h1 className='text-2xl cursor-pointer mx-4 opacity-80 hover:scale-[1.15] hover:opacity-100 text-[#F00]'
                      onClick={() => updateSales(sales, "cancelado")}>X</h1>
                    <img src='src\assets\imgs\confirm.svg' className='w-10 cursor-pointer opacity-80 hover:scale-[1.15] hover:opacity-100'
                      onClick={() => updateSales(sales, 'concluido')} />
                  </th>
                </tr>

              )
            }
            )
          }

        </tbody>
      </table>
    </div>
  )
}

export default Sales