import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
} from '@material-ui/core';
import {
  AccountCircleOutlined,
  CloseOutlined,
  LockOutlined,
  MailOutline,
  PersonOutline,
} from '@material-ui/icons';
import React, { useState, useContext } from 'react';
import api from 'src/api';
import { ConsumerContext } from 'src/store';
import { useLoginStyles } from './styles';

function Login(props: any) {
  const classes = useLoginStyles({
    open: props.loginShow,
  });
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mail, setMail] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const { setHasLogin, userDispatch } = useContext(ConsumerContext);

  const clearInputs = () => {
    setUsername('');
    setPassword('');
    setInviteCode('');
  };

  const closeLogin = () => {
    setIsLogin(true);
    props.toggleLoginShow();
  };

  const handleLoginClick = () => {
    if (isLogin) {
      username.length >= 4 &&
        password.length >= 5 &&
        api
          .login({
            name: username,
            password,
          })
          .then((res) => {
            if (res.status === 200 && res.data && res.data.name === username) {
              clearInputs();
              closeLogin();
              setHasLogin(true);
              userDispatch({
                type: 'LOGIN',
                payload: res.data,
              });
            }
          });
    } else {
      setIsLogin(true);
      clearInputs();
    }
  };

  const handleRegisterClick = () => {
    if (!isLogin) {
      console.log(
        `username: ${username}, password: ${password}, inviteCode: ${inviteCode}`
      );
      console.log('发送注册请求');
    } else {
      setIsLogin(false);
      clearInputs();
    }
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (isLogin && e.key === 'Enter') {
      handleLoginClick();
    }
  };

  return (
    <div className={classes.root}>
      <Card>
        <CardHeader
          title={isLogin ? '登录' : '注册'}
          action={
            <IconButton onClick={closeLogin}>
              <CloseOutlined />
            </IconButton>
          }
        ></CardHeader>
        <CardContent>
          <div className="form">
            <List>
              <ListItem>
                <FormControl>
                  <InputLabel>用户名</InputLabel>
                  <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    startAdornment={
                      <InputAdornment position="start">
                        <AccountCircleOutlined />
                      </InputAdornment>
                    }
                  ></Input>
                </FormControl>
              </ListItem>
              <ListItem>
                <FormControl>
                  <InputLabel>密码</InputLabel>
                  <Input
                    onKeyDown={handleKeyDown}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={'password'}
                    startAdornment={
                      <InputAdornment position="start">
                        <LockOutlined />
                      </InputAdornment>
                    }
                  ></Input>
                </FormControl>
              </ListItem>
              {!isLogin && (
                <>
                  <ListItem>
                    <FormControl>
                      <InputLabel>邮箱</InputLabel>
                      <Input
                        type="email"
                        onChange={(e) => setMail(e.target.value)}
                        value={mail}
                        startAdornment={
                          <InputAdornment position="start">
                            <MailOutline />
                          </InputAdornment>
                        }
                      ></Input>
                    </FormControl>
                  </ListItem>
                  <ListItem>
                    <FormControl>
                      <InputLabel>邀请码</InputLabel>
                      <Input
                        onChange={(e) => setInviteCode(e.target.value)}
                        value={inviteCode}
                        startAdornment={
                          <InputAdornment position="start">
                            <PersonOutline />
                          </InputAdornment>
                        }
                      ></Input>
                    </FormControl>
                  </ListItem>
                </>
              )}
            </List>
          </div>
        </CardContent>
        <CardActions>
          <Button
            onClick={handleLoginClick}
            color={isLogin ? 'primary' : 'default'}
          >
            登录
          </Button>
          {/* <Button
            onClick={handleRegisterClick}
            color={isLogin ? 'default' : 'primary'}
          >
            注册
          </Button> */}
        </CardActions>
      </Card>
    </div>
  );
}

export default Login;
