import { Button } from '@material-ui/core';
import React from 'react';
import { Route, Switch, useHistory } from 'react-router';
import ArticlesPage from './pages/articles';
import ArticlePage from './pages/article';
import UserPage from './pages/user';

function App() {
  let history = useHistory();
  const routerTo = (path: string) => {
    history.push(path);
  };
  return (
    <div className="App">
      <Button onClick={() => routerTo('/user')}>USER</Button>
      <Button onClick={() => routerTo('/articles')}>ARTICLES</Button>
      <div>
        <Switch>
          <Route path={`/articles`}>
            <ArticlesPage />
          </Route>
          <Route path={`/article/:articleId`}>
            <ArticlePage />
          </Route>
          <Route path={`/user`}>
            <UserPage />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
