// import { useProducts } from "../contexts/products-context";
import data from "../Data";

const ImageSlider = ({ getImages }) => {
  return (
    <div className="slider">
      <div className="slides">
        <input type="radio" name="radio-btn" id="radio1" />
        <input type="radio" name="radio-btn" id="radio2" />
        <input type="radio" name="radio-btn" id="radio3" />
        <input type="radio" name="radio-btn" id="radio4" />
        {getImages().map((img) => (
          <div className="slide">
            <img className="image" src={img} alt="" />
          </div>
        ))}
        <div className="navigation-auto">
          <div className="auto-btn1"></div>
          <div className="auto-btn2"></div>
          <div className="auto-btn3"></div>
          <div className="auto-btn4"></div>
        </div>
      </div>
      <div className="navigation-manual">
        <label for="radio1" className="manual-btn"></label>
        <label for="radio2" className="manual-btn"></label>
        <label for="radio3" className="manual-btn"></label>
        <label for="radio4" className="manual-btn"></label>
      </div>
    </div>
  );
};
export default ImageSlider;
