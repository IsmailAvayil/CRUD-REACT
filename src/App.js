import UsersList from './components/UsersList/UsersList';
import AppContextProvider from './contexts/AppContext';
import {HashRouter, Route, Routes } from "react-router-dom";
import AddNewUser from './components/AddNewUser/AddNewUser';
import UpdateUser from './components/UpdateUser/UpdateUser';
import UserDetails from './components/UserDetails/UserDetails';



function App() {
  return (
    <AppContextProvider>
      <HashRouter>
        <div className="App">
          <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)" ,width:"600px"}}>
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
