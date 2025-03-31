import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

// Define the type for a tab
type TabType = {
  label: string;
  route: string;
};

const AppBarComponent: React.FC = () => {
  const [value, setValue] = useState<number>(0); // State for selected tab
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // State for menu anchor
  const [profileMenuAnchor, setProfileMenuAnchor] = useState<null | HTMLElement>(null); // Profile menu state
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check for mobile view
  const navigate = useNavigate(); // Hook for navigation

  // Handle tab change
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    if (newValue === tabs.length - 1) {
      return; // Prevent navigation for Profile, it will open menu instead
    }
    setValue(newValue);
    navigate(tabs[newValue].route); // Navigate to the corresponding route
  };

  // Open menu
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Close menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Handle menu item click
  const handleMenuItemClick = (index: number) => {
    setValue(index);
    navigate(tabs[index].route);
    handleMenuClose();
  };

  // Handle profile menu open
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setProfileMenuAnchor(event.currentTarget);
  };

  // Handle profile menu close
  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from storage
    navigate("/login"); // Redirect to login page
  };

  // Tab labels and routes
  const tabs: TabType[] = [
    { label: "Chat", route: "/chat" },
    { label: "My Library", route: "/library" },
    { label: "Take a Test", route: "/test" },
    { label: "Schedule", route: "/schedule" },
    { label: "Profile", route: "/profile" },
  ];

  return (
    <AppBar position="fixed" sx={{ width: "100%", backgroundColor: "#011E2B" }}>
      <Toolbar>
        {/* App Name */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          PrepMe.AI
        </Typography>

        {/* Tabs for larger screens */}
        {!isMobile && (
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="inherit"
            sx={{
              "& .MuiTabs-indicator": {
                display: "none", // Hide the default underline
              },
            }}
          >
            {tabs.map((tab, index) =>
              index === tabs.length - 1 ? (
                <Tab
                  key={index}
                  label={tab.label}
                  onClick={handleProfileMenuOpen} // Open profile menu
                />
              ) : (
                <Tab
                  key={index}
                  label={tab.label}
                  sx={{
                    "&.Mui-selected": {
                      borderBottom: "3px solid #ff5722",
                    },
                  }}
                />
              )
            )}
          </Tabs>
        )}

        {/* Profile Menu for Desktop */}
        <Menu
          anchorEl={profileMenuAnchor}
          open={Boolean(profileMenuAnchor)}
          onClose={handleProfileMenuClose}
        >
          <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>

        {/* Menu for smaller screens */}
        {isMobile && (
          <>
            <IconButton color="inherit" onClick={handleMenuOpen}>
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {tabs.map((tab, index) =>
                index === tabs.length - 1 ? (
                  <MenuItem key={index} onClick={handleProfileMenuOpen}>
                    {tab.label}
                  </MenuItem>
                ) : (
                  <MenuItem
                    key={index}
                    onClick={() => handleMenuItemClick(index)}
                    selected={value === index}
                  >
                    {tab.label}
                  </MenuItem>
                )
              )}
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;
