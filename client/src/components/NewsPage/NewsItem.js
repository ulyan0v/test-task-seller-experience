import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import {Link} from "react-router-dom";

const NewsItem = props => {
  const {id, title, author, rating, timestamp} = props;
  const date = new Date(timestamp);

  return (
    <ListGroup.Item className='p-2'>
      <h5 className='m-0 font-weight-normal'>
        <Link to={`/story/${id}`}>{title}</Link>
      </h5>
      <div className='d-flex justify-content-between text-monospace'>
        <small>
          {`${author} | rating: ${rating}`}
        </small>
        <time>
          {date.toLocaleTimeString()}
        </time>
      </div>
    </ListGroup.Item>
  );
}

export default NewsItem;