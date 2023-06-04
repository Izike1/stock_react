const { Order } = require('../models/models')
const ApiError = require('../errors/ApiErrors')

class OrderController {
    async create(req, res) {
        try {
            const { status, data_order, description } = req.body;
            const order = await Order.create({ status, data_order, description });

            return res.json(order)
        } catch (e) {
            console.error('Error create order', e)
        }
    }

    async change(req, res) {
        try {
            const { id } = req.query;
            const { status, description, data_order } = req.body;

            if (!status || !description || !data_order) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            const order = await Order.update({ status, description, data_order }, { where: { id: id } });

            if (!order) {
                return res.status(404).json({ error: 'Order not found' });
            }

            return res.json(order);
        } catch (e) {
            console.error("Error updating order", e);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    async delete(req, res, next) {
        const { id } = req.query;

        if (!id) {
            next(ApiError.badRequest('Error id'))
        }
        await Order.destroy({ where: { id: id } })
        return res.json('Order delete')
    }

    async getAll(req, res) {
        const { id } = req.query;
        let order;
        if (!id) {
            order = await Order.findAll();
            return res.json(order)
        }
        order = await Order.findAll({ where: { id: id } });
        return res.json(order)
    }
}

module.exports = new OrderController();