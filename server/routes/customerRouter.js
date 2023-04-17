const Router = require('express');
const router = new Router();

router.get('/', (req, res) => {
    res.send({ message: 'OK' })
})
router.get('/')


module.exports = router;