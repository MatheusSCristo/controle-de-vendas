import express from'express'
import VendasController from '../controllers/VendasController.js';

const router = express.Router();

router.get('/vendas', VendasController.getVendas)
router.post('/venda', VendasController.postVenda)
router.delete('/venda/:codigo', VendasController.deleteVenda)
router.put('/venda/:codigo', VendasController.updateVenda)


export default router