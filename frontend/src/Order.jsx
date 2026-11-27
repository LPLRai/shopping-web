import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE } from "./api";

const Orders = () => {
  let [orders, setOrders] = useState([]);
  let [msg, setMsg] = useState(null);
  let [loading, setLoading] = useState(true);
  let token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    const getOrders = async () => {
      try {
        let res = await fetch(BASE + "/order/mine", {
          headers: { Authorization: "Bearer " + token },
        });
        let data = await res.json();
        if (data.success) {
          setOrders(data.result.slice().reverse()); // newest first
        } else {
          setMsg(data.message);
        }
      } catch (error) {
        setMsg("Cannot reach the server");
      }
      setLoading(false);
    };
    getOrders();
  }, []);

  return (
    <div className="page">
      <h1>Your orders</h1>

      {!token && (
        <div className="empty">
          Login to see your orders. <Link to="/login">Login</Link>
        </div>
      )}

      {token && msg && <p className="msg err">{msg}</p>}

      {token && !loading && !msg && orders.length === 0 && (
        <div className="empty">
          You have no orders yet. <Link to="/">Start shopping</Link>
        </div>
      )}

      {orders.map((order) => (
        <div className="panel order" key={order._id}>
          <div className="order-head">
            <span>Placed on {new Date(order.createdAt).toLocaleDateString()}</span>
            <span>Deliver to: {order.address}</span>
          </div>
          {order.items.map((item) => (
            <div className="order-line" key={item._id}>
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>Rs. {(item.price * item.quantity).toLocaleString()}</span>
            </div>
          ))}
          <div className="order-total">
            <span>Total</span>
            <span>Rs. {order.totalPrice.toLocaleString()}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;