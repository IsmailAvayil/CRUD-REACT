import React,{useContext} from 'react';
import {useNavigate} from 'react-router-dom'
import { API_KEY } from '../../constants/constants';
import axios from '../../axios';
import { Link } from 'react-router-dom';
import { AppContext } from '../../contexts/AppContext'; 


function AddNewUser() {
  const{users,setUsers,newUser,setNewUser}=useContext(AppContext);
  const navigate=useNavigate()
  
  

  const handleInputChange=(event)=>{
    setNewUser({...newUser,[event.target.name]:event.target.value})
  
  }

  const handleGenderChange=(event)=>{
    setNewUser({...newUser,gender :event.target.value})
  }
  const handleStatusChange=(event)=>{
    setNewUser({...newUser,status :event.target.value})
  }



  const handleSubmit =(event) =>{
    event.preventDefault()
    console.log(newUser)
    axios.post('public/v2/users',newUser,{
      headers: {
        Authorization: API_KEY,
      }
    }).then(response=>{
      setUsers([...users,response.data]);
      alert(`Succesfully Submitted : ${newUser.name}-${newUser.email}-${newUser.gender}-${newUser.status}`)
      setNewUser({name:"",email:"",gender:"",status:""})
    }).catch(error => {
      console.error('Error fetching user list:', error);
    })
  }
  return (
    <div>      
      <form onSubmit={handleSubmit}>
        <div className="ui inverted segment">
          <div className="ui segment" style={{textAlign:"center"}}>
            <h3>Add New User</h3>
          </div>
          <div className="ui inverted form">
            <div className="two fields">
              <div className="field">
                <label>Name</label>
                <input placeholder="Name" type="text" value={newUser.name} name="name" onChange={handleInputChange} />
              </div>
              <div className="field">
                <label>Email</label>
                <input placeholder="Email" type="email" value={newUser.email} name="email" onChange={handleInputChange}/>
              </div>
            </div>
            <div className="inline fields">
              <label>Gender:</label>
              <div className="two field">
                <div className="ui radio checkbox">
                <input type='radio'
                  value="Male"
                  name="gender"
                  onChange={handleGenderChange} />
                  <label>Male</label>
                </div>
                <div className="ui radio checkbox">
                <input type='radio'
                  value="female"
                  name="gender"
                  onChange={handleGenderChange} />
                  <label>Female</label>
                </div>
              </div>
            </div>
            <div className="inline fields">
              <label>Status:</label>
              <div className="two field">
                <div className="ui radio checkbox">
                <input type='radio'
                  value="Active"
                  name="status"
                  onChange={handleStatusChange} />
                  <label>Active</label>
                </div>
                <div className="ui radio checkbox">
                <input type='radio'
                  value="Inactive"
                  name="status"
                  onChange={handleStatusChange} />
                  <label>Inactive</label>
                </div>
              </div>
            </div>
            <div>
              <button  type="submit" className="btn btn-success">Submit</button>
              <Link to="/" type="button" className="btn btn-secondary" >Back</Link>
          
            </div>
          </div>
        </div>          
      </form>
    </div>
  )
}

export default AddNewUser;
