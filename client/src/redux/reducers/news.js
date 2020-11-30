import * as api from '../../api/api'
import {asyncActionWrapper} from "../utils";

const SET_NEWS = 'SET_NEWS';
const UPDATE_NEWS = 'UPDATE_NEWS';

const initialState = {
  news: null
};

const news = (state = initialState, action) => {
  switch (action.type) {
    case SET_NEWS:
      return {...state, news: action.payload};

    case UPDATE_NEWS:
      const newData = action.payload;
      const prevData = [...state.news].splice(0, state.news.length - newData.length);
      return {
        ...state,
        news: [...newData, ...prevData]
      }

    default:
      return state;
  }
}

export const setNews = news =>
  ({type: SET_NEWS, payload: news})

export const addNews = news =>
  ({type: UPDATE_NEWS, payload: news})


export const getNews = () => {
  return asyncActionWrapper(() => {
    return api.getNews();
  }, setNews);
}

export const updateNews = lastId => {
  return asyncActionWrapper(() => {
    return api.updateNews(lastId);
  }, addNews, {useLoader: false});
}

export default news;