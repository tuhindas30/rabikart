const ImageSlider = ({ getImages }) => {
  const slideshow = () => {
    let i = 0;
    if (i < getImages().length - 1) {
      i++;
    } else {
      i = 0;
      return getImages()[i];
    }
  };
  return (
    <div className="slideshow">
      <img src={setInterval(slideshow, 2000)} alt="" />
    </div>
  );
};
export default ImageSlider;
