import { useState } from "react";
import axios from "axios";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );

      alert(response.data.message);

      setForm({
        email: "",
        password: "",
      });
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="card shadow p-4 mb-4">
      <h2 className="text-center text-success mb-4">
        User Login
      </h2>

      <div className="mb-3">
        <input
          type="email"
          className="form-control"
          name="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <input
          type="password"
          className="form-control"
          name="password"
          placeholder="Enter Password"
          value={form.password}
          onChange={handleChange}
        />
      </div>

      <button
        className="btn btn-success w-100"
        onClick={handleSubmit}
      >
        Login
      </button>
    </div>
  );
}

export default Login;