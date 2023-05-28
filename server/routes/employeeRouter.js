const Router = require('express');
const router = new Router();
const employeeController = require('../controllers/employeeControler');

router.post('/login', employeeController.login)
router.post('/check', employeeController.check)
router.post('/create', employeeController.create)

router.get('/getAll', employeeController.getAll)

router.delete('/delete', employeeController.delete)


module.exports = router;