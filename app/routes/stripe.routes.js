module.exports = (app) => {
	const StripeController = require("../controllers/stripe.controller");
	const router = require("express").Router();

	router.post("/payment", StripeController.payment);
	router.get("/completed", StripeController.paymentCompleted);
	router.get("/cancel", StripeController.paymentCancel);

	app.use("/stripe", router);
};
