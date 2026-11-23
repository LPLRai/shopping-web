import { useState } from "react";
import { BASE } from "./api";

const Login = () => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await fetch(BASE + "/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    let data = await res.json();
    if (data.success) {
      localStorage.setItem("token", data.token); // remember the login
      window.location.href = "/"; // go home and refresh the menu
    }
    // alert(data.message);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email</label>
        <input type="email" onChange={(e) => setEmail(e.target.value)}></input>
      </div>
      <div>
        <label>Password</label>
        <input type="password" onChange={(e) => setPassword(e.target.value)}></input>
      </div>
      <button>Login</button>
    </form>
  );
};

export default Login;