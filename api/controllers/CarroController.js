import CarroService from '../services/CarroService.js'

export default {
    buscarTodos: async (req, res) => {
        let json = { error: '', result: [] }
        let carros = await CarroService.buscarTodos()

        carros.map((carro) => {
            json.result.push({
                codigo: carro.codigo,
                descricao: carro.modelo,
            })
        })
        res.json(json)
    },
    buscarUm: async (req, res) => {
        let json = { error: '', result: {} }
        let codigo = req.params.codigo
        let carro = await CarroService.buscarUm(codigo)
        if (carro) {
            json.result = carro;
        }
        res.json(json)
    },
    inserir: async (req, res) => {
        let json = { error: '', result: {} }
        let modelo = req.body.modelo
        let placa = req.body.placa
        if (modelo && placa) {
            let CarroCodigo = await CarroService.inserir(placa, modelo)
            json.result = {
                codigo: CarroCodigo,
                modelo,
                placa,
            };
        }
        else {
            json.error = 'Campos nao enviados'
        }
        res.json(json)
    },
    alterar: async (req, res) => {
        let json = { error: '', result: {} }
        let codigo = req.params.codigo
        let modelo = req.body.modelo
        let placa = req.body.placa

        if (modelo && placa && codigo) {
            await CarroService.alterar(codigo, placa, modelo)
            json.result = {
                codigo,
                modelo,
                placa,
            };
        }
        else {
            json.error = 'Campos nao enviados'
        }
        res.json(json)
    },
    delete: async (req, res) => {
        let json = { error: '', result: {} }
        await CarroService.delete(req.params.codigo)
        res.json(json)
    }


}