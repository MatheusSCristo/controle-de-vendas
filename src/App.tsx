import { Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard'
import Produtos from './pages/produtos/Produtos'
import Sales from './pages/sales/Sales'
import Clientes from './pages/clientes/Clientes'

const App = () => {
  return (
    <div className='flex bg-[#eeeeee] '>
      <div className='basis-32 min-h-[100vh] bg-[#2334cb] flex flex-col gap-6'>
      <Link to={'/'}>
        <div className='flex flex-col items-center cursor-pointer hover:scale-[1.15]'>
          <img src='src\assets\imgs\dashboard.svg' alt='Dashboard' className='w-12 mt-10' />
          <span className='text-white font-light text-xl'>Dashboard</span>
        </div>
      </Link>
        <Link to={'/produtos'}>

        <div className='flex flex-col items-center cursor-pointer hover:scale-[1.15]'>
          <img src='src\assets\imgs\product.svg' alt='Produtos' className='w-12 ' />
          <span className='text-white font-light text-xl'>Produtos</span>
        </div>
        </Link>
        <Link to={'/vendas'}>
        <div className='flex flex-col items-center cursor-pointer hover:scale-[1.15]'>
          <img src='src\assets\imgs\purchaseOrder.svg' alt='Vendas' className='w-12 ' />
          <span className='text-white font-light text-xl'>Vendas</span>
        </div>
        </Link>
        <Link to={'/clientes'}>
        <div className='flex flex-col items-center cursor-pointer hover:scale-[1.15]'>
          <img src='src\assets\imgs\clientes.svg' alt='Clientes' className='w-12 ' />
          <span className='text-white font-light text-xl'>Clientes</span>
        </div>
        </Link>
      </div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/vendas" element={<Sales />} />
        <Route path="/clientes" element={<Clientes />} />
      </Routes>
    </div>
  )
}

export default App