import { useEffect, useState } from "react";
import { BASE } from "./api";

const Orders = () => {
  let [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        let res = await fetch(BASE + "/order/mine", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        let data = await res.json();
        if (data.success) {
          setOrders(data.result);
        } else {
          alert(data.message);
        }
      } catch (error) {
        alert("Cannot reach backend: " + error.message);
      }
    };
    getOrders();
  }, []);

  return (
    <div>
      <h1>My Orders</h1>
      {orders.map((order) => (
        <div key={order._id}>
          <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
          {order.items.map((item) => (
            <p key={item._id}>
              {item.name} x {item.quantity} (Rs. {item.price})
            </p>
          ))}
          <p>Total: Rs. {order.totalPrice}</p>
          <p>Address: {order.address}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Orders;