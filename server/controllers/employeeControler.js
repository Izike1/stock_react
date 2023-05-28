const { Employee, Customer} = require('../models/models');
const ApiError = require('../errors/ApiErrors');
const bcrypt = require('bcrypt');
const {where} = require("sequelize");
class EmployeeController {
    async login(req, res) {

    }

    async create(req, res) {
        try {
            const { email, password, name, surname, job_title, date_of_employment, salary } = req.body;
            const hashPassword = await bcrypt.hash(password, 10);
            const employee = await Employee.create({ email, password: hashPassword, name, surname, job_title, date_of_employment, salary });

            return res.json(employee);
        } catch (e) {
            console.error('Error create employee', e)
        }
    }

    async delete(req, res) {
        const { id } = req.query;

        if (id) {
            await Employee.destroy({ where: { id: id } });
        }
        return res.json({ message: 'Customer delete' })
    }

    async getAll(req, res) {
        const { id } = req.query;
        let employee;
        if (!id) {
            employee = await Employee.findAll();
            return res.json(employee)
        }
        employee = await Employee.findAll( {where: { id: id }})
        return res.json(employee)
    }

    async check(req, res, next) {
        const { id } = req.query;
        if (!id) {
            next(ApiError.badRequest("Не задан ID"))
        }
        res.json(id)
    }
}
module.exports = new EmployeeController();