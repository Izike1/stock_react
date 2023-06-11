const Router = require('express');
const router = new Router();
const ProductController = require('../controllers/ProductController');


router.post('/create', ProductController.create)
router.post('/change', ProductController.change)

router.get('/getAll', ProductController.getAll)

router.delete('/delete', ProductController.delete)

module.exports = router;