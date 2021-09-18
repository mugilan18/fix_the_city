import React,{useState} from 'react'
import InputGroup from 'components/InputGroup';
import { Button } from 'shared/components';
import Problemlist from "./Problemlist"
import { Link} from 'react-router-dom';


import {Title, Form} from '../components/SignIn/style.js';
import dataas from  "./adminuser.json";

function Adminlogin () {
    const [usern, setUsern] = useState("")
    const [passwrd, setPasswrd] = useState("")
    const [buttond,setButtond]=useState(true)
    const [filval,setFilval]=useState("")
    // const handleChange = ()=>{const value = target.value;
    
    // }
    const check = (e)=>{
      e.preventDefault();
        if(usern===dataas[0].name &passwrd===dataas[0].password){
            console.log("hai Abandonedvehicle")
            setButtond(false);
            setFilval(dataas[0].mail)          
        }
        else if(usern===dataas[1].name &passwrd===dataas[1].password){
          console.log("hai water")
          setButtond(false)
          setFilval(dataas[1].mail)
        }
        else if(usern===dataas[2].name &passwrd===dataas[2].password){  
          console.log("hai electricity")
          setButtond(false)
          setFilval(dataas[2].mail)
        }
        else if(usern===dataas[3].name &passwrd===dataas[3].password){      
          console.log("hai municipality")
          setButtond(false)
          setFilval(dataas[3].mail)
        }
        else{
          console.log("you are not admin")
        }
    }
    return (
        <div>
        {/* <Title>Admin LogIn</Title> */}
        {console.log(dataas[0].name)}
        <Form  style={{display: buttond ? 'block' : 'none' }}>
          <InputGroup
            type="text"
            name="usern"
            value={usern}
            onChange={(e)=>setUsern(e.target.value)}
            
           style={{width:"300px"}}
          />
          <InputGroup
            type="password"
            name="passwd"
            value={passwrd}
            onChange={(e)=>setPasswrd(e.target.value)}
            
           // placeholder="Password"
            style={{width:"300px"}}
         
          />
          <Button data-cy="signin-button"  style={{backgroundColor:"grey"}} onClick={check}>
            Log In
          </Button>
        </Form>

        <div style={{display: buttond ? 'none' : 'block' }}>
        <Problemlist filval={filval} />
        </div>
      
        </div>
    )
}

export default Adminlogin
