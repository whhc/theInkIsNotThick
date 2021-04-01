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
    alignItems: `flex-start`,
    margin: `10px 0`,
  },
  actions: {
    display: `flex`,
    alignItems: `center`,
  },
  actionButton: {
    marginLeft: `10px`,
    minWidth: `90px`,
  },
});
