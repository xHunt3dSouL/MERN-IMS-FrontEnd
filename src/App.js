import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import AddProduct from "./pages/AddProduct";
import DeleteProduct from "./pages/DeleteProduct";
import UpdateProduct from "./pages/UpdateProduct";

//Setup Routes
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:productID" element={<Product />} />
        <Route path="/updateproduct/:productID" element={<UpdateProduct />} />
        <Route path="/deleteproduct/:productID" element={<DeleteProduct />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<h1>Page Not Found</h1>} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
