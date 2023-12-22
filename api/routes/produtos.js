import express from'express'
import ProdutosController from '../controllers/ProdutosController.js'

const router = express.Router();

router.get('/produtos', ProdutosController.getProdutos)
router.get('/produtos/:codigo', ProdutosController.getProduto)
router.post('/produto', ProdutosController.postProduto)
router.put('/produto/:codigo', ProdutosController.updateProduto)
router.delete('/produto/:codigo', ProdutosController.deleteProduto)


export default router