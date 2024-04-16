import { useState } from "react";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Groups2Icon from "@mui/icons-material/Groups2";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { InputAdornment } from "@mui/material";

function Login({ onLogin, setNavbarUsername, setRole }) {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const registerUser = async () => {
    try {
      const response = await fetch(
        "https://6619abd2125e9bb9f29a88d2.mockapi.io/api/v1/users"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const users = await response.json();
      const user = users.find((user) => user.email === username);

      if (!user) {
        const newUser = { email: username, role: "client", password };
        const registerResponse = await fetch(
          "https://6619abd2125e9bb9f29a88d2.mockapi.io/api/v1/users",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
          }
        );

        if (!registerResponse.ok) {
          throw new Error("Failed to register user");
        } else {
          const createdUser = await registerResponse.json();
          onLogin();
          setNavbarUsername(createdUser.email);
          setRole(createdUser.role);

          const urlParams = new URLSearchParams(window.location.search);
          const redirect = urlParams.get("redirect");

          if (redirect) {
            navigate(`/${redirect}`);
          } else {
            navigate("/");
          }
        }
      } else {
        setError("User already exists. Please login.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while registering");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://6619abd2125e9bb9f29a88d2.mockapi.io/api/v1/users"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const users = await response.json();
      const user = users.find(
        (user) => user.email === username && user.password === password
      );

      if (isRegistering) {
        await registerUser();
      } else {
        if (user) {
          localStorage.setItem("username", user.email);
          localStorage.setItem("role", user.role);
          onLogin();
          setNavbarUsername(user.email);
          setRole(user.role);

          const urlParams = new URLSearchParams(window.location.search);
          const redirect = urlParams.get("redirect");

          if (redirect) {
            navigate(`/${redirect}`);
          } else {
            navigate("/");
          }
        } else {
          setError("Invalid username or password");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setError(
        isRegistering
          ? "An error occurred while registering"
          : "An error occurred while logging in"
      );
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        justifyContent: "center",
      }}
    >
      <Paper
        sx={{
          padding: "32px",
          maxWidth: "400px",
          width: "100%",
        }}
        elevation={3}
      >
        <Box
          sx={{ display: "flex", alignItems: "center", marginBottom: "16px" }}
        >
          <Groups2Icon sx={{ fontSize: 48, marginRight: "16px" }} />
          <Typography variant="h5" gutterBottom>
            {isRegistering ? "Register" : "Login"}
          </Typography>
        </Box>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => {
              setError("");
              setUsername(e.target.value);
            }}
          />
          <TextField
            label="Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => {
              setError("");
              setPassword(e.target.value);
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    sx={{
                      "&:focus": {
                        outline: 0,
                      },
                    }}
                    onClick={handleTogglePasswordVisibility}
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {error && (
            <Typography variant="body2" color="error" gutterBottom>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            sx={{ mt: 2 }}
          >
            {isRegistering ? "Register" : "Login"}
          </Button>
          <Button
            onClick={() => {
              setError("");
              setIsRegistering((prev) => !prev);
            }}
            color="primary"
            fullWidth
            size="large"
            sx={{ mt: 2 }}
          >
            {isRegistering
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
  setNavbarUsername: PropTypes.func.isRequired,
  setRole: PropTypes.func.isRequired,
};

export default Login;
