import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../context/UserProvider";

const Navbar = () => {
  const { user, signOutUser } = useContext(UserContext);

  const handleClickLogOut = async () => {
    try {
      await signOutUser(user);
    } catch (error) {
      console.log(error.code);
    }
  };

  const classButtonColor = (color) => {
    return (
      `text-white bg-${color}-700 hover:bg-${color}-800 focus:ring-4 focus:outline-none focus:ring-${color}-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-${color}-600 dark:hover:bg-${color}-700 dark:focus:ring-${color}-800`
    )
  }

            
  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <Link className="flex items-center" to="/">
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            URLShort APP
          </span>
        </Link>
        <div className="flex md:order-2">
          {user ? (
            <>
              <NavLink to="/" className={classButtonColor('blue')}>
                Inicio
              </NavLink>
              <button
                onClick={handleClickLogOut}
                className={classButtonColor('red')}>
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/Login" className={classButtonColor('blue')}>
                Login
              </NavLink>
              <NavLink to="/register" className={classButtonColor('blue')}>
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
