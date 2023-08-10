import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.svg";
import {UserContext} from "../UserContext";
import {useContext, useEffect, useState} from "react";


function Navbar() {
  const {setUserInfo,userInfo} = useContext(UserContext);
  
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
         navigate("/"); 
      });
   
    });
  }, []);

  
  const [active, setActive] = useState(false);

  function logout() {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  }


  const username = userInfo?.username;

  return (
    <div className={`nav ${active ? 'active' : ''}`}>
      
      <Link to="/" className="logo-wrapper">
        <img src={Logo} alt="" className="logo"  />
      </Link>
      <nav className="navList">
    
        <Link to="/" onClick={() => setActive(!active)}> Home </Link>
        <Link to="/allRecepies" onClick={() => setActive(!active)}> See all recepies </Link>
        {username && (
          <>
             <Link to="/create" onClick={() => setActive(!active)}>Add new recipie</Link>
            <Link to="/" onClick={logout}>Logout ({username})</Link>
          </>
        )}
         {!username && (
          <>
            <Link to="/login" onClick={() => setActive(!active)}>Login</Link>
            <Link to="/register" onClick={() => setActive(!active)}>Register</Link>
          </>
        )}
            
      </nav>
      <div className="menu-cont" onClick={() => setActive(!active)}>
        <span className='menu-button'></span>
      </div>
    </div>
  );
}

export default Navbar;