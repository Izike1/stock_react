const Router = require('express');
const router = new Router();
const orderController = require('../controllers/orderController');


router.post('/create', orderController.create)


router.get('/getAll', orderController.getAll)
router.get('/:id')

router.delete('/delete', orderController.delete)

module.exports = router;