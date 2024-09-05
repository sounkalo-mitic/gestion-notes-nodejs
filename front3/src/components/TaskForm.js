// src/components/TaskForm.js
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createTask, updateTask, fetchTasks } from '../features/todo/todoAPI';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const TaskForm = ({ taskToEdit = null, onClose }) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (taskToEdit) {
            setTitle(taskToEdit.title);
            setContent(taskToEdit.content);
        } else {
            setTitle('');
            setContent('');
        }
    }, [taskToEdit]);

    const handleSubmit = () => {
        if (taskToEdit) {
            dispatch(updateTask({ ...taskToEdit, title, content })).then(() => {
                dispatch(fetchTasks()); // Re-fetch tasks to update the list
                onClose();
            });
        } else {
            dispatch(createTask({ title, content })).then(() => {
                dispatch(fetchTasks()); // Re-fetch tasks to update the list
                onClose();
            });
        }
    };

    return (
        <Dialog open={true} onClose={onClose}>
            <DialogTitle>{taskToEdit ? 'Edit Task' : 'Add Task'}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Title"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Content"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>retour</Button>
                <Button onClick={handleSubmit}>envoyer</Button>
            </DialogActions>
        </Dialog>
    );
};

export default TaskForm;
