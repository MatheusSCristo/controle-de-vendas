import db from '../db.js'

export default {
    buscarTodos: () => {
        return new Promise((accept, reject) => {
            db.query('SELECT * FROM carros', (error, results) => {
                if (error) {
                    reject(error)
                    return
                }
                accept(results)
            })
        })
    },
    buscarUm: (codigo) => {
        return new Promise((accept, reject) => {
            db.query(`SELECT * FROM carros WHERE codigo=${codigo}`, (error, results) => {
                if (error) {
                    reject(error)
                    return
                }
                accept(results)
            })
        })
    },
    inserir: (placa, modelo) => {
        return new Promise((accept, reject) => {
            db.query(`INSERT INTO carros (modelo,placa) VALUES (?,?)`, [modelo, placa], (error, results) => {
                if (error) {
                    reject(error)
                    return
                }
                accept(results.insertCodigo)
            })
        })
    },
    alterar: (codigo,placa, modelo) => {
        return new Promise((accept, reject) => {
            db.query(`UPDATE carros SET modelo=?,placa=? WHERE codigo=?`, [modelo, placa,codigo], (error, results) => {
                if (error) {
                    reject(error)
                    return
                }
                accept(results)
            })
        })
    },
    delete: (codigo) => {
        return new Promise((accept, reject) => {
            db.query(`DELETE FROM carros WHERE codigo=?`, [codigo], (error, results) => {
                if (error) {
                    reject(error)
                    return
                }
                accept(results)
            })
        })
    }

    
}