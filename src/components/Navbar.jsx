import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { NavLink } from "react-router-dom";
import Groups2Icon from "@mui/icons-material/Groups2";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function Navbar({ isLoggedIn, onLogout, username, isAdmin }) {
  const navigate = useNavigate();

  const pages = !isLoggedIn
    ? [
        { name: "Home", path: "/" },
        { name: "Subscriptions", path: "/subscriptions" },
        { name: "About Us", path: "/about" },
      ]
    : [
        { name: "Home", path: "/" },
        { name: "Subscriptions", path: "/subscriptions" },
        { name: "About Us", path: "/about" },
        {
          name: isAdmin ? "User subscriptions" : "My Subscriptions",
          path: "/all-subscriptions",
        },
      ];

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Groups2Icon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            TalentX
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <NavLink to={page.path}>{page.name}</NavLink>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Groups2Icon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            TalentX
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                component={NavLink}
                to={page.path}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          {isLoggedIn ? (
            <Box sx={{ mr: 2 }}>
              <Typography variant="body1" color="inherit">
                Welcome, {username}
              </Typography>
            </Box>
          ) : (
            <Button
              component={NavLink}
              to="/login"
              sx={{
                color: "white",
                textTransform: "none",
                textDecoration: "none",
                "&:hover": {
                  backgroundColor: "transparent",
                  color: "white",
                },
              }}
            >
              Login
            </Button>
          )}

          {isLoggedIn && (
            <Button
              color="inherit"
              onClick={() => {
                onLogout();
                navigate("/");
              }}
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

Navbar.propTypes = {
  isLoggedIn: PropTypes.bool,
  isAdmin: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
};

export default Navbar;
