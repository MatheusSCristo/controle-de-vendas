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
    getVendas: () => {
        return new Promise((accept, reject) => {
            db.query('SELECT * FROM vendas', (error, results) => {
                if (error) {
                    console.error(error)
                    return
                }
                accept(results)
            })
        })
    },
    
    postVenda: (produto,quantidade,precoDeVenda,dataDaVenda,cliente,status) => {
        return new Promise((accept, reject) => {
            db.query(`INSERT INTO vendas (produto,quantidade,precoDeVenda,dataDaVenda,cliente,status,codigo) VALUES (?,?,?,?,?,?,?)`,
             [produto,quantidade,precoDeVenda,dataDaVenda,cliente,status,generateRandomNumericCode()], (error, results) => {
                if (error) {
                    console.error(error)
                    return
                }
                accept(results.insertCodigo)
            })
        })
    },
    updateVenda: (codigo,status) => {
        return new Promise((accept, reject) => {
            db.query(`UPDATE vendas SET status=? WHERE codigo=?`,
             [status,codigo], (error, results) => {
                if (error) {
                    console.error(error)
                    return
                }
                accept(results)
            })
        })
    },
    
    deleteVenda: (codigo) => {
        return new Promise((accept, reject) => {
            db.query(`DELETE FROM vendas WHERE codigo=?`, [codigo], (error, results) => {
                if (error) {
                    console.error(error)
                    return
                }
                accept(results)
            })
        })
    }

    
}