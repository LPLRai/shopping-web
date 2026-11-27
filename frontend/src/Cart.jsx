import { useState } from "react";
import { Link } from "react-router-dom";
import { BASE } from "./api";

const Cart = ({ cart, setCart }) => {
  let [address, setAddress] = useState("");
  let [msg, setMsg] = useState(null); // { type: "ok" | "err", text }

  let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const changeQty = (id, change) => {
    setCart(
      cart.map((item) =>
        item._id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item._id !== id));
  };

  const placeOrder = async () => {
    if (cart.length === 0) {
      setMsg({ type: "err", text: "Your cart is empty" });
      return;
    }
    if (!address.trim()) {
      setMsg({ type: "err", text: "Please enter your address" });
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
        setCart([]);
        setAddress("");
      }
      setMsg({ type: data.success ? "ok" : "err", text: data.message });
    } catch (error) {
      setMsg({ type: "err", text: "Cannot reach the server" });
    }
  };

  return (
    <div className="page">
      <h1>Your cart</h1>

      {msg && <p className={"msg " + msg.type}>{msg.text}</p>}

      {cart.length === 0 ? (
        <div className="empty">
          Your cart is empty. <Link to="/">Continue shopping</Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="panel">
            {cart.map((item) => (
              <div className="cart-row" key={item._id}>
                <img src={item.image} alt={item.name} />
                <div>
                  <h3>{item.name}</h3>
                  <p className="price" style={{ fontSize: 18 }}>
                    <span className="cur">Rs.</span>
                    {Number(item.price).toLocaleString()}
                  </p>
                  <button className="link-btn" onClick={() => removeItem(item._id)}>
                    Remove
                  </button>
                </div>
                <div className="qty-box">
                  <button
                    onClick={() => changeQty(item._id, -1)}
                    disabled={item.quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => changeQty(item._id, 1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="panel">
            <div className="summary-total">
              <span>Total</span>
              <strong>Rs. {total.toLocaleString()}</strong>
            </div>
            <div className="field">
              <label htmlFor="address">Delivery address</label>
              <input
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <button className="btn-cart big" onClick={placeOrder}>
              Place order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;