import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import styles from "./Header.module.scss";
import { useAppDispatch } from "../../store/hooks";
import RouterPaths from "../../router/routes";
import tokenCache from "../../services/TokenCash";
import { logout } from "../../store/features/user/userSlice";

export default function Header() {
  const dispatch = useAppDispatch();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleLogout = () => {
    tokenCache.set({ token: "", expirationTime: 0 });
    dispatch(logout());
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
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
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography
                  textAlign="center"
                  component={Link}
                  to={RouterPaths.Home}
                >
                  Home
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography
                  textAlign="center"
                  component={Link}
                  to={RouterPaths.About}
                >
                  About
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography
                  textAlign="center"
                  component={Link}
                  to={RouterPaths.Catalog}
                >
                  Catalog
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to={RouterPaths.Home}
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
            Kratkoe
          </Typography>

          <Box className={styles.body}>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
                component={Link}
                to={RouterPaths.Home}
              >
                Home
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
                component={Link}
                to={RouterPaths.About}
              >
                About
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
                component={Link}
                to={RouterPaths.Catalog}
              >
                Catalog
              </Button>
            </Box>
            <Typography
              className={styles.logo}
              variant="h6"
              noWrap
              component={Link}
              to={RouterPaths.Home}
              sx={{
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Kratkoe
            </Typography>
            <Box
              className={styles.icons}
              sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}
            >
              <IconButton
                component={Link}
                to={RouterPaths.Basket}
                sx={{ p: 0 }}
              >
                <ShoppingCartOutlinedIcon className={styles.icon} />
              </IconButton>

              <Tooltip title="Open settings">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0 }}
                >
                  <PermIdentityOutlinedIcon className={styles.icon} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {tokenCache.hasValidToken() && (
                  <MenuItem
                    className={styles["menu-item"]}
                    onClick={handleCloseUserMenu}
                  >
                    <Typography
                      className={styles["menu-item-link"]}
                      textAlign="center"
                      component={Link}
                      to={RouterPaths.Profile}
                    >
                      Profile
                    </Typography>
                  </MenuItem>
                )}
                {!tokenCache.hasValidToken() ? (
                  <MenuItem
                    className={styles["menu-item"]}
                    onClick={handleCloseUserMenu}
                  >
                    <Typography
                      className={styles["menu-item-link"]}
                      textAlign="center"
                      component={Link}
                      to={RouterPaths.Login}
                    >
                      Log in
                    </Typography>
                  </MenuItem>
                ) : (
                  <MenuItem
                    className={styles["menu-item"]}
                    onClick={() => {
                      handleCloseUserMenu();
                      handleLogout();
                    }}
                  >
                    <Typography
                      className={styles["menu-item-link"]}
                      textAlign="center"
                      component={Link}
                      to={RouterPaths.Home}
                    >
                      Log out
                    </Typography>
                  </MenuItem>
                )}
                {!tokenCache.hasValidToken() && (
                  <MenuItem
                    className={styles["menu-item"]}
                    onClick={handleCloseUserMenu}
                  >
                    <Typography
                      className={styles["menu-item-link"]}
                      textAlign="center"
                      component={Link}
                      to={RouterPaths.Registration}
                    >
                      Registration
                    </Typography>
                  </MenuItem>
                )}
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
