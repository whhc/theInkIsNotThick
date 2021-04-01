import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';
import { useTimelineStyle, useUserStyles } from './style';

function UserInfo() {
  const classes = useUserStyles();
  return (
    <div>
      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar />
          </ListItemAvatar>
          <ListItemText
            primary={<Typography color="textPrimary">Adam</Typography>}
            secondary={
              <Typography color="textSecondary">
                春江潮水连海平，海上明月共潮生。
              </Typography>
            }
          ></ListItemText>
        </ListItem>
      </List>
    </div>
  );
}

function UserTimeline() {
  const history = useHistory();
  const classes = useTimelineStyle();
  const handleArticleClick = (id: string) => {
    history.push(`article/${id}`);
  };
  return (
    <div className={classes.root}>
      <List>
        <ListItem>
          <ListItemText
            primary={
              <Typography color="textPrimary">
                用户<span className="name">Adam</span>于
                <span className="date">2021-03-14日06:00</span>
                评论了您的文章
                <span
                  className="article"
                  onClick={() => handleArticleClick('6062eed47b06037dcb4a9b3a')}
                >
                  TODOLIST
                </span>
                。
              </Typography>
            }
          />
        </ListItem>

        <ListItem>
          <ListItemText
            primary={
              <Typography color="textPrimary">
                用户<span className="name">Adam</span>于
                <span className="date">2021-03-14日06:00</span>
                回复了了您在文章
                <span className="article">TODOLIST</span>
                下的评论。
              </Typography>
            }
          />
        </ListItem>

        <ListItem>
          <ListItemText
            primary={
              <Typography color="textPrimary">
                您于
                <span className="date">2021-03-14日06:00</span>
                评论了<span className="name">Adam</span>
                的文章
                <span className="article">TODOLIST</span>。
              </Typography>
            }
          />
        </ListItem>
      </List>
    </div>
  );
}

function UserPage() {
  const classes = useUserStyles();
  return (
    <div className={classes.root}>
      <UserInfo />
      <UserTimeline />
    </div>
  );
}

export default UserPage;
