const { Categories } = require('../models/models')
const ApiError = require('../errors/ApiErrors')
class CategoriesController {
    async create(req, res) {
        try {
            const { name } = req.body;

            if (!name) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            const category = await Categories.create({ name });

            return res.json(category);
        } catch (e) {
            console.error('Error creating category', e);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async change(req, res) {
        try {
            const { id } = req.query;
            const { name } = req.body;

            if (!name) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            const category = await Categories.findByPk(id);

            if (!category) {
                return res.status(404).json({ error: 'Category not found' });
            }

            category.name = name;
            await category.save();

            return res.json(category);
        } catch (e) {
            console.error("Error updating category", e);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    async delete(req, res, next) {
        const { id } = req.query;

        if (!id) {
            return next(ApiError.badRequest('Missing category id'));
        }

        try {
            await Categories.destroy({ where: { id } });
            return res.json('Category deleted');
        } catch (error) {
            console.error('Error deleting category', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async getAll(req, res) {
        const { id } = req.query;

        try {
            let categories;

            if (!id) {
                categories = await Categories.findAll();
            } else {
                categories = await Categories.findAll({ where: { id: id } });
            }

            return res.json(categories);
        } catch (error) {
            console.error('Error retrieving categories', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = new CategoriesController();