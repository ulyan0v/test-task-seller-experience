const {Router} = require('express');
const router = Router();
const config = require('config');
const hackerNews = require('../api/hackerNews');
const {storyRefToClient, storyToClient, commentToClient} = require('../utils');

const MAX_STORIES = config.get('maxStories');

// /api/v1/news
router.get('/news', async (req, res) => {
  const {data} = await hackerNews.getNewStoriesId();
  if (data.length > MAX_STORIES) data.splice(MAX_STORIES);

  const result = await Promise.all(
    data.map(async id => {
      const {data} = await hackerNews.getItemById(id);
      return storyRefToClient(data);
    })
  );

  res.json(result);
});

// /api/v1/story
router.get('/story', async (req, res) => {
  if (!req.query.id) return res.status(400);

  const {data} = await hackerNews.getItemById(req.query.id);

  if (!data) return res.status(404);

  res.json(storyToClient(data));
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

  res.json( result.filter(item => item.text) );
});

module.exports = router;