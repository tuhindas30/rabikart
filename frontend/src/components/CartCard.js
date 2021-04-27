import axios from "axios";
import { useCart } from "../contexts/cart-context";
import { useToast } from "../contexts/toast-context";

const CartCard = ({ id, item: { product, quantity } }) => {
	const { cartDispatch } = useCart();
	const { setToast } = useToast();

	const handleIncQty = async (id, productId, qty) => {
		const { data } = await axios.post(
			`https://rabikart.tuhindas5.repl.co/cart/${id}`,
			{
				item: {
					product: productId,
					quantity: qty + 1,
				},
			}
		);
		if (data.status === "SUCCESS")
			cartDispatch({ type: "INC_QTY", payload: { cart: data.data } });
	};

	const handleDecQty = async (id, productId, qty) => {
		const { data } = await axios.post(
			`https://rabikart.tuhindas5.repl.co/cart/${id}`,
			{
				item: {
					product: productId,
					quantity: qty - 1,
				},
			}
		);
		if (data.status === "SUCCESS")
			cartDispatch({ type: "DEC_QTY", payload: { cart: data.data } });
	};

	const handleRemoveCartItem = async (id) => {
		const { data } = await axios.delete(
			`https://rabikart.tuhindas5.repl.co/cart/${id}`
		);
		if (data.status === "SUCCESS")
			cartDispatch({
				type: "REMOVE_ITEM",
				payload: { items: data.data, setToast },
			});
	};

	return (
		<div className="card cart-card">
			<div className="cart-card-content-container">
				<div className="cart-card-left">
					<div>
						<img src={product.imageUrl} alt="" />
					</div>
					<div className="qty-changer">
						<button
							onClick={() => handleIncQty(id, product._id, quantity)}
							className="btn primary btn-small">
							+
						</button>{" "}
						<span>Qty: {quantity}</span>{" "}
						<button
							onClick={() => handleDecQty(id, product._id, quantity)}
							className="btn primary btn-small"
							disabled={quantity <= 1 ? true : false}>
							-
						</button>
					</div>
				</div>
				<div className="card-content cart-card-content">
					<p>{product.modelName}</p>
					{product.avgRating >= 4 && (
						<div className="rating--container">
							<small className="star-num rating-badge rating-h">
								{product.avgRating} <i className="bi bi-star-fill"></i>
							</small>{" "}
							({product.noOfRatings})
						</div>
					)}
					{product.avgRating >= 2 && product.avgRating < 4 && (
						<div className="rating--container">
							<span className="star-num rating-badge rating-m">
								<small>{product.avgRating}</small>{" "}
								<i className="bi bi-star-fill"></i>
							</span>{" "}
							({product.noOfRatings})
						</div>
					)}
					{product.avgRating >= 0 && product.avgRating < 2 && (
						<div className="rating--container">
							<span className="star-num rating-badge rating-l">
								<small>{product.avgRating}</small>{" "}
								<i className="bi bi-star-fill"></i>
							</span>{" "}
							({product.noOfRatings})
						</div>
					)}
					<div>
						<strong style={{ fontSize: "1rem" }}>
							₹{product.discountedPrice}
						</strong>{" "}
						{product.discount ? <strike>{product.price}</strike> : null}{" "}
						{product.discount ? <span>{product.discount}% off</span> : null}
					</div>
				</div>
			</div>
			<button
				onClick={() => handleRemoveCartItem(id)}
				// cartDispatch({
				// 	type: "REMOVE_ITEM",
				// 	payload: { id: product._id, setToast },
				// })

				className="btn icon">
				<i className="bi bi-trash-fill"></i>
				<span style={{ padding: "0 .5rem" }}>Remove</span>
			</button>
		</div>
	);
};
export default CartCard;
