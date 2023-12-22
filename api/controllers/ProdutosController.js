import ProdutoService from '../services/ProdutosService.js'

export default {
    getProdutos: async (req, res) => {
        let json = { error: '', result: [] }
        let produtos = await ProdutoService.getProdutos()
        produtos.map((produto) => {
            json.result.push(produto)
        })
        res.json(json)
    },
    getProduto: async (req, res) => {
        let json = { error: '', result: {} }
        let codigo = req.params.codigo
        let produto = await ProdutoService.getProduto(codigo)
        if (cliente) {
            json.result = produto;
        }
        res.json(json)
    },

    postProduto: async (req, res) => {
        let json = { error: '', result: {} }
        let produto = req.body.produto
        let validade = req.body.validade
        let codigo = req.body.codigo
        let precoDeCompra = req.body.precoDeCompra
        let precoDeVenda = req.body.precoDeVenda
        let dataDaCompra = req.body.dataDaCompra
        if (produto && validade && codigo && precoDeCompra && precoDeVenda && dataDaCompra) {
            await ProdutoService.postProduto(produto, validade, codigo, precoDeCompra, precoDeVenda, dataDaCompra)
            json.result = {
                produto,
                validade,
                codigo,
                precoDeCompra,
                precoDeVenda,
                dataDaCompra
            };
        }
        else {
            json.error = 'Campos nao enviados'
        }
        res.json(json)
    },
    updateProduto: async (req, res) => {
        let json = { error: '', result: {} }
        let codigo = req.params.codigo 
        let produto = req.body.produto 
        let validade = req.body.validade 
        let precoDeCompra = req.body.precoDeCompra 
        let precoDeVenda = req.body.precoDeVenda 
        let dataDaCompra = req.body.dataDaCompra 

        if ((produto && validade && codigo && precoDeCompra && precoDeVenda && dataDaCompra) && codigo) {
            await ProdutoService.updateProduto(produto, validade, codigo, precoDeCompra, precoDeVenda, dataDaCompra)
            json.result = {
                produto,
                validade,
                codigo,
                precoDeCompra,
                precoDeVenda,
                dataDaCompra
            };
        }
        else {
            json.error = 'Campos nao enviados'
        }
        res.json(json)
    },
    deleteProduto: async (req, res) => {
        let json = { error: '', result: {} }
        await ProdutoService.deleteProduto(req.params.codigo)
        res.json(json)
    }


}