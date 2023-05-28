const { Stock, Provider} = require('../models/models');
const ApiError = require("../errors/ApiErrors");

class StockController {
    async create(req, res) {
        const { name, address } = req.body;
        const stock = Stock.create({ name, address });
        return res.json(stock)
    }

    async delete(req, res, next) {
        const { id } = res.query;

        if (!id) {
            next(ApiError.badRequest('Error delete'))
        }
        await Stock.destroy({ where: { id: id } });
        return res.json('Delete access')
    }

    async getAll(req, res) {
        const { id } = res.query;
        let stock;
        if (!id) {
            stock = await Stock.findAll();
            return res.json(stock);
        }
        stock = await Stock.findAll({where: { id: id }});
        return res.json(stock)
    }
}

module.exports = new StockController();