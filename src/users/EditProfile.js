import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

import { read, update } from './user-api';
import auth from '../auth/auth-helper';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.protectedTitle,
  },
  error: {
    verticalAlign: 'middle',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2),
  },
}));

const EditProfile = ({ match }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    open: false,
    redirectToProfile: false,
  });
  const jwt = auth.isAuthenticated();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    read({ userId: match.params.userId }, { token: jwt.token }, signal).then(
      (data) => {
        if (data && data.error) {
          setValues({ ...values, error: data.error });
        } else {
          const user = data.user;
          setValues({
            ...values,
            name: user.name,
            email: user.email,
          });
        }
      }
    );

    return () => {
      abortController.abort();
    };
  }, [match.params.userId]);

  const inputChangeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
    };

    update({ userId: match.params.userId }, { token: jwt.token }, user).then(
      (data) => {
        if (data && data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            userId: data.user._id,
            redirectToProfile: true,
          });
        }
      }
    );
  };

  if (values.redirectToProfile) {
    return <Redirect to={`/user/${values.userId}`} />;
  }
  return (
    <Card className={classes.card}>
      <CardContent variant='h6' className={classes.title}>
        <Typography>Edit Profile</Typography>

        <TextField
          className={classes.textField}
          name='name'
          label='Name'
          onChange={inputChangeHandler}
          value={values.name}
          margin='normal'
        />
        <br />
        <TextField
          className={classes.textField}
          type='email'
          name='email'
          label='Email'
          onChange={inputChangeHandler}
          value={values.email}
          margin='normal'
        />
        <br />
        <TextField
          className={classes.textField}
          type='password'
          name='password'
          label='Password'
          onChange={inputChangeHandler}
          value={values.password}
          margin='normal'
        />
        <br />

        {values.error && (
          <Typography component='p' color='error'>
            <Icon color='error' className={classes.error}>
              error
            </Icon>
            {values.error}
          </Typography>
        )}
      </CardContent>

      <CardActions>
        <Button
          color='primary'
          variant='contained'
          onClick={submitHandler}
          className={classes.submit}
        >
          Submit
        </Button>
      </CardActions>
    </Card>
  );
};

export default EditProfile;
