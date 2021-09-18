import React from 'react';
//import DisplayError from 'components/DisplayError';
//import TweetsBoard from 'components/TweetsBoard';
import { Container } from 'shared/layout';
import 'styled-components/macro';
//import { useTweets } from 'utils/tweets';
import complain from './complain.jpeg'
import './img.css'
import Footer from '../components/Footer/index'




function Homepage() {
 

  return (
    <div className="mainback">
    <Container>
    
      <h1 className="title" style={{color: "black",fontSize: "70px",textAlign: "center",left: "665px",top:"400px"}}>Fix The City</h1>
     
    </Container>
    <Footer style={{poesition:"relative",top:"110%"}}/>
   
    </div>
  );
}

export default Homepage;
