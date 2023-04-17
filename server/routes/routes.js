const Router = require('express');
const router = new Router();
const customerRouter = require('./customerRouter');
const employmentRouter = require('./employmentRouter');
const orderRouter = require('./orderRouter');
const providerRouter = require('./providerRouter');
const stockRouter = require('./stockRouter');

router.use('/employment', employmentRouter);
router.use('/customer', customerRouter);
router.use('/provider', providerRouter);
router.use('/order', orderRouter);
router.use('/stock', stockRouter);


module.exports = router;