const axios = require('axios');

const hackerNews = axios.create({
  baseURL: 'https://hacker-news.firebaseio.com/v0/'
});

const getNewStoriesId = async () => {
  return await hackerNews.get('newstories.json');
}

const getItemById = async id => {
  return await hackerNews.get(`item/${id}.json`);
}

module.exports = {
  getNewStoriesId,
  getItemById
};