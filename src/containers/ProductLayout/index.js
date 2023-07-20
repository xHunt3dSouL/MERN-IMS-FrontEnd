import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import ProductDetailCard from "../../components/ProductDetailCard";
import { useFetch } from "../../hooks";
import { ProductDetailContext } from "../../context/ProductDetailContext";

function ProductLayout() {
  const { productID } = useParams();
  const { data, loading, error, setProductID } =
    useContext(ProductDetailContext);

  useEffect(() => {
    if (productID) {
      setProductID(productID);
    }
  }, [productID]);

  return (
    <>
      {loading && <h1>Loading...</h1>}
      {!loading && error && <h1>Error Occured</h1>}
      {!loading && !error && data && <ProductDetailCard product={data} />}
    </>
  );
}

export default ProductLayout;
