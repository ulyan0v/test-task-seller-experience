const storyRefToClient = story => {
  const {id, by, time, title, score} = story;

  return {
    id,
    title,
    author: by,
    rating: score,
    timestamp: time,
  };
}

const storyToClient = story => {
  const {id, url, title, time, by, descendants} = story;

  return {
    id,
    url,
    title,
    author: by,
    timestamp: time,
    commentCount: descendants
  };
}

const commentToClient = comment => {
  const {id, by, time, text, kids} = comment;

  return {
    id,
    text,
    kids,
    author: by,
    timestamp: time,
  };
}

module.exports = {
  storyRefToClient,
  storyToClient,
  commentToClient
}