import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ProductProvider from "./context/ProductContext";
import ProductDetailProvider from "./context/ProductDetailContext";
import { store } from "./store";
import { Provider } from "react-redux";
import AuthProvider from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <ProductProvider>
          <ProductDetailProvider>
            <App />
          </ProductDetailProvider>
        </ProductProvider>
      </Provider>
    </AuthProvider>
  </React.StrictMode>
);
