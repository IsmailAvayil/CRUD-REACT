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
  const [updateUserId, setUpdateUserId] = useState("");

  const [page, setPage] = useState(1);

  const value = {
    userId,
    setUserId,
    users,
    setUsers,
    currentUser,
    setCurrentUser,
    updateUserId,
    setUpdateUserId,
    newUser,
    setNewUser,
    page,
    setPage,
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
export default AppContextProvider;
