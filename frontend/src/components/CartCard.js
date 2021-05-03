import axios from "axios";
import { useCart } from "../contexts/cart-context";
import { useToast } from "../contexts/toast-context";
import "../assets/css/CartCard.css";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const CartCard = ({ id, item: { product, quantity }, setLoading }) => {
	const { cartDispatch } = useCart();
	const { setToast } = useToast();

	const handleChangeQty = async (e, productId) => {
		setLoading(true);
		const { data } = await axios.post(
			`https://rabikart.tuhindas5.repl.co/cart/${id}`,
			{
				item: {
					product: productId,
					quantity: e.target.value,
				},
			}
		);
		setLoading(false);
		if (data.status === "SUCCESS")
			cartDispatch({ type: "INC_QTY", payload: { cart: data.data } });
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
			<div className="card-content cart-card-content--container">
				<div className="cart-card-content">
					<Link to={`/product/${product._id}`} className="link">
						<p>{product.modelName}</p>
						<small style={{ color: "var(--rb-dark-grey)" }}>
							Seller: {product.seller}
						</small>
						<div>
							<span style={{ fontSize: "1.5rem" }}>
								₹{product.discountedPrice}
							</span>{" "}
							<small>
								{product.discount ? <strike>{product.price}</strike> : null}{" "}
								{product.discount ? (
									<span style={{ color: "var(--rb-green)" }}>
										{product.discount}% off
									</span>
								) : null}
							</small>
						</div>
					</Link>
				</div>
				<div className="cart-img--container">
					<img className="image" src={product.imageUrl} alt="" />
					<div className="qty-changer">
						<select
							value={quantity}
							onChange={(e) => handleChangeQty(e, product._id)}>
							<option value="1">Qty: 1</option>
							<option value="2">Qty: 2</option>
							<option value="3">Qty: 3</option>
							<option value="4">Qty: 4</option>
							<option value="5">Qty: 5</option>
						</select>
					</div>
				</div>
			</div>
			<div onClick={() => handleRemoveCartItem(id)} className="remove-btn">
				<FaTrash />
				<span style={{ padding: "0.5rem" }}>Remove</span>
			</div>
		</div>
	);
};
export default CartCard;
