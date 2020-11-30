import * as api from '../../api/api';
import {asyncActionWrapper, mergeComments, updateAllComments, updateCommentsById} from '../utils';

const SET_STORY = 'SET_STORY';
const SET_COMMENTS = 'SET_COMMENTS';
const REMOVE_COMMENTS = 'REMOVE_COMMENTS';

const initialState = {
  story: null,
  comments: null
};

const story = (state = initialState, action) => {
  switch (action.type) {
    case SET_STORY:
      return {...state, story: action.payload};

    case SET_COMMENTS:
      const {id, comments} = action.payload;

      if (id === state.story?.id) {
        return {
          ...state,
          comments: mergeComments(state.comments, comments)
        };
      }

      if (!state.comments) return state;

      return {
        ...state,
        comments: updateCommentsById(state.comments, id, comments)
      };

    case REMOVE_COMMENTS:
      if (action.payload === state.story?.id) {
        return {...state, comments: null};
      }

      return {
        ...state,
        comments: updateCommentsById(state.comments, action.payload, null)
      };

    default:
      return state;
  }
}

export const setStory = story =>
  ({type: SET_STORY, payload: story})

export const setComments = (id, comments) =>
  ({type: SET_COMMENTS, payload: {id, comments}})

export const removeComments = id =>
  ({type: REMOVE_COMMENTS, payload: id})

export const getStory = id => {
  return asyncActionWrapper(() => {
    return api.getStory(id);
  }, setStory);
}

export const getComments = id => {
  return asyncActionWrapper(() => {
    return api.getComments(id);
  }, setComments.bind(null, id), {useLoader: true});
}

export const updateComments = (id, comments) => {
  return asyncActionWrapper(() => {
    return updateAllComments(id, comments);
  }, setComments.bind(null, id), {useLoader: false});
}

export default story;