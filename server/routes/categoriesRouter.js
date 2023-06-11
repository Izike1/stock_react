const Router = require('express');
const router = new Router();
const categoriesController = require('../controllers/categoriesController');

router.post('/create', categoriesController.create)
router.post('/change', categoriesController.change)

router.get('/getAll', categoriesController.getAll)

router.delete('/delete', categoriesController.delete)


module.exports = router;