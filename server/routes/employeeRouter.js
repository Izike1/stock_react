const Router = require('express');
const router = new Router();
const employeeController = require('../controllers/employeeControler');

router.post('/login', employeeController.login)
router.post('/check', employeeController.check)
router.get('/')


module.exports = router;