import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../contexts/AppContext";
import { API_KEY } from "../../constants/constants";
import Axios from "../../Axios";
import { Link, useNavigate } from "react-router-dom";

const UpdateUserPage = () => {
  const navigate = useNavigate();
  const { users, setUsers, updateUserId } = useContext(AppContext);
  console.log(updateUserId);
  const [updateUser, setUpdateUser] = useState({
    name: "",
    email: "",
    gender: "",
    status: "",
  });

  useEffect(() => {
    if (updateUserId) {
      Axios.get("public/v2/users/" + updateUserId, {
        headers: {
          Authorization: API_KEY,
        },
      })
        .then((response) => {
          console.log(response);
          console.log(updateUser);
          setUpdateUser({
            ...updateUser,
            name: response.data.name,
            email: response.data.email,
            gender: response.data.gender,
            status: response.data.gender,
          });
        })
        .catch((error) => {
          console.error("Error fetching user list:", error);
        });
    }
  }, []);
  const handleInputChange = (event) => {
    setUpdateUser({ ...updateUser, [event.target.name]: event.target.value });
  };
  const handleGenderChange = (event) => {
    setUpdateUser({ ...updateUser, gender: event.target.value });
  };
  const handleStatusChange = (event) => {
    setUpdateUser({ ...updateUser, status: event.target.value });
  };
  const handleUpdate = (event) => {
    event.preventDefault();
    Axios.put(`public/v2/users/${updateUserId}`, updateUser, {
      headers: {
        Authorization: API_KEY,
      },
    })
      .then((response) => {
        setUsers([...users, response.data]);
        alert("Succesfuly updated!");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error fetching user list:", error);
      });
  };
  return (
    <div className="update-container">
      <form onSubmit={handleUpdate}>
        <div className="ui inverted segment">
          <div className="ui segment" style={{ textAlign: "center" }}>
            <h3>Update Details</h3>
          </div>
          <div className="ui inverted form">
            <div className="two fields">
              <div className="field">
                <label>Name</label>
                <input
                  placeholder="Name"
                  type="text"
                  value={updateUser.name}
                  name="name"
                  onChange={handleInputChange}
                />
              </div>
              <div className="field">
                <label>Email</label>
                <input
                  placeholder="Email"
                  type="email"
                  value={updateUser.email}
                  name="email"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="inline fields">
              <label>Gender:</label>
              <div className="two field">
                <div className="ui radio checkbox">
                  <input
                    type="radio"
                    value="Male"
                    name="gender"
                    onChange={handleGenderChange}
                  />
                  <label>Male</label>
                </div>
                <div className="ui radio checkbox">
                  <input
                    type="radio"
                    value="female"
                    name="gender"
                    onChange={handleGenderChange}
                  />
                  <label>Female</label>
                </div>
              </div>
            </div>
            <div className="inline fields">
              <label>Status:</label>
              <div className="two field">
                <div className="ui radio checkbox">
                  <input
                    type="radio"
                    value="Active"
                    name="status"
                    onChange={handleStatusChange}
                  />
                  <label>Active</label>
                </div>
                <div className="ui radio checkbox">
                  <input
                    type="radio"
                    value="Inactive"
                    name="status"
                    onChange={handleStatusChange}
                  />
                  <label>Inactive</label>
                </div>
              </div>
            </div>
            <div className="two field">
              <button type="submit" className="btn btn-success">
                Update
              </button>
              <Link to="/" className="btn btn-secondary">
                Back
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateUserPage;
