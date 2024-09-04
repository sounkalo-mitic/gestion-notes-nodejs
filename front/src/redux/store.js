// src/redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import notesReducer from './notesSlice'; // Importer le slice pour les notes

const store = configureStore({
    reducer: {
        notes: notesReducer, // Ajouter le reducer de notes
    },
});

export default store;
