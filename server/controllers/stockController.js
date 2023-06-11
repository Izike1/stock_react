const { Stock } = require('../models/models');
const ApiError = require("../errors/ApiErrors");

class StockController {
    async create(req, res) {
        try {
            const { name, address } = req.body;
            const stock = await Stock.create({ name, address });

            return res.json(stock)
        } catch (e) {
            console.error('Error create stock', e)
        }
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