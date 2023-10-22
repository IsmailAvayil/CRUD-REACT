import UsersList from './components/UsersList/UsersList';
import AppContextProvider from './contexts/AppContext';
import {HashRouter, Route, Routes } from "react-router-dom";
import AddNewUser from './components/AddNewUser/AddNewUser';
import UpdateUser from './components/UpdateUser/UpdateUser';
import UserDetails from './components/UserDetails/UserDetails';
import './app.css'



function App() {
  return (
    <AppContextProvider>
      <HashRouter>
        <div className="App">
          <div className='crud-operations'>
            <Routes>
              <Route Component={UsersList} exact path='/'></Route>
              <Route Component={AddNewUser} path='/AddNewUser'></Route>
              <Route Component={UpdateUser} path="/UpdateUser"></Route>
              <Route Component={UserDetails} path="/UserDetails"></Route>
            </Routes>
          </div>
        </div>
      </HashRouter>
    </AppContextProvider>
  );
}

export default App;
