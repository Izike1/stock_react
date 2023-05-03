const { Employee } = require('../models/models');
const ApiError = require('../errors/ApiErrors');
const bcrypt = require('bcrypt');
class EmployeeController {
    async login(req, res) {

    }

    async create(req, res) {
        const { email, password, name, surname, job_title, date_of_employment, salary } = req.body;
        const hashPassword = bcrypt.hash(password, 10);

        const employee = await Employee.create({ email, password: hashPassword, name, surname, job_title, date_of_employment, salary });

        return res.json(employee);
    }

    async delete(req, res) {

    }

    async getAll(req, res) {

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