import React, { useContext, useEffect, useState } from 'react'
import { ProdutoT} from '../../types/types'
import EditarProdutos from './Components/EditarProdutos'
import AddProdutos from './Components/AddProdutos'
import { ProdutoContexto } from '../../context/produtosContext'


const Produtos = () => {
  const {setProdutos}=useContext(ProdutoContexto)
  const [produtos, setProduct] = useState<ProdutoT[]>([])
  const [search, setSearch] = useState('')
  const [isActive, setIsActive] = useState(
    {
      adicionar: false,
      editar: false

    })
  
  const [editProduto, setEditProduto] = useState<ProdutoT>({
    codigo:'',
    produto:'',
    precoDeCompra:0,
    dataDaCompra:'',
    validade:''
    
  })

  useEffect(() => {
    if (localStorage.getItem('produtos'))
      setProduct(() => {
        const localProduto = localStorage.getItem('produtos');
        return localProduto ? JSON.parse(localProduto) : []
      })
    else {
      getProdutos()
    }
  }, [])

  const getProdutos = () => {
    fetch("http://localhost:3000/api/produtos")
      .then((res) => res.json())
      .then((data) =>{ 
        setProduct(data.result)
        setProdutos(data.result)
      })
      .catch((error) => console.log(error))
    return
  }

  const removeProduto = (produto: ProdutoT) => {
    fetch(`http://localhost:3000/api/produto/${produto.codigo}`, {
      method: "DELETE"
    })
      .then((res) => res.json())
      .then(() => getProdutos())
      .catch((error) => console.log(error))
  }

  const handleOnClickAddProduto = () => {
    setIsActive({ ...isActive, adicionar: true })
  }
  const handleOnClickEditProduto = (data:ProdutoT) => {
    setIsActive({ ...isActive, editar: true })
    setEditProduto(data)
  }

  const handleDate=(date:string)=>{
    let partesDaData1 = date.split('T');
    let partesDaData2 = partesDaData1[0].split('-');
    let dataJS =partesDaData2[2]+ "/" + partesDaData2[1] + "/"+ partesDaData2[0]; 
    return dataJS
  }


  useEffect(() => {
    setTimeout(()=>getProdutos(),1000)
    
  }, [isActive])

  return (
    <div className='grow bg-white m-4 rounded shadow-2xl relative'>
      {isActive.editar && <EditarProdutos isActive={isActive} setIsActive={setIsActive} editProduto={editProduto} />}
      {isActive.adicionar && <AddProdutos isActive={isActive} setIsActive={setIsActive} />}
      <div className='flex justify-between items-baseline h-[10%] border-b-2 border-grey m-20 mb-0'>
        <h1 className='text-4xl font-medium '>Produtos</h1>
        <button className='bg-gradient-to-r from-blue-500 to-cyan-500 text-2xl text-white rounded font-normal p-2 hover:scale-[1.1]' onClick={handleOnClickAddProduto}>Adicionar produto</button>
      </div>
      <div className='flex justify-between m-10 mr-20 ml-20'>
        <div className='flex border-2 border-grey w-[30%] items-center rounded-lg'>
          <img src='src\assets\imgs\search.svg' className='absolute ml-1' />
          <input type='text' placeholder='Procure um produto' className=' p-4 pl-8 w-full ' value={search} onChange={(e) => setSearch(e.target.value)}></input>
        </div>
      </div>
      <table className=' m-20 w-4/5 '>
        <tbody>

          <tr className='text-3xl border-[1px] border-b-black  '>
            <th className='py-4'>Código</th>
            <th>Produto</th>
            <th>Preço de Compra</th>
            <th>Data de Compra</th>
            <th>Validade</th>
            <th>
              <img src='src\assets\imgs\refresh.svg' className='w-12 cursor-pointer hover:scale-[1.15] mx-4'
                onClick={getProdutos}
              />
            </th>
          </tr>
          {produtos.map((produto) => (
            (produto.codigo.toLocaleLowerCase().includes(search.toLocaleLowerCase())
              || produto.produto.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
              produto.codigo.includes(search))
            && <tr className='text-xl border-[1px] border-b-black' key={produto.codigo}>
              <th>#{produto.codigo}</th>
              <th className='py-4'>{(produto.produto).slice(0, 1).toLocaleUpperCase() + (produto.produto).slice(1).toLocaleLowerCase()}</th>               
              <th>R${produto.precoDeCompra.toFixed(2)}</th>
              <th>{handleDate(produto.dataDaCompra)}</th>
              <th>{handleDate(produto.validade)}</th>
              <th className='flex items-center justify-center py-4'>
                <img src='src\assets\imgs\trash.svg' className='w-10 cursor-pointer mx-4 opacity-80 hover:scale-[1.15] hover:opacity-100' 
                onClick={() => removeProduto(produto)} />
                <img src='src\assets\imgs\edit.svg' className='w-10 cursor-pointer opacity-80 hover:scale-[1.15] hover:opacity-100' 
                onClick={() =>handleOnClickEditProduto(produto)} />
              </th>
            </tr>
          )
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Produtos