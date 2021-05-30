import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { create } from './user-api.js';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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

const Signup = () => {
  const classes = useStyles();
  const [values, setValues] = useState({
    name: '',
    password: '',
    email: '',
    open: false,
    error: '',
  });

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
    create(user).then((data) => {
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, error: '', open: true });
      }
    });
  };

  return (
    <>
      {/* Sign up form */}
      <Card className={classes.card}>
        <CardContent>
          <Typography variant='h6' className={classes.title}>
            Sign Up
          </Typography>

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
        </CardContent>

        {/* Errors handling */}
        {values.error && (
          <Typography color='error' component='p'>
            <Icon color='error' className={classes.error}>
              error
            </Icon>
            {values.error}
          </Typography>
        )}
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

      {/* Modal */}
      <Dialog open={values.open} disableBackdropClick={true}>
        <DialogTitle>New Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            New Account successfully created.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Link to='/signin' style={{ textDecoration: 'none' }}>
            <Button color='primary' autoFocus='autoFocus' variant='contained'>
              SignIn
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Signup;
