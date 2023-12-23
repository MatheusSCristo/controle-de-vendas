import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from "zod"
import { ClienteT } from '../../../types/types'

type AddClientesParams = {
  isActive: {
    adicionar: boolean;
    editar: boolean;
  }
  setIsActive: React.Dispatch<React.SetStateAction<{
    adicionar: boolean;
    editar: boolean;
  }>>
}

const AddClientes = ({isActive, setIsActive }: AddClientesParams) => {

  type addUserSchemaType = z.infer<typeof addUserSchema>
  const addUserSchema = z.object({
    nome: z.string().min(3, "O nome do cliente precisa ter no mínimo 3 caracteres"),
    sobrenome: z.string().min(3, "O nome do cliente precisa ter no mínimo 3 caracteres"),
    empresa: z.string().min(3, "O nome da empresa precisa ter no mínimo 3 caracteres"),
    localizacao: z.string().min(1, "É preciso informar a cidade do cliente"),
    cpf: z.string().min(11, "CPF inválido").max(12, "CPF inválido").refine((val) => parseInt(val),
      "CPF inválido"
    )
  })

  const { register,
    handleSubmit,
    formState: { errors } } = useForm<addUserSchemaType>({
      resolver: zodResolver(addUserSchema)
    })

  const HandleAddCliente = (data: ClienteT) => {
    fetch(`http://localhost:3000/api/cliente`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nome: data.nome,
        sobrenome: data.sobrenome,
        empresa: data.empresa,
        localizacao: data.localizacao,
        cpf: data.cpf
      })
    })
      .then((res) => res.json())
      .catch((error) => console.log(error))
    setIsActive({ ...isActive, adicionar: false })
  }


  const handleOnClickClose = () => {
    setIsActive({ ...isActive, adicionar: false })
  }

  return (
    <div className='absolute w-full h-full flex justify-center items-center bg-gray-500/20'>
      <div className='bg-white w-2/5  rounded-2xl relative flex flex-col items-center p-4 '>
        <h1 className='text-2xl mt-2 mb-2'>Adicionar cliente</h1>
        <span className='absolute top-2 right-4 text-2xl cursor-pointer' onClick={handleOnClickClose}>X</span>
        <form className='flex flex-col justify-center w-2/5 gap-1' onSubmit={handleSubmit(HandleAddCliente)}>
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
          <label htmlFor='cpf'>CPF</label>
          <input type='text' className='border-2 border-grey-500/50 rounded-lg p-1 pl-2'
            maxLength={11}
            {...register('cpf')}
          />
          {errors.cpf && <span className='text-red-500 text-sm'>{errors.cpf.message}</span>}
          <button type='submit' className='bg-indigo-500/100 border-2 rounded-lg w-1/2 m-auto my-3'>Enviar</button>

        </form>



      </div>

    </div>
  )
}

export default AddClientes