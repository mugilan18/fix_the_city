import React,{useState} from 'react';
import DisplayError from 'components/DisplayError';
import TweetsBoard from 'components/TweetsBoard';
import { Container } from 'shared/layout';
import 'styled-components/macro';
import { useTweets } from 'utils/tweets';
import './img.css'
import { ItemGroup } from 'components/TweetsBoard/style';
import { keys } from 'lodash';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';


const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});


function Problemlist(props) {
  const classes = useStyles();
  const {
    data,
    error,
    status,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useTweets();
  const [details,setDetails] = useState([{}])
  const [list,setList]=useState([{}])
  const [buttond,setButtond]=useState(false)
  let tempdets=[]
   const clist =()=>{ 
     for (let i=0;i<data.pages[0].results.length ;i++) {
    //  console.log(data.pages[0].results[i].author.username)
    //  console.log(data.pages[0].results[i].text.split(",")[1].split(":")[1])
    //  console.log(data.pages[0].results[i].text.split(",")[2].split(":")[1])
     let name = data.pages[0].results[i].author.username
     let place = data.pages[0].results[i].text.split(",")[0].split(":")[1]
     let to = data.pages[0].results[i].text.split(",")[1].split(":")[1].trim()
     let problem = data.pages[0].results[i].text.split(",")[2].split(":")[1]
     let image = data.pages[0].results[i].text.split("image:")[1]
 
     tempdets.push({name,place,to,problem,image})
     setDetails(tempdets)
     }
     setList(details.filter(function(item){
      return item.to == props.filval
    }))
    // console.log("after",list)
    // console.log(data.pages[0].results[0].text.split(",")[1].split(":")[1].trim())
    // console.log(props.filval)
    if (buttond===true){
      setButtond(false)
    }
    else{
      setButtond(true)
    }
   }

   const reply =(name)=>{ 
    fetch('http://localhost:3001/admin', {
  method: 'POST', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({name:name}),
})
.then(response => response.json())
.then(data => {
  console.log('Success:', data);
})
.catch((error) => {
  console.error('Error:', error);
});
console.log(name)
   }





  return (
    <div className="mainback">
      <button onClick={clist}>{props.filval}</button> 
    <Container style={{display: buttond ? 'block' : 'none' }}>

   
  
    {list.map((user) => (
      <Card className={classes.root} variant="outlined">
        <CardContent>
        name:{user.name}
        <br/>
        location:{user.place}
        <br/>
        mail to :{user.to}
        <br/>
        problem: {user.problem}
        <br/>
        image:
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
         
          image={user.image}
          style={{height:"100px",width:"100px"}}
        
        />
        <button onClick={()=>reply(user.problem)}>Task Completed</button>
      
        </CardContent>
        </Card>
      ))}
    </Container>
    </div>
  );
}

export default Problemlist;
