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
        let quantidade = req.body.quantidade 
        let precoDeVenda = req.body.precoDeVenda 
        let dataDaVenda = req.body.dataDaVenda 
        let cliente = req.body.cliente 
        let status = req.body.status 
        if (produto && quantidade && precoDeVenda && dataDaVenda && cliente && status ) {
            const codigo=await VendasService.postVenda(produto,quantidade,precoDeVenda,dataDaVenda,cliente,status)
            json.result = {
                codigo,
                produto,
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
    updateVenda: async (req, res) => {
        let json = { error: '', result: {} }
        let codigo = req.params.codigo 
        let status = req.body.status 
        if (codigo && status) {
            await VendasService.updateVenda(codigo,status)
            json.result = {
                codigo,
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
        await VendasService.deleteVenda(req.params.codigo)
        res.json(json)
    }


}