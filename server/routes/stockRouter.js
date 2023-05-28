const Router = require('express');
const router = new Router;
const stockController = require('../controllers/stockController');


router.post('/create', stockController.create)

router.get('/getAll', stockController.getAll)

router.delete('/delete', stockController.delete)

module.exports = router;