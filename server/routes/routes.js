const Router = require('express');
const router = new Router();
const customerRouter = require('./customerRouter');
const employeeRouter = require('./employeeRouter');
const orderRouter = require('./orderRouter');
const providerRouter = require('./providerRouter');
const stockRouter = require('./stockRouter');

router.use('/employee', employeeRouter);
router.use('/customer', customerRouter);
router.use('/provider', providerRouter);
router.use('/order', orderRouter);
router.use('/stock', stockRouter);


module.exports = router;