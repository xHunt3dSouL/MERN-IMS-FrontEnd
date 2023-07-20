import React, { useState, useContext } from "react";
import axios from "axios";
import { Card, TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const DeleteProductLayout = () => {
  const navigate = useNavigate();
  const [productId, setProductId] = useState("");
  const { token } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleDeleteProduct = async () => {
    try {
      if (!productId) {
        setErrorMessage("Product ID is missing");
        setSuccessMessage("");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.delete(
        `http://localhost:4000/api/product/${productId}`,
        config
      );

      console.log("Product deleted successfully:", response.data);
      navigate("/dashboard");
      setSuccessMessage("Product deleted successfully");
      setErrorMessage("");
    } catch (error) {
      console.log("Error deleting product:", error);
      setErrorMessage("Error deleting product. Please check your token.");
      setSuccessMessage("");
    }
  };

  const handleChange = (e) => {
    setProductId(e.target.value);
    setErrorMessage("");
    setSuccessMessage("");
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
          <Typography variant="h3">Delete Product</Typography>
          <Typography variant="h5">
            Enter the Product ID you want to delete:
          </Typography>
          <TextField
            type="text"
            label="Product ID"
            fullWidth
            name="productId"
            value={productId}
            onChange={handleChange}
          />
          {errorMessage && (
            <Typography variant="body1" color="error">
              {errorMessage}
            </Typography>
          )}
          {successMessage && (
            <Typography variant="body1" color="success">
              {successMessage}
            </Typography>
          )}
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteProduct}
          >
            Delete Product
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default DeleteProductLayout;
