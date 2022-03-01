module.exports = (app) => {
	const Products = require("../controllers/products.controller");
	const router = require("express").Router();

	router.get("/", Products.getProducts);
	router.get("/products/:id", Products.getProduct);
	router.post("/products/create", Products.createProduct);

	app.use("/", router);
};
