const {Router} = require('express');
const router = Router();
const config = require('../config');
const hackerNews = require('../api/hackerNews');
const {storyRefToClient, storyToClient, commentToClient} = require('../utils');

const MAX_STORIES = config.maxStories;

// /api/v1/news
router.get('/news', async (req, res) => {
  const {data} = await hackerNews.getNewStoriesId();
  if (data.length > MAX_STORIES) data.splice(MAX_STORIES);

  const result = await Promise.all(
    data.map(async id => {
      const {data} = await hackerNews.getItemById(id);
      return data && storyRefToClient(data);
    })
  );

  // иногда вместо статьи приходит null
  res.json( result.filter(item => item) );
});

// /api/v1/news_update
router.get('/news_update', async (req, res) => {
  if (!req.query.id) return res.status(400);

  const {data} = await hackerNews.getNewStoriesId();

  const lastIndex = data.indexOf(+req.query.id);

  if (lastIndex === 0) {
    return res.json([]);
  } else if (lastIndex === -1 || lastIndex > MAX_STORIES) {
    data.splice(MAX_STORIES);
  } else {
    data.splice(lastIndex);
  }

  const result = await Promise.all(
    data.map(async id => {
      const {data} = await hackerNews.getItemById(id);
      return data && storyRefToClient(data) ;
    })
  );

  // иногда вместо статьи приходит null
  res.json( result.filter(item => item) );
});

// /api/v1/story
router.get('/story', async (req, res) => {
  if (!req.query.id) return res.status(400);

  const {data} = await hackerNews.getItemById(req.query.id);

  if (!data) return res.status(404);

  res.json( storyToClient(data) );
});

// /api/v1/comments
router.get('/comments', async (req, res) => {
  if (!req.query.id) return res.status(400);

  const {data} = await hackerNews.getItemById(req.query.id);

  if (!data) return res.status(404);
  if (!data.kids) return res.json([]);

  const result = await Promise.all(
    data.kids.map(async id => {
      const {data} = await hackerNews.getItemById(id);
      return commentToClient(data);
    })
  );

  // могут быть удаленные коментарии без текста
  res.json( result.filter(item => item.text) );
});

module.exports = router;