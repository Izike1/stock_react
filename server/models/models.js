const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const Employee = sequelize.define('employee', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    surname: { type: DataTypes.STRING, allowNull: false },
    job_title: { type: DataTypes.STRING, allowNull: false },
    date_of_employment: { type: DataTypes.DATE, allowNull: false },
    salary: { type: DataTypes.INTEGER, allowNull: false }
})

const Order = sequelize.define('order', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    data_order: { type: DataTypes.DATE, allowNull: false },
    id_employee: { type: DataTypes.INTEGER, allowNull: false },
    id_provider: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false }
})

const Customer = sequelize.define('customer', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name_stock: { type: DataTypes.STRING },
    description_order: { type: DataTypes.STRING },
    quantity_order: { type: DataTypes.STRING }
})

const Provider = sequelize.define('provider', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name_provider: { type: DataTypes.STRING, allowNull: false },
    adress: { type: DataTypes.STRING, allowNull: false },
    telephone: { type: DataTypes.STRING, allowNull: false },
    contact_person: { type: DataTypes.STRING, allowNull: false }
})

const Stock = sequelize.define('stock', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false }
})

const StockOrder = sequelize.define('stock_order', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
})

Employee.hasMany(Order)
Order.belongsTo(Employee)

Provider.hasMany(Order)
Order.belongsTo(Provider)

Customer.hasMany(Order)
Order.belongsTo(Customer)

Stock.belongsToMany(Order, { through: StockOrder })
Order.belongsToMany(Stock, { through: StockOrder })

module.exports = {
    Employee,
    Order,
    Customer,
    Provider,
    Stock
}