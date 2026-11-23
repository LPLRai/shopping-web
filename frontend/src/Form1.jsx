import { useState } from "react";
import { BASE } from "./api";

const Form1 = () => {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await fetch(BASE + "/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    let data = await res.json();
    alert(data.message);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input type="text" onChange={(e) => setName(e.target.value)}></input>
      </div>
      <div>
        <label>Email</label>
        <input type="email" onChange={(e) => setEmail(e.target.value)}></input>
      </div>
      <div>
        <label>Password</label>
        <input type="password" onChange={(e) => setPassword(e.target.value)}></input>
      </div>
      <button>Register</button>
    </form>
  );
};

export default Form1;