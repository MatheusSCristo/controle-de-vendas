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
        let precoDeCompra = req.body.precoDeCompra
        let dataDaCompra = req.body.dataDaCompra
        if (produto && validade && precoDeCompra && dataDaCompra) {
            await ProdutoService.postProduto(produto, validade, precoDeCompra, dataDaCompra)
            json.result = {
                produto,
                validade,
                precoDeCompra,
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
        let produto = req.body.produto
        let codigo=req.params.codigo
        let validade = req.body.validade
        let precoDeCompra = req.body.precoDeCompra
        let dataDaCompra = req.body.dataDaCompra
        if (produto && validade && precoDeCompra && dataDaCompra && codigo) {
            await ProdutoService.updateProduto(produto, validade, precoDeCompra, dataDaCompra,codigo)
            json.result = {
                codigo,
                produto,
                validade,
                precoDeCompra,
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