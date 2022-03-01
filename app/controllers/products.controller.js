const Products = require("../models/products.model");

let getProducts = (req, res) => {
	console.log("getProducts");
	Products.findAll()
		.then((data) => {
			res.render("pages/index", { products: data });
		})
		.catch((err) => {
			res.send(err);
		});
};

let createProduct = (req, res) => {
	console.log("createProduct");
	const product = {
		id: req.body.id,
		title: req.body.title,
		description: req.body.description,
		image: req.body.image,
		price: req.body.price,
	};
	Products.create(product)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			console.log("Error");
			res.status(500).send({
				message: "Error while retrieving Products",
			});
		});
};

let getProduct = (req, res) => {
	const id = req.params.id;
	Products.findByPk(id)
		.then((data) => {
			if (data) {
				res.render("pages/product", { product: data.dataValues });
			} else {
				res.status(404).send({
					message: `Cannot find Product with id=${id}.`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: "Error retrieving Product with id=" + id,
			});
		});
};

module.exports = {
	getProducts,
	createProduct,
	getProduct,
};
