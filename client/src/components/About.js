import React from 'react'
import { Container } from 'shared/layout';
import SchoolIcon from '@material-ui/icons/School';
import OpacityIcon from '@material-ui/icons/Opacity';
import BatteryCharging60Icon from '@material-ui/icons/BatteryCharging60';
import PeopleIcon from '@material-ui/icons/People';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import DriveEtaIcon from '@material-ui/icons/DriveEta';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));
  
function About() {
    const classes = useStyles();
    function FormRow() {
        return (
          <React.Fragment>
            <Grid item xs={3}>
              <Paper className={classes.paper}><PeopleIcon/><br/> Municipality</Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper className={classes.paper}><BatteryCharging60Icon/><br/>Electricity</Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper className={classes.paper}><OpacityIcon/> <br/>water</Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper className={classes.paper}><DriveEtaIcon/><br/> Abandonedvehicle</Paper>
            </Grid>
          </React.Fragment>
        );
      }

    return (
        <Container  style={{width:"100%" , alignItems:'center',backgroundColor:"#daa520"}} >
        <div style={{width:"600px",textAlign:"justify",alignItems:"center",margin:"auto"}}>
            <h3 style={{textAlign:"center"}}>Our Focus</h3>
        <h5>
            Nowadays, people have access to the internet everywhere, so It is easy to have complaint tracking software with multichannel capabilities to respond quickly to their queries. Fix the city collects all  queries from different channels and organizes them under one tab, to help authorities to respond all of them. These channels include  - Abandonedvehicle, water, electricity, and municipality.
            Customer service complaint support system - Fix the city
</h5>
<br/>
<div>
    <ul>
        <li>
<h5>Email:</h5> People's emails are kept get safe, The complaint registered are sent from anonymous mail (official mail of fix the City) to the individual officer or department regarding the complaint.
</li>
<br/>
<li>
<h5>Live chat:</h5> You can chat with officers to understand their concerns better, and give them more timely, personalized help. You can also convert these chats into complaints in your online complaint system if the issue needs more detailed attention. This way, you can respond to customer issues in a jiffy
        </li>
        </ul>    
        <h3 style={{textAlign:"center"}}>Few Of our Department</h3>
        <br/>
        <br/>
        <div className={classes.root}>
      <Grid container spacing={12}>
        <Grid container item xs={18} spacing={2}>
          <FormRow />
        </Grid>
       
      </Grid>
    </div>
</div>

</div>

</Container>
    )
}

export default About
