import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MuiButton from './Button';
import { fetchNotes, updateNote, deleteNote, createNote } from '../redux/notesSlice';
import NoteDialog from './NoteDialog';

const styles = {
  cellButtonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 10,
  },
};

export default function BasicTable() {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes);
  const [editItem, setEditItem] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  const handleEditClick = (item) => {
    setEditItem(item);
    setOpen(true);
  };

  const handleAddClick = () => {
    setEditItem({ title: '', content: '' }); // Réinitialise l'élément à ajouter
    setOpen(true);
  };

  const handleDelete = (item) => {
    dispatch(deleteNote(item.id));
  };

  const handleClose = () => {
    setOpen(false);
    setEditItem(null);
  };

  const handleSave = () => {
    if (editItem.id) {
      dispatch(updateNote(editItem));
    } else {
      dispatch(createNote(editItem));
    }
    handleClose();
  };

  return (
    <>
      <MuiButton color={'primary'} text={'Ajouter Note'} onClick={handleAddClick} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, marginTop: 10 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Title</TableCell>
              <TableCell align="right">Content</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notes.map((row) => (
              <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="right">{row.title}</TableCell>
                <TableCell align="right">{row.content}</TableCell>
                <TableCell style={styles.cellButtonContainer}>
                  <MuiButton color={'success'} text={'Modifier'} onClick={() => handleEditClick(row)} />
                  <MuiButton color={'error'} text={'Supprimer'} onClick={() => handleDelete(row)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Utilisation du composant NoteDialog */}
      <NoteDialog
        open={open}
        onClose={handleClose}
        onSave={handleSave}
        editItem={editItem}
        setEditItem={setEditItem}
      />
    </>
  );
}
