import React from 'react';
import { useUserStyles } from './style';

function UserPage() {
  const classes = useUserStyles();
  return <div className={classes.root}>user</div>;
}

export default UserPage;
