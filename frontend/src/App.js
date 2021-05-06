import "./assets/css/global.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Cart from "./pages/Cart";
import ProductListing from "./pages/ProductListing";
import WishList from "./pages/WishList";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Error404 from "./pages/Error404";
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <div className="App">
      <NavBar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product-listing" element={<ProductListing />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="*" element={<Error404 />}></Route>
      </Routes>
    </div>
  );
}
