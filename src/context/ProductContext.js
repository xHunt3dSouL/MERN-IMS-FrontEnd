import { createContext, useState, useEffect } from "react";
import { useFetch } from "../hooks";
import axios from "axios";

export const ProductContext = createContext({});

function ProductProvider({ children }) {
  const [url, setUrl] = useState(
    `http://localhost:4000/api/product?APIKey=${process.env.REACT_APP_API_KEY}`
  );
  const { data, loading, error, reload } = useFetch(url);
  const [category, setCategory] = useState("");
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    brand: "",
    image: "",
    quantity: "",
  });

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const handleAddProduct = async () => {
    try {
      await axios.post("http://localhost:4000/api/product", newProduct);
      // Trigger data reload after successful product addition
      reload();
      // Reset new product form
      setNewProduct({
        title: "",
        price: "",
        description: "",
        category: "",
        brand: "",
        image: "",
        quantity: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (category) {
      setUrl(
        `http://localhost:4000/api/product?APIKey=${process.env.REACT_APP_API_KEY}&category=${category}`
      );
    } else {
      setUrl(
        `http://localhost:4000/api/product?APIKey=${process.env.REACT_APP_API_KEY}`
      );
    }
  }, [category]);

  return (
    <ProductContext.Provider
      value={{
        data,
        loading,
        error,
        category,
        handleChange,
        newProduct,
        setNewProduct,
        handleAddProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export default ProductProvider;
