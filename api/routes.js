import express from'express'
import CarroController from './controllers/CarroController.js'

const router = express.Router();

router.get('/carros', CarroController.buscarTodos)
router.get('/carros/:codigo', CarroController.buscarUm)
router.post('/carro',CarroController.inserir)
router.put('/carros/:codigo',CarroController.alterar)
router.delete('/carros/:codigo',CarroController.delete)


export default router