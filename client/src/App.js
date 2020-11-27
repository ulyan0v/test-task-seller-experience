import React from "react";
import {Switch, Route, Redirect} from 'react-router-dom';
import Story from "./components/StoryPage/Story";
import News from "./components/NewsPage/News";
import Container from "react-bootstrap/Container";

const App = () => {
  return (
    <Container>
      <Switch>
        <Route path='/news' exact>
          <News />
        </Route>
        <Route path='/story/:id' exact>
          <Story />
        </Route>
        <Redirect to='/news'/>
      </Switch>
    </Container>
  );
}

export default App;
