import React from 'react';
import './navbar.css'; 

const navbar= () =>{
  return (
  <nav className="navbar" id='navbar'>
    <ul>
        <h1>Target</h1>
        <li className="nav-item">
            <a href="#">Home</a>
        </li>
        <li className="nav-item">
            <a href="#"><b>Contact</b></a>
        </li>
    </ul>
  </nav>
  );
}
export default navbar;