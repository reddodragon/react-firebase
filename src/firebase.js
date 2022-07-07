
import { initializeApp } from "firebase/app";
import{getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyC359l77NLESAsCZuK8pTkLSGoxHsWxh3I",
  authDomain: "react-firebase2022-d9c9c.firebaseapp.com",
  projectId: "react-firebase2022-d9c9c",
  storageBucket: "react-firebase2022-d9c9c.appspot.com",
  messagingSenderId: "418763684246",
  appId: "1:418763684246:web:b97d208b22db9767a5c5b7"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export {auth}