import {
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { Visibility } from '@material-ui/icons';
import { SuccessData } from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Article } from 'src/type';
import articleApi from '../../api/index';
import { useArticlesStyles } from './style';

function ArticlesPage(props: any) {
  const [articles, setArticles] = useState<Article[] | undefined>();
  const history = useHistory();
  const classes = useArticlesStyles();
  const { hasLogin } = props;
  useEffect(() => {
    articleApi.getArticles().then((res: SuccessData<Article[]>) => {
      if (res.status === 200) {
        setArticles(res.data);
      }
    });
  }, []);

  const routerTo = (id: string) => {
    history.push(`/article/${id}`);
  };

  const handleCreateArticle = () => {
    history.push(`/article/new`);
  };
  return (
    <div className={classes.root}>
      <div className={classes.actionsBar}>
        <Typography variant="h5">Articles</Typography>
        {hasLogin && (
          <Button
            className={classes.actionButton}
            variant="outlined"
            color="primary"
            onClick={handleCreateArticle}
          >
            新建
          </Button>
        )}
      </div>
      <Divider />
      <List>
        {articles?.map((article: Article) => {
          return (
            <ListItem button key={article._id}>
              <ListItemText
                primary={article.title}
                secondary={article.date}
              ></ListItemText>
              <ListItemSecondaryAction>
                <IconButton onClick={() => routerTo(article._id)}>
                  <Visibility></Visibility>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}

export default ArticlesPage;
