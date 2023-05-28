const { Order } = require('../models/models')
const ApiError = require('../errors/ApiErrors')

class OrderController {
    async create(req, res) {
        const { status, data_order } = req.body;
        const { order } = Order.create({ status, data_order });
        return res.json(order)
    }

    async delete(req, res, next) {
        const { id } = req.query;

        if (!id) {
           next(ApiError.badRequest('Error id'))
        }
         await Order.destroy({where: { id: id }})
        return res.json()
    }

    async getAll(req, res) {
        const { id } = req.query;
        let order;
        if (!id) {
            order = await Order.findAll();
            return res.json(order)
        }
        order = await Order.findAll({where: { id: id }});
        return res.json(order)
    }
}

module.exports = new OrderController();