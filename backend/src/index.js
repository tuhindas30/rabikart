const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const { initializeMongoDB } = require("./db/db.connect");
const insertintodb = require("./routes/insertintodb.router");
const productRouter = require("./routes/products.router");
const cartRouter = require("./routes/cart.router");
const wishlistRouter = require("./routes/wishlist.router");
const handleUndefinedRoutes = require("./middlewares/routeNotFound");

const PORT = 8000;
const URI = process.env.MONGODB_URI;

const app = express();
app.use(cors());
app.use(bodyParser.json());
initializeMongoDB(URI);
app.get("/", (req, res) => {
	res.json({ success: true });
});
app.use("/insert", insertintodb);
app.use("/products", productRouter);
app.use("/cart", cartRouter);
app.use("/wishlist", wishlistRouter);
app.use(handleUndefinedRoutes);

app.listen(process.env.PORT || PORT, () => {
	console.log("server started ar port:", PORT);
});
