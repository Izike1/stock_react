const { Order } = require('../models/models')
const ApiError = require('../errors/ApiErrors')

class OrderController {
    async create(req, res) {
        const { status, data_order } = req.body;
        const { order } = Order.create({ status, data_order });
        return res.json(order)
    }

    async delete(req, res) {

    }

    async getAll(req, res) {
        const orders = await Order.findAll();
        return res.json(orders)
    }
}

module.exports = new OrderController(); Order