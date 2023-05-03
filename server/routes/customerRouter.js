const Router = require('express');
const router = new Router();
const customerController = require('../controllers/customerController');

router.post('/create', customerController.create)
router.get('/getAll', customerController.getAll)
router.delete('/delete', customerController.delete)


module.exports = router;