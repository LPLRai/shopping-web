import { useEffect, useState } from "react";
import { BASE } from "./api";

const ProductList = () => {
  let [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        let res = await fetch(BASE + "/product");
        let data = await res.json();
        setProducts(data.result);
      } catch (error) {
        alert("Cannot reach backend: " + error.message);
      }
    };
    getProducts();
  }, []);

  const addToCart = (item) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let found = cart.find((c) => c._id === item._id);

    if (found) {
      found.quantity = found.quantity + 1;
    } else {
      cart.push({
        _id: item._id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: 1,
      });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(item.name + " added to cart");
  };

  return (
    <div>
      <h1>Shopping Web</h1>
      {products.map((item) => (
        <div key={item._id}>
          <img src={item.image} alt={item.name} width="150px" />
          <h3>{item.name}</h3>
          <p>Rs. {item.price}</p>
          <button onClick={() => addToCart(item)}>Add to cart</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;