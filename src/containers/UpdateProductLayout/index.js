import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Card, TextField, Button, Box, Typography } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";

const UpdateProductLayout = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const [product, setProduct] = useState({
    productId: "",
    title: "",
    price: "",
    description: "",
    category: "",
    brand: "",
    image: "",
    quantity: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!productId) {
          console.log("Product ID is missing");
          return;
        }

        const response = await axios.get(
          `http://localhost:4000/api/product/${productId}`
        );
        setProduct((prevProduct) => ({ ...prevProduct, ...response.data }));
      } catch (error) {
        console.log("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleUpdateProduct = async () => {
    try {
      if (!product.productId) {
        console.log("Product ID is missing");
        return;
      }

      const { title, price, description, category, brand, image, quantity } =
        product;
      const updatedProduct = {
        title,
        price,
        description,
        category,
        brand,
        image,
        quantity,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.patch(
        `http://localhost:4000/api/product/${product.productId}`,
        updatedProduct,
        config
      );

      console.log("Product updated successfully:", response.data);
      navigate("/dashboard");
    } catch (error) {
      console.log("Error updating product:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  return (
    <Box
      height="160vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Card sx={{ minWidth: "500px" }}>
        <Box
          p={4}
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={5}
        >
          <Typography variant="h3">Update Product</Typography>
          <TextField
            type="text"
            label="Product ID"
            fullWidth
            name="productId"
            value={product.productId}
            onChange={handleChange}
          />
          <TextField
            type="text"
            label="Title"
            fullWidth
            name="title"
            value={product.title}
            onChange={handleChange}
          />
          <TextField
            type="number"
            label="Price"
            fullWidth
            name="price"
            value={product.price}
            onChange={handleChange}
          />
          <TextField
            type="text"
            label="Description"
            fullWidth
            name="description"
            value={product.description}
            onChange={handleChange}
          />
          <TextField
            type="text"
            label="Category"
            fullWidth
            name="category"
            value={product.category}
            onChange={handleChange}
          />
          <TextField
            type="text"
            label="Brand"
            fullWidth
            name="brand"
            value={product.brand}
            onChange={handleChange}
          />
          <TextField
            type="text"
            label="Image URL"
            fullWidth
            name="image"
            value={product.image}
            onChange={handleChange}
          />
          <TextField
            type="number"
            label="Quantity"
            fullWidth
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
          />
          <Button variant="contained" onClick={handleUpdateProduct}>
            Update Product
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default UpdateProductLayout;
