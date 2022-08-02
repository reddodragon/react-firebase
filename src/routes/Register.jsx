import { useContext } from "react";
import { useState } from "react";
import { useForm} from "react-hook-form"
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";

const Register = () => {
  
  const { registerUser } = useContext(UserContext);
  const navegate = useNavigate()

  const { register, handleSubmit, formState: {errors}} = useForm()
  
  const onSubmit = data => console.log(data)


  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log("procesando registro", email, password);
  //   try {
  //     await registerUser(email, password);
  //     console.log('usuario creado')
  //     navegate("/")
  //   } catch (error) {
  //     console.log(error.code);
  //     alert('Este email ya está registrado')
  //   }
  // };

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          placeholder="Ingrese email"
        />
        <input
          type="password"
          placeholder="Ingrese password"
        />
        <button type="submit">Registrar</button>
      </form>
    </>
  );
};

export default Register;
