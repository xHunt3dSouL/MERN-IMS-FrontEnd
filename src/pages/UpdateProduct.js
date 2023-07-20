import UpdateProductLayout from "../containers/UpdateProductLayout";
import { useState } from "react";

function UpdateProduct() {
  const [product, setProduct] = useState({});

  return <UpdateProductLayout product={product} />;
}

export default UpdateProduct;
