import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import {createContext} from 'react'
import { auth } from '../firebase'

export const UserContext = createContext()

const UserProvider = (props) => {

    const [user, setUser] = useState(false)

    const registerUser =  (email, password) => createUserWithEmailAndPassword(auth, email, password)

    const loginUser = (email, password) => signInWithEmailAndPassword(auth, email, password)

    return(
        <UserContext.Provider value={{user, setUser, registerUser, loginUser}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserProvider