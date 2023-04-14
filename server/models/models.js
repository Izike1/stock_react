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

const Inventory = sequelize.define('inventory', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name_stock: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
    quantity: { type: DataTypes.STRING }
})

const Provider = sequelize.define('provider', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name_provider: { type: DataTypes.STRING, allowNull: false },
    adress: { type: DataTypes.STRING, allowNull: false },
    telephone: { type: DataTypes.STRING, allowNull: false },
    contact_person: { type: DataTypes.STRING, allowNull: false }
})

const OrderInventory = sequelize.define('order_inventory', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
})

Employee.hasMany(Order)
Order.belongsTo(Employee)

Provider.hasMany(Order)
Order.belongsTo(Provider)

Inventory.belongsToMany(Order, { through: OrderInventory })
Order.belongsToMany(Inventory, { through: OrderInventory })

module.exports = {
    Employee,
    Order,
    Inventory,
    Provider,
    OrderInventory
}