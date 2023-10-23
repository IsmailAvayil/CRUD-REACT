import { API_KEY } from "../../constants/constants";
import Axios from "../../Axios";
import { useEffect, useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import { Link} from "react-router-dom";
import Pagination from "../Pagination/Pagination";

const UserListPage = () => {
  const { users, setUsers, setUserId, updatingUser, setUpdatingUser, page } =
    useContext(AppContext);

  const per_page = 4;
  useEffect(() => {
    Axios.get(`public/v2/users`, {
      params: { page: page, per_page: per_page },
      headers: {
        Authorization: API_KEY,
      },
    })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user list:", error);
      });
  }, [page]);

  const userDetails = (id) => {
    setUserId(id);
  };

  const handleDelete = (id) => {
    const unDeleteUsers = users.filter((obj) => obj.id !== id);
    console.log(id);
    Axios.delete(`public/v2/users/${id}`, {
      headers: {
        Authorization: API_KEY,
      },
    })
      .then((response) => {
        console.log(response);
        alert(`Deleted Succesfully!`);
        setUsers(unDeleteUsers);
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      });
  };

  const handleUpdate = (
    updatingUserId,
    updatingUserName,
    updatingUserEmail
  ) => {
    setUpdatingUser({
      ...updatingUser,
      id: updatingUserId,
      name: updatingUserName,
      email: updatingUserEmail,
    });
  };
  return (
    <div className="userslist-container">
      <div className="ui inverted segment">
        <div className="ui segment" style={{ textAlign: "center" }}>
          <h3>Users List</h3>
        </div>
      </div>
      <div>
        <Link to="/AddNewUser" type="button" className="btn btn-success">
          Add
        </Link>
      </div>
      <table className="table userslist-table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Edit</th>
            <th scope="col">View</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        {users &&
          users.map((user) => (
            <tbody key={user.id} className="table-group-divider">
              <tr>
                <td>{user.name}</td>
                <td>
                  <Link
                    to="/UpdateUser"
                    type="button"
                    className="btn btn-info"
                    onClick={() => {
                      handleUpdate(user.id, user.name, user.email);
                    }}
                  >
                    Edit
                  </Link>
                </td>
                <td>
                  <Link
                    to="/UserDetails"
                    type="button"
                    className="btn btn-light"
                    onClick={() => {
                      userDetails(user.id);
                    }}
                  >
                    View
                  </Link>
                </td>
                <td>
                  <Link
                    to="/"
                    type="button"
                    className="btn btn-danger"
                    onClick={() => {
                      handleDelete(user.id);
                    }}
                  >
                    Delete
                  </Link>
                </td>
              </tr>
            </tbody>
          ))}
      </table>
      <div>
        <Pagination />
      </div>
    </div>
  );
};
export default UserListPage;
