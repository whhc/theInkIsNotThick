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
import { CloseOutlined, Visibility } from '@material-ui/icons';
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
  const getArticles = () => {
    articleApi.getArticles().then((res: SuccessData<Article[]>) => {
      if (res.status === 200) {
        setArticles(res.data);
      }
    });
  };
  useEffect(() => {
    getArticles();
  }, []);

  const routerTo = (id: string) => {
    history.push(`/article/${id}`);
  };

  const handleDelete = (id: string) => {
    articleApi.deleteArticle(id).then((res) => {
      if (res.status === 200) {
        // history.go(0);
        getArticles();
      }
    });
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
            <ListItem button key={article._id} className={classes.list}>
              <ListItemText
                onClick={() => routerTo(article._id)}
                primary={article.title}
                secondary={article.date}
              ></ListItemText>
              {hasLogin && (
                <ListItemSecondaryAction>
                  <IconButton onClick={() => handleDelete(article._id)}>
                    <CloseOutlined />
                  </IconButton>
                </ListItemSecondaryAction>
              )}
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}

export default ArticlesPage;
