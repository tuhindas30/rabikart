import "./styles.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import { useToast } from "./contexts/toast-context";
import Toast from "./components/Toast";
import Cart from "./components/Cart/Cart";
import ProductListing from "./components/ProductListing/ProductListing";
import WishList from "./components/WishList/WishList";
import Home from "./components/Home";
import Product from "./components/Product";
// import ImageSlider from "./components/ImageSlider";

export default function App() {
  const { toast } = useToast();
  return (
    <div className="App">
      <NavBar />
      {/* <ImageSlider /> */}
      {toast.display && <Toast />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product-listing" element={<ProductListing />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<WishList />} />
      </Routes>
    </div>
  );
}
