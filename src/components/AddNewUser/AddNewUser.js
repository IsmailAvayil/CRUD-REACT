import React, { useContext } from "react";
import { API_KEY } from "../../constants/constants";
import Axios from "../../Axios";
import { Link } from "react-router-dom";
import { AppContext } from "../../contexts/AppContext";

function AddNewUser() {
  const { users, linkStyle, setUsers, newUser, setNewUser } =
    useContext(AppContext);

  const handleInputChange = (event) => {
    setNewUser({ ...newUser, [event.target.name]: event.target.value });
  };

  const handleGenderChange = (event) => {
    setNewUser({ ...newUser, gender: event.target.value });
  };
  const handleStatusChange = (event) => {
    setNewUser({ ...newUser, status: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const postData = newUser;
    if(postData.name && postData.email && postData.gender && postData.status){
      try {
        const response = await Axios.post("public/v2/users", postData, {
          headers: {
            Authorization: API_KEY,
          },
        });
        console.log(response);
        setUsers([...users, response.data]);
        alert("Succesfully Added!");
        setNewUser({ name: "", email: "", gender: "", status: "" });
      } catch (error) {
        console.error("Error fetching user list:", error);
      }
    }
    else{
      alert("Not filled Every Columns,so not added")
    }

  };

  return (
    <div>
      <form>
        <div className="ui inverted segment">
          <div className="ui segment" style={{ textAlign: "center" }}>
            <h3>Add New User</h3>
          </div>
          <div className="ui inverted form">
            <div className="two fields">
              <div className="field">
                <label>Name</label>
                <input
                  placeholder="Name"
                  type="text"
                  value={newUser.name}
                  name="name"
                  onChange={handleInputChange}
                />
              </div>
              <div className="field">
                <label>Email</label>
                <input
                  placeholder="Email"
                  type="email"
                  value={newUser.email}
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
            <div>
              <button
                className="btn btn-success"
                type="submit"
                onClick={handleSubmit}
              >
                <Link to="/" style={linkStyle}>
                  Add
                </Link>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddNewUser;
