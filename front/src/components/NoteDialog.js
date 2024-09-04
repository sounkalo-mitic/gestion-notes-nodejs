// src/components/NoteDialog.js

import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import MuiButton from './Button';

const NoteDialog = ({ open, onClose, onSave, editItem, setEditItem }) => {
  const handleChange = (field) => (e) => {
    setEditItem({ ...editItem, [field]: e.target.value });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{editItem ? 'Modifier l\'élément' : 'Ajouter un nouvel élément'}</DialogTitle>
      <DialogContent>
        <form noValidate autoComplete="off">
          <TextField
            margin="dense"
            label="Title"
            fullWidth
            variant="standard"
            value={editItem ? editItem.title : ''}
            onChange={handleChange('title')}
          />
          <TextField
            margin="dense"
            label="Content"
            fullWidth
            variant="standard"
            value={editItem ? editItem.content : ''}
            onChange={handleChange('content')}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <MuiButton color="primary" text="Enregistrer" onClick={onSave} />
        <MuiButton color="secondary" text="Annuler" onClick={onClose} />
      </DialogActions>
    </Dialog>
  );
};

export default NoteDialog;
