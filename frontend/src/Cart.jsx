import { useState } from "react";
import { BASE } from "./api";

const Cart = () => {
  let [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);
  let [address, setAddress] = useState("");

  let total = 0;
  cart.forEach((item) => {
    total = total + item.price * item.quantity;
  });

  const removeItem = (id) => {
    let newCart = cart.filter((item) => item._id !== id);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const placeOrder = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }
    try {
      let items = cart.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
      }));

      let res = await fetch(BASE + "/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({ items, address }),
      });
      let data = await res.json();

      if (data.success) {
        localStorage.removeItem("cart");
        setCart([]);
      }
      alert(data.message);
    } catch (error) {
      alert("Cannot reach backend: " + error.message);
    }
  };

  return (
    <div>
      <h1>Your Cart</h1>
      {cart.map((item) => (
        <div key={item._id}>
          <img src={item.image} alt={item.name} width="80px" />
          <p>
            {item.name} - Rs. {item.price} x {item.quantity}
          </p>
          <button onClick={() => removeItem(item._id)}>Remove</button>
        </div>
      ))}

      <h3>Total: Rs. {total}</h3>

      <div>
        <label>Address</label>
        <input type="text" onChange={(e) => setAddress(e.target.value)}></input>
      </div>
      <button onClick={placeOrder}>Place order</button>
    </div>
  );
};

export default Cart;