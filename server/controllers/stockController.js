const { Stocks } = require('../models/models');
const ApiError = require("../errors/ApiErrors");

class StockController {
    async create(req, res) {
        try {
            const { name, address } = req.body;
            const stock = await Stocks.create({ name, address });



            return res.json(stock)
        } catch (e) {
            console.error('Error create stock', e)
        }
    }

    async delete(req, res, next) {
        const { id } = req.query;

        if (!id) {
            next(ApiError.badRequest('Error delete'))
        }
        await Stocks.destroy({ where: { id: id } });
        return res.json('Delete access')
    }

    async getAll(req, res) {
        const { id } = req.query;
        let stock;
        if (!id) {
            stock = await Stocks.findAll();
            return res.json(stock);
        }
        stock = await Stocks.findAll({ where: { id: id } });
        return res.json(stock)
    }
}

module.exports = new StockController();