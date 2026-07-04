import { useState } from "react";
import axios from "axios";

function Register() {
  const [form, setForm] = useState({
    name: "",
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
        "http://localhost:5000/api/auth/register",
        form
      );

      alert(response.data.message);

      setForm({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.log(error.response?.data);
      alert(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="card shadow p-4 mb-4">
      <h2 className="text-center text-primary mb-4">
        User Registration
      </h2>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          name="name"
          placeholder="Enter Name"
          value={form.name}
          onChange={handleChange}
        />
      </div>

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
        className="btn btn-primary w-100"
        onClick={handleSubmit}
      >
        Register
      </button>
    </div>
  );
}

export default Register;