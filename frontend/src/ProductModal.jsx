import { useEffect, useState } from "react";

const ProductModal = ({ product, onClose, addToCart }) => {
  let [qty, setQty] = useState(1);
  let stock = product.quantity;

  // Esc closes the pop-up, and the page behind it stops scrolling
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, []);

  const add = () => {
    addToCart(product, qty);
    onClose();
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={product.name}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ×
        </button>

        <div className="modal-img">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="modal-info">
          <h2>{product.name}</h2>
          {product.category && <span className="tag">{product.category}</span>}

          <p className="modal-price">
            <span className="cur">Rs.</span>
            {Number(product.price).toLocaleString()}
          </p>

          <p className={"stock " + (stock > 0 ? "ok" : "out")}>
            {stock > 0 ? "In stock: " + stock + " available" : "Out of stock"}
          </p>

          <div className="qty-row">
            <span>Quantity</span>
            <div className="qty-box">
              <button
                onClick={() => setQty(qty - 1)}
                disabled={qty <= 1}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span>{qty}</span>
              <button
                onClick={() => setQty(qty + 1)}
                disabled={qty >= stock}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          <button className="btn-cart big" onClick={add} disabled={stock < 1}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;