const Router = require('express');
const router = new Router();
const customerController = require('../controllers/customerController');

router.get('/', customerController.create)
router.get('/')


module.exports = router;