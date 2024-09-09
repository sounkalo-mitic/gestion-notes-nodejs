import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks, deleteTask } from '../features/todo/todoAPI';
import { List, ListItem, ListItemText, CircularProgress, Typography, Button, Paper } from '@mui/material';
import TaskForm from './TaskForm';

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.todo.tasks);
  const status = useSelector((state) => state.todo.status);
  const error = useSelector((state) => state.todo.error);
  const [showForm, setShowForm] = React.useState(false);
  const [taskToEdit, setTaskToEdit] = React.useState(null);

  React.useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  const handleOpenForm = (task = null) => {
    setTaskToEdit(task);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setTaskToEdit(null);
    setShowForm(false);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Liste Taches
      </Typography>
      <Button variant="contained" color="primary" onClick={() => handleOpenForm()}>
        Ajouter
      </Button>
      {showForm && <TaskForm taskToEdit={taskToEdit} onClose={handleCloseForm} />}
      {status === 'loading' ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">Error: {error}</Typography>
      ) : (
        <Paper style={{ padding: '16px', marginTop: '16px' }}>
          <List>
            {tasks.map((task) => (
              <ListItem key={task.id} divider>
                <ListItemText
                  primary={task.title}
                  secondary={task.content}
                />
                <Button variant="outlined" color="primary" onClick={() => handleOpenForm(task)}>
                  Modifer
                </Button>
                <Button variant="outlined" color="error" onClick={() => handleDelete(task.id)}>
                  Supprimer
                </Button>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </div>
  );
};

export default TaskList;
