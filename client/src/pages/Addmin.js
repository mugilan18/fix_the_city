import React,{useState} from 'react'
import InputGroup from 'components/InputGroup';
import { Button } from 'shared/components';
import Problemlist from "./Problemlist"
import { Switch ,Redirect, Route } from 'react-router-dom';
import Adminlogin from "./Adminlogin"



import {Title, Form} from '../components/SignIn/style.js';

function Addmin() {
  
    return (
      <div className="mainback">
        <Title>Admin Page</Title>
       <Switch>
         <Route exact path="/addmin">
           <Adminlogin/>
         </Route>
         <Route exact path="/addmin/main">
           <Problemlist/>
         </Route>
       </Switch>
       
        </div>
    )
}

export default Addmin
