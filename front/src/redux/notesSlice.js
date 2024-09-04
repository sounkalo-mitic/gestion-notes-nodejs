import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const notesSlice = createSlice({
    name: 'notes',
    initialState: [],
    reducers: {
        setNotes: (state, action) => {
            return action.payload;
        },
        addNote: (state, action) => {
            state.push(action.payload);
        },
        updateNote: (state, action) => {
            const index = state.findIndex(note => note.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
        deleteNote: (state, action) => {
            return state.filter(note => note.id !== action.payload);
        },
    },
});

export const { setNotes, addNote, updateNote, deleteNote } = notesSlice.actions;

export const fetchNotes = () => async dispatch => {
    try {
        const response = await axios.get('http://localhost:3000/api/notes');
        dispatch(setNotes(response.data));
    } catch (error) {
        console.error('Erreur lors de la récupération des notes:', error);
    }
};

export const createNote = (note) => async dispatch => {
    try {
        const response = await axios.post('http://localhost:3000/api/notes', note);
        dispatch(addNote(response.data));
    } catch (error) {
        console.error('Erreur lors de l\'ajout de la note:', error);
    }
};

export const modifyNote = (note) => async dispatch => {
    try {
        const response = await axios.put(`http://localhost:3000/api/notes/${note.id}`, note);
        dispatch(updateNote(response.data));
    } catch (error) {
        console.error('Erreur lors de la modification de la note:', error);
    }
};

export const removeNote = (id) => async dispatch => {
    try {
        await axios.delete(`http://localhost:3000/api/notes/${id}`);
        dispatch(deleteNote(id));
    } catch (error) {
        console.error('Erreur lors de la suppression de la note:', error);
    }
};

export default notesSlice.reducer;
