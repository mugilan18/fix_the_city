import React, { useRef, useState, useEffect } from 'react';
import { ProfilesList } from 'components/Profiles';
import { useProfiles } from 'utils/profiles';
import { Container } from 'shared/layout';
import { Button, InfoText, PrimaryHeading } from 'shared/components';
import DisplayError from 'components/DisplayError';
import Loading from 'components/Loading';
import ProfileCard from 'components/ProfileCard';
import useIntersectionObserver from 'hooks/useIntersectionObserver';
import 'styled-components/macro';
import './img.css'

function ProfilesPage(props) {
  const {
    isLoading,
    error,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  } = useProfiles();
  const loadMoreRef = useRef();


  useIntersectionObserver({
    target: loadMoreRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  if (error) {
    return <DisplayError error={error} />;
  }

  const numberOfProfiles =
    data?.pages.reduce((acc, el) => acc + el.results.length, 0) ?? 0;

  return (
    <div className="mainback">
      <Container>
        <PrimaryHeading>All problems</PrimaryHeading>
        {error ? (
          <DisplayError error={error} />
        ) : isLoading ? (
          <Loading />
        ) : (
          <>
            {numberOfProfiles > 0 ? (
              <>
                <ProfilesList>
                  {data.pages.map((page, i) => (
                    <React.Fragment key={i}>
                      {page.results.map((profile) => (
                        <ProfileCard key={profile._id} profile={profile} />
                      ))}
                    </React.Fragment>
                  ))}
                </ProfilesList>
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
                        : 'No more profiles to load'}
                  </Button>
                </div>
                <InfoText>
                  {isFetching && !isFetchingNextPage ? 'Fetching...' : null}
                </InfoText>
              </>
            ) : (
              <InfoText>There are no problems to display</InfoText>
            )}
          </>
        )}
      </Container>
      <Container style={{color:"black"}}>
        <h1>Admin FeedBack</h1>
        <h3>List of problems solved</h3>

        {console.log( props.solved)}
       {props.solved && props.solved.passed.map((pas,id)=>{
        return <li key={id}>{pas.name}</li>
      })} 


      </Container>

    </div>
  );
}

export default ProfilesPage;
