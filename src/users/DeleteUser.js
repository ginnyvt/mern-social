import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import auth from '../auth/auth-helper';
import { remove } from './user-api';

import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const DeleteUser = (props) => {
  const [open, setOpen] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const jwt = auth.isAuthenticated();

  const showModalHandler = () => {
    setOpen(true);
  };

  const closeModalHandler = () => {
    setOpen(false);
  };

  const deleteAccountHandler = () => {
    remove({ userId: props.userId }, { token: jwt.token }).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        console.log(data);
        auth.clearJwt(() => console.log('deleted'));
        setRedirect(true);
      }
    });
  };

  if (redirect) {
    return <Redirect to='/' />;
  }

  return (
    <span>
      <IconButton
        arial-label='Delete'
        onClick={showModalHandler}
        color='secondary'
      >
        <DeleteIcon />
      </IconButton>

      {/* Modal */}
      <Dialog open={open} onClose={closeModalHandler}>
        <DialogTitle>{'Delete Account'}</DialogTitle>
        {/* <DialogTitle>{'Delete Account'}</DialogTitle> */}

        <DialogContent>
          <DialogContentText>Confirm to delete your account</DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={closeModalHandler} color='primary'>
            Cancel
          </Button>
          <Button
            onClick={deleteAccountHandler}
            color='secondary'
            autoFocus='autoFocus'
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </span>
  );
};

DeleteUser.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default DeleteUser;
