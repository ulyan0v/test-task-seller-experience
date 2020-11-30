import React from 'react'
import CommentsContainer from './Comments/CommentsContainer';
import {NavLink} from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const Story = ({story, comments, updateComments}) => {
  const {id, author, title, timestamp, url, commentCount} = story;
  const date = new Date(timestamp);

  const handleUpdateComments = () => {
    updateComments(id, comments);
  }

  return (
    <div className='d-flex flex-column p-3 w-100'>
      <NavLink className='d-block mx-2' to='/news'>
        <Button size='sm' variant='outline-primary'>&crarr; Back</Button>
      </NavLink>
      <h1 className='font-weight-normal'>
        {title}
      </h1>
      <div className='text-monospace ml-2'>
        <span className='font-weight-bolder'>
          {author}
        </span>
        {' | '}
        <time>
          {date.toLocaleString()}
        </time>
      </div>
      <h3 className='mt-3 font-weight-normal'>
        {url && <>More: <a href={url} target='_blank' rel="noreferrer">{url}</a></>}
      </h3>
      <hr className='w-100'/>
      <div className='d-flex flex-row'>
        <h3>Comments ({commentCount})</h3>
        <Button
          className='ml-4'
          variant='outline-primary'
          onClick={handleUpdateComments}>
          &#8635;
        </Button>
      </div>
      <CommentsContainer id={id} comments={comments}/>
    </div>
  );
}

export default Story;