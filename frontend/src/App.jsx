import { Routes, Route, Link } from "react-router-dom";
import ProductList from "./ProductList";
import Form1 from "./Form1";
import Login from "./Login";
import Cart from "./Cart";
import Orders from "./Order";

const App = () => {
  let token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div>
      <nav>
        <Link to="/">Home</Link> | <Link to="/cart">Cart</Link> |{" "}
        {token ? (
          <>
            <Link to="/orders">My Orders</Link> |{" "}
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/register">Register</Link> |{" "}
            <Link to="/login">Login</Link>
          </>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/register" element={<Form1 />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </div>
  );
};

export default App;