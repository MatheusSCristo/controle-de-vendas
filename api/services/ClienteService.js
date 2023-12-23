import db from '../db.js'

export default {
    getClientes: () => {
        return new Promise((accept, reject) => {
            db.query('SELECT * FROM clientes', (error, results) => {
                if (error) {
                    console.log(error)
                    return
                }
                accept(results)
            })
        })
    },
    getCliente: (cpf) => {
        return new Promise((accept, reject) => {
            db.query(`SELECT * FROM clientes WHERE cpf=${cpf}`, (error, results) => {
                if (error) {
                    console.log(error)
                    return
                }
                accept(results)
            })
        })
    },
    postCliente: (nome,sobrenome,empresa, localizacao,cpf) => {
        return new Promise((accept, reject) => {
            db.query(`INSERT INTO clientes (nome,sobrenome,empresa,localizacao,cpf) VALUES (?,?,?,?,?)`, [nome,sobrenome,empresa, localizacao,cpf], (error, results) => {
                if (error) {
                    console.log(error)
                    return
                }
                accept(results.insertCodigo)
            })
        })
    },
    updateCliente: (nome,sobrenome,empresa, localizacao,cpf) => {
        return new Promise((accept, reject) => {
            db.query(`UPDATE clientes SET nome=?,sobrenome=?,empresa=?,localizacao=? WHERE cpf=?`, [nome,sobrenome,empresa, localizacao,cpf], (error, results) => {
                if (error) {
                    console.log(error)
                    return
                }
                accept(results)
            })
        })
    },
    deleteCliente: (cpf) => {
        return new Promise((accept, reject) => {
            db.query(`DELETE FROM clientes WHERE cpf=?`, [cpf], (error, results) => {
                if (error) {
                    console.log(error)
                    return
                }
                accept(results)
            })
        })
    }

    
}