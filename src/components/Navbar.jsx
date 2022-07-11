import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../context/UserProvider";

const Navbar = () => {
  const { user, signOutUser } = useContext(UserContext);

  const handleClickLogOut = async () => {
    try {
      await signOutUser(user);
    } catch (error) {
      console.log(error);
    }
  };
 
  return (
    <div>
      {user ? (
        <>
          <NavLink to="/">Inicio | </NavLink>
          <button onClick={handleClickLogOut}> Logout</button>
        </>
      ) : (
        <>
          <NavLink to="/Login">Login | </NavLink>
          <NavLink to="/register">Register | </NavLink>
        </>
      )}
    </div>
  );
};

export default Navbar;
