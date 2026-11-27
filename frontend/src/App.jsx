import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import ProductList from "./ProductList";
import Form1 from "./Form1";
import Login from "./Login";
import Cart from "./Cart";
import Orders from "./Order";

const App = () => {
  let [search, setSearch] = useState("");
  let [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);
  let [toast, setToast] = useState(null);

  // keep the cart saved in the browser
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // hide the small "added to cart" message after 2 seconds
  useEffect(() => {
    if (!toast) return;
    let timer = setTimeout(() => setToast(null), 2000);
    return () => clearTimeout(timer);
  }, [toast]);

  const addToCart = (item, qty = 1) => {
    setCart((old) => {
      let found = old.find((c) => c._id === item._id);
      if (found) {
        return old.map((c) =>
          c._id === item._id ? { ...c, quantity: c.quantity + qty } : c
        );
      }
      return [
        ...old,
        {
          _id: item._id,
          name: item.name,
          price: item.price,
          image: item.image,
          quantity: qty,
        },
      ];
    });
    setToast({ id: Date.now(), text: item.name + " added to cart" });
  };

  let cartCount = cart.reduce((sum, c) => sum + c.quantity, 0);

  return (
    <div>
      <Navbar search={search} setSearch={setSearch} cartCount={cartCount} />

      <Routes>
        <Route
          path="/"
          element={<ProductList search={search} addToCart={addToCart} />}
        />
        <Route path="/register" element={<Form1 />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>

      {toast && (
        <div className="toast" role="status" key={toast.id}>
          {toast.text}
        </div>
      )}
    </div>
  );
};

export default App;