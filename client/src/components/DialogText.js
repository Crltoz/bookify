import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function DialogText({ title, text, onClose }) {
  return (
    <React.Fragment>
      <Dialog
        open={typeof text === 'string' && text.length > 0}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          { title }
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            { text }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Aceptar</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
