import { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  Container, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText,
  useMediaQuery,
  useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

const navItems = [
  'About Us', 
  'Contact Us', 
  'Terms and Conditions', 
  'Privacy Policy', 
  'Shipping and Return Policy', 
  'Refund Policy'
];

const EcommerceNavbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleRedirect = () => {
    // Stay on home page
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2, fontWeight: 'bold', color: '#b90707ff' }}>
        VARNAM SILKS 
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemText 
              primary={item} 
              sx={{ textAlign: 'center', cursor: 'pointer' }} 
              onClick={handleRedirect}
            />
          </ListItem>
        ))}
        <ListItem disablePadding sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
          <Button 
            variant="contained" 
            onClick={() => navigate('/login')}
            sx={{ backgroundColor: '#800080', '&:hover': { backgroundColor: '#600060' } }}
          >
            Login
          </Button>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: '#fff', color: '#000', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            {isMobile && (
              <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
                <MenuIcon />
              </IconButton>
            )}
            
            <Typography 
              variant="h5" 
              sx={{ fontWeight: 'bold', letterSpacing: 1, color: '#800080', flexGrow: { xs: 1, md: 0 }, textTransform: 'uppercase', cursor: 'pointer' }}
              onClick={() => navigate('/')}
            >
              Varnam Silks
            </Typography>

            {!isMobile && (
              <Box sx={{ display: 'flex', gap: { md: 1, lg: 2 } }}>
                {navItems.map((item) => (
                  <Button 
                    key={item} 
                    onClick={handleRedirect}
                    sx={{ 
                      color: '#333', 
                      fontWeight: 600, 
                      textTransform: 'capitalize',
                      fontSize: '0.85rem',
                      whiteSpace: 'nowrap',
                      minWidth: 'auto',
                      px: 1,
                      '&:hover': { color: '#800080' } 
                    }}
                  >
                    {item}
                  </Button>
                ))}
              </Box>
            )}

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {!isMobile && (
                <Button 
                  variant="contained" 
                  onClick={() => navigate('/login')}
                  sx={{ backgroundColor: '#800080', '&:hover': { backgroundColor: '#600060' } }}
                >
                  Login
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default EcommerceNavbar;
