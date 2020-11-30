const axios = require('axios');

const hackerNews = axios.create({
  baseURL: 'https://hacker-news.firebaseio.com/v0/'
});

const getNewStoriesId = () => {
  return hackerNews.get('newstories.json');
}

const getItemById = id => {
  return hackerNews.get(`item/${id}.json`);
}

module.exports = {
  getNewStoriesId,
  getItemById
};