import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import { erroresFirebase } from "../utils/erroresFirebase";

import FormError from "../components/FormError";
import FormInput from "../components/FormInput";
import { formValidate } from "../utils/formValidate";
import Title from "../components/Title";
import Button from "../components/Button";
const Login = () => {
  const { loginUser } = useContext(UserContext);
  const navegate = useNavigate();
  const { required, patternEmail, minLength, validateTrim } = formValidate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      email: "fede1@fede1.com",
      password: "123123",
    },
  });

  const onSubmit = async ({ email, password }) => {
    try {
      await loginUser(email, password);
      navegate("/");
    } catch (error) {
      console.log(error.code);
      const { code, message } = erroresFirebase(error.code);
      setError(code, { message });
    }
  };

  return (
    <>
      <Title text="Login" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label="Ingresa tu email"
          type="email"
          error={errors.email}
          placeholder="Ingrese email"
          {...register("email", {
            required,
            pattern: patternEmail,
          })}
        >
          <FormError error={errors.email} />
        </FormInput>

        <FormInput
          type="password"
          placeholder="Ingrese password"
          {...register("password", {
            minLength,
            validate: validateTrim,
          })}
          label="Ingresa tu Contraseña"
          error={errors.password}
        >
          <FormError error={errors.password} />
        </FormInput>

        <Button type="submit" text="Login"></Button>
      </form>
    </>
  );
};

export default Login;
