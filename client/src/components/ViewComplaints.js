import { useEffect, useState } from "react";
import axios from "axios";

function ViewComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    category: "",
  });

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/complaints"
      );
      setComplaints(response.data);
    } catch (error) {
      console.log(error);
      alert("Failed to Fetch Complaints");
    }
  };

  const startEdit = (item) => {
    setEditingId(item._id);

    setEditForm({
      title: item.title,
      description: item.description,
      category: item.category,
    });
  };

  const updateComplaint = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/complaints/${editingId}`,
        editForm
      );

      alert("Complaint Updated Successfully");
      setEditingId(null);
      fetchComplaints();
    } catch (error) {
      console.log(error);
      alert("Update Failed");
    }
  };

  const deleteComplaint = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/complaints/${id}`
      );

      alert("Complaint Deleted Successfully");
      fetchComplaints();
    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/complaints/status/${id}`,
        { status }
      );

      alert("Status Updated Successfully");
      fetchComplaints();
    } catch (error) {
      console.log(error);
      alert("Status Update Failed");
    }
  };

  return (
    <div className="card shadow p-4 mt-4">
      <h2 className="text-center text-primary mb-4">
        All Complaints
      </h2>

      {complaints.length === 0 ? (
        <h4 className="text-center text-danger">
          No Complaints Found
        </h4>
      ) : (
        <table className="table table-striped table-bordered table-hover">

          <thead className="table-dark">
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Category</th>
              <th>Status</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {complaints.map((item) => (
              <tr key={item._id}>

                <td>
                  {editingId === item._id ? (
                    <input
                      className="form-control"
                      value={editForm.title}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          title: e.target.value,
                        })
                      }
                    />
                  ) : (
                    item.title
                  )}
                </td>

                <td>
                  {editingId === item._id ? (
                    <input
                      className="form-control"
                      value={editForm.description}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          description: e.target.value,
                        })
                      }
                    />
                  ) : (
                    item.description
                  )}
                </td>

                <td>
                  {editingId === item._id ? (
                    <input
                      className="form-control"
                      value={editForm.category}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          category: e.target.value,
                        })
                      }
                    />
                  ) : (
                    item.category
                  )}
                </td>

                <td>
                  <select
                    className="form-select"
                    value={item.status}
                    onChange={(e) =>
                      updateStatus(item._id, e.target.value)
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </td>

                <td>{item.userEmail}</td>

                <td>
                  {editingId === item._id ? (
                    <>
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={updateComplaint}
                      >
                        Save
                      </button>

                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => setEditingId(null)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => startEdit(item)}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteComplaint(item._id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      )}
    </div>
  );
}

export default ViewComplaints;