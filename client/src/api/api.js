import axios from 'axios';
import config from '../config';

const api = axios.create({
  baseURL: config.apiBaseUrl
});

export const getNews = () => {
  return api.get('news');
}

export const updateNews = lastId => {
  return api.get(`news_update?id=${lastId}`);
}

export const getStory = id => {
  return api.get(`story?id=${id}`);
}

export const getComments = id => {
  return api.get(`comments?id=${id}`);
}