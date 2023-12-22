import express from'express'
import ClienteController from '../controllers/ClienteController.js'

const router = express.Router();

router.get('/clientes', ClienteController.getClientes)
router.get('/cliente/:cpf', ClienteController.getCliente)
router.post('/cliente', ClienteController.postCliente)
router.put('/cliente/:cpf', ClienteController.updateCliente)
router.delete('/cliente/:cpf', ClienteController.deleteCliente)


export default router