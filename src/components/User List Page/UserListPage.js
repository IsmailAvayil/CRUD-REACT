import { API_KEY } from '../../constants/constants';
import axios from '../../axios';
import { useEffect, useContext, useState } from 'react';
import { AppContext } from '../../contexts/AppContext';
import { Link,useNavigate } from 'react-router-dom';
import Pagination from '../Pagination';




const UserListPage = () => {
  const { users, setUsers, userId, setUserId, updateUserId, setUpdateUserId, page } = useContext(AppContext);
  const navigate=useNavigate()


  const per_page = 4
  useEffect(() => {
    axios.get(`public/v2/users?page=${page}&per_page=${per_page}`, {
      headers: {
        Authorization: API_KEY,
      }
    })
      .then(response => {
        setUsers(response.data)
      })
      .catch(error => {
        console.error('Error fetching user list:', error);
      });
  }, [page]);

  const userDetails = (id) => {
    setUserId(id)
  }


  const handleDelete = (id) => {
    const deleteItem = users.filter(obj =>
      obj.id != id
    )
    console.log(id)
    axios.delete(`public/v2/users/${id}`, {
      headers: {
        Authorization: API_KEY,
      }
    })
      .then((response) => {
        setUsers(deleteItem)
        navigate('/')
        alert(`Deleted successfully :${id}`);
        // You can update your component's state or perform other actions here if needed.
      })
      .catch((error) => {
        console.error('Error deleting data:', error);
      });
  }

  const handleUpdate = (id) => {
    setUpdateUserId(id);
  }
  return (
    <div className='userslist-container'>
      <div className="ui inverted segment">
        <div className="ui segment" style={{ textAlign: "center" }}>
          <h3>Users List</h3>
        </div>
      </div>
      <div>
        <Link to="/AddNewUser" type="button" className="btn btn-success">Add</Link>
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
        {users && users.map((user, index) => (
          <tbody key={user.id} className="table-group-divider">
            <tr>
              <td>{user.name}</td>
              <td><Link to='/UpdateUserPage' type="button" className="btn btn-info" onClick={() => {
                handleUpdate(user.id)
              }}>Edit</Link></td>
              <td><Link to="/UserDetailsPage" type="button" className="btn btn-light" onClick={() => { userDetails(user.id) }}>View</Link></td>
              <td><Link to="/" type="button" className="btn btn-danger" onClick={() => { handleDelete(user.id) }}>Delete</Link></td>
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
