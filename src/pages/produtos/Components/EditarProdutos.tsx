import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from "zod"
import { ProdutoT, editProdutoT } from '../../../types/types'

type editarProdutosParams = {
  isActive: {
    adicionar: boolean;
    editar: boolean;
  }
  setIsActive: React.Dispatch<React.SetStateAction<{
    adicionar: boolean;
    editar: boolean;
  }>>
  editProduto: ProdutoT
}

const EditarClientes = ({ isActive, setIsActive, editProduto }: editarProdutosParams) => {

  type editProdutosSchemaT = z.infer<typeof editProdutoSchema>
  const editProdutoSchema = z.object({
    produto: z.string().min(3, "O nome do cliente precisa ter no mínimo 3 caracteres"),
    precoDeCompra: z
      .string()
      .min(1, 'É preciso informar o preço de compra do produto')
      .refine((val) => !isNaN(parseInt(val)), {
        message: 'É necessário informar um número para o preço de compra',
      }),
    dataDaCompra: z.string().min(8, "É preciso informar a data de compra do produto").refine((val) => new Date(val) < new Date(), "Data inválida"),
    validade: z.string().min(8, "É preciso informar a data de vencimento do produto"),
    codigo:z.string()
  }).refine((data) => {
    const compra = new Date(data.dataDaCompra)
    const validade = new Date(data.validade)
    return compra <= validade
  }, {
    path: ['validade'],
    message: "O produto cadastrado já está vencido"
  })

  const { register,
    handleSubmit,
    formState: { errors } } = useForm<editProdutosSchemaT>({
      defaultValues: {
        ...editProduto,
        precoDeCompra: `${editProduto.precoDeCompra}`,
        dataDaCompra:undefined,
        validade:undefined,
      },
      resolver: zodResolver(editProdutoSchema)
    })

  const handleEditProduto = (data: editProdutoT
  ) => {
    fetch(`http://localhost:3000/api/produto/${editProduto.codigo}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        codigo:data.codigo,
        precoDeCompra: parseFloat(data.precoDeCompra),
      })
    })
      .then((res) =>res.json())
      .catch((error) => console.log(error))
    setIsActive({ ...isActive, editar: false })
  }


  const handleOnClickClose = () => {
    setIsActive({ ...isActive, editar: false })
  }

  return (
    <div className='absolute w-full h-full flex justify-center items-center bg-gray-500/20'>
      <div className='bg-white w-2/5  rounded-2xl relative flex flex-col items-center p-4 '>
        <h1 className='text-2xl mt-2 mb-2'>Adicionar cliente</h1>
        <span className='absolute top-2 right-4 text-2xl cursor-pointer hover:scale-[1.25]' onClick={handleOnClickClose}>X</span>
        <form className='flex flex-col justify-center w-2/5 gap-1' onSubmit={handleSubmit(handleEditProduto)}>

          <label htmlFor='produto'>Produto</label>
          <input type='text' className='border-2 border-grey-500/50 rounded-lg p-1 pl-2'
            {...register('produto')}
          />
          {errors.produto && <span className='text-red-500 text-sm'>{errors.produto.message}</span>}

          <label htmlFor='precoDeCompra'>Preço de Compra</label>
          <input type='text' className='border-2 border-grey-500/50 rounded-lg p-1 pl-2'
            {...register('precoDeCompra')}
          />
          {errors.precoDeCompra && <span className='text-red-500 text-sm'>{errors.precoDeCompra.message}</span>}

          <label htmlFor='dataDaCompra'>Data da Compra</label>
          <input type='date' className='border-2 border-grey-500/50 rounded-lg p-1 pl-2'
            {...register('dataDaCompra')}
          />
          {errors.dataDaCompra && <span className='text-red-500 text-sm'>{errors.dataDaCompra.message}</span>}

          <label htmlFor='validade'>Validade</label>
          <input type='date' className='border-2 border-grey-500/50 rounded-lg p-1 pl-2'
            {...register('validade')}
          />
          {errors.validade && <span className='text-red-500 text-sm'>{errors.validade.message}</span>}

          <button type='submit' className='bg-indigo-500/100 border-2 rounded-lg w-1/2 m-auto my-3'>Enviar</button>

        </form>



      </div>

    </div>
  )
}

export default EditarClientes