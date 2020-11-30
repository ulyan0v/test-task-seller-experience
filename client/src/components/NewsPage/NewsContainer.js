import React, {useEffect} from 'react';
import {getNews, updateNews} from '../../redux/reducers/news';
import {connect} from 'react-redux';
import config from '../../config';
import News from './News';

const NewsContainer = props => {
  const {getNews, news, updateNews} = props;

  useEffect(() => {
    if (!news) return getNews();

    const autoUpdate = setInterval(() => {
      updateNews(news[0].id);
    }, config.newsUpdateTimeout);

    return () => clearInterval(autoUpdate);
  }, [news, getNews, updateNews]);

  if (!news) return null;

  return <News news={news} updateNews={updateNews} />;
}

const mapStateToProps = state => {
  return {
    news: state.news.news
  };
}

const mapDispatchToProps = {
  getNews,
  updateNews
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsContainer);