import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";

const SidebarComponent = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
      <List>
        <ListItem component={Link} to="/" onClick={() => setDrawerOpen(false)}>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem component={Link} to="/quiz" onClick={() => setDrawerOpen(false)}>
          <ListItemText primary="Quiz" />
        </ListItem>
      </List>
    </Drawer>
  );
};
export default SidebarComponent;