import React from 'react';
import AuthNav from './nav/AuthNav';
import BasicNav from './nav/BasicNav';
import { StyledHeader } from './style';
import { useUser } from 'context/UserContext';
import { StyledNavLink } from 'shared/components';
import { MainNav } from './nav/style';
import { NavItem } from './nav/style';


const Header = () => {
  const user = useUser();

  return (
    
      <MainNav style={{backgroundColor: "#f2e4c0",margin:"auto",width:"100%",marginLeft:"0",marginRight:"0"}}  >
        <ul>
          <StyledNavLink to="/profiles" style={{color:"black"}} >All problems</StyledNavLink>
          <NavItem>
          <h1 style={{color:"black"}}  >Fix The City</h1>
         </NavItem>
          <div>{user ? <AuthNav /> : <BasicNav />}</div>
          
        </ul>
      </MainNav>
  
  );
};

export default Header;
