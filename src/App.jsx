import {Routes, Route} from 'react-router-dom'
import Login from './routes/Login'
import Home from './routes/Home'
import Navbar from './components/Navbar'
const App =() => {
  

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Login' element={<Login/>}/>
      </Routes>
    </>
  )
}

export default App
