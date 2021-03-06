import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits(props) {
  const classes = useStyles();
  const { link, name, thumbnailUrl, publishedAt } = props;
  return (
    <React.Fragment>
      <Link href={link}>
        <img alt="Video Thumbnail" style={{width: "100%", height: "auto"}} src={thumbnailUrl.replace("%{width}", "900").replace("%{height}", "510")} />
        <Title>{name}</Title>
    { publishedAt ? (
        <Typography color="textSecondary" className={classes.depositContext}>
          {new Date(publishedAt).toLocaleDateString()} <br />
          {new Date(publishedAt).toString()} <br />
        </Typography>
    ) : (<span />) }
      </Link>
    </React.Fragment>
  );
}
