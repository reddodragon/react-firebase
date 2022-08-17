import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import { erroresFirebase } from "../utils/erroresFirebase";
import { formValidate } from "../utils/formValidate";

import FormError from "../components/FormError";
import FormInput from "../components/FormInput";
import Title from "../components/Title";
import Button from "../components/Button";

const Register = () => {
  const { registerUser } = useContext(UserContext);
  const navegate = useNavigate();
  const { required, patternEmail, minLength, validateTrim, validateEquals } =
    formValidate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm({
    defaultValues: {
      email: "fede1@fede1.com",
      password: "123123",
      repassword: "123123",
    },
  });

  const onSubmit = async ({ email, password }) => {
    try {
      await registerUser(email, password);
      navegate("/");
    } catch (error) {
      console.log(error.code);
      const {code, message} = erroresFirebase(error.code)
      setError(code, { message });
    }
  };

  return (
    <>
      <Title text="Register"/>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          type="email"
          placeholder="Ingrese email"
          {...register("email", {
            required,
            pattern: patternEmail,
          })}
          label="Ingresa tu email"
          error={errors.email}
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
        <FormInput
          type="password"
          placeholder="Ingrese password"
          {...register("repassword", {
            validate: validateEquals(getValues("password")),
          })}
          label="Repite tu Contraseña"
          error={errors.repassword}
        >
          <FormError error={errors.repassword} />
        </FormInput>
        <Button text='Register' type='submit'></Button>
      </form>
    </>
  );
};

export default Register;
