import { useState,useEffect } from "react";
import { formValidate } from "../utils/formValidate";
import useFirestore from "../hooks/useFirestore";
import { useForm } from "react-hook-form";


import Button from "../components/Button";
import Title from "../components/Title";
import FormInput from "../components/FormInput";
import FormError from "../components/FormError";
import { erroresFirebase } from "../utils/erroresFirebase";
import { async } from "@firebase/util";


const Home = () => {
  const { required, patternURL } = formValidate();

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
    setError,
    setValue,
  } = useForm();

  const { data, error, loading, getData, addData, deleteData, updateData } = useFirestore();
  const [newOriginID, setNewOriginID] = useState()
  const [copy, setCopy] = useState({})

  useEffect(() => {
    console.log("getData");
    getData();
  }, []);

  if (loading.getData) return <p>Loading data getData...</p>;
  if (error) return <p>{error}</p>;

  const onSubmit = async ({url}) => {
    try {
      if(newOriginID){
        await updateData(newOriginID, url)
        setNewOriginID('')
      }else{
        await addData(url);
      }
      resetField('url')
      
    } catch (error) {
      const { code, message } = erroresFirebase(error.code);
      setError(code, {message})
    }
  };

  const handleClickDelete = async (nanoid) =>  {
    await deleteData(nanoid)
  }

  const handleClickEdit = (item) => {
      setValue('url', item.origin)
      setNewOriginID(item.nanoid)
  }

  const pathURL = window.location.href

  const handleClickCopy = async(nanoid) => {
    await navigator.clipboard.writeText(window.location.href + nanoid)
    setCopy({[nanoid]: true})
  }

  return (
    <>
      <Title text="Home" />

      <form onSubmit={handleSubmit(onSubmit)}>

        <FormInput
            label="Ingresa tu URL"
            type="text"
            placeholder="https://URL.com"
            {...register("url", {
              required,
              pattern: patternURL,
            })}
            error={errors.url}
          >
            <FormError error={errors.url} />
          </FormInput>

          {
            newOriginID ? (
              <Button text="Edite URL" loading={loading.updateData} color="green" type="submit" />
            ):(

              <Button text="ADD URL" loading={loading.addData} color="blue" type="submit" />
            )
          }  
      </form>

      {data.map((item) => (
        <div key={item.nanoid} className="p-6 bg-gray-200 rounded-lg border border-gray-300 dark:bg-gray-800 dark:border-gray-700 mb-2">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{pathURL}{item.nanoid}</h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.origin}</p>
          <div className="flex space-x-2">
              <Button 
                text="Delete" 
                color="red" 
                type="button" 
                loading={loading[item.nanoid]}
                onClick={() => handleClickDelete(item.nanoid)}
              />
              <Button 
                text="Edit" 
                color="green" 
                type="button" 
                onClick={() => handleClickEdit(item)}
              />
              
              <Button 
                text={copy[item.nanoid] ? 'Copied' : 'Copy'} 
                color="purple" 
                type="button" 
                onClick={() => handleClickCopy(item.nanoid)}
              />
          </div>
        </div>
      ))}
    </>
  );
};

export default Home;
