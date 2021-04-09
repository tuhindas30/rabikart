import "./assets/css/global.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import { useToast } from "./contexts/toast-context";
import Toast from "./components/Toast";
import Cart from "./pages/Cart";
import ProductListing from "./pages/ProductListing";
import WishList from "./pages/WishList";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Error404 from "./pages/Error404";

export default function App() {
  const { toast } = useToast();
  return (
    <div className="App">
      <NavBar />
      {toast.display && <Toast />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product-listing" element={<ProductListing />} />
        <Route
          path="/product-listing/men"
          element={<ProductListing category="Men" />}
        />
        <Route
          path="/product-listing/women"
          element={<ProductListing category="Women" />}
        />
        <Route
          path="/product-listing/boys"
          element={<ProductListing category="Boys" />}
        />
        <Route
          path="/product-listing/girls"
          element={<ProductListing category="Girls" />}
        />
        <Route
          path="/product-listing/senior"
          element={<ProductListing category="Senior" />}
        />
        <Route
          path="/product-listing/beginner"
          element={<ProductListing category="beginner" />}
        />
        <Route
          path="/product-listing/amateur"
          element={<ProductListing category="amateur" />}
        />
        <Route
          path="/product-listing/intermediate"
          element={<ProductListing category="intermediate" />}
        />
        <Route
          path="/product-listing/advanced"
          element={<ProductListing category="advanced" />}
        />
        <Route
          path="/product-listing/professional"
          element={<ProductListing category="professional" />}
        />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="*" element={<Error404 />}></Route>
      </Routes>
    </div>
  );
}
