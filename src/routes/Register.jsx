import { useContext } from "react";
import { useState } from "react";
import { UserContext } from "../context/UserProvider";

const Register = () => {
  const [email, setEmail] = useState("federico@federico.com");
  const [password, setPassword] = useState("123456");

  const { registerUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("procesando registro", email, password);
    try {
      await registerUser(email, password);
      console.log('usuario creado')
    } catch (error) {
      console.log(error.code);
      alert('Este email ya está registrado')
    }
  };

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Ingrese email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Ingrese password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Registrar</button>
      </form>
    </>
  );
};

export default Register;
