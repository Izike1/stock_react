const ApiError = require('../errors/ApiErrors')
class EmployeeController {
    async login(req, res) {

    }

    async create(req, res) {

    }

    async delete(req, res) {

    }

    async getAll(req, res) {

    }

    async check(req, res, next) {
        const { id } = req.query;
        if (!id) {
            next(ApiError.badRequest(`Не задан ID`))
        }
        res.json(id)
    }
}
module.exports = new EmployeeController();