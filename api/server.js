import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import routes from './routes.js';

dotenv.config({ path: 'C:/Users/Matheus/Documents/Project/CadastroCarro/api/variaveis.env' });

const server = express();

server.use(cors());
server.use(express.urlencoded({ extended: false }));
server.use(express.json()); 
server.use('/api', routes);

server.listen(process.env.PORT, () => {
    console.log('Servidor rodando em', process.env.PORT);
});
