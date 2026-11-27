import { useEffect, useState } from "react";
import { BASE } from "./api";
import ProductModal from "./ProductModal";

const ProductList = ({ search, addToCart }) => {
  let [products, setProducts] = useState([]);
  let [ticked, setTicked] = useState([]); // categories that are ticked
  let [open, setOpen] = useState(null); // product shown in the pop-up
  let [showFilters, setShowFilters] = useState(false); // mobile only
  let [status, setStatus] = useState("loading");

  useEffect(() => {
    const getProducts = async () => {
      try {
        let res = await fetch(BASE + "/product");
        let data = await res.json();
        setProducts(data.result || []);
        setStatus("ready");
      } catch (error) {
        setStatus("error");
      }
    };
    getProducts();
  }, []);

  const categoryOf = (p) => p.category || "Others";
  let categories = [...new Set(products.map(categoryOf))].sort();
  const countOf = (c) => products.filter((p) => categoryOf(p) === c).length;

  const toggle = (c) => {
    setTicked(ticked.includes(c) ? ticked.filter((x) => x !== c) : [...ticked, c]);
  };

  // nothing ticked = show everything
  let word = search.trim().toLowerCase();
  let visible = products.filter(
    (p) =>
      (ticked.length === 0 || ticked.includes(categoryOf(p))) &&
      p.name.toLowerCase().includes(word)
  );

  return (
    <div className="layout">
      <aside className="sidebar">
        <button
          className="filter-toggle"
          onClick={() => setShowFilters(!showFilters)}
          aria-expanded={showFilters}
        >
          Categories{ticked.length > 0 ? " (" + ticked.length + ")" : ""}
          <span>{showFilters ? "Hide" : "Show"}</span>
        </button>

        <div className={"filter-panel" + (showFilters ? " open" : "")}>
          <div className="filter-head">
            <h2>Categories</h2>
            {ticked.length > 0 && (
              <button className="clear" onClick={() => setTicked([])}>
                Clear
              </button>
            )}
          </div>

          {categories.map((c) => (
            <label className="cat" key={c}>
              <input
                type="checkbox"
                checked={ticked.includes(c)}
                onChange={() => toggle(c)}
              />
              <span>{c}</span>
              <span className="count">{countOf(c)}</span>
            </label>
          ))}
          {categories.length === 0 && <p className="muted">No categories yet</p>}
        </div>
      </aside>

      <main>
        <p className="results-bar">
          <strong>{visible.length}</strong>{" "}
          {visible.length === 1 ? "result" : "results"}
          {word && <span> for “{search.trim()}”</span>}
        </p>

        {status === "loading" && <div className="empty">Loading products…</div>}
        {status === "error" && (
          <div className="empty">
            Cannot reach the server. Check that the backend is running, then
            refresh the page.
          </div>
        )}
        {status === "ready" && visible.length === 0 && (
          <div className="empty">
            No products match. Try a different search or clear the categories.
          </div>
        )}

        <div className="grid">
          {visible.map((p) => (
            <article
              className="card"
              key={p._id}
              tabIndex={0}
              onClick={() => setOpen(p)}
              onKeyDown={(e) => e.key === "Enter" && setOpen(p)}
            >
              <div className="card-img">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  onError={(e) => (e.target.style.visibility = "hidden")}
                />
              </div>
              <div className="card-body">
                <h3 className="card-name">{p.name}</h3>
                <p className="price">
                  <span className="cur">Rs.</span>
                  {Number(p.price).toLocaleString()}
                </p>
                <button
                  className="btn-cart"
                  onClick={(e) => {
                    e.stopPropagation(); // do not open the pop-up
                    addToCart(p, 1);
                  }}
                >
                  Add to cart
                </button>
              </div>
            </article>
          ))}
        </div>
      </main>

      {open && (
        <ProductModal
          product={open}
          onClose={() => setOpen(null)}
          addToCart={addToCart}
        />
      )}
    </div>
  );
};

export default ProductList;