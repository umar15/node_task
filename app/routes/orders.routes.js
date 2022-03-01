module.exports = (app) => {
	const Orders = require("../controllers/orders.controller");
	const router = require("express").Router();

	router.get("/", Orders.getOrders);
	router.post("/createorder", Orders.createOrder);
	app.use("/orders", router);
};
