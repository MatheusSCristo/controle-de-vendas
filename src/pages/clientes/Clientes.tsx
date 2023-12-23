import React, { useEffect, useState } from 'react'
import AddClientes from './Components/AddClientes'
import { ClienteT } from '../../types/types'
import EditarClientes from './Components/EditarClientes'

const Clientes = () => {
  const [editCliente, setEditCliente] = useState({
    nome:"",
    sobrenome:"",
    empresa:"",
    localizacao:"",
    cpf:""
  })
  const [search, setSearch] = useState('')
  const [isActive, setIsActive] = useState(
    {
      adicionar: false,
      editar: false

    })
  const [clientes, setClientes] = useState<ClienteT[]>([])
  const getClientes = () => {
    fetch("http://localhost:3000/api/clientes")
      .then((res) => res.json())
      .then((data) => setClientes(data.result))
      .catch((error) => console.log(error))
    return
  }

  const removeCliente = (cliente: ClienteT) => {
    fetch(`http://localhost:3000/api/cliente/${cliente.cpf}`, {
      method: "DELETE"
    })
      .then((res) => res.json())
      .then(() => getClientes())
      .catch((error) => console.log(error))
  }

  const handleOnClickAddCliente = () => {
    setIsActive({ ...isActive, adicionar: true })
  }
  const handleOnClickEditCliente = (data: ClienteT) => {
    setIsActive({ ...isActive, editar: true })
    setEditCliente(data)
  }

  useEffect(() => {
    getClientes()
  }, [isActive])

  return (
    <div className='grow bg-white m-4 rounded shadow-2xl relative'>
      {isActive.editar && <EditarClientes isActive={isActive} setIsActive={setIsActive} editCliente={editCliente} />}
      {isActive.adicionar && <AddClientes isActive={isActive} setIsActive={setIsActive} />}
      <div className='flex justify-between items-baseline h-[10%] border-b-2 border-grey m-20 mb-0'>
        <h1 className='text-4xl font-medium '>Clientes</h1>
        <button className='bg-gradient-to-r from-blue-500 to-cyan-500 text-2xl text-white rounded font-normal p-2 hover:scale-[1.1]' onClick={handleOnClickAddCliente}>Adicionar cliente</button>
      </div>
      <div className='flex justify-between m-10 mr-20 ml-20'>
        <div className='flex border-2 border-grey w-[30%] items-center rounded-lg'>
          <img src='src\assets\imgs\search.svg' className='absolute ml-1' />
          <input type='text' placeholder='Procure um cliente' className=' p-4 pl-8 w-full ' value={search} onChange={(e) => setSearch(e.target.value)}></input>
        </div>
      </div>
      <table className=' m-20 w-4/5 '>
        <tbody>

          <tr className='text-3xl border-[1px] border-b-black  '>
            <th className='py-4'>Nome</th>
            <th>Empresa</th>
            <th>CPF</th>
            <th>Localização</th>
          </tr>
          {clientes.map((cliente) => (
            (cliente.nome.toLocaleLowerCase().includes(search.toLocaleLowerCase())
              || cliente.sobrenome.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || cliente.empresa.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
              cliente.localizacao.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
            && <tr className='text-2xl border-[1px] border-b-black' key={cliente.cpf}>
              <th className='py-4'>{(cliente.nome).slice(0, 1).toLocaleUpperCase() + (cliente.nome).slice(1).toLocaleLowerCase() + " " +
                (cliente.sobrenome).slice(0, 1).toLocaleUpperCase() + (cliente.sobrenome).slice(1).toLocaleLowerCase()}</th>
              <th>{(cliente.empresa).slice(0, 1).toLocaleUpperCase() + (cliente.empresa).slice(1).toLocaleLowerCase()}</th>
              <th>{cliente.cpf}</th>
              <th>{(cliente.localizacao).toLocaleUpperCase()}</th>
              <th className='flex items-center justify-center py-4'>
                <img src='src\assets\imgs\trash.svg' className='w-10 cursor-pointer mx-4 opacity-80 hover:scale-[1.15] hover:opacity-100' 
                onClick={() => removeCliente(cliente)} />
                <img src='src\assets\imgs\edit.svg' className='w-10 cursor-pointer opacity-80 hover:scale-[1.15] hover:opacity-100' 
                onClick={() => handleOnClickEditCliente(cliente)} />
              </th>
            </tr>
          )
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Clientes