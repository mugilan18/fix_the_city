import React, { useRef,useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import { FaRegComment, FaHeart, FaRegHeart } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import Modal from 'react-modal';
import emailjs from 'emailjs-com';
import {
  Container,
  HeaderWrapper,
  Header,
  List,
  ListItem,
  ListItemContent,
  TweetUserGroup,
  TweetText,
  TweetBottomGroup,
  TweetUserName,
  TweetUserUsername,
  ItemGroup,
  DeleteButton,
} from './style';
import {
  InfoText,
  UserAvatar,
  Icon,
  LikeIcon,
  Button,
} from 'shared/components';
import Loading from 'components/Loading';
import portraitPlaceholder from 'img/portrait-placeholder.png';
import { useUser } from 'context/UserContext';
import { useRemoveTweet, useTweetLike, useTweetUnlike } from 'utils/tweets';
import useIntersectionObserver from 'hooks/useIntersectionObserver';
import 'styled-components/macro';



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
function SingleTweet({ tweet, queryKey }) {
  const user = useUser();
  const history = useHistory();
  const location = useLocation();
  const removeTweetMutation = useRemoveTweet(queryKey);
  const likeTweetMutation = useTweetLike(queryKey);
  const unlikeTweetMutation = useTweetUnlike(queryKey);




  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [mailtoo, setMailtoo] = React.useState("");

  const [subject, setSubject] = React.useState("");
  const [placeat, setPlaceat] = React.useState("");
  const [images, setImages] = React.useState("");
  const [datas, setDatas] = React.useState("");




    
    
function sendEmail(e) {
    e.preventDefault();


    emailjs.sendForm('service_w6lkseo', 'template_d9u1xuc', e.target, 'user_CQj596Rqgtz4dNuiPhjuP')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
      setIsOpen(false);
    
  }
  useEffect(() => {
    const name4 = tweet.text.split("image:")
    console.log(tweet.text)
    console.log(tweet.text.split("image:"))
    const image = name4[1]
    
    if(image != undefined){
     
   
    setImages(image.trim())

    }

   



    console.log(images)
  },[]);
  const openModal = () => {
    const myArr = tweet.text.split(",")
    const name1 = myArr[1].split(":")
    const name0 = myArr[0].split(":")
    const name2 = myArr[2].split(":")

    const place=name0[1]
    const mailto = name1[1]
    const sub = name2[1]
   

    setMailtoo(mailto.trim())
    setSubject(sub.trim())
    setPlaceat(place.trim())
  

    setIsOpen(true);

  }

  function closeModal() {
    setIsOpen(false);
  }
  const handleTweetClick = (tweet) => {
    const { author, _id: tweetId } = tweet;
    if (!author) return;
    history.push({
      pathname: `/${author._id}/status/${tweetId}`,
      state: { background: location },
     
    });
   console.log(tweet.text)
    const name4 = tweet.text.split("image:")
    
    const image = name4[1]
    if(image != undefined){
     
   
      setImages(image.trim())
  
      }
  
  
    
    console.log(images)
  };



  const handleActionClick = (action, tweetId) => (e) => {
    e.stopPropagation();
    if (!tweet.author) return;

    if (!user) {
      return history.push({
        pathname: '/signin',
      });
    }

    if (action === 'like') {
      likeTweetMutation.mutate(tweetId);
    } else if (action === 'unlike') {
      unlikeTweetMutation.mutate(tweetId);
    } else if (action === 'remove') {
      removeTweetMutation.mutate(tweetId);
    }
  };
  const owner = user && user._id === tweet.author?._id;
  const liked = !!(user && tweet.likes.includes(user._id));

  return (
    <ListItem key={tweet._id} >
      <UserAvatar
        small
        src={tweet.author?.avatar || portraitPlaceholder}
        alt="User Avatar"
        style={{width:"100px",height:'100px'}}
      />
      <ListItemContent>
        <TweetUserGroup>
          <ItemGroup>
            <TweetUserName>{tweet.author?.name || 'unknown'}</TweetUserName>
          </ItemGroup>
          <ItemGroup>
            @ 
          </ItemGroup>
          <ItemGroup>
            <span>{format(new Date(tweet.createdAt), 'dd MMMM yyyy')}</span>
          </ItemGroup>
        </TweetUserGroup>
        <div>
          <TweetText>
          {datas}
          </TweetText>
        </div>
        <>
        <img src={images} alt="no image to display" style={{width:"100px",height:'100px'}}></img>
          <br/>
        </>
        <TweetBottomGroup>
          <button disabled={!tweet.author}>
            <Icon as={FaRegComment} /> <span>{tweet.repliesCount}</span>
          </button>
          <button
            onClick={handleActionClick(liked ? 'unlike' : 'like', tweet._id)}
            disabled={!tweet.author}
          >
            <LikeIcon liked={liked}>
              {liked ? <FaHeart /> : <FaRegHeart />}
            </LikeIcon>{' '}
            {tweet.likes.length}
          </button>
          
          <Button style={{backgroundColor:"grey"}} onClick={() => handleTweetClick(tweet)}>View</Button>
          <Button style={{backgroundColor:"grey"}} onClick={()=>{openModal()}}>Send</Button>
          {/* <Button style={{backgroundColor:"grey"}} onClick={() => showimg(tweet)}>show</Button> */}
          
        </TweetBottomGroup>
      </ListItemContent>
      {owner ? (
        <>
        <DeleteButton
          onClick={handleActionClick('remove', tweet._id)}
          disabled={removeTweetMutation.isLoading || !tweet.author}
        >
          <IoMdClose />
        </DeleteButton>
       <br/>
      
        <div className="Mail">
        <Modal
        isOpen={modalIsOpen}
        ariaHideApp={false}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        
        <button onClick={closeModal} style={{position:"absolute", right:"20px"}} > X </button>
        <br/>
        <br/>
        <form className="contact-form" onSubmit={sendEmail}>
      <label>from</label>
      <input type="text" name="from_name" defaultValue="Fix the city" autoComplete="off" />
      <br/>
      <br/>
      <label>place</label>
      <input type="text" name="place" defaultValue={placeat} autoComplete="off" />
      <br/> 
      <br/>
      <label>emailid</label>
      <input type="email" name="to_mail" defaultValue={mailtoo} autoComplete="off" />
      <br/>
      <br/>
      <label>subject</label>
      <input type="text" name="subject" defaultValue="Fix the issue soon" autoComplete="off"/>
      <br/>
      <br/>
      <label>message</label>
      <textarea name="message" defaultValue={subject} /> 
      <br/>
      <br/>
      <br/>
      <br/>
      <input type="submit" value="Send" autoComplete="off" />
    </form>
      </Modal>
      </div>
        
        </>
      ) : null}
    </ListItem>
  );
}

SingleTweet.defaultProps = {
  queryKey: ['tweets', {}],
};

SingleTweet.propTypes = {
  tweet: PropTypes.object.isRequired,
  queryKey: PropTypes.array,
};

function TweetsBoard({
  loading,
  pages,
  headerText,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  queryKey,
}) {
  const loadMoreRef = useRef();

  useIntersectionObserver({
    target: loadMoreRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  const numberOfTweets =
    pages?.reduce((acc, page) => acc + page.results.length, 0) ?? 0;

  return (
    <Container>
      <HeaderWrapper>
        <Header>{headerText}</Header>
      </HeaderWrapper>
      {loading ? (
        <Loading isSmall isFixed={false} />
      ) : (
        <>
          <List>
            {numberOfTweets > 0 ? (
              <>
                {pages.map((group, i) => (
                  <React.Fragment key={i}>
                    {group.results.map((tweet) => (
                      <SingleTweet
                        key={tweet._id}
                        tweet={tweet}
                        queryKey={queryKey}
                      />
                    ))}
                  </React.Fragment>
                ))}

                <div
                  css={`
                    margin-top: 15px;
                    display: flex;
                    justify-content: center;
                  `}
                >
                  <Button
                    ref={loadMoreRef}
                    onClick={() => fetchNextPage()}
                    disabled={!hasNextPage || isFetchingNextPage}
                  >
                    {isFetchingNextPage
                      ? 'Loading more...'
                      : hasNextPage
                      ? 'Load More'
                      : 'Nothing more to load'}
                  </Button>
                </div>
              </>
            ) : (
              <InfoText>There are no problems to display</InfoText>
            )}
          </List>
        </>
      )}
    </Container>
  );
}

TweetsBoard.defaultProps = {
  headerText: 'Problems',
  queryKey: ['tweets', {}],
};

TweetsBoard.propTypes = {
  queryKey: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  pages: PropTypes.array.isRequired,
  headerText: PropTypes.string.isRequired,
  fetchNextPage: PropTypes.func.isRequired,
  hasNextPage: PropTypes.bool,
  isFetchingNextPage: PropTypes.bool.isRequired,
};

export default TweetsBoard;
