import {NavLink} from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/Login'>Login</NavLink>
    </div>
  )
}

export default Navbar
