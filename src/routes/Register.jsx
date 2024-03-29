import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import { erroresFirebase } from "../utils/erroresFirebase";
import { formValidate } from "../utils/formValidate";

import FormError from "../components/FormError";
import FormInput from "../components/FormInput";
import Title from "../components/Title";
import Button from "../components/Button";
import ButtonLoading from "../components/ButtonLoading";

const Register = () => {
  const { registerUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const navegate = useNavigate();
  const { required, patternEmail, minLength, validateTrim, validateEquals } =
    formValidate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm();

  const onSubmit = async ({ email, password }) => {
    try {
      setLoading(true)
      await registerUser(email, password);
      navegate("/");
    } catch (error) {
      console.log(error.code);
      const {code, message} = erroresFirebase(error.code)
      setError(code, { message });
    }finally{
      setLoading(false)
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
        <Button type="submit" text="Login" loading={loading}/>
      </form>
    </>
  );
};

export default Register;
