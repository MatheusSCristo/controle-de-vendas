import db from '../db.js'

export default {
    getVendas: () => {
        return new Promise((accept, reject) => {
            db.query('SELECT * FROM vendas', (error, results) => {
                if (error) {
                    reject(error)
                    return
                }
                accept(results)
            })
        })
    },
    
    postVenda: (produto,codigo,quantidade,precoDeVenda,dataDaVenda,cliente,status) => {
        return new Promise((accept, reject) => {
            db.query(`INSERT INTO vendas (produto,codigo,quantidade,precoDeVenda,dataDaVenda,cliente,status) VALUES (?,?,?,?,?,?,?)`,
             [produto,codigo,quantidade,precoDeVenda,dataDaVenda,cliente,status], (error, results) => {
                if (error) {
                    reject(error)
                    return
                }
                accept(results.insertCodigo)
            })
        })
    },
    
    deleteVenda: (id) => {
        return new Promise((accept, reject) => {
            db.query(`DELETE FROM vendas WHERE id=?`, [id], (error, results) => {
                if (error) {
                    reject(error)
                    return
                }
                accept(results)
            })
        })
    }

    
}