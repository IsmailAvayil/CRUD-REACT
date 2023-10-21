import React, { useContext, useEffect } from 'react';
import { AppContext } from '../../contexts/AppContext';
import axios from '../../axios';
import { API_KEY } from '../../constants/constants';
import { Link } from 'react-router-dom';

const UserDetailsPage = () => {
  const { userId, currentUser, setCurrentUser } = useContext(AppContext)
  useEffect(() => {
    axios.get(`public/v2/users/${userId}`, {
      headers: {
        Authorization: API_KEY,
      }
    })
      .then(response => {
        setCurrentUser(response.data)
      })
      .catch(error => {
        console.error('Error fetching user list:', error);
      });
  }, [userId]);



  return (
    <div className='details-container '>
      <div className="ui inverted segment">
        <div className="ui segment" style={{ textAlign: "center" }}>
          <h3>{currentUser.name}'s Details</h3>
        </div>
        <div className="ui inverted form">
          <div className="field">
            <label>NAME :</label>
            <p>{currentUser.name}</p>
          </div>
          <div className="field">
            <label>EMAIL :</label>
            <p>{currentUser.email}</p>
          </div>
          <div className="field">
            <label>GENDER :</label>
            <p>{currentUser.gender}</p>
          </div>
          <div className="field">
            <label>STATUS</label>
            <p>{currentUser.status}</p>
          </div>
          <Link to="/" type="button" className="btn btn-secondary" >Back</Link>
        </div>
      </div>`
    </div>
  )
}

export default UserDetailsPage
