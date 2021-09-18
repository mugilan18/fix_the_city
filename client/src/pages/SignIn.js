import React, { useState, useEffect } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import SignIn from 'components/SignIn';
import validateForm from 'utils/validateForm';
import useFormInput from 'hooks/useFormInput';
import { useAuth } from 'context/AuthContext';
//import Addmin from "./Addmin"
import "./img.css"

function SignInPage() {
  const location = useLocation();
  const username = useFormInput('');
  const password = useFormInput('');
  const [errors, setErrors] = useState({});
  const [redirect, setRedirect] = useState(false);
  const { isAuthenticated, login } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      setRedirect(true);
    }
  }, [isAuthenticated]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // if(username.value==="admin" &password.value==="open")
    // {
    //   console.log("admin")
    //   const { from } = location.state || { from: { pathname: '/addmin' } };
    //   return <Redirect to={from} />

    //  }



    const userData = { username: username.value, password: password.value };
    const errors = validateForm(userData); 
    if (errors) {
      setErrors(errors);
      console.log("this page1")
    } else {
      login(userData).catch((err) => {
        setErrors({ message: err.response.data.message });
        console.log("this page2")
      });
    }
  };

  if (redirect) {
   
    const { from } = location.state || { from: { pathname: '/' } };
    return <Redirect to={from} />;
  
  }
  return (
    <div className="mainback">
    <SignIn
      username={username}
      password={password}
      onSubmit={handleSubmit}
      errors={errors}
    />
    </div>
  );
}

export default SignInPage;
