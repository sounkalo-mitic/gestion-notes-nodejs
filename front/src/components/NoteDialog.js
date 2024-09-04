import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import MuiButton from './Button';

export default function NoteDialog({ open, onClose, onSave, editItem, setEditItem }) {
  const handleChange = (e) => {
    setEditItem({ ...editItem, [e.target.name]: e.target.value });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{editItem.id ? 'Modifier Note' : 'Ajouter Note'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="title"
          label="Title"
          type="text"
          fullWidth
          variant="standard"
          value={editItem.title || ''}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="content"
          label="Content"
          type="text"
          fullWidth
          variant="standard"
          value={editItem.content || ''}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <MuiButton onClick={onClose}>Annuler</MuiButton>
        <MuiButton onClick={onSave}>Enregistrer</MuiButton>
      </DialogActions>
    </Dialog>
  );
}
