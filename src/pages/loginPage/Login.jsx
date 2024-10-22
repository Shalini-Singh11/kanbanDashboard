import { useState } from "react";
// MUI material ==================================
import { TextField, Button, Grid, Box, Typography, Alert } from "@mui/material";
// For API ============================
import Apiservices from "../../services/Apiservices";
// Router dom for navigation ==================================
import { useNavigate } from "react-router-dom";
// Images ==================================
import login from "../../../public/Images/Login.svg";
// reCAPTCHA ==================================
import ReCAPTCHA from "react-google-recaptcha";
// style==========================
import { BoxContainImgForm } from "./style";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [captchaVerified, setCaptchaVerified] = useState(false); // CAPTCHA state
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ========= for handle change =============
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //============= Handle CAPTCHA verification ==============
  const handleCaptchaVerify = (value) => {
    if (value) {
      setCaptchaVerified(true);
    } else {
      setCaptchaVerified(false);
    }
  };
  // ========= For handle Submit =============
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    setLoading(true);
    setError("");

    // ========= For CAPTCHA  =========
    if (!captchaVerified) {
      setError("Please verify that you are not a robot.");
      setLoading(false);
      return;
    }

    // ========= API from db Json =============
    try {
      const users = await Apiservices.get("users");
      const user = users.find(
        (u) => u.email === email && u.password === password
      );
      if (!user) {
        setError("Invalid email or password.");
        setLoading(false);
        return;
      }
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/dashboard");
    } catch (error) {
      setError(error.message || "Login failed.");
      setLoading(false);
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: "100vh" }}
    >
      <Grid item xs={12} md={10} lg={8}>
        <Box sx={BoxContainImgForm}>
          {/*============ For Login Image ============ */}
          <Grid item xs={12} md={7}>
            <Box>
              <img src={login} width={"100%"} alt="Login" />
            </Box>
          </Grid>
          {/*============ Login end ============ */}
          {/*============ For Login Form ============ */}
          <Grid item xs={12} md={5}>
            <Typography variant="h5" gutterBottom>
              Login
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                name="email"
                label="Email"
                margin="normal"
                onChange={handleChange}
              />
              <TextField
                fullWidth
                name="password"
                type="password"
                label="Password"
                margin="normal"
                onChange={handleChange}
              />

              {/*================== CAPTCHA  ==================*/}
              <ReCAPTCHA
                sitekey="6Le1yWIqAAAAADoFYkRy77IEkv73Zj57RzOZf-25"
                onChange={handleCaptchaVerify}
              />
             {/*================== CAPTCHA end ==================*/}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={loading || !captchaVerified} 
                sx={{
                  backgroundColor: "#921A40",
                  "&:hover": {
                    backgroundColor: "#C75B7A",
                  },
                  color: "white",
                }}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
              <Typography mt={2}>
                Not a member? <a href="/register">Register</a>
              </Typography>
            </Box>
          </Grid>
          {/*============ Login Form End ============ */}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;

