import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';
import { Tooltip } from '@mui/material';
import FeedIcon from '@mui/icons-material/Feed';

export default function Navbar() {
  const navigate = useNavigate();
  const navigateToPersonalizedNewsFeed = () => {
    navigate('/personalized-feed');
  };

  const navigateToNewsFeed = () => {
    navigate('/');
  };

  const handleLogoutUser = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1 }}
          >
            News App
          </Typography>
          <Tooltip title="Newsfeed">
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={navigateToNewsFeed}
              color="inherit"
            >
              <FeedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Personalized Newsfeed">
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={navigateToPersonalizedNewsFeed}
              color="inherit"
            >
              <SettingsAccessibilityIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Logout">
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={handleLogoutUser}
              color="inherit"
            >
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
