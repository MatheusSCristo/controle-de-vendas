import db from '../db.js'

export default {
    getProdutos: () => {
        return new Promise((accept, reject) => {
            db.query('SELECT * FROM products', (error, results) => {
                if (error) {
                    reject(error)
                    return
                }
                accept(results)
            })
        })
    },
    getProduto: (codigo) => {
        return new Promise((accept, reject) => {
            db.query(`SELECT * FROM products WHERE codigo=${codigo}`, (error, results) => {
                if (error) {
                    reject(error)
                    return
                }
                accept(results)
            })
        })
    },
    postProduto: (produto,
        validade,
        codigo,
        precoDeCompra,
        precoDeVenda,
        dataDaCompra) => {
        return new Promise((accept, reject) => {
            db.query(`INSERT INTO products (produto,validade,codigo,precoDeCompra,precoDeVenda,dataDaCompra) VALUES (?,?,?,?,?,?)`, 
            [produto,validade,codigo,precoDeCompra,precoDeVenda,dataDaCompra], (error, results) => {
                if (error) {
                    reject(error)
                    return
                }
                accept(results.insertCodigo)
            })
        })
    },
    updateProduto: (produto,validade,codigo,precoDeCompra,precoDeVenda,dataDaCompra) => {
        return new Promise((accept, reject) => {
            db.query(`UPDATE products SET produto=?,validade=?,precoDeCompra=?,precoDeVenda=?,dataDaCompra=? WHERE codigo=?`,
             [produto,validade,precoDeCompra,precoDeVenda,dataDaCompra,codigo], (error, results) => {
                if (error) {
                    
                    reject(error)
                    return
                }
                accept(results)
            })
        })
    },
    deleteProduto: (codigo) => {
        return new Promise((accept, reject) => {
            db.query(`DELETE FROM products WHERE codigo=?`, [codigo], (error, results) => {
                if (error) {
                    reject(error)
                    return
                }
                accept(results)
            })
        })
    }

    
}