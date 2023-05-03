const Router = require('express');
const router = new Router();
const providerController = require('../controllers/providerController');


router.post('/create', providerController.create)
router.post('/delete', providerController.delete)


module.exports = router;