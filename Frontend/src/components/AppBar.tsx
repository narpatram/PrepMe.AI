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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check for mobile view
  const navigate = useNavigate(); // Hook for navigation

  // Handle tab change
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
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
    navigate(tabs[index].route); // Navigate to the corresponding route
    handleMenuClose(); // Close menu after selection
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
    <AppBar position="fixed" sx={{ width: "100%", backgroundColor: "011E2B" }}>
      <Toolbar>
        {/* App Name */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          PrepMe.AI
        </Typography>

        {/* Tabs for larger screens */}
        {!isMobile && (
          <Tabs value={value} onChange={handleChange} textColor="inherit" sx={{
              "& .MuiTabs-indicator": {
                display: "none", // Hide the default underline
              },
            }}>
            {tabs.map((tab, index) => (
              <Tab key={index} label={tab.label} sx={{
                  "&.Mui-selected": {
                    borderBottom: "3px solid #ff5722", // Orange bottom border for active tab
                  },
                }} />
            ))}
          </Tabs>
        )}

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
              {tabs.map((tab, index) => (
                <MenuItem
                  key={index}
                  onClick={() => handleMenuItemClick(index)}
                  selected={value === index}
                >
                  {tab.label}
                </MenuItem>
              ))}
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;