import ClienteService from '../services/ClienteService.js'

export default {
    getClientes: async (req, res) => {
        let json = { error: '', result: [] }
        let clientes = await ClienteService.getClientes()

        clientes.map((cliente) => {
            json.result.push(cliente)
        })
        res.json(json)
    },
    getCliente: async (req, res) => {
        let json = { error: '', result: {} }
        let cpf = req.params.cpf
        let cliente = await ClienteService.getCliente(cpf)
        if (cliente) {
            json.result = cliente;
        }
        res.json(json)
    },
    
    postCliente: async (req, res) => {
        let json = { error: '', result: {} }
        let nome = req.body.nome
        let sobrenome = req.body.sobrenome
        let empresa = req.body.empresa
        let localizacao = req.body.localizacao
        let cpf=req.body.cpf
        if (nome && sobrenome && empresa && localizacao && cpf) {
            await ClienteService.postCliente(nome,sobrenome,empresa,localizacao,cpf)
            json.result = {
                nome,
                sobrenome,
                empresa,
                localizacao,
                cpf
            };
        }
        else {
            json.error = 'Campos nao enviados'
        }
        res.json(json)
    },
    updateCliente: async (req, res) => {
        let json = { error: '', result: {} }
        let cpf=req.params.cpf
        let nome = req.body.nome || null
        let sobrenome = req.body.sobrenome || null
        let empresa = req.body.empresa || null
        let localizacao = req.body.localizacao || null

        if ((nome || sobrenome || empresa || localizacao) && cpf) {
            await ClienteService.updateCliente(nome,sobrenome,empresa,localizacao,cpf)
            json.result = {
                nome,
                sobrenome,
                empresa,
                localizacao,
                cpf,
            };
        }
        else {
            json.error = 'Campos nao enviados'
        }
        res.json(json)
    },
    deleteCliente: async (req, res) => {
        let json = { error: '', result: {} }
        await ClienteService.deleteCliente(req.params.cpf)
        res.json(json)
    }


}