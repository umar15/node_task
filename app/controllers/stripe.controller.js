const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Orders = require("../models/orders.model");
const YOUR_DOMAIN = "http://localhost:3000";

let stripePay = (req, res) => {
	res.render("pages/stripe");
};

let payment = async (req, res) => {
	const { product } = req.body;
	const session = await stripe.checkout.sessions.create({
		payment_method_types: ["card"],
		line_items: [
			{
				price_data: {
					currency: "pkr",
					product_data: {
						name: product.name,
						images: [product.image],
					},
					unit_amount: product.amount * 100,
				},
				quantity: product.quantity,
			},
		],
		mode: "payment",
		success_url: `${YOUR_DOMAIN}/stripe/completed`,
		cancel_url: `${YOUR_DOMAIN}/stripe/cancel`,
	});
	const order = {
		id: Math.floor(Math.random() * 99999),
		product_id: product.pId,
		stripe_id: session.id,
		status: session.status,
		total: session.amount_total,
	};
	Orders.create(order)
		.then((data) => {
			console.log("data: ", data);
		})
		.catch((err) => {
			console.log("Error in creating order: ", err);
		});
	res.json({ id: session.id });
};

let paymentCompleted = (req, res) => {
	res.render("pages/complete");
};
let paymentCancel = (req, res) => {
	res.render("pages/cancel");
};

module.exports = { stripePay, payment, paymentCompleted, paymentCancel };
