import express from'express'
import VendasController from '../controllers/VendasController.js';

const router = express.Router();

router.get('/vendas', VendasController.getVendas)
router.post('/venda', VendasController.postVenda)
router.delete('/venda/:id', VendasController.deleteVenda)


export default router