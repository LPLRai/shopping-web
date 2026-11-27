import { useState } from "react";
import { Link } from "react-router-dom";
import { BASE } from "./api";

const Form1 = () => {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [msg, setMsg] = useState(null); // { type: "ok" | "err", text }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(BASE + "/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      let data = await res.json();

      if (data.success) {
        setMsg({ type: "ok", text: "Registered successfully. You can login now." });
        setName("");
        setEmail("");
        setPassword("");
      } else {
        setMsg({ type: "err", text: data.message });
      }
    } catch (error) {
      setMsg({ type: "err", text: "Cannot reach the server" });
    }
  };

  return (
    <div className="auth">
      <div className="panel">
        <h1>Create account</h1>
        {msg && <p className={"msg " + msg.type}>{msg.text}</p>}
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
          <button className="btn-cart big">Register</button>
        </form>
      </div>
      <p className="auth-alt">
        Already registered? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Form1;