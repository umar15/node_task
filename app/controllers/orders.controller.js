const Orders = require("../models/orders.model");

let getOrders = (req, res) => {
	res.send("Orders");
};

let createOrder = (req, res) => {
	console.log("createOrder");
	const order = {
		id: req.body.id,
		product_id: req.body.product_id,
		stripe_id: req.body.stripe_id,
		totla: req.body.total,
		status: req.body.status,
	};
	Orders.create(order)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			console.log("Error");
			res.send(err);
		});
};

module.exports = {
	getOrders,
	createOrder,
};
