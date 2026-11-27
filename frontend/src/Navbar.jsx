import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = ({ search, setSearch, cartCount }) => {
  let [noLogo, setNoLogo] = useState(false);
  let token = localStorage.getItem("token");
  let navigate = useNavigate();
  let location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  // typing in the search bar always takes you to the product page
  const handleChange = (e) => {
    setSearch(e.target.value);
    if (location.pathname !== "/") navigate("/");
  };

  return (
    <header className="navbar">
      <div className="nav-inner">
        {/* LOGO SLOT: save your logo as frontend/public/logo.png (150 x 45 px) */}
        <Link to="/" className="logo-slot" aria-label="Home">
          {noLogo ? (
            <span className="logo-placeholder">Logo 150 × 45</span>
          ) : (
            <img
              src="/logo.png"
              alt="Shopping Web"
              onError={() => setNoLogo(true)}
            />
          )}
        </Link>

        <form
          className="search"
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            navigate("/");
          }}
        >
          <input
            type="text"
            placeholder="Search products"
            aria-label="Search products"
            value={search}
            onChange={handleChange}
          />
          <button type="submit" aria-label="Search">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="16.5" y1="16.5" x2="21" y2="21" />
            </svg>
          </button>
        </form>

        <div className="nav-item">
          {token ? (
            <>
              <span className="small">Hello</span>
              <button className="link-white" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <span className="small">Hello, sign in</span>
              <span className="bold">
                <Link to="/login">Login</Link> /{" "}
                <Link to="/register">Register</Link>
              </span>
            </>
          )}
        </div>

        <Link to="/orders" className="nav-item">
          <span className="small">Your</span>
          <span className="bold">Orders</span>
        </Link>

        <Link
          to="/cart"
          className="nav-cart"
          aria-label={"Cart, " + cartCount + " items"}
        >
          <span className="cart-icon">
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="20" r="1.4" />
              <circle cx="18" cy="20" r="1.4" />
              <path d="M2 3h3l2.4 12.2a2 2 0 0 0 2 1.6h8.1a2 2 0 0 0 2-1.5L21.5 7H6" />
            </svg>
            <span className="cart-count">{cartCount}</span>
          </span>
          <span className="bold">Cart</span>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;