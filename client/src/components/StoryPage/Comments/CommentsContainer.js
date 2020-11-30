import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {getComments, removeComments} from '../../../redux/reducers/story';
import Comment from './Comment';

const CommentsContainer = props => {
  const {id, comments, getComments, getCommentsWithLoader, removeComments} = props;

  useEffect(() => {
    getComments(id);

    return () => removeComments(id);
  }, [id, getComments, removeComments, getCommentsWithLoader]);

  if (!comments) return null;

  if (!comments.length) return <p>No comments yet</p>;

  return comments.map((item, index) => {
    return (
      <React.Fragment key={item.id}>
        {index ? <hr className='ml-4 w-100'/> : null}
        <Comment {...item}/>
      </React.Fragment>
    );
  });
}

const mapDispatchToProps = {
  getComments,
  removeComments
};

export default connect(null, mapDispatchToProps)(CommentsContainer);