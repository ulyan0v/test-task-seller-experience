import React, {useState} from 'react';
import Media from 'react-bootstrap/Media';
import CommentsList from './CommentsContainer';

const Comment = props => {
  const {id, author, text, kidsCount, kids} = props;
  const [openNested, setOpenNested] = useState(false);

  const toggleNested = () => {
    setOpenNested(prevState => !prevState);
  }

  return (
    <Media className='pl-4'>
      <Media.Body>
        <h5>{author}</h5>
        <p dangerouslySetInnerHTML={{__html: text}}/>
        {kidsCount
          ? <button
            onClick={toggleNested}
            className='btn btn-link'>
            {openNested ? 'Hide' : 'Show'} {kidsCount} answer
          </button>
          : null}
        {openNested && (
          <CommentsList
            id={id}
            comments={kids}/>
        )}
      </Media.Body>
    </Media>
  );
}

export default Comment;