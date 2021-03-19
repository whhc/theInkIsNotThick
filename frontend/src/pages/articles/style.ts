import { makeStyles } from '@material-ui/core';

export const useArticlesStyles = makeStyles({
  root: {
    padding: `0 120px`,
  },
  actionsBar: {
    display: `flex`,
    alignItems: `center`,
    padding: `10px`,
  },
  actionButton: {
    marginLeft: `auto`,
  },
  list: {
    '& + .MuiListItemSecondaryAction-root': {
      display: `none`,
    },
    '& + .MuiListItemSecondaryAction-root:hover': {
      display: `block`,
    },
    '&:hover + .MuiListItemSecondaryAction-root': {
      display: `block`,
    },
  },
});
