const correctTime = timestamp => {
  // time приходит без миллисекунд и некорректно отображается
  return timestamp * 1000;
}

const storyRefToClient = story => {
  const {id, by, time, title, score} = story;

  return {
    id,
    title,
    author: by,
    rating: score,
    timestamp: correctTime(time),
  };
}

const storyToClient = story => {
  const {id, url, title, time, by, descendants} = story;

  return {
    id,
    url,
    title,
    author: by,
    timestamp: correctTime(time),
    commentCount: descendants
  };
}

const commentToClient = comment => {
  const {id, by, text, kids} = comment;

  return {
    id,
    text,
    kidsCount: kids?.length || 0,
    author: by
  };
}

module.exports = {
  storyRefToClient,
  storyToClient,
  commentToClient
}