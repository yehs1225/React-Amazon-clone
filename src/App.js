import React,{useEffect} from 'react';
import './App.css';
import Header from './Header'
import Home from './Home'
import Checkout from './Checkout'
import Login from './Login'
import Payment from './Payment'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import {auth} from "./firebase"
import {onAuthStateChanged } from "firebase/auth";
import { useStateValue } from './StateProvider';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from "@stripe/react-stripe-js";

const promise = loadStripe(
  'pk_test_51KPi1CEnflWGK3MYSsSsrFdXFuxEkLSyenl0jgCCdoEMvEWBXpJCefqOyQyaZgrY2qcIMfjWtFzmf4POipv4S0UJ00lUa4xXil'
);//public key

function App() {
  const [{},dispatch]=useStateValue();
  //will only run once when the app component is loads,(since [] is unchanged)
  useEffect(()=>{
    //will only run once when the app component is loads,(since [] is unchanged)
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({
          type:"SET_USER",
          user:user
        })
      } else {
        dispatch({
          type:"SET_USER",
          user:null
        })
      }
    });
  },[])
  return (
    <Router>
      <div className="App"> 
       
        <Routes>
          {/* Go to Payment page */}
          <Route path="/payment" element={<><Header/><Elements stripe={promise}><Payment/></Elements></>}/>
          {/* Go to Login page */}
          <Route path="/login" element={<Login/>} />
          {/* Go checkout page */}
          <Route path="/checkout" element={<><Header /><Checkout/> </>} />
          {/* Go here when url==/ or not found */}
          <Route path="/" element={<><Header /><Home /></>} />
        </Routes>
      </div>
    </Router> 
  );
}

export default App;
