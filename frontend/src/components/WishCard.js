import axios from "axios";
import { useToast } from "../contexts/toast-context";
import { AiOutlineCloseCircle } from "react-icons/ai";
import "../assets/css/WishCard.css";

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
				<AiOutlineCloseCircle color="var(--rb-dark-grey)" />
			</div>
			<img className="image" src={product.imageUrl} alt="product" />
			<div className="card-content">
				<p style={{ color: "var(--rb-dark-grey)", fontSize: ".8rem" }}>
					{product.modelName}
				</p>
				<p>₹{product.discountedPrice}</p>
			</div>
		</div>
	);
};
export default WishCard;
