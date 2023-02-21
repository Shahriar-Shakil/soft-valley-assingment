import MuiAppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";

import Navbar from "./Navbar";
//
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import { useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useAuth } from "../lib/use-auth";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

function DashboardContent({ children }) {
  const matches = useMediaQuery("(max-width:768px)");

  const [open, setOpen] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { logout } = useAuth();

  React.useEffect(() => {
    if (matches) {
      setOpen(false);
    }
  }, [matches]);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    logout();
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        sx={{ background: "#fff" }}
        position="absolute"
        elevation={0}
        open={open}
      >
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="primary"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              component="h1"
              variant="h6"
              noWrap
              sx={{ color: "#334155" }}
            >
              Leads
            </Typography>
            <Typography
              component="p"
              color="secondary"
              noWrap
              sx={{ color: "#475569", fontSize: 12 }}
            >
              Difficulties increase the nearer we get to the goal.
            </Typography>
          </Box>
          {/* 
          <IconButton color="">
            <Badge badgeContent={4} color="primary">
              <NotificationsIcon />
            </Badge>
          </IconButton> */}
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="primary"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar>
          <Box sx={{ width: "100%" }}>
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
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {" "}
              {/* <AccountCircleOutlinedIcon sx={{ mr: 1 }} fontSize="large" /> */}
              <Typography variant="p" sx={{ fontSize: 12 }}>
                Hello! Good Evening
              </Typography>
            </Box>
          </Box>
        </Toolbar>

        <Navbar />
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

export default function Layout({ children }) {
  return <DashboardContent>{children}</DashboardContent>;
}
