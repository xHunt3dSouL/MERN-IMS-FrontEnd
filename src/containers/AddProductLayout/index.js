import { Card, TextField, Button, Box, Typography } from "@mui/material";
import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function AddProductLayout() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [image, setImage] = useState("");
  const [quantity, setQuantity] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const validate = () => {
    let errors = {};
    if (!title) {
      errors.title = "Title is required";
    }
    if (!price) {
      errors.price = "Price is required";
    }
    if (!description) {
      errors.description = "Description is required";
    }
    if (!category) {
      errors.category = "Category is required";
    }
    if (!brand) {
      errors.brand = "Brand is required";
    }
    if (!quantity) {
      errors.quantity = "Quantity is required";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddProduct = async () => {
    try {
      if (!validate()) {
        return;
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        "http://localhost:4000/api/product/",
        {
          title,
          price,
          description,
          category,
          brand,
          image,
          quantity,
        },
        config
      );
      console.log(data);
      navigate("/dashboard");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        const { error } = err.response.data;
        console.log(error);
      } else {
        console.log(err.message);
      }
    }
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
          <Typography variant="h3">Add Product</Typography>
          <TextField
            type="text"
            label="Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={!!errors.title}
            helperText={errors.title}
          />
          <TextField
            type="number"
            label="Price"
            fullWidth
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            error={!!errors.price}
            helperText={errors.price}
          />
          <TextField
            type="text"
            label="Description"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            error={!!errors.description}
            helperText={errors.description}
          />
          <TextField
            type="text"
            label="Category"
            fullWidth
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            error={!!errors.category}
            helperText={errors.category}
          />
          <TextField
            type="text"
            label="Brand"
            fullWidth
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            error={!!errors.brand}
            helperText={errors.brand}
          />
          <TextField
            type="text"
            label="Image URL"
            fullWidth
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <TextField
            type="number"
            label="Quantity"
            fullWidth
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            error={!!errors.quantity}
            helperText={errors.quantity}
          />
          <Button variant="contained" onClick={handleAddProduct}>
            Add Product
          </Button>
        </Box>
      </Card>
    </Box>
  );
}

export default AddProductLayout;
