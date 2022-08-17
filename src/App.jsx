import {Routes, Route} from 'react-router-dom'
import Login from './routes/Login'
import Home from './routes/Home'
import Navbar from './components/Navbar'
import RequireAuth from './components/RquireAuth'
import Register from './routes/Register'
import { useContext } from 'react'
import { UserContext } from './context/UserProvider'
import LayoutContainerForm from './components/LayoutContainerForm'

const App =() => {
  
  const { user } = useContext(UserContext)

  if(user === false){ 
    return <p>Loading...</p>
  }
  

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={
          <RequireAuth>
            <Home/>
          </RequireAuth>
        }/>

        <Route path='/' element={<LayoutContainerForm />}>
          <Route path='/Login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
