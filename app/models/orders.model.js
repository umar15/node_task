const { Sequelize } = require("sequelize");
const sequelize = require("../../config/database");

const Orders = sequelize.define("orders", {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	product_id: Sequelize.INTEGER,
	stripe_id: Sequelize.STRING,
	status: Sequelize.STRING,
	total: Sequelize.INTEGER,
});
module.exports = Orders;
