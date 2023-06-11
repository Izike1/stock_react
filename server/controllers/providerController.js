const { Providers, Products} = require('../models/models');
const ApiError = require('../errors/ApiErrors');
class ProviderController {
    async create(req, res) {
        try {
            const { name, address, telephone } = req.body;
            const provider = await Providers.create({ name, address, telephone });

            return res.json(provider);
        } catch (e) {
            console.error('Error create provider', e)
        }

    }

    async change(req, res) {
        try {
            const { id } = req.query;
            const { name, address, telephone } = req.body;

            if ( !name || !address || !telephone ) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            const provider = await Products.update({ name, address, telephone }, { where: { id: id } });

            if (!provider) {
                return res.status(404).json({ error: 'Product not found' });
            }

            return res.json(provider);
        } catch (error) {
            console.error('Error updating provider', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    async delete(req, res, next) {
        const { id } = res.query;

        if (!id) {
            next(ApiError.badRequest('Error delete'))
        }
        await Providers.destroy({ where: { id: id } });
        return res.json('Delete access')
    }

    async getAll(req, res) {
        const { id } = req.query;
        let provider;
        if (!id) {
            provider = await Providers.findAll();
            return res.json(provider);
        }
        provider = await Providers.findAll({where: { id: id }});
        return res.json(provider)
    }
}

module.exports = new ProviderController();