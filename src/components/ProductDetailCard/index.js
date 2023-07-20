import { useState } from "react";
import {
  Box,
  Button,
  Card,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import "./productdetailcard.css";
import PropTypes from "prop-types";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

const customIcons = {
  1: {
    icon: 7,
    label: "Small",
  },
  2: {
    icon: 8,
    label: "Medium",
  },
  3: {
    icon: 9,
    label: "Large",
  },
  4: {
    icon: 10,
    label: "XL",
  },
  5: {
    icon: 11,
    label: "XXL",
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

function ProductDetailCard(props) {
  const { product } = props;
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");
  const [cashOnDelivery, setCashOnDelivery] = useState(false);

  const handleAddToCart = () => {
    if (product.quantity >= quantity) {
      console.log("Item added to cart!");
      console.log("Customer Name:", customerName);
      console.log("Address:", address);
      console.log("Cash on Delivery:", cashOnDelivery);
    } else {
      console.log("Insufficient quantity!");
    }
  };

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    setQuantity(newQuantity);
  };

  const handleCustomerNameChange = (event) => {
    setCustomerName(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleCashOnDeliveryChange = (event) => {
    setCashOnDelivery(event.target.checked);
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="center" mt={10}>
      <img
        src={product?.image}
        width="400px"
        style={{ borderRadius: 8, marginRight: "30px" }}
      />
      <Card sx={{ maxWidth: "55%", height: "170%", borderRadius: 0 }}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-around"
          p={8}
          height="80%"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Rating
              name="half-rating-read"
              defaultValue={product.rating?.rate}
              precision={0.5}
            />
            <Box display="flex">
              <Typography variant="h4" sx={{ paddingTop: "4px" }}>
                $
              </Typography>
              <Typography variant="h3">{props.product.price}</Typography>
            </Box>
          </Box>
          <Box>
            <Typography variant="h3">{props.product.title}</Typography>
            <Typography variant="h5">{props.product.description}</Typography>
            <br />
            <Typography variant="h5">
              Available Quantity: {props.product.quantity}
            </Typography>
            <br />
            <Typography variant="h5">Brand: {props.product.brand}</Typography>
            <br />
            <Box>
              <Typography variant="h5">
                Quantity:
                <input
                  type="number"
                  min="1"
                  max={props.product.quantity}
                  value={quantity}
                  onChange={handleQuantityChange}
                  style={{
                    marginLeft: "10px",
                    alignItems: "center",
                    width: "100px",
                    height: "30px",
                    padding: "8px",
                    fontSize: "16px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                />
              </Typography>
            </Box>
          </Box>
          <Box>
            <br />
            <TextField
              label="Customer Name"
              value={customerName}
              onChange={handleCustomerNameChange}
              sx={{
                marginLeft: "100px",
                width: "200px",
                height: "100px",
              }}
            />
            <br></br>
            <TextField
              label="Address"
              value={address}
              onChange={handleAddressChange}
              multiline
              rows={2}
              sx={{
                marginLeft: "100px",
                lignItems: "center",
                width: "300px",
                height: "100px",
              }}
            />

            <br></br>
            <br></br>
            <FormControlLabel
              control={
                <Checkbox
                  checked={cashOnDelivery}
                  onChange={handleCashOnDeliveryChange}
                  color="primary"
                  sx={{ marginLeft: "100px" }}
                />
              }
              label="Cash on Delivery"
            />
            <br />
            <br></br>
            <Button
              variant="contained"
              endIcon={<ShoppingBasketIcon />}
              onClick={handleAddToCart}
              disabled={product.quantity < 1 || quantity < 1}
              sx={{
                fontSize: "16px",
                padding: "8px 12px",
                marginLeft: "100px",
              }}
            >
              Add to Sales
            </Button>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}

export default ProductDetailCard;
