import React, { useContext, useState } from 'react';
import { Route, Switch } from 'react-router';
import ArticlesPage from './pages/Articles';
import ArticlePage from './pages/Article';
import UserPage from './pages/user';
import HeaderComponent from './components/Header';
import Login from './components/Login';
import { ConsumerContext } from './store';

function App() {
  const [loginShow, setLoginShow] = useState(false);
  const handleToggleLoginShow = () => {
    setLoginShow(!loginShow);
  };
  const { hasLogin } = useContext(ConsumerContext);
  return (
    <div className="App">
      <HeaderComponent
        loginShow={loginShow}
        toggleLoginShow={handleToggleLoginShow}
      />
      <div>
        <Switch>
          <Route path={`/articles`}>
            <ArticlesPage hasLogin={hasLogin} />
          </Route>
          <Route path={`/article/:articleId`}>
            <ArticlePage hasLogin={hasLogin} />
          </Route>
          <Route path={`/user`}>
            <UserPage />
          </Route>
        </Switch>
      </div>
      <Login loginShow={loginShow} toggleLoginShow={handleToggleLoginShow} />
    </div>
  );
}

export default App;
