const { Provider } = require('../models/models');

class ProviderController {
    async create(req, res) {
        const { name_provider, address, telephone, contact_person } = req.body;
        const provider = Provider.create({ name_provider, address, telephone, contact_person });
        return res.json(provider);

    }

    async delete(req, res) {
        const { id } = req.id;
        const deleteItem = Provider.delete({ id });
        return res.json(deleteItem)
    }

    async getAll(req, res) {

    }
}

module.exports = new ProviderController();