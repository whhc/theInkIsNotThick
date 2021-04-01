import { makeStyles } from '@material-ui/core';

export const useUserStyles = makeStyles({
  root: {
    padding: `0 120px`,
  },
});

export const useTimelineStyle = makeStyles({
  root: {
    '& .name': {
      textDecoration: `underline`,
      cursor: `pointer`,
    },
    '& .date': {
      fontWeight: `bolder`,
    },
    '& .article': {
      textDecoration: `underline`,
      cursor: `pointer`,
    },
  },
});
