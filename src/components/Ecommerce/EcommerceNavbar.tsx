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
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const navItems = ['Home', 'About Us', 'New Arrivals', 'Limited', 'Best Sellers', 'Sarees', 'Kurtis', 'Deals'];

const EcommerceNavbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2, fontWeight: 'bold', color: '#b90707ff' }}>
        VARNAM SILKS 
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemText primary={item} sx={{ textAlign: 'center' }} />
          </ListItem>
        ))}
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
            
            <Typography variant="h5" sx={{ fontWeight: 'bold', letterSpacing: 1, color: '#800080', flexGrow: { xs: 1, md: 0 }, textTransform: 'uppercase', cursor: 'pointer' }}>
              Varnam Silks
            </Typography>

            {!isMobile && (
              <Box sx={{ display: 'flex', gap: 3 }}>
                {navItems.map((item) => (
                  <Button key={item} sx={{ color: '#333', fontWeight: 600, '&:hover': { color: '#800080' } }}>
                    {item}
                  </Button>
                ))}
              </Box>
            )}

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {!isMobile && (
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#800080' }}>
                  📞 +91 98765 43210
                </Typography>
              )}
              <IconButton sx={{ color: '#333' }}>
                <ShoppingCartIcon />
              </IconButton>
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
