import "./styles.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import { useToast } from "./contexts/toast-context";
import Toast from "./components/Toast";
import Cart from "./components/Cart";
import ProductListing from "./components/ProductListing";
import WishList from "./components/WishList";
import Home from "./components/Home";

export default function App() {
  const { toast } = useToast();
  return (
    <div className="App">
      <NavBar />
      {toast.display && <Toast />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<ProductListing />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<WishList />} />
      </Routes>
    </div>
  );
}
