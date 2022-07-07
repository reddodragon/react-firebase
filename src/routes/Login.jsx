import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../context/UserProvider";

const Login = () => {
  const { user, setUser } = useContext(UserContext);
  
  const navegate = useNavigate()

  const handleClickLogin = () => {
    setUser(!user)
    navegate('/')
  }
  
  return (
    <div>
      <h1>Login</h1>
      <h2>{user ? "En linea" : "ofline"}</h2>
      <button onClick={handleClickLogin}>Accede</button>
    </div>
  );
};

export default Login;
