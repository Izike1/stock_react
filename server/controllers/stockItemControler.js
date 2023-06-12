const { StockItems } = require('../models/models');

class StockItemsController {

    async create(req, res) {
        try {

            const { quantity } = req.body;
            const stockItem = StockItems.create({ quantity })
            return res.json(stockItem);

        } catch (e) {
            console.error('Error create employee', e)
        }
    }

    async delete(req, res) {
        const { id } = req.query;

        if (id) {
            await StockItems.destroy({ where: { id: id } });
        }
        return res.json({ message: 'Customer delete' })
    }

    async getAll(req, res) {
        const { id } = req.query;
        let stockItems;
        if (!id) {
            stockItems = await StockItems.findAll();
            return res.json(stockItems)
        }
        stockItems = await StockItems.findAll({ where: { id: id } })
        return res.json(stockItems)
    }

}
module.exports = new StockItemsController();