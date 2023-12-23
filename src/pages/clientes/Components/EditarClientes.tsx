import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from "zod"
import { ClienteT, EditClienteT } from '../../../types/types'

type EditarClientesParams = {
  isActive: {
    adicionar: boolean;
    editar: boolean;
  }
  setIsActive: React.Dispatch<React.SetStateAction<{
    adicionar: boolean;
    editar: boolean;
  }>>
  editCliente:{
    nome: string;
    sobrenome: string;
    empresa: string;
    localizacao: string;
    cpf: string;
}
}

const EditarClientes = ({isActive, setIsActive,editCliente }: EditarClientesParams) => {

  type addUserSchemaType = z.infer<typeof addUserSchema>
  const addUserSchema = z.object({
    nome: z.string().min(3, "O nome do cliente precisa ter no mínimo 3 caracteres"),
    sobrenome: z.string().min(3, "O nome do cliente precisa ter no mínimo 3 caracteres"),
    empresa: z.string().min(3, "O nome da empresa precisa ter no mínimo 3 caracteres"),
    localizacao: z.string().min(1, "É preciso informar a cidade do cliente"),
  })

  const { register,
    handleSubmit,
    formState: { errors } } = useForm<addUserSchemaType>({
      defaultValues:{
        nome:editCliente.nome,
        sobrenome:editCliente.sobrenome,
        empresa:editCliente.empresa,
        localizacao:editCliente.localizacao
      },
      resolver: zodResolver(addUserSchema)
    })

  const HandleEditCliente = (data:EditClienteT) => {
    fetch(`http://localhost:3000/api/cliente/${editCliente.cpf}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nome: data.nome,
        sobrenome: data.sobrenome,
        empresa: data.empresa,
        localizacao: data.localizacao,
      })
    })
      .then((res) =>{ res.json()})
      .then((data)=>console.log(data))
      .catch((error) => console.log(error))
    setIsActive({ ...isActive, editar: false })
  }


  const handleOnClickClose = () => {
    setIsActive({ ...isActive, editar: false })
  }

  return (
    <div className='absolute w-full h-full flex justify-center items-center bg-gray-500/20'>
      <div className='bg-white w-2/5  rounded-2xl relative flex flex-col items-center p-4 '>
        <h1 className='text-2xl mt-2 mb-2'>Editar cliente</h1>
        <span className='absolute top-2 right-4 text-2xl cursor-pointer' onClick={handleOnClickClose}>X</span>
        <form className='flex flex-col justify-center w-2/5 gap-1' onSubmit={handleSubmit(HandleEditCliente)}>
          <label htmlFor='nome'>Nome</label>
          <input type='text' className='border-2 border-grey-500/50 rounded-lg p-1 pl-2'
            {...register('nome')}
          />
          {errors.nome && <span className='text-red-500 text-sm'>{errors.nome.message}</span>}
          <label htmlFor='sobrenome'>Sobrenome</label>
          <input type='text' className='border-2 border-grey-500/50 rounded-lg p-1 pl-2'
            {...register('sobrenome')}
          />
          {errors.sobrenome && <span className='text-red-500 text-sm'>{errors.sobrenome.message}</span>}
          <label htmlFor='empresa'>Empresa</label>
          <input type='text' className='border-2 border-grey-500/50 rounded-lg p-1 pl-2'
            {...register('empresa')}
          />
          {errors.empresa && <span className='text-red-500 text-sm'>{errors.empresa.message}</span>}
          <label htmlFor='localizacao'>Cidade</label>
          <input type='text' className='border-2 border-grey-500/50 rounded-lg p-1 pl-2'
            {...register('localizacao')}
          />
          {errors.localizacao && <span className='text-red-500 text-sm'>{errors.localizacao.message}</span>}
          
          <button type='submit' className='bg-indigo-500/100 border-2 rounded-lg w-1/2 m-auto my-3'>Enviar</button>

        </form>



      </div>

    </div>
  )
}

export default EditarClientes