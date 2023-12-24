import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from "zod"

type AddProdutosParamsT = {
    isActive: {
        adicionar: boolean;
        editar: boolean;
    }
    setIsActive: React.Dispatch<React.SetStateAction<{
        adicionar: boolean;
        editar: boolean;
    }>>
}

const AddProdutos = ({ isActive, setIsActive }: AddProdutosParamsT) => {

    type addProdutosSchemaT = z.infer<typeof addProdutoSchema>
    const addProdutoSchema = z.object({
        produto: z.string().min(3, "O nome do cliente precisa ter no mínimo 3 caracteres"),
        precoDeCompra: z
            .string()
            .min(1, 'É preciso informar o preço de compra do produto')
            .refine((val) => !isNaN(parseInt(val)), {
                message: 'É necessário informar um número para o preço de compra',
            }),
        dataDaCompra: z.string().min(8, "É preciso informar a data de compra do produto").refine((val) => new Date(val) < new Date(), "Data inválida"),
        validade: z.string().min(8, "É preciso informar a data de vencimento do produto")
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
        formState: { errors } } = useForm<addProdutosSchemaT>({
            resolver: zodResolver(addProdutoSchema)
        })

    const handleAddProduto = (data: {
        produto: string,
        precoDeCompra: string,
        dataDaCompra: string,
        validade: string,
    }) => {
        fetch(`http://localhost:3000/api/produto`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                produto: data.produto,
                precoDeCompra: parseFloat(data.precoDeCompra),
                dataDaCompra: data.dataDaCompra,
                validade: data.validade
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
                <span className='absolute top-2 right-4 text-2xl cursor-pointer hover:scale-[1.25]' onClick={handleOnClickClose}>X</span>
                <form className='flex flex-col justify-center w-2/5 gap-1' onSubmit={handleSubmit(handleAddProduto)}>

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

export default AddProdutos