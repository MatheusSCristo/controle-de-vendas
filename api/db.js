import dotenv from 'dotenv';
import mysql from 'mysql'

dotenv.config({path:'C:/Users/Matheus/Documents/Project/ControleDeEstoque/api/variaveis.env'})

const connection=mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_NAME,
})


connection.connect((err)=>{
    if(err) throw err
    console.log('Conectado ao banco de dados:',process.env.DB_NAME)

})

export default connection