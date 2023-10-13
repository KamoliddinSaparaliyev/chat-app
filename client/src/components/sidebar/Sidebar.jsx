import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import instance from "../../helpers/inctance";
import { Badge } from "reactstrap";
import "./Sidebar.css";
import { ToastContainer, toast } from "react-toastify";

const Sidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState(0);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    instance
      .get("/me")
      .then((req) => setUser(req.data))
      .catch((err) => console.log(err));
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  function handleLogOut() {
    const coniform = confirm("Are you sure log out");
    if (coniform) {
      localStorage.removeItem("token");
      setTimeout(() => navigate("/login"), 3000);
      toast.warning("You have succses logged out", { autoClose: 3000 });
    }
  }

  return (
    <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
      <div className="logo_details">
        <i className="bx bxl-audible icon"></i>
        <div className="logo_name">Company</div>
        <i className="bx bx-menu" id="btn" onClick={toggleSidebar}></i>
      </div>
      <ul className="nav-list">
        <li>
          <NavLink to="/messages" href="#">
            <i className="bx bx-chat"></i>
            <span className="link_name">
              Message{" "}
              {messages?.length > 0 && (
                <Badge color="primary" pill>
                  {messages?.length}
                </Badge>
              )}
            </span>
          </NavLink>
          <span className="tooltip">
            Message{" "}
            {messages?.length > 0 && (
              <Badge color="primary" pill>
                {messages?.length}
              </Badge>
            )}
          </span>
        </li>
        <li>
          <NavLink to="/me" href="#">
            <i className="bx bx-user"></i>
            <span className="link_name">Profile</span>
          </NavLink>
          <span className="tooltip">Profile</span>
        </li>
        <li className="profile">
          <div className="profile_details">
            <div className="profile_content">
              <div className="name">{user?.username} </div>
            </div>
          </div>

          <i
            onClick={() => handleLogOut()}
            className="bx bx-log-out"
            id="log_out"
          ></i>
        </li>
      </ul>
      <ToastContainer />
    </div>
  );
};

export default Sidebar;
