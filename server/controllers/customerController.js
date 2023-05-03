const { Customer } = require('../models/models');

class CustomerController {
    async create(req, res) {
        const { name, telephone, description_order, quantity_order } = req.body;
        const customer = await Customer.create({ name, telephone, description_order, quantity_order });

        return res.json(customer);
    }

    async delete(req, res) {
        const { id } = req.query;

        if (id) {
            await Customer.destroy({ where: { id: id } });
        }
        return res.json({ message: 'Customer delete' })
    }

    async getAll(req, res) {
        const { id } = req.query;
        let customers;
        if (!id) {
            customers = await Customer.findAll();
        }
        customers = await Customer.findAll({ where: { id: id } });
        return res.json(customers)
    }
}

module.exports = new CustomerController();