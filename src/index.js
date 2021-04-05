import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import setUpMockServer from "./api/mock.server";
import { ProductsProvider } from "./contexts/products-context";
import { CartProvider } from "./contexts/cart-context";
import { WishProvider } from "./contexts/wishlist-context";
import { ToastProvider } from "./contexts/toast-context";

setUpMockServer();

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Router>
      <ToastProvider>
        <ProductsProvider>
          <CartProvider>
            <WishProvider>
              <App />
            </WishProvider>
          </CartProvider>
        </ProductsProvider>
      </ToastProvider>
    </Router>
  </StrictMode>,
  rootElement
);
