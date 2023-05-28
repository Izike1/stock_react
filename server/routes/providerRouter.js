const Router = require('express');
const router = new Router();
const providerController = require('../controllers/providerController');


router.post('/create', providerController.create)

router.get('/getAll', providerController.getAll);

router.delete('/delete', providerController.delete)


module.exports = router;