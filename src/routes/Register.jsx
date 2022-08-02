import { useContext } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";

const Register = () => {
  const { registerUser } = useContext(UserContext);
  const navegate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError
  } = useForm({
    defaultValues:{
      email: "fede1@fede1.com",
      password: "123123",
      repassword: "123123"
    }
  });

  const onSubmit = async({email, password}) => {
    console.log(email, password)
    try {
      await registerUser(email, password);
      console.log('usuario creado')
      navegate("/")
    } catch (error) {
      console.log(error.code);
      switch(error.code){
        case "auth/email-already-in-use":
          setError("email", {
            message: 'usuario ya registrado'
          })
          break;
        case "auth/invalid-email":
          setError('email', {
            message: "Formado email no válido"
          })
        default:
          console.log('Ocurrio un error en el servidor')
      }

    }
  };


  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          placeholder="Ingrese email"
          {...register("email", {
            required: {
              value: true,
              message: "Campo obligatorio",
            },
            pattern:{
              value: /^[a-z0-9!#$%&'+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'+/=?^_`{|}~-]+)@(?:[a-z0-9](?:[a-z0-9-][a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
              message: "Formato de emal invalido"
            }
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}
        <input
          type="password"
          placeholder="Ingrese password"
          {...register("password", {
            setValueAs: v => v.trim(),
            minLength: {
              value: 6,
              message: "Mínimo 6 carácteres",
            },
            validate:{
              trim: v => {
                if(!v.trim()) 
                  return "No seas payaso"
                return true
              }
            }
            
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}
        <input
          type="password"
          placeholder="Ingrese password"
          {...register("repassword", {
            setValueAs: v => v.trim(),
            validate:{
              equals: v => 
                v === getValues('password') || //creo mi propia validacion y comparo el elemento actual "v" con el elemento anterior que lo selecciono con getValues()
                "Las contraseñas deben ser iguales", //Si la condicion anterior no se cumple ejecuto este mensaje

            }
          })}
        />
        {
          errors.repassword && <p>{errors.repassword.message}</p>
        }
        <button type="submit">Registrar</button>
      </form>
    </>
  );
};

export default Register;