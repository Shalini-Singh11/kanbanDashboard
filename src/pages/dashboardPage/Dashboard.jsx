import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from "@mui/material";
import DashboardMain from "../../../public/Images/dashboardMain.svg";
import {
  cardStyles,
  cardContentStyles,
  titleStyles,
  countStyles,
} from "./style";
import Apiservices from "../../services/Apiservices";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [dashboardData, setDashboardData] = useState(null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const userId = JSON.parse(localStorage.getItem('user'))?.id; 

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await Apiservices.get("dashboard");
        if (!response.ok) {
          throw new Error("Failed to fetch dashboard data.");
        }
        const data = await response.json();
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    const fetchTaskData = () => {
      fetch("http://localhost:8080/tasks")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          
          const tasks = data.filter(task => task.userId === userId);
          setTasks(tasks);
          console.log(data); 
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
    };
    fetchTaskData();
    fetchDashboardData();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  const ongoingTasks = tasks.filter((task) => task.stage === 2).length;
  const pendingTasks = tasks.filter(
    (task) => task.stage === 0 || task.stage === 1
  ).length;
  const completedTasks = tasks.filter((task) => task.stage === 3).length;

  const DashboardCardData = [
    {
      title: "Total Task",
      count: tasks.length, // ==================== Total number of tasks ====================
      gradient:
        "linear-gradient(to right top, #921a40, #9c284a, #a63555, #b04160, #ba4c6b, #c05873, #c7647b, #cd7083, #d17f8b, #d48e95, #d79d9f, #d9abab)",
    },
    {
      title: "On Going",
      count: ongoingTasks, //==================== Tasks with stage 2 ====================
      gradient:
        "linear-gradient(to right bottom, #921a40, #a13b51, #af5664, #bc7078, #c9898d, #cd8e92, #d29397, #d6989c, #d38992, #d07a89, #cc6b81, #c75b7a)",
    },
    {
      title: "Pending",
      count: pendingTasks, //==================== Tasks with stage 0 or 1 ====================
      gradient:
        "linear-gradient(to left bottom, #921a40, #a13b51, #af5664, #bc7078, #c9898d, #d19899, #d9a7a6, #e0b6b3, #e5bfba, #eac7c1, #efd0c8, #f4d9d0)",
    },
    {
      title: "Completed",
      count: completedTasks, // ==================== Tasks with stage 3 ====================
      gradient:
        "linear-gradient(to left top, #921a40, #9c284a, #a63555, #b04160, #ba4c6b, #c05873, #c7647b, #cd7083, #d17f8b, #d48e95, #d79d9f, #d9abab)",
    },
  ];

  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
    >
      <Grid
        container
        spacing={2}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Grid item xs={12} md={7}>
          <Box component="img" src={DashboardMain} width={"100%"} />
        </Grid>
        <Grid item xs={12} md={5}>
          <Grid container spacing={3}>
            {DashboardCardData.map((item, index) => (
              <Grid item xs={12} sm={6} md={6} key={index}>
                <Card sx={cardStyles(item.gradient)}>
                  <CardContent sx={cardContentStyles}>
                    <Typography variant="h6" sx={titleStyles}>
                      {item.title}
                    </Typography>
                    <Typography variant="h2" sx={countStyles}>
                      {item.count}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;


