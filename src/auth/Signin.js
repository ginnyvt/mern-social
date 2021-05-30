import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { signin } from './auth-api';
import auth from './auth-helper';

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
  error: {
    verticalAlign: 'middle',
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle,
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

const Signin = (props) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    redirectToReferrer: false,
  });

  const inputChangeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const user = {
      email: values.email || undefined,
      password: values.password || undefined,
    };

    signin(user).then((data) => {
      console.log(data);
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        // console.log(data.token);
        auth.authenticate(data, () => {
          setValues({
            ...values,
            error: '',
            redirectToReferrer: true,
          });
        });
      }
    });
  };

  const { from } = props.location.state || {
    from: {
      pathname: '/',
    },
  };

  if (values.redirectToReferrer) {
    return <Redirect to={from} />;
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant='h6' className={classes.title}>
          Sign In
        </Typography>

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

export default Signin;
