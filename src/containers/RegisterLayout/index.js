import { Card, TextField, Button, Box, Typography } from "@mui/material";
import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function RegisterLayout() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const { saveToken } = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const validate = () => {
    let errors = {};
    if (email === "") {
      errors.email = "Email is required";
    }
    if (password === "") {
      errors.password = "Password is required";
    }
    if (fullname === "") {
      errors.fullname = "Fullname is required";
    }
    setErrors(errors);
    if (Object.keys(errors).length !== 0) {
      return false;
    } else {
      return true;
    }
  };

  const handleRegister = async () => {
    // API Call
    try {
      if (!validate()) {
        return;
      }
      const { data } = await axios.post(
        `http://localhost:4000/api/auth/register`,
        { email, password, fullname, isAdmin }
      );
      saveToken(data.accessToken);
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box
      height="80vh"
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
          <Typography variant="h3">Register</Typography>
          <TextField
            type="text"
            label="Email"
            fullWidth
            value={email}
            onChange={(e) => {
              setErrors({ ...errors, email: "" });
              setEmail(e.target.value);
            }}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            type="password"
            label="Password"
            fullWidth
            value={password}
            onChange={(e) => {
              setErrors({ ...errors, password: "" });
              setPassword(e.target.value);
            }}
            error={!!errors.password}
            helperText={errors.password}
          />
          <TextField
            type="text"
            label="Full Name"
            fullWidth
            value={fullname}
            onChange={(e) => {
              setErrors({ ...errors, fullname: "" });
              setFullname(e.target.value);
            }}
            error={!!errors.fullname}
            helperText={errors.fullname}
          />
          <label>
            Admin:
            <input
              type="checkbox"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
          </label>
          <Button variant="contained" onClick={handleRegister}>
            Register
          </Button>
          <Button variant="contained" onClick={() => navigate("/login")}>
            Login
          </Button>
        </Box>
      </Card>
    </Box>
  );
}

export default RegisterLayout;
