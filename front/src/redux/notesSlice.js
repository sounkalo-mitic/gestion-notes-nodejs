// src/redux/notesSlice.js

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

export default notesSlice.reducer;
