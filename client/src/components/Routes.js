import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import NewsContainer from './NewsPage/NewsContainer';
import StoryContainer from './StoryPage/StoryContainer';

const Routes = () => {
  return (
    <Switch>
      <Route path='/news' exact>
        <NewsContainer />
      </Route>
      <Route path='/story/:id' exact>
        <StoryContainer />
      </Route>
      <Redirect to='/news'/>
    </Switch>
  );
}

export default Routes;