import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllData } from "../../store/slices/productSlice";
import ProductCard from "../../components/ProductCard";
import { Link as RouterLink } from "react-router-dom";

function HomeLayout() {
  const [category, setCategory] = useState("");
  const loggedInUserID = useSelector((state) => state.user.userID);
  const { token } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchAllData(category));
  }, [category, dispatch]);

  useEffect(() => {
    // Fetch isAdmin status
    const fetchIsAdminStatus = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(
          `http://localhost:4000/api/user/${loggedInUserID}/is-admin`,
          config
        );

        const isAdminStatus = response.data.isAdmin;
        setIsAdmin(isAdminStatus);
      } catch (error) {
        console.log("Error fetching isAdmin status:", error);
      }
    };

    if (loggedInUserID && token) {
      fetchIsAdminStatus();
    }
  }, [loggedInUserID, token]);

  return (
    <div>
      <FormControl
        sx={{
          minWidth: 300,
          marginBottom: 5,
          marginTop: 5,
          marginRight: "right",
        }}
      >
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          label="Category"
          onChange={handleChange}
        >
          <MenuItem value="">None</MenuItem>
          <MenuItem value="Footwear">Footwear</MenuItem>
          <MenuItem value="Electronics">Electronics</MenuItem>
          <MenuItem value="Apparel">Clothing</MenuItem>
        </Select>
      </FormControl>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          marginBottom: 10,
        }}
      >
        {isAdmin ? (
          <>
            <Button
              variant="contained"
              color="primary"
              component={RouterLink}
              to="/addproduct"
            >
              Add Product
            </Button>
            <Button
              variant="contained"
              color="primary"
              component={RouterLink}
              to="/sales"
            >
              Sales
            </Button>
          </>
        ) : null}
        {isAdmin ? (
          <Button
            variant="contained"
            color="primary"
            component={RouterLink}
            to="/updateproduct"
          >
            Update Product
          </Button>
        ) : null}
        {isAdmin ? (
          <Button
            variant="contained"
            color="primary"
            component={RouterLink}
            to="/deleteproduct"
          >
            Delete Product
          </Button>
        ) : null}
      </div>
      {loading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <h1>Error Occurred</h1>
      ) : data ? (
        data.length > 0 ? (
          <Grid container spacing={4}>
            {data.map((product) => (
              <Grid item xs={6} md={4} lg={2} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <h1>No Data Found</h1>
        )
      ) : null}
    </div>
  );
}

export default HomeLayout;
