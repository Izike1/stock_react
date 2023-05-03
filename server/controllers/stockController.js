const { Stock } = require('../models/models');

class StockController {
    async create(req, res) {
        const { name, address } = req.body;
        const stock = Stock.create({ name, address });
        return res.json(stock)
    }

    async delete(req, res) {

    }

    async getAll(req, res) {
        const stocks = await Stock.findAll();
        return res.json(stocks);

    }
}

module.exports = new StockController();