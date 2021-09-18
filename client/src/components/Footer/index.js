import React from 'react';
import './style.css';
import { Link} from 'react-router-dom';


export default function Footer() {
 
  return (
    <div id="footer">
      <Link to = "/about">
      <div id="text">About page</div>
      </Link>
      
    
    </div>
  );
}
