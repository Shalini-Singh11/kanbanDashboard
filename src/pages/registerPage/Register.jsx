import { useState } from "react";
import { TextField, Button, Grid, Box, Typography, Alert } from "@mui/material";
import register from "../../../public/Images/Register.svg";
import Apiservices from "../../services/Apiservices";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  validateName,
  validateUsername,
  validateEmail,
  validatePassword,
  validateContactNumber,
} from "../../validations/ValidationForm";

import { containerStyles, cardStyles, formContainerStyles } from "./style";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    contactNumber: "",
    profileImage: null,
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profileImage: e.target.files[0] });
  };

  const validateForm = () => {
    const nameError = validateName(formData.name);
    const usernameError = validateUsername(formData.username);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const contactNumberError = validateContactNumber(formData.contactNumber);

    if (
      nameError ||
      usernameError ||
      emailError ||
      passwordError ||
      contactNumberError
    ) {
      setError(
        `${nameError} ${usernameError} ${emailError} ${passwordError} ${contactNumberError}`.trim()
      );
      return false;
    }
    return true;
  };

 

  // ================== user can register only one time ===============
  const checkUserExists = async (email) => {
    try {
      const response = await fetch("http://localhost:8080/users");
      
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      
      const allUsers = await response.json();  
      const userExists = allUsers.some((user) => user.email === email);
      return userExists;  
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      return false;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; 
    try {
      const userExists = await checkUserExists(formData.email);
      if (userExists) {
        toast.error("This email is already registered. Please use a different email.");
        setError("User with this email already exists.");
        return;
      }

      await Apiservices.post("users", {
        ...formData,
        id: Date.now(),
      });
      toast.success("Registration successful!");
      setSuccessMessage("Registration successful!");
      setError("");

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      setError(error.message || "Registration failed.");
      toast.error(error.message || "Registration failed.");
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ ...containerStyles }}
    >
      <Grid item xs={12} md={10} lg={8}>
        <Box sx={{ ...cardStyles }}>
          <Grid item xs={12} md={5} sx={{ ...formContainerStyles }}>
            <Box component="form" onSubmit={handleSubmit}>
              <Typography variant="h5" gutterBottom>
                Register
              </Typography>

              {successMessage && (
                <Alert severity="success" sx={{ marginBottom: 2 }}>
                  {successMessage}
                </Alert>
              )}
              {error && (
                <Alert severity="error" sx={{ marginBottom: 2 }}>
                  {error}
                </Alert>
              )}

              {/* Form Fields */}
              <TextField
                fullWidth
                margin="normal"
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                margin="normal"
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                margin="normal"
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                margin="normal"
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                margin="normal"
                label="Contact Number (Optional)"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
              />
              <input type="file" accept="image/*" onChange={handleFileChange} />
              <Box mt={2}>
                <Button
                  type="submit"
                  fullWidth
                  margin="normal"
                  variant="contained"
                  sx={{
                    backgroundColor: "#921A40",
                    "&:hover": {
                      backgroundColor: "#C75B7A",
                    },
                    color: "white",
                  }}
                >
                  Register
                </Button>
              </Box>
              <Typography mt={2}>
                Already a member? <a href="/">Login</a>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={7}>
            <Box>
              <img src={register} width={"100%"} alt="Register" />
            </Box>
          </Grid>
        </Box>
      </Grid>
      <ToastContainer />
    </Grid>
  );
};

export default Register;
