import "./App.css";

import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import Complaint from "./components/Complaint";
import ViewComplaints from "./components/ViewComplaints";

function App() {
  return (
    <div>

      <Navbar />

      <div className="container mt-4">

        <h1 className="text-center text-primary mb-5">
          Online Complaint Registration System
        </h1>

        <div className="row">

          <div className="col-md-6">
            <Register />
          </div>

          <div className="col-md-6">
            <Login />
          </div>

        </div>

        <Complaint />

        <ViewComplaints />

      </div>

    </div>
  );
}

export default App;