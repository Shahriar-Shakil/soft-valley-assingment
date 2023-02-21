import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LoadingButton from "@mui/lab/LoadingButton";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { createTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { notification } from "antd";
import * as React from "react";
import { request } from "../src/config/api";
import { API_ADMIN_LOGIN } from "../src/lib/api-endpoints";
import { useAuth } from "../src/lib/use-auth";

const theme = createTheme();
const modalSuccess = (type) => {
  notification[type]({
    message: "Wellcome",
    description: "You are login successful!",
    duration: 2,
  });
};
const modalError = (type, message) => {
  notification[type]({
    message: "Error",
    description: message,
    duration: 2,
  });
};

function SignIn() {
  const [loading, setLoading] = React.useState(false);

  const { login } = useAuth();
  //  login handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let params = {
      email: data.get("email"),
      password: data.get("password"),
    };
    setLoading(true);
    try {
      const { data } = await request.post(API_ADMIN_LOGIN, {
        ...params,
      });
      if (data.success === true) {
        login(data.data.token);
        modalSuccess("success");
      }
    } catch (error) {
      modalError("error", error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Stack direction="row" spacing={1}>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 0,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "#ffc107",
              textDecoration: "none",
            }}
          >
            SOFT
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: "2px",
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "#3f51b5",
              textDecoration: "none",
            }}
          >
            VALLEY
          </Typography>
        </Stack>
        <Typography component="p" sx={{ color: "#ff9800", fontSize: "14px" }}>
          Note: Allow Insecure content from site settings
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />

          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            loading={loading}
          >
            Sign In
          </LoadingButton>

          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
export default SignIn;
