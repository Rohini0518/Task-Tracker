import {
  Box,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
} from '@mui/material';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';

const CreateTask = ({ initialValues = {}, onSubmit }) => {
  const [form, setForm] = useState({
    title: initialValues.title || '',
    description: initialValues.description || '',
    status: initialValues.status || 'Pending',
    dueDate: initialValues.dueDate || null,
  });

  const handleChange = (field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: e?.$d || e.target.value, // handle DatePicker and TextField
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
    >
      <TextField
        label="Title"
        value={form.title}
        onChange={handleChange('title')}
        fullWidth
        required
      />

      <TextField
        label="Description"
        value={form.description}
        onChange={handleChange('description')}
        fullWidth
        multiline
        rows={4}
        required
      />

      <FormControl fullWidth>
        <InputLabel>Status</InputLabel>
        <Select
          value={form.status}
          label="Status"
          onChange={handleChange('status')}
        >
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
        </Select>
      </FormControl>

      {/* <DatePicker
        label="Due Date"
        value={form.dueDate}
        onChange={handleChange('dueDate')}
        slotProps={{ textField: { fullWidth: true } }}
      /> */}

      <Button type="submit" variant="contained" color="primary">
        {initialValues.title ? 'Update Task' : 'Create Task'}
      </Button>
    </Box>
  );
};

export default CreateTask;
