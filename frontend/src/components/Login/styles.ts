import { makeStyles } from '@material-ui/core';

export const useLoginStyles = makeStyles({
  root: {
    position: `fixed`,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: `rgba(0, 0, 0, .87)`,
    display: (props: { open: boolean }) => (props.open ? `flex` : `none`),
    alignItems: `center`,
    justifyContent: `center`,
  },
});
