const Router = require('express');
const router = new Router();
const categoriesRouter = require('./categoriesRouter');
const stockItemController = require('./stockItemController');
const productRouter = require('./productRouter');
const providerRouter = require('./providerRouter');
const stockRouter = require('./stockRouter');

router.use('/categories', categoriesRouter);
router.use('/stockItem', stockItemController);
router.use('/provider', providerRouter);
router.use('/product', productRouter);
router.use('/stock', stockRouter);


module.exports = router;