import { useState } from "react";
import { useEffect } from "react";
import ButtonLoading from "../components/ButtonLoading";
import Button from "../components/Button";
import Title from "../components/Title";
import useFirestore from "../hooks/useFirestore";
import { nanoid } from "nanoid";

const Home = () => {
  const { data, error, loading, getData, addData, deleteData, updateData } = useFirestore();
  const [text, setText] = useState("");
  const [newOriginID, setNewOriginID] = useState()

  useEffect(() => {
    console.log("getData");
    getData();
  }, []);

  if (loading.getData) return <p>Loading data getData...</p>;
  if (error) return <p>{error}</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(newOriginID){
      await updateData(newOriginID, text)
      setNewOriginID('')
      setText('')
      return
    }

    await addData(text);
    setText("");
  };

  const handleClickDelete = async (nanoid) =>  {
    console.log('click delete')
    await deleteData(nanoid)
  }

  const handleClickEdit = (item) => {
      console.log("click edit")
      setText(item.origin)
      setNewOriginID(item.nanoid)
  }

  return (
    <>
      <Title text="Home" />

      <form onSubmit={handleSubmit}>
        <input
          placeholder="ex: http://fede.com"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

          {
            newOriginID ? (
              <Button text="Edite URL" loading={loading.updateData} color="green" type="submit" />
            ):(

              <Button text="ADD URL" loading={loading.addData} color="blue" type="submit" />
            )
          }

          
      </form>
      {data.map((item) => (
        <div key={item.nanoid}>
          <p>{item.nanoid}</p>
          <p>{item.origin}</p>
          <p>{item.uid}</p>

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
        </div>
      ))}
    </>
  );
};

export default Home;
