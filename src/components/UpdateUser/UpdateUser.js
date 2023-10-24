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
    errors,setErrors
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


  const validateUserName=()=>{

    var letters = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    const userName=newUpdateUser.name
    if(userName.match(letters) && ((userName.length)>3))
      {
        setErrors({...errors,nameError:""});
        return true;
      }
    else
      {
        setErrors({...errors,nameError:"Name must be valid and more than 3 letters"});
        setNewUpdateUser({...newUpdateUser,name:""});
        return false;
      }
  }

  const validateUserEmail= ()=>{
    var mailCharacters=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const userEmail=newUpdateUser.email;
    if (mailCharacters.test(userEmail)){     
      setErrors({...errors,errorEmail:""})
      return (true)
    }
    else{
      setErrors({...errors,errorEmail:"invalid Email"})
      setNewUpdateUser({...newUpdateUser,email:""});
      return (false)
    }
  }
  

  const handleUpdate = (event) => {
    event.preventDefault();
    console.log(newUpdateUser.name);

    if ((
      updatingUser.name !== newUpdateUser.name ||
      updatingUser.email !== newUpdateUser.email) && (newUpdateUser.name !=="" && newUpdateUser.name!=="")
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
      alert("Sorry ,not Updated");
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
                  onBlur={validateUserName}
                  />
                  <span id="name-span" style={{color:"red"}}>{errors.nameError}</span>
              
              </div>
              <div className="field">
                <label>Email</label>
                <input
                  placeholder="Email"
                  type="email"
                  value={newUpdateUser.email}
                  name="email"
                  onChange={handleInputChange}
                  onBlur={validateUserEmail}
                  />
                  <span id="email-span" style={{color:"red"}}>{errors.errorEmail}</span>
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
