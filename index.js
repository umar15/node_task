const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const db = require("./config/database");

const app = express();
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "views")));
app.use(cors());

db.authenticate()
	.then(() => {
		console.log("Database connected!");
		db.sync();
	})
	.catch((err) => console.log("Error: ", err));

require("./app/routes/products.routes")(app);
require("./app/routes/orders.routes")(app);
require("./app/routes/stripe.routes")(app);

app.listen(process.env.PORT, () => {
	console.log(`Server listening at http://${process.env.HOST}:${process.env.PORT}`);
});
