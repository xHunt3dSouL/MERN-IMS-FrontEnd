import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const truncate = (input, maxCharacters) =>
    input.length > maxCharacters
      ? `${input.substring(0, maxCharacters)}...`
      : input;

  return (
    <Card sx={{ maxWidth: 450, height: 400 }}>
      <CardMedia
        component="img"
        image={product.image}
        title="green iguana"
        sx={{ objectFit: "contain", height: 200 }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {truncate(product.title, 15)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {truncate(product.description, 45)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="contained"
          onClick={() => navigate(`/products/${product._id}`)}
        >
          Info
        </Button>
      </CardActions>
    </Card>
  );
}
