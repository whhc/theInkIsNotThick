import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { Menu as MenuIcon, Person } from '@material-ui/icons';
import React, { useContext, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { ConsumerContext } from 'src/store';
import { useHeaderStyles } from './style';

function HeaderComponent(props: any) {
  const classes = useHeaderStyles();
  const [index, setIndex] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const menuAnchorEl = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const history = useHistory();
  const { hasLogin, setHasLogin, user, userDispatch } = useContext(
    ConsumerContext
  );

  const handleClick = (bool: boolean) => {
    setMenuOpen(bool);
  };

  const handleClose = () => {
    setMenuOpen(false);
  };

  const handleToggleDrawer = (bool: boolean) => {
    setDrawerOpen(bool);
  };

  const handleDrawerClick = (path: string, index: number) => {
    history.push(path);
    setIndex(index);
    setDrawerOpen(false);
  };

  const handleToggleLoginShow = () => {
    setMenuOpen(false);
    if (!props.loginShow) {
      props.toggleLoginShow();
    }
  };

  const handleSignoutClick = () => {
    setMenuOpen(false);
    setHasLogin(false);
    userDispatch({
      type: 'LOGOUT',
    });
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton onClick={() => handleToggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <div style={{ marginLeft: `auto` }}>
            <Typography variant="button">{user?.name}</Typography>
            <IconButton
              ref={menuAnchorEl}
              onClick={() => handleClick(!menuOpen)}
            >
              <Person />
            </IconButton>
            <Menu
              open={menuOpen}
              anchorEl={menuAnchorEl.current}
              keepMounted
              onClose={handleClose}
            >
              {hasLogin ? (
                <MenuItem onClick={handleSignoutClick}>退出登录</MenuItem>
              ) : (
                <MenuItem onClick={handleToggleLoginShow}>登录注册</MenuItem>
              )}
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor={'left'}
        open={drawerOpen}
        onClose={() => handleToggleDrawer(false)}
      >
        <List className={classes.drawer}>
          <ListItem
            button
            onClick={() => handleDrawerClick('/articles', 0)}
            selected={index === 0}
          >
            <ListItemText>文章列表</ListItemText>
          </ListItem>
          <ListItem
            button
            onClick={() => handleDrawerClick('/user', 1)}
            selected={index === 1}
          >
            <ListItemText>用户中心</ListItemText>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}

export default HeaderComponent;
