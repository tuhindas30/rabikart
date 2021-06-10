import "./assets/css/global.css";
import { Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart/Cart";
import ProductListing from "./pages/ProductListing/ProductListing";
import WishList from "./pages/Wishlist/Wishlist";
import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import Error404 from "./pages/Error404/Error404";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import User from "./pages/User";
import PrivateRoute from "./routes/PrivateRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<ProductListing />} />
      <Route path="/products/:id" element={<Product />} />
      <Route path="/categories/:id" element={<ProductListing />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/cart" element={<Cart />} />
      <PrivateRoute path="/wishlist" element={<WishList />} />
      <PrivateRoute path="/user" element={<User />} />
      <Route path="*" element={<Error404 />}></Route>
    </Routes>
  );
}
