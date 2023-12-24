import React from 'react'
import Header from './Components/Header'
import Vendas from './Components/Vendas'
import Produtos from './Components/Produtos'
import TopClientes from './Components/TopClientes'
import TopProdutos from './Components/TopProdutos'

const Dashboard = () => {
  return (
    <div className='grid grid-cols-5 grid-rows-6 w-full mx-8 my-2 h-[100vh]'> 
      <Header/>   
      <Vendas/>   
      <TopProdutos/>
      <Produtos/>
      <TopClientes/>
    </div>
  )
}

export default Dashboard