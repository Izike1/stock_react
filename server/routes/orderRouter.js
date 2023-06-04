const Router = require('express');
const router = new Router();
const orderController = require('../controllers/orderController');


router.post('/create', orderController.create)
router.post('/change', orderController.change)

router.get('/getAll', orderController.getAll)

router.delete('/delete', orderController.delete)

module.exports = router;