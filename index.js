const express = require("express");
const path = require("path");
require("dotenv").config();
const stripe = require("stripe")(
	"sk_test_51IWQUwH8oljXErmds28KftkL6o6jYIcPgYbBdfEmCPSuAlIh0fgoS4NADcCmsIZbdQ3p5nbAeCOcGkSmo38U9BIe00BdOenrqo"
);
const db = require("./config/database");

const app = express();
app.use(express.json());
app.set("view engine", "ejs");

db.authenticate()
	.then(() => {
		console.log("Database connected!");
		db.sync();
	})
	.catch((err) => console.log("Error: ", err));

require("./app/routes/products.routes")(app);
require("./app/routes/orders.routes")(app);

app.get("/completed", (req, res) => {
	res.render("pages/complete");
});
app.get("/cancel", (req, res) => {
	res.render("pages/cancel");
});

app.post("/stripe", async (req, res) => {
	const session = await stripe.checkout.sessions.create({
		line_items: [
			{
				// Provide the exact Price ID (for example, pr_1234) of the product you want to sell
				price: 10,
				quantity: 1,
			},
		],
		mode: "payment",
		success_url: `http://localhost:3000/completed`,
		cancel_url: `http://localhost:3000/cancel`,
	});

	res.redirect(303, session.url);
});

app.listen(process.env.PORT, () => {
	console.log(`Server listening at http://${process.env.HOST}:${process.env.PORT}`);
});
