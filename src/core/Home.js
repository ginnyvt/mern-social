import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import heroImg from '../assets/images/unicornbike.jpg';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing(5),
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(
      2
    )}px`,
    color: theme.palette.openTitle,
  },
  media: {
    minHeight: 400,
  },
}));

const Home = () => {
  const classes = useStyles();
  return (
    <>
      <Card className={classes.card}>
        <Typography className={classes.title} variant='h6'>
          Home Page
        </Typography>

        <CardMedia
          className={classes.media}
          image={heroImg}
          title='Unicorn Bicycle'
        />

        <CardContent>
          <Typography variant='body2' component='p'>
            Welcome to the MERN Social home page.
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default Home;
