const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const Products = sequelize.define('products', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    price: { type: DataTypes.DECIMAL, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false }
})

const Categories = sequelize.define('categories', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false }
})

const Providers = sequelize.define('provider', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
    telephone: { type: DataTypes.STRING, allowNull: false }
})

const Stocks = sequelize.define('stock', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    address: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false }
})

const StockItems = sequelize.define('stock_items', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    quantity: { type: DataTypes.INTEGER }
})

Categories.hasMany(Products);
Products.belongsTo(Categories, { foreignKey: 'categoryId' });

Providers.hasMany(Products);
Products.belongsTo(Providers, { foreignKey: 'providerId' });

Stocks.belongsToMany(Products, { through: StockItems, foreignKey: 'stockId' });
Products.belongsToMany(Stocks, { through: StockItems, foreignKey: 'productId' });

module.exports = {
    Products,
    Stocks,
    Categories,
    Providers,
    StockItems
}