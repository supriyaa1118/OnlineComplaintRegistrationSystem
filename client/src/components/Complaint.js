import { useState } from "react";
import axios from "axios";

function Complaint() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    userEmail: "",
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
        "http://localhost:5000/api/complaints/add",
        form
      );

      alert(response.data.message);

      setForm({
        title: "",
        description: "",
        category: "",
        userEmail: "",
      });
    } catch (error) {
      console.log(error);
      console.log(error.response?.data);
      alert(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="card shadow p-4 mb-4">
      <h2 className="text-center text-danger mb-4">
        Complaint Registration
      </h2>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          name="title"
          placeholder="Complaint Title"
          value={form.title}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <textarea
          className="form-control"
          rows="4"
          name="description"
          placeholder="Complaint Description"
          value={form.description}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <input
          type="email"
          className="form-control"
          name="userEmail"
          placeholder="Your Email"
          value={form.userEmail}
          onChange={handleChange}
        />
      </div>

      <button
        className="btn btn-danger w-100"
        onClick={handleSubmit}
      >
        Submit Complaint
      </button>
    </div>
  );
}

export default Complaint;