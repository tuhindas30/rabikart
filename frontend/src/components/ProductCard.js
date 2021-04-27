import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
const ProductCard = ({
	itemDetails: {
		_id,
		modelName,
		imageUrl,
		price,
		avgRating,
		noOfRatings,
		discount,
		discountedPrice,
	},
	wishState,
	wishDispatch,
	cartState,
	cartDispatch,
	setToast,
}) => {
	const [isLoading, setLoading] = useState(false);

	const handleAddToCart = async (_id) => {
		try {
			setLoading(true);
			const { data } = await axios.post(
				"https://rabikart.tuhindas5.repl.co/cart",
				{
					id: _id,
				}
			);
			setLoading(false);
			if (data.status === "SUCCESS")
				cartDispatch({
					type: "ADD_TO_CART",
					payload: { item: data.data, setToast },
				});
		} catch (error) {
			console.error(error);
		}
	};

	const handleAddToWishList = async (_id) => {
		if (wishState.some((item) => item.product._id === _id)) {
			const wishItemId = wishState.find((item) => item.product._id === _id)._id;
			try {
				const { data } = await axios.delete(
					`https://rabikart.tuhindas5.repl.co/wishlist/${wishItemId}`
				);
				// console.log(data);
				wishDispatch({
					type: "SET_WISH_DATA",
					payload: { wishlist: data.data, setToast },
				});
			} catch (error) {
				console.error(error);
			}
		} else {
			try {
				const { data } = await axios.post(
					"https://rabikart.tuhindas5.repl.co/wishlist",
					{
						id: _id,
					}
				);
				if (data.status === "SUCCESS")
					wishDispatch({
						type: "ADD_WISH",
						payload: { item: data.data, setToast },
					});
			} catch (error) {
				console.error(error);
			}
		}
	};

	return (
		<div className="card product-list-item">
			<div
				onClick={() => handleAddToWishList(_id)}
				className="wish-icon--container">
				{wishState && wishState.some((item) => item.product._id === _id) ? (
					<i className="bi bi-heart-fill wish-icon-success-color"></i>
				) : (
					<i className="bi bi-heart"></i>
				)}
			</div>
			<Link key={_id} to={`/product/${_id}`} className="link">
				<div className="list-item-details">
					<div className="product-img--container ">
						<img className="image" src={imageUrl} alt="" />
					</div>
					<div className="card-content product-card-content">
						<p>{modelName}</p>
						{avgRating >= 4 && (
							<div className="rating--container">
								<small className="star-num rating-badge rating-h">
									{avgRating} <i className="bi bi-star-fill"></i>
								</small>{" "}
								({noOfRatings})
							</div>
						)}
						{avgRating >= 2 && avgRating < 4 && (
							<div className="rating--container">
								<span className="star-num rating-badge rating-m">
									<small>{avgRating}</small> <i className="bi bi-star-fill"></i>
								</span>{" "}
								({noOfRatings})
							</div>
						)}
						{avgRating >= 0 && avgRating < 2 && (
							<div className="rating--container">
								<span className="star-num rating-badge rating-l">
									<small>{avgRating}</small> <i className="bi bi-star-fill"></i>
								</span>{" "}
								({noOfRatings})
							</div>
						)}
						<div>
							<strong style={{ fontSize: "1rem" }}>₹{discountedPrice}</strong>{" "}
							{discount ? <strike>{price}</strike> : null}{" "}
							{discount ? <span>{discount}% off</span> : null}
						</div>
					</div>
				</div>
			</Link>
			{cartState && cartState.some((item) => item.item.product._id === _id) ? (
				<button className="btn primary add-to-cart-btn">
					<Link to="/cart" className="nav-links">
						<strong>Go to cart</strong>
					</Link>
				</button>
			) : (
				<button
					onClick={() => handleAddToCart(_id)}
					className="btn primary add-to-cart-btn"
					disabled={isLoading}>
					{isLoading ? (
						<PulseLoader color="white" loading={isLoading} size={5} />
					) : (
						<strong>Add to cart</strong>
					)}
				</button>
			)}
		</div>
	);
};
export default ProductCard;
