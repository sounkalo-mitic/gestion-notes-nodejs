// src/components/MyComponent.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button} from '@mui/material';

const MyComponent = ({onClick}) => {
  return (
    <div>
      {/* Barre d'application */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Mon Application
          </Typography>
          <Button color="inherit" onClick={() => {onClick()}}>Ajouter</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default MyComponent;
