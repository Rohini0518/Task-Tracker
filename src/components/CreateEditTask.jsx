import {
  Box,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const CreateEditTask = ({ initialValues = {}, onSubmit }) => {
  const [form, setForm] = useState({
    title: initialValues.title || "",
    description: initialValues.description || "",
    status: initialValues.status || "Pending",
    dueDate: initialValues.dueDate ? dayjs(initialValues.dueDate) : null,
  });

   useEffect(() => {
    setForm({
      title: initialValues.title || "",
      description: initialValues.description || "",
      status: initialValues.status || "Pending",
    dueDate: initialValues.dueDate ? dayjs(initialValues.dueDate) : null,
    });
  }, [initialValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
    >
      <TextField
        label="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        fullWidth
        required
      />

      <TextField
        label="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        fullWidth
        multiline
        rows={3}
        required
      />

      <FormControl fullWidth>
        <InputLabel>Status</InputLabel>
        <Select
          value={form.status}
          label="Status"
        onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
        </Select>
      </FormControl>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            label="Due Date"
            value={form.dueDate}
          onChange={(newDate) => setForm({ ...form, dueDate: newDate })}
             slotProps={{ textField: { fullWidth: true, margin: "normal" } }}

          />
        </DemoContainer>
      </LocalizationProvider>

      <Button type="submit" variant="contained" color="primary">
        {initialValues.title ? "Update Task" : "Create Task"}
      </Button>
    </Box>
  );
};

export default CreateEditTask;
