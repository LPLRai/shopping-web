import { useState } from "react";
import { Link } from "react-router-dom";
import { BASE } from "./api";

const Login = () => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [msg, setMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(BASE + "/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      let data = await res.json();

      if (data.success) {
        localStorage.setItem("token", data.token); // remember the login
        window.location.href = "/"; // go home and refresh the top bar
      } else {
        setMsg(data.message);
      }
    } catch (error) {
      setMsg("Cannot reach the server");
    }
  };

  return (
    <div className="auth">
      <div className="panel">
        <h1>Login</h1>
        {msg && <p className="msg err">{msg}</p>}
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="btn-cart big">Login</button>
        </form>
      </div>
      <p className="auth-alt">
        New here? <Link to="/register">Create an account</Link>
      </p>
    </div>
  );
};

export default Login;