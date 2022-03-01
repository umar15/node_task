const { Sequelize } = require("sequelize");
const sequelize = require("../../config/database");

const Products = sequelize.define("products", {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
	},
	title: Sequelize.STRING,
	description: Sequelize.TEXT,
	image: Sequelize.STRING,
	price: Sequelize.INTEGER,
});
module.exports = Products;
