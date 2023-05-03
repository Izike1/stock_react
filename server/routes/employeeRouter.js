const Router = require('express');
const router = new Router();
const employeeController = require('../controllers/employeeControler');

router.post('/login', employeeController.login)
router.post('/check', employeeController.check)
router.post('/create', employeeController.create)


module.exports = router;