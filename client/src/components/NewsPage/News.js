import React from 'react';
import NewsItem from './NewsItem';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

const News = ({news, updateNews}) => {
  const newsItems = news?.map(item => {
    return <NewsItem key={item.id} {...item}/>;
  });

  const handleUpdate = () => {
    updateNews(news[0].id);
  }

  return (
    <div className='w-100 m-4'>
      <div className='d-flex justify-content-between align-items-center p-2 bg-white sticky-top'>
        <span>Data is updated every minute</span>
        <Button onClick={handleUpdate}>
          Update now
        </Button>
      </div>
      <hr/>
      <Card>
        <ListGroup variant='flush'>
          {newsItems}
        </ListGroup>
      </Card>
    </div>
  );
}

export default News;