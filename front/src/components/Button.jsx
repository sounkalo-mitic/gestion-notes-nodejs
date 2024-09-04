import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function MuiButton({text, color, onClick}) {
  return (
    <Stack spacing={2}  direction="row">
      <Button variant="contained" color={color} onClick={() => {onClick()}}>{text}</Button>
    </Stack>
  );
}