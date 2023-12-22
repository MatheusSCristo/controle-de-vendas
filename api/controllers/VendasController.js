import VendasService from '../services/VendasService.js'

export default {
    getVendas: async (req, res) => {
        let json = { error: '', result: [] }
        let vendas = await VendasService.getVendas()

        vendas.map((venda) => {
            json.result.push(venda)
        })
        res.json(json)
    },
        
    postVenda: async (req, res) => {
        let json = { error: '', result: {} }
        let produto = req.body.produto 
        let codigo = req.body.codigo 
        let quantidade = req.body.quantidade 
        let precoDeVenda = req.body.precoDeVenda 
        let dataDaVenda = req.body.dataDaVenda 
        let cliente = req.body.cliente 
        let status = req.body.status 
        if (produto && codigo && quantidade && precoDeVenda && dataDaVenda && cliente && status ) {
            const id=await VendasService.postVenda(produto,codigo,quantidade,precoDeVenda,dataDaVenda,cliente,status)
            json.result = {
                id,
                produto,
                codigo,
                quantidade,
                precoDeVenda,
                dataDaVenda,
                cliente,
                status
            };
        }
        else {
            json.error = 'Campos nao enviados'
        }
        res.json(json)
    },
    
    deleteVenda: async (req, res) => {
        let json = { error: '', result: {} }
        await VendasService.deleteVenda(req.params.id)
        res.json(json)
    }


}