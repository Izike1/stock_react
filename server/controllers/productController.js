const { Products, Categories, Providers, StockItems } = require('../models/models');

class ProductController {
    async create(req, res) {
        try {
            const { name, description, price, quantity, providerId, categoryId, stockId } = req.body;

            if (!name || !description || !price || !quantity || !providerId || !categoryId || !stockId) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            const provider = await Providers.findByPk(providerId);
            if (!provider) {
                return res.status(404).json({ error: 'Provider not found' });
            }

            const category = await Categories.findByPk(categoryId);
            if (!category) {
                return res.status(404).json({ error: 'Category not found' });
            }

            const product = await Products.create({
                name,
                description,
                price,
                quantity,
                providerId,
                categoryId
            });

            await StockItems.create({
                quantity,
                stockId,
                productId: product.dataValues.id
            })

            return res.json(product);
        } catch (error) {
            console.error('Error creating product', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async change(req, res) {
        try {
            const { id } = req.query;
            const { name, price, description, quantity } = req.body;

            if (!name || !price || !description || !quantity) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            const product = await Products.update({ name, price, description, quantity }, { where: { id: id } });

            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }

            return res.json(product);
        } catch (error) {
            console.error('Error updating product', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    async delete(req, res) {
        const { id } = req.query;

        if (id) {
            await Products.destroy({ where: { id: id } });
        }
        return res.json({ message: 'Product delete' })
    }

    async getAll(req, res) {
        const { id } = req.query;
        let products;
        if (!id) {
            products = await Products.findAll();
            return res.json(products)
        }
        products = await Products.findAll({ where: { id: id } });
        return res.json(products)
    }
}

module.exports = new ProductController();