// ModalForm.js
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import MuiButton from './Button';

const ModalForm = ({ open, onClose, onSave, item, isEditing }) => {
    const [formData, setFormData] = React.useState(item || { title: '', content: '' });

    React.useEffect(() => {
        setFormData(item || { title: '', content: '' });
    }, [item]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSave = () => {
        onSave(formData);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{isEditing ? 'Modifier l\'élément' : 'Ajouter un élément'}</DialogTitle>
            <DialogContent>
                <form noValidate autoComplete="off">
                    <TextField
                        margin="dense"
                        label="Title"
                        fullWidth
                        variant="standard"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        label="Content"
                        fullWidth
                        variant="standard"
                        name="content"
                        value={formData.content}
                        onChange={handleInputChange}
                    />
                </form>
            </DialogContent>
            <DialogActions>
                <MuiButton color="primary" text="Enregistrer" onClick={handleSave} />
                <MuiButton color="secondary" text="Annuler" onClick={onClose} />
            </DialogActions>
        </Dialog>
    );
};

export default ModalForm;
