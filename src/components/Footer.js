import React from 'react';

import { Typography, Container, Link } from '@material-ui/core';
import { GitHub } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 'auto',
    padding: theme.spacing(1, 2),
    backgroundColor: theme.palette.primary.main,
    boxShadow: '0px -3px 8px 0px rgb(0 0 0 / 14%), 0px -1px 10px 0px rgb(0 0 0 / 12%)'
  },
  title: {
    color: theme.palette.common.white,
    fontSize: '13px',
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: '50%',
    '&:hover svg': {
      transition: 'color .24s ease-in-out',
      color: 'rgba(255, 255, 255, .8)'
    }
  },
  icon: {
    color: theme.palette.common.white,
    fontSize: '30px',
    transition: 'color .24s ease-in-out'
  }
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <Container maxWidth={false} disableGutters={true} className={classes.footer}>
      <Typography className={classes.title} variant="h4">
        © MGlower portfolio work
      </Typography>
      <Link href='https://github.com/MGlower-RU' variant="body1" className={classes.link}>
        <GitHub className={classes.icon} />
      </Link>
    </Container>
  )
}