import { UserContext } from './context/UserProvider'
import {Routes, Route} from 'react-router-dom'
import { useContext } from 'react'

import Register from './routes/Register'
import NotFound from './routes/NotFound'
import Perfil from './routes/Perfil'
import Login from './routes/Login'
import Home from './routes/Home'

import LayoutRequireAuth from './components/layouts/LayoutRequireAuth'
import LayoutContainerForm from './components/layouts/LayoutContainerForm'
import LayoutRedirect from './components/layouts/LayoutRedirect'
import Navbar from './components/Navbar'

const App =() => {
  
  const { user } = useContext(UserContext)

  if(user === false){ 
    return <p>Loading...</p>
  }
  

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<LayoutRequireAuth />}>
          <Route index element={<Home />}/>
          <Route path='perfil' element={<Perfil />}/>
        </Route>

        <Route path='/' element={<LayoutContainerForm />}>
          <Route path='/Login' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
        </Route>

        <Route path='/:nanoid' element={<LayoutRedirect/>}>
          <Route index path='*' element={<NotFound />} />
        </Route>

      </Routes>
    </>
  )
}

export default App
