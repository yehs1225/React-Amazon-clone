import React from 'react';
import './Header.css'
import {Link } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import {useStateValue } from './StateProvider'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import {auth} from "./firebase"
import {signOut } from "firebase/auth";

function Header() {
    const [{basket,user},dispatch]=useStateValue();
    const handleAuthentication = ()=>{
        if(user){
            signOut(auth).then(() => {
                // Sign-out successful.
              }).catch((error) => {
                // An error happened.
              });
        }
    }
  return (
    <div className='header'>
        <Link to='/'>
            <img className='header__logo' 
            src='http://pngimg.com/uploads/amazon/amazon_PNG11.png'
            />
        </Link>
        <div className='header__search'>
            <input className='header__searchInput' type="text"/>
            <SearchIcon className='header__searchIcon'/>
            {/* logo */}
        </div>
        <div className='header__nav'>
            <Link to={user?'/':'/login'}>
                <div className='header__option' onClick={handleAuthentication}>
                <span className='header__optionLineOne'>
                        {user?user.email:'Hello Guest'}
                    </span>
                    <span className='header__optionLineTwo'>
                        {user?'Sign out':'Sign in'}
                    </span>
                </div>            
            </Link>
            <div className='header__option'>
            <span className='header__optionLineOne'>
                    Returns
                </span>
                <span className='header__optionLineTwo'>
                    & Orders
                </span>                
            </div>
            <div className='header__option'>
            <span className='header__optionLineOne'>
                    Your
                </span>
                <span className='header__optionLineTwo'>
                    Prime
                </span>               
            </div>
            <div className='header__option'>

            </div>
            <Link to="/checkout">
                <div className='header__optionBasket'>
                    <ShoppingBasketIcon/>
                    <span className='header__optionLineTwo header__baseketCount'>{basket?.length}</span>
                </div>           
            </Link>
        </div>
    </div>
  )
}

export default Header;
