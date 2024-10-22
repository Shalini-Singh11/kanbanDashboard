import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// SLice redux ====================================
import {
  addTask,
  moveTask,
  deleteTask,
  editTask,
} from "../../redux/slices/taskSlice";
// Image ====================================
import TaskManageImg from "../../../public/Images/taskmanagement.svg";
// Icon MUI ====================================
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
//circle priority ====================================
import FlagIcon from "../../components/priorityflag/FlagIcon";
// MUI Material ====================================
import {
  Container,
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  CardActions,
  Box,
  Snackbar,
} from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { fetchTasks } from "../../redux/slices/taskSlice"; 
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const stages = ["Backlog", "To Do", "Ongoing", "Done"];

const TaskManage = () => {
  const dispatch = useDispatch();
  const userId = JSON.parse(localStorage.getItem("user"))?.id;
  const tasks = useSelector((state) => state.tasks);

  const [taskList, setTaskList] = useState();
  const [newTask, setNewTask] = useState({
    name: "",
    priority: "medium",
    deadline: "",
    stage: 0,
    userId: userId,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);

  useEffect(() => {
    const filterData = tasks?.filter((task) => task.userId === userId);
    setTaskList(filterData);
  }, [tasks]);

  // ================fetch data========================
  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  //==================================== Snackbar state ====================================
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  //==================================== Handle input changes ====================================
  const handleInputChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  //==================================== Create new task ====================================

  const createTask = () => {
    if (newTask.name && newTask.priority && newTask.deadline) {
      dispatch(addTask({ ...newTask }));
      setNewTask({ name: "", priority: "medium", deadline: "", stage: 0 });
      setSnackbarMessage("Task added successfully!");
      setSnackbarOpen(true);
    } else {
      toast.error("Please fill out all fields");
    }
  };

  //==================================== edit ====================================
  const startEditTask = (task) => {
    setNewTask(task);
    setIsEditing(true);
    setEditingTaskId(task.id);
  };

  //==================================== editable task saved====================================


  const saveEditedTask = () => {
    if (newTask.name && newTask.priority && newTask.deadline) {
      dispatch(editTask({ ...newTask, id: editingTaskId }));
      setNewTask({ name: "", priority: "medium", deadline: "", stage: 0 });
      setIsEditing(false);
      setEditingTaskId(null);
      setSnackbarMessage("Task edited successfully!");
      setSnackbarOpen(true);
    } else {
      alert("Please fill out all fields");
    }
  };

  // ====================================Move task back for ====================================

  const moveTaskHandler = (taskId, direction) => {
    dispatch(moveTask({ id: taskId, direction }));
    const action = direction === 1 ? "moved forward" : "moved backward";
    setSnackbarMessage(`Task ${action} successfully!`);
    setSnackbarOpen(true);
  };

  //==================================== Delete====================================

  const deleteTaskHandler = (taskId) => {
    dispatch(deleteTask(taskId));
    setSnackbarMessage("Task deleted successfully!");
    setSnackbarOpen(true);
  };

  //==================================== for drag and drop ====================================
  const handleDragEnd = (result) => {
    const { source, destination } = result;

    if (
      !destination ||
      (source.droppableId === destination.droppableId &&
        source.index === destination.index)
    ) {
      return;
    }

    dispatch(
      moveTask({
        id: result.draggableId,
        direction: destination.index - source.index,
      })
    );
  };

  //==================================== priority color ====================================
  const getFlagColor = (priority) => {
    switch (priority) {
      case "high":
        return "#B13A41";
      case "medium":
        return "#CF940A";
      case "low":
        return "#4466FF";
      default:
        return "gray";
    }
  };

  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      marginY={5}
    >
      <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
          <Box component="img" src={TaskManageImg} width={"100%"} />
        </Grid>
        <Grid item md={6} xs={12}>
          <Paper style={{ padding: "16px", marginBottom: "20px" }}>
            <TextField
              label="Task Name"
              name="name"
              value={newTask.name}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Priority"
              name="priority"
              select
              value={newTask.priority}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
              SelectProps={{
                native: true,
              }}
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </TextField>
            <TextField
              label="Deadline"
              name="deadline"
              type="date"
              value={newTask.deadline}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#921A40",
                "&:hover": {
                  backgroundColor: "#C75B7A",
                },
                color: "white",
              }}
              onClick={isEditing ? saveEditedTask : createTask}
            >
              {isEditing ? "Save Task" : "Create Task"}
            </Button>
          </Paper>
        </Grid>
        <ToastContainer/>
      </Grid>

      {/*==================================== Task Boards ==================================== */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Grid container spacing={2}>
          {stages.map((stage, stageIndex) => (
            <Grid item md={3} xs={12} key={stageIndex}>
              <Droppable droppableId={stageIndex.toString()}>
                {(provided) => (
                  <Paper
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{ padding: "16px", minHeight: "200px" }}
                  >
                    <Typography variant="h6">{stage}</Typography>
                    {taskList
                      ?.filter((task) => task.stage === stageIndex)
                      .map((task, index) => (
                        <Draggable
                          key={task.id.toString()}
                          draggableId={task.id.toString()}
                          index={index}
                        >
                          {(provided) => (
                            <Card
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                marginBottom: "10px",
                                backgroundColor: "#f4f4f4",
                              }}
                            >
                              <CardContent>
                                <Typography variant="h6">
                                  {task.name}
                                </Typography>
                                <Box
                                  display="flex"
                                  alignItems="center"
                                  justifyContent="space-between"
                                >
                                  <Typography color="textSecondary">
                                    Priority: {task.priority}
                                  </Typography>
                                  <FlagIcon
                                    color={getFlagColor(task.priority)}
                                  />
                                </Box>
                                <Typography color="textSecondary">
                                  Deadline: {task.deadline}
                                </Typography>
                              </CardContent>
                              <CardActions>
                                <Grid container spacing={1}>
                                  <Grid item xs={6} md={3}>
                                    <Button
                                      size="small"
                                      onClick={() =>
                                        moveTaskHandler(task.id, -1)
                                      }
                                      disabled={task.stage === 0}
                                      sx={{
                                        backgroundColor: "#921A40",
                                        color: "white",
                                      }}
                                      fullWidth
                                    >
                                      <ArrowBackIcon />
                                    </Button>
                                  </Grid>
                                  <Grid item xs={6} md={3}>
                                    <Button
                                      size="small"
                                      onClick={() =>
                                        moveTaskHandler(task.id, 1)
                                      }
                                      disabled={
                                        task.stage === stages.length - 1
                                      }
                                      sx={{
                                        backgroundColor: "#921A40",
                                        color: "white",
                                      }}
                                      fullWidth
                                    >
                                      <ArrowForwardIcon />
                                    </Button>
                                  </Grid>
                                  <Grid item xs={6} md={3}>
                                    <Button
                                      size="small"
                                      onClick={() => startEditTask(task)}
                                      sx={{
                                        backgroundColor: "#921A40",
                                        color: "white",
                                      }}
                                      fullWidth
                                    >
                                      <EditIcon />
                                    </Button>
                                  </Grid>
                                  <Grid item xs={6} md={3}>
                                    <Button
                                      size="small"
                                      onClick={() => deleteTaskHandler(task.id)}
                                      sx={{
                                        backgroundColor: "#921A40",
                                        color: "white",
                                      }}
                                      fullWidth
                                    >
                                      <DeleteIcon />
                                    </Button>
                                  </Grid>
                                </Grid>
                              </CardActions>
                            </Card>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </Paper>
                )}
              </Droppable>
            </Grid>
          ))}
        </Grid>
      </DragDropContext>
      {/* ==================================== end task boards ==================================== */}

      {/*==================================== Snackbar for notifications==================================== */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default TaskManage;
