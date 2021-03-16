import { Typography } from '@material-ui/core';
import { SuccessData } from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router';
import { Article } from 'src/type';
import articleApi from '../../api/index';

function ArticlesPage() {
  const [articles, setArticles] = useState<
    SuccessData<Article[]> | undefined
  >();
  const history = useHistory();
  useEffect(() => {
    articleApi.getArticles().then((res: SuccessData<Article[]>) => {
      if (res) {
        setArticles(res);
      }
    });
  }, []);

  const routerTo = (id: string) => {
    history.push(`/article/${id}`);
  };
  return (
    <div>
      {articles?.map((article: Article) => {
        return (
          <Typography onClick={() => routerTo(article._id)} key={article._id}>
            {article.title}
          </Typography>
        );
      })}
    </div>
  );
}

export default ArticlesPage;
