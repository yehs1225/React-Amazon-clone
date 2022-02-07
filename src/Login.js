import './Login.css';
import React,{useState} from 'react';
import {Link,useNavigate} from 'react-router-dom';
import {auth}  from "./firebase"
import { signInWithEmailAndPassword,createUserWithEmailAndPassword } from "firebase/auth";

function Login() {
    const [email,setEmail] = useState('');
    const [password,setPassword]=useState('');
    const navigate = useNavigate();
    const signIn = e=>{
        e.preventDefault();//not to refresh
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user);
          navigate('/');
        })
        .catch(error=>alert(error.message))

    }
    const register = e=>{
        e.preventDefault();//not to refresh
        createUserWithEmailAndPassword(auth,email,password)
        .then((userCredential)=>{
            //if it successfully created a new user with email and password
            // Signed in 
            const user = userCredential.user;
            
            console.log(user);
            navigate('/');
        })
        .catch(error=>alert(error.message))

    }
  return (
    <div className='login'> 
        <Link to='/'>
            <img 
                className='login__logo'
                src='https://kfinancial.com/wp-content/uploads/2019/02/amazon-logo-vector-png-vector-png-free-amazon-logos-705.jpg'/>  
        </Link>
        <div className="login__container">
            <h1>Sign-In</h1>
            <form>
                <h5>Email</h5>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}></input>

                <h5>Password</h5>
                <input type="password" value={password} onChange={e=>setPassword(e.target.value)}></input>
                <button type='submit' onClick={signIn} className='login__signInButton'>
                    Sign In
                </button>
            </form>
            <p>
            By continuing, you agree to Fake Amazon's Conditions of Use and Privacy Notice.    
            </p>
            <button onClick= {register}className="login__redgisterButton">
                Create your Amazon account
            </button>
        </div>
    </div>
  )
}

export default Login
