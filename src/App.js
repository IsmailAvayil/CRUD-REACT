import UserListPage from './components/User List Page/UserListPage';
import AppContextProvider from './contexts/AppContext';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddNewUser from './components/AddNewUser/AddNewUser';
import UpdateUserPage from './components/UpdateUserPage/UpdateUserPage';
import UserDetailsPage from './components/UserDetailsPage/UserDetailsPage';



function App() {
  return (
    <AppContextProvider>
      <BrowserRouter>
        <div className="App" >
          <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)" }}>
            <Routes>
              <Route Component={UserListPage} exact path='/' />
              <Route Component={AddNewUser} path='/AddNewUser'></Route>
              <Route Component={UpdateUserPage} path='UpdateUserPage'></Route>
              <Route Component={UserDetailsPage} path="/UserDetailsPage"></Route>
              <Route></Route>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </AppContextProvider>




  );
}

export default App;
