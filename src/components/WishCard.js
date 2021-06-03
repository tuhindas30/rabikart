import axios from "axios";
import { AiOutlineCloseCircle } from "react-icons/ai";
import "../assets/css/WishCard.css";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const WishCard = ({ item: { _id, product }, wishDispatch }) => {
  const handleRemoveWish = async (id) => {
    try {
      const { data } = await axios.delete(
        `https://rabikart.tuhindas5.repl.co/wishlist/${id}`
      );
      if (data.status === "SUCCESS") {
        wishDispatch({
          type: "SET_WISH_DATA",
          payload: { wishlist: data.data },
        });
        toast.dark("Removed from wishlist", {
          position: "bottom-left",
          autoClose: 4000,
          hideProgressBar: true,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="card wish-card">
      <div onClick={() => handleRemoveWish(_id)} className="remove-wish-btn">
        <AiOutlineCloseCircle color="var(--rb-dark-grey)" />
      </div>
      <Link to={`/product/${product._id}`} className="link">
        <img className="image" src={product.imageUrl} alt="product" />
        <div className="card-content">
          <p style={{ color: "var(--rb-dark-grey)", fontSize: ".8rem" }}>
            {product.modelName}
          </p>
          <p>₹{product.discountedPrice}</p>
        </div>
      </Link>
    </div>
  );
};
export default WishCard;
