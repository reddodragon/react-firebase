import {Routes, Route} from 'react-router-dom'
import Login from './routes/Login'
import Home from './routes/Home'
import Navbar from './components/Navbar'
import RequireAuth from './components/RquireAuth'

const App =() => {
  

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={
          <RequireAuth>
            <Home/>
          </RequireAuth>
        }/>
        <Route path='/Login' element={<Login/>}/>
      </Routes>
    </>
  )
}

export default App
