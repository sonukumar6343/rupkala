import { useState, useEffect } from "react";
import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../constants/config";

const AdminLogin = () => {
  const [secretKey, setSecretKey] = useState("");
  const navigate = useNavigate();
  const checkTokenCookie = (): boolean => {
    return document.cookie
      .split("; ")
      .some((cookie) => cookie.startsWith("rupkala-admin="));
  };

  useEffect(() => {
    if (checkTokenCookie()) {
      navigate("/admin");
    }
  }, [navigate]);
 
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${server}/api/admin/login`,
        { secretKey },
        { withCredentials: true }
      );

      if (data.success) {
        console.log("succeded");
        navigate("/admin");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error: any) {
      console.error("Login Error:", error.response?.data?.message || error);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:"black",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor:"#1f1f1f"
        }}
      >
        <Typography variant="h5" color="white">Admin Login</Typography>
        <form
          style={{
            width: "100%",
            marginTop: "1rem",
          }}
          onSubmit={submitHandler}
        >
          <TextField
            required
            fullWidth
            label="Secret Key"
            type="password"
            margin="normal"
            variant="outlined"
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
          />

          <Button
            sx={{
              marginTop: "1rem",
            }}
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
          >
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default AdminLogin;
