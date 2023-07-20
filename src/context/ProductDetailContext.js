import { createContext, useState, useEffect } from "react";
import { useFetch } from "../hooks";
import axios from "axios";

export const ProductDetailContext = createContext({});

function ProductDetailProvider({ children }) {
  const [productID, setProductID] = useState("");
  const [url, setUrl] = useState("");
  const { data, loading, error, reload } = useFetch(url);

  const handleDeleteProduct = async () => {
    try {
      await axios.delete(`http://localhost:4000/api/product/${productID}`);
      reload();
      setProductID("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (productID) {
      setUrl(`http://localhost:4000/api/product/${productID}`);
    }
  }, [productID]);

  return (
    <ProductDetailContext.Provider
      value={{ data, loading, error, setProductID, handleDeleteProduct }}
    >
      {children}
    </ProductDetailContext.Provider>
  );
}

export default ProductDetailProvider;
