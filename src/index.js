import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { ProductsProvider } from "./contexts/ProductsProvider";
import { CartProvider } from "./contexts/CartProvider";
import { WishlistProvider } from "./contexts/WishlistProvider";
import { AuthProvider } from "./contexts/AuthProvider";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Router>
      <ProductsProvider>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <App />
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </ProductsProvider>
    </Router>
  </StrictMode>,
  rootElement
);
