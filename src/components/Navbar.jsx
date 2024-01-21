import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase/config";
import { signOut , onAuthStateChanged} from "firebase/auth";
import UserContext from "../Context/User/UserContext";
import { useContext , useEffect } from "react";

function ResponsiveAppBar() {
  const navigate = useNavigate();
  const {isUser , setIsUser} = useContext(UserContext)
  const initialSettings = [];
  const [settings, setSettings] = React.useState(initialSettings);
  // Update settings based on the value of isUser
  // React.useEffect(() => {
  //   if (!isUser) {
  //     // alert("User loguot")
  //     setIsUser(false)
  //     setSettings(["Login", "SignUp"]);
  //   } else {
  //     setIsUser(false)
  //     setSettings(["Logout"]);
  //   }
  // }, []);
  
  const [userName , setUserName] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is logged in
        console.log(user.displayName)
        setIsUser(true);
        setUserName(user.displayName)
        setSettings(["Logout"]);
      } else {
        // User is not logged in
        setIsUser(false);
        setSettings(["Login", "SignUp"]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUserName, setIsUser]);

  const [anchorElUser, setAnchorElUser] = React.useState(null);
  
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  
  const handleMenuItemClick = (setting) => {
    handleCloseUserMenu();
    if(setting === "Logout") {
      signOut(auth).then(() => {
        // Sign-out successful.
        // setSettings(["Login", "SignUp"]);
        navigate("/login");
      }).catch((error) => {
        // An error happened.
      });
      // setSettings(["Logout"]);
      return 
    }
    setting === "Login" ? navigate("/login") : setting;
    setting === "SignUp" ? navigate("/") : setting;
  };
// if(!loading){

  return (
    <AppBar position="static" className="bg-dark">
      <Toolbar sx={{ justifyContent: "space-between" }} className="container">
        <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
        <Typography
          variant="h5"
          noWrap
          component="a"
          href="#app-bar-with-responsive-menu"
          sx={{
            flexGrow: 1,
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          Todo
        </Typography>

        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Button variant="outlined" className="text-light">
                { isUser ? userName : "Login"}
              </Button>
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
            {settings.map((setting) => (
              <MenuItem
                key={setting}
                onClick={() => handleMenuItemClick(setting)}
              >
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
// }
}

export default ResponsiveAppBar;
