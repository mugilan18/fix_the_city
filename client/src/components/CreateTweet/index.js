import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { DialogOverlay } from '@reach/dialog';
import '@reach/dialog/styles.css';
import {
  Header,
  Title,
  CloseButton,
  Content,
  Form,
  Textarea,
  Button,
  StyledDialogContent,
} from './style';
import TextareaGroup from 'components/TextareaGroup';
import { useCreateTweet } from 'utils/tweets';
import { IoMdClose } from 'react-icons/io';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import Select from '@material-ui/core/Select';
import Modal from 'react-modal';
import Map from "./Map"
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


const intialValue = {
  problem: "",
  place: "",
  postTo: ""
}
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export function CreateTweetModal() {
  const history = useHistory();

  const close = (e) => {
    if (e) e.stopPropagation();
    history.goBack();
  };

  return (
    <DialogOverlay onDismiss={close}>
      <StyledDialogContent aria-label="Compose new Problem">
        <Header>
          <Title>Compose new Problem</Title>
          <CloseButton onClick={close}>
            <IoMdClose />
          </CloseButton>
        </Header>
        <Content>
          <CreateTweetForm onCreate={close} />
        </Content>
      </StyledDialogContent>
    </DialogOverlay>
  );
}

function CreateTweetForm({ onCreate }) {
  const [text, setText] = useState(intialValue);
  const [errors, setErrors] = useState({});
  const createTweetMutation = useCreateTweet();
  const [image,setImage] = useState( {file: null, base64URL: ""})
  const [imagetxt,setImagetxt] = useState("")
  const [loc,setLoc]=useState("")






  const classes = useStyles();









  const getBase64 = (file) => {
    return new Promise(resolve => {
      let fileInfo;
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
       // console.log("Called", reader);
      // console.log("Called", reader.result);
        baseURL = reader.result;
        console.log("create image : ", typeof baseURL);
        resolve(baseURL);
        setImagetxt(reader.result)
      };
     
    });
  };

 const  handleFileInputChange = (e) => {
    // console.log(e.target.files[0]);
    let { file } = image;

    file = e.target.files[0];

    getBase64(file)
      .then(result => {
        file["base64"] = result;
        console.log("File Is", file);
        setImage({
          base64URL: result,
          file
        });
      })
      .catch(err => {
        console.log(err);
      });

    setImage({
      file: e.target.files[0]
    });
  };











  function handleChange(e) {
    setText(()=>({...text, [e.target["name"]]:e.target["value"]}));
    
  }
 

  function validateTweet(tweet) {
    if (tweet.text.length < 1 || tweet.text.length > 11155580) {
      setErrors({
        message: 'Problem text length must be between 1 and 580 characters',
      });
      return false;
    }
    return true;
  }

  function addTweet(e) {
    e && e.preventDefault();
    const dummy = `place : ${loc}, mailTo : ${text.postTo}, problem : ${text.problem}, image: ${imagetxt}`;
    const tweet = {text: dummy};
   
    
    console.log("while post",tweet)
    if (validateTweet(tweet)) {
      createTweetMutation.mutate(tweet, {
        onSuccess: () => {
          console.log("working")
          if (onCreate) onCreate();
          alert("Complaint Has Been Submitted")
        },
        onError: (err) => {
          console.log("Not working")
          setErrors(
            err.response?.data || { message: 'An error has occurred!' }
          );
        },
      });
    }
  }

  function handleEnterPress(e) {
    e.preventDefault();
    if (e.keyCode === 13 && e.shiftKey === false) {
      addTweet();
    }
  }



  const openModal = () => {
      
    setIsOpen(true);

  }
  function closeModal() {
    setIsOpen(false);
  }
  const [modalIsOpen, setIsOpen] = React.useState(false);


















  return (
    <Form onSubmit={addTweet}>
      <TextareaGroup
        textarea={Textarea}
        text={text.problem}
        name="problem"
        handleChange={handleChange}
        handleEnterPress={handleEnterPress}
        placeholder="What's happening?"
        error={Object.keys(errors).length > 0}
        errorMsg={errors.message || ''}
      />
      {/* <TextareaGroup
        textarea={Textarea}
        text={text.place}
        name="place"
        handleChange={handleChange}
        handleEnterPress={handleEnterPress}
        placeholder="Place that problem occuring"
        error={Object.keys(errors).length > 0}
        errorMsg={errors.message || ''}
      /> */}



        <InputLabel id="demo-simple-select-label">Complain To</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          //value={age}
          onChange={handleChange}
          text={text.postTo}
          name="postTo"
        >
          <MenuItem value="abandonedvehicle@gmail.com">Abandonedvehicle</MenuItem>
          <MenuItem value="water@gmail.com">water</MenuItem>
          <MenuItem value="electricity@gmail.com">electricity</MenuItem>
          <MenuItem value="municipality@gmail.com">Municipality</MenuItem>
        </Select>
    
    






        <Button
       primary
       onClick={(e)=>{e.preventDefault();openModal()}}
       
       >Add Location</Button>
        <Modal
        isOpen={modalIsOpen}
        ariaHideApp={false}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
         <button onClick={closeModal} style={{position:"absolute", right:"20px"}} > X </button>
         <Map setLoc={setLoc} />
      </Modal>













       <div>
        <input type="file" name="file" onChange={handleFileInputChange} />
      </div>
      <Button
        primary
        type="submit"
        disabled={
          text.length < 1 || text.length > 580 || createTweetMutation.isLoading
        }
      >
        {createTweetMutation.isLoading ? 'Loading...' : 'Problem'}
      </Button>
    </Form>
  );
}

CreateTweetForm.propTypes = {
  onCreate: PropTypes.func,
};

export default CreateTweetForm;
