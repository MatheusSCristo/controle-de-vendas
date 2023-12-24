import { zodResolver } from '@hookform/resolvers/zod'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { z } from "zod"
import { ProdutoContexto } from '../../../context/produtosContext'
import { ClienteContexto } from '../../../context/clienteContext'

type AddProdutosParamsT = {
    isActive: {
        adicionar: boolean;
        editar: boolean;
    }
    setIsActive: React.Dispatch<React.SetStateAction<{
        adicionar: boolean;
        editar: boolean;
    }>>
    getSales: () => void
}


const AddSales = ({ isActive, setIsActive, getSales }: AddProdutosParamsT) => {

    const { clientes } = useContext(ClienteContexto)
    const { produtos } = useContext(ProdutoContexto)


    type addProdutosSchemaT = z.infer<typeof addProdutoSchema>
    const addProdutoSchema = z.object({
        produto: z.string().min(3, "O nome do cliente precisa ter no mínimo 3 caracteres").refine((val)=>val!=='Selecione um produto','É necessário selecionar um produto'),
        quantidade: z.string().min(1, "É preciso informar a quantidade de produto vendido").refine((val) => !isNaN(parseInt(val)), "Valor inválido"),
        precoDeVenda: z.string().min(1, "É preciso informar o preço de venda do produto").refine((val) => !isNaN(parseInt(val)), "Valor inválido"),
        dataDaVenda: z.string().min(8, "É preciso informar a data de venda do produto").refine((val) => new Date(val) < new Date(), "Data inválida"),
        cliente: z.string().min(1, "É preciso informar a empresa cliente").refine((val)=>val!=='Selecione um cliente','É necessário selecionar um cliente'),
    })


    const { register,
        handleSubmit,
        formState: { errors } } = useForm<addProdutosSchemaT>({
            resolver: zodResolver(addProdutoSchema)
        })

    const handleAddSales = async (data: {
        produto: string,
        quantidade: string,
        precoDeVenda: string,
        dataDaVenda: string,
        cliente: string,
    }) => {
        await fetch(`http://localhost:3000/api/venda`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...data,
                quantidade: parseInt(data.quantidade),
                precoDeVenda: parseFloat(data.precoDeVenda),
                status: "Em andamento",
                
            })
        })
            .then((res) => res.json())
            .catch((error) => console.log(error))
        getSales()
        setIsActive({ ...isActive, adicionar: false })
    }


    const handleOnClickClose = () => {
        setIsActive({ ...isActive, adicionar: false })
    }

    return (
        <div className='absolute w-full h-full flex justify-center items-center bg-gray-500/20 z-10'>
            <div className='bg-white w-2/5  rounded-2xl relative flex flex-col items-center p-4 '>
                <h1 className='text-2xl mt-2 mb-2'>Adicionar vendas</h1>
                <span className='absolute top-2 right-4 text-2xl cursor-pointer hover:scale-[1.25]' onClick={handleOnClickClose}>X</span>
                <form className='flex flex-col justify-center w-2/5 gap-1' onSubmit={handleSubmit(handleAddSales)}>

                    <label htmlFor='produto'>Produto</label>
                    <select className='border-2 border-grey-500/50 rounded-lg p-1 pl-2'
                        {...register('produto')}
                    >
                        <option disabled selected>Selecione um produto</option>
                        {produtos.map((produto) => (
                            <option>{produto.produto}</option>
                        ))}


                    </select>
                    {errors.produto && <span className='text-red-500 text-sm'>{errors.produto.message}</span>}

                    <label htmlFor='quantidade'>Quantidade</label>
                    <input type='text' className='border-2 border-grey-500/50 rounded-lg p-1 pl-2'
                        {...register('quantidade')}
                    />
                    {errors.quantidade && <span className='text-red-500 text-sm'>{errors.quantidade.message}</span>}

                    <label htmlFor='precoDeVenda'>precoDeVenda</label>
                    <input type='text' className='border-2 border-grey-500/50 rounded-lg p-1 pl-2'
                        {...register('precoDeVenda')}
                    />
                    {errors.precoDeVenda && <span className='text-red-500 text-sm'>{errors.precoDeVenda.message}</span>}

                    <label htmlFor='dataDaVenda'>Data da Venda</label>
                    <input type='date' className='border-2 border-grey-500/50 rounded-lg p-1 pl-2'
                        {...register('dataDaVenda')}
                    />
                    {errors.dataDaVenda && <span className='text-red-500 text-sm'>{errors.dataDaVenda.message}</span>}

                    <label htmlFor='cliente'>Cliente</label>
                    <select className='border-2 border-grey-500/50 rounded-lg p-1 pl-2'
                        {...register('cliente')}
                    >
                        <option disabled selected >Selecione um cliente</option>
                        {clientes.map((cliente) => (
                            <option>{cliente.empresa}</option>
                        ))}


                    </select>
                    {errors.cliente && <span className='text-red-500 text-sm'>{errors.cliente.message}</span>}

                    <button type='submit' className='bg-indigo-500/100 border-2 rounded-lg w-1/2 m-auto my-3'>Enviar</button>

                </form>



            </div>

        </div>
    )
}

export default AddSales