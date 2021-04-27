import axios from "axios";
import { useToast } from "../contexts/toast-context";
const WishCard = ({ item: { _id, product }, wishDispatch }) => {
	const { setToast } = useToast();

	const handleRemoveWish = async (id) => {
		try {
			const { data } = await axios.delete(
				`https://rabikart.tuhindas5.repl.co/wishlist/${id}`
			);
			wishDispatch({
				type: "SET_WISH_DATA",
				payload: { wishlist: data.data, setToast },
			});
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<div className="card wish-card">
			<div onClick={() => handleRemoveWish(_id)} className="remove-wish-btn">
				<i style={{ color: "black" }} className="bi bi-x-circle-fill"></i>
			</div>
			<img src={product.imageUrl} alt="" />
			<div className="card-content">
				<p>{product.modelName}</p>
				<p>₹{product.discountedPrice}</p>
				{product.avgRating >= 4 && (
					<div className="star-num rating-h wish-rating-star-num">
						<span>{product.avgRating}</span> <i className="bi bi-star-fill"></i>
					</div>
				)}
				{product.avgRating >= 2 && product.avgRating < 4 && (
					<div className="star-num rating-m wish-rating-star-num">
						<span>{product.avgRating}</span> <i className="bi bi-star-fill"></i>
					</div>
				)}
				{product.avgRating >= 0 && product.avgRating < 2 && (
					<div className="star-num rating-l wish-rating-star-num">
						<span>{product.avgRating}</span> <i className="bi bi-star-fill"></i>
					</div>
				)}
			</div>
		</div>
	);
};
export default WishCard;
