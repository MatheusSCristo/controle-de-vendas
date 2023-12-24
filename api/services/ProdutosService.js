import db from '../db.js'

function generateRandomNumericCode() {
    let code = '';
  
    for (let i = 0; i < 6; i++) {
      const randomDigit = Math.floor(Math.random() * 10); 
      code += randomDigit.toString(); 
    }
  
    return code;
  }
  


export default {
    getProdutos: () => {
        return new Promise((accept, reject) => {
            db.query('SELECT * FROM products', (error, results) => {
                if (error) {
                    console.error(error)
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
                    console.error(error)
                    return
                }
                accept(results)
            })
        })
    },
    postProduto: (produto,
        validade,
        precoDeCompra,
        dataDaCompra) => {
        return new Promise((accept, reject) => {

            db.query(`INSERT INTO products (produto,validade,codigo,precoDeCompra,dataDaCompra) VALUES (?,?,?,?,?)`, 
            [produto,validade,generateRandomNumericCode(),precoDeCompra,dataDaCompra], (error, results) => {
                if (error) {
                    console.error(error)
                    return
                }
                accept(results.insertCodigo)
            })
        })
    },
    updateProduto: (produto,validade,precoDeCompra,dataDaCompra,codigo) => {
        return new Promise((accept, reject) => {
            db.query(`UPDATE products SET produto=?,validade=?,precoDeCompra=?,dataDaCompra=?  WHERE codigo=?`,
             [produto,validade,precoDeCompra,dataDaCompra,codigo], (error, results) => {
                if (error) {
                    console.error(error)
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
                    console.error(error)
                    return
                }
                accept(results)
            })
        })
    }

    
}