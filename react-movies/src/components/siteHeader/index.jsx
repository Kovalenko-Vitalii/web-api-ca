import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router";
import { styled } from '@mui/material/styles';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";


const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const SiteHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  
  const navigate = useNavigate();
  const context = useContext(AuthContext);


  const publicOptions = [
  { label: "Home", path: "/" },
];

const privateOptions = [
  { label: "Favorites", path: "/movies/favorites" },
  { label: "Upcoming", path: "/movies/upcoming" },
  { label: "Top-Rated", path: "/movies/top_rated" },
  { label: "WatchList", path: "/movies/watchlist" }, 
];

const authOptions = context.isAuthenticated
  ? [{ label: "Profile", path: "/profile" }]
  : [
      { label: "Login", path: "/login" },
      { label: "Signup", path: "/signup" },
    ];

const menuOptions = context.isAuthenticated
  ? [...publicOptions, ...privateOptions, ...authOptions]
  : [...publicOptions, ...authOptions];

  const handleMenuSelect = (pageURL) => {
    setAnchorEl(null);
    navigate(pageURL);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#1976d2",
          color: "white",
        }}
      >

        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            TMDB Client
          </Typography>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            All you ever wanted to know about Movies!
          </Typography>
            {isMobile ? (
              <>
                <IconButton
                  aria-label="menu"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <MenuIcon />
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
                  open={open}
                  onClose={() => setAnchorEl(null)}
                >
                  {menuOptions.map((opt) => (
                    <MenuItem
                      key={opt.label}
                      onClick={() => handleMenuSelect(opt.path)}
                    >
                      {opt.label}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <>
                {menuOptions.map((opt) => (
                  <Button
                    key={opt.label}
                    color="inherit"
                    onClick={() => handleMenuSelect(opt.path)}
                  >
                    {opt.label}
                  </Button>
                ))}
              </>
            )}
        </Toolbar>
        {context.isAuthenticated ? (
  <>
        <Typography variant="body1" sx={{ ml: 2, mr: 1 }}>
          Welcome {context.userName}!
        </Typography>
        <Button
          color="inherit"
          onClick={() => {
            context.signout();
            navigate("/"); 
          }}
        >
          Sign out
        </Button>
      </>
    ) : null}

      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;
