import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {getStory, updateComments} from '../../redux/reducers/story';
import {useParams} from 'react-router-dom';
import config from '../../config';
import Story from './Story';

const StoryContainer = props => {
  const {getStory, story, comments, updateComments} = props;
  const {id} = useParams();

  useEffect(() => {
    getStory(id);
  }, [id, getStory]);

  useEffect(() => {
    const autoUpdate = setInterval(() => {
      updateComments(id, comments);
    }, config.commentsUpdateTimeout);

    return () => clearInterval(autoUpdate);
    // eslint-disable-next-line
  }, [id]);

  if (!story) return null;

  return <Story
    story={story}
    comments={comments}
    updateComments={updateComments}/>;
}

const mapStateToProps = state => {
  return {
    story: state.story.story,
    comments: state.story.comments
  };
}

const mapDispatchToProps = {
  getStory,
  updateComments
};

export default connect(mapStateToProps, mapDispatchToProps)(StoryContainer);