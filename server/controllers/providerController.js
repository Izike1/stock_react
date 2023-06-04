const { Provider } = require('../models/models');
const ApiError = require('../errors/ApiErrors');
class ProviderController {
    async create(req, res) {
        try {
            const { name_provider, address, telephone, contact_person } = req.body;
            const provider = await Provider.create({ name_provider, address, telephone, contact_person });

            return res.json(provider);
        } catch (e) {
            console.error('Error create provider', e)
        }

    }

    async delete(req, res, next) {
        const { id } = res.query;

        if (!id) {
            next(ApiError.badRequest('Error delete'))
        }
        await Provider.destroy({ where: { id: id } });
        return res.json('Delete access')
    }

    async getAll(req, res) {
        const { id } = res.query;
        let provider;
        if (!id) {
            provider = await Provider.findAll();
            return res.json(provider);
        }
        provider = await Provider.findAll({where: { id: id }});
        return res.json(provider)
    }
}

module.exports = new ProviderController();