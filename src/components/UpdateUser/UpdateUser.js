import React, { useContext, useEffect } from "react";
import { AppContext } from "../../contexts/AppContext";
import { API_KEY } from "../../constants/constants";
import Axios from "../../Axios";
import { Link } from "react-router-dom";

const UpdateUser = () => {
  const {
    users,
    linkStyle,
    setUsers,
    updatingUser,
    newUpdateUser,
    setNewUpdateUser,
  } = useContext(AppContext);
  var clickedId = updatingUser.id;
  console.log(clickedId);
  useEffect(() => {
    Axios.get("public/v2/users/" + clickedId, {
      headers: {
        Authorization: API_KEY,
      },
    })
      .then((response) => {
        console.log(response);
        console.log(newUpdateUser);
        setNewUpdateUser({
          ...setNewUpdateUser,
          name: response.data.name,
          email: response.data.email,
        });
      })
      .catch((error) => {
        console.error("Error fetching user list:", error);
      });
  }, [clickedId]);

  const handleInputChange = (event) => {
    setNewUpdateUser({
      ...newUpdateUser,
      [event.target.name]: event.target.value,
    });
  };
  const handleGenderChange = (event) => {
    setNewUpdateUser({ ...newUpdateUser, gender: event.target.value });
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    console.log(newUpdateUser.name);

    if (
      updatingUser.name !== newUpdateUser.name ||
      updatingUser.email !== newUpdateUser.email
    ) {
      Axios.put(`public/v2/users/${updatingUser.id}`, newUpdateUser, {
        headers: {
          Authorization: API_KEY,
        },
      })
        .then((response) => {
          setUsers([...users, response.data]);
          alert("Succesfuly updated!");
        })
        .catch((error) => {
          console.error("Error fetching user list:", error);
        });
    } else {
      alert("not made any Changes!");
    }
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
                  value={newUpdateUser.name}
                  name="name"
                  onChange={handleInputChange}
                />
              </div>
              <div className="field">
                <label>Email</label>
                <input
                  placeholder="Email"
                  type="email"
                  value={newUpdateUser.email}
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
                    disabled
                  />
                  <label>Male</label>
                </div>
                <div className="ui radio checkbox">
                  <input
                    type="radio"
                    value="female"
                    name="gender"
                    onChange={handleGenderChange}
                    disabled
                  />
                  <label>Female</label>
                </div>
              </div>
            </div>
            <div className="inline fields">
              <label>Status:</label>
              <div className="two field">
                <div className="ui radio checkbox">
                  <input type="radio" value="Active" name="status" disabled />
                  <label>Active</label>
                </div>
                <div className="ui radio checkbox">
                  <input type="radio" value="Inactive" name="status" disabled />
                  <label>Inactive</label>
                </div>
              </div>
            </div>
            <div className="two field">
              <button
                className="btn btn-success"
                type="submit"
                onClick={handleUpdate}
              >
                <Link to="/" style={linkStyle}>
                  Update
                </Link>
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

export default UpdateUser;
