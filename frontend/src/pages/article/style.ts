import { makeStyles } from '@material-ui/core';

export const useArticleStyles = makeStyles({
  root: {
    padding: `0 120px`,
  },
  markdown: {
    fontSize: `14px`,
    lineHeight: `1.5`,
  },
  header: {
    display: `flex`,
    justifyContent: `space-between`,
    alignItems: `center`,
    margin: `10px 0`,
  },
  actionButton: {
    marginLeft: `10px`,
  },
});
