const Router = require('express');
const router = new Router();
const StockItemsController = require('../controllers/stockItemControler');

router.post('/create', StockItemsController.create)

router.get('/getAll', StockItemsController.getAll)

router.delete('/delete', StockItemsController.delete)


module.exports = router;