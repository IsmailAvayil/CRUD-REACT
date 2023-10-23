import { createContext, useState } from "react";
export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(null);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    gender: "",
    status: "",
  });
  const [currentUser, setCurrentUser] = useState("");
  const [page, setPage] = useState(1);
  const [updatingUser, setUpdatingUser] = useState({ name: "", email: "" });
  const [newUpdateUser, setNewUpdateUser] = useState({
    name: "",
    email: "",
    gender: "",
    status: "",
  });
  const linkStyle={color:"white",textDecoration:"none"}

 



  const value = {
    linkStyle,
    userId,
    setUserId,
    users,
    setUsers,
    currentUser,
    setCurrentUser,
    updatingUser,
    setUpdatingUser,
    newUser,
    setNewUser,
    page,
    setPage,
    newUpdateUser, setNewUpdateUser
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
export default AppContextProvider;
