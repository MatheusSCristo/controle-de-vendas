import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import clienteRoutes from './routes/clientes.js';
import produtosRoutes from './routes/produtos.js';
import vendasRoutes from './routes/vendas.js';

dotenv.config({ path: 'C:/Users/Matheus/Documents/Project/ControleDeEstoque/api/variaveis.env' });

const server = express();

server.use(cors());
server.use(express.urlencoded({ extended: false }));
server.use(express.json()); 
server.use('/api', clienteRoutes);
server.use('/api', produtosRoutes);
server.use('/api', vendasRoutes);

server.listen(process.env.PORT, () => {
    console.log('Servidor rodando em', process.env.PORT);
});
