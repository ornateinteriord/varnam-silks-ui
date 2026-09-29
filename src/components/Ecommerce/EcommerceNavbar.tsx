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
  ListItemButton,
  ListItemText,
  Divider,
  useMediaQuery,
  useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

const navItems = [
  { label: 'About Us', path: '/about' },
  { label: 'Contact Us', path: '/contact' },
  { label: 'Terms & Conditions', path: '/terms' },
  { label: 'Privacy Policy', path: '/privacy-policy' },
  { label: 'Shipping Policy', path: '/shipping-policy' },
  { label: 'Refund Policy', path: '/refund-policy' }
];

const EcommerceNavbar = () => {
  const theme = useTheme();
  // Switch to hamburger below lg (1200px) since 6 links overflow on md screens
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleRedirect = (path: string) => {
    navigate(path);
    setMobileOpen(false);
  };

  const drawer = (
    <Box sx={{ width: 270, height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Drawer Header */}
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 2,
        py: 2,
        borderBottom: '1px solid #f0f0f0'
      }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 900, color: '#800080', letterSpacing: 1, textTransform: 'uppercase' }}
        >
          Varnam Silks
        </Typography>
        <IconButton onClick={handleDrawerToggle} size="small">
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Nav Links */}
      <List sx={{ flex: 1, pt: 1 }}>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              onClick={() => handleRedirect(item.path)}
              sx={{
                px: 3,
                py: 1.2,
                '&:hover': { backgroundColor: '#f3e8ff', color: '#800080' }
              }}
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ fontWeight: 500, fontSize: '0.95rem' }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />

      {/* Login Button in Drawer */}
      <Box sx={{ p: 2 }}>
        <Button
          fullWidth
          variant="contained"
          onClick={() => { navigate('/login'); setMobileOpen(false); }}
          sx={{
            backgroundColor: '#800080',
            py: 1.2,
            fontWeight: 700,
            fontSize: '0.95rem',
            '&:hover': { backgroundColor: '#600060' }
          }}
        >
          Login / Register
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: '#fff',
          color: '#000',
          borderBottom: '1px solid #f0f0f0',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between', minHeight: { xs: 56, md: 64 } }}>

            {/* Hamburger — visible below lg */}
            {!isDesktop && (
              <IconButton
                color="inherit"
                aria-label="open menu"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 1 }}
              >
                <MenuIcon />
              </IconButton>
            )}

            {/* Brand Logo */}
            <Typography
              variant="h5"
              onClick={() => navigate('/')}
              sx={{
                fontWeight: 900,
                letterSpacing: 1.5,
                color: '#800080',
                textTransform: 'uppercase',
                cursor: 'pointer',
                fontSize: { xs: '1.1rem', sm: '1.25rem' },
                flexGrow: { xs: 1, lg: 0 },
              }}
            >
              Varnam Silks
            </Typography>

            {/* Desktop Nav Links */}
            {isDesktop && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flex: 1, justifyContent: 'center' }}>
                {navItems.map((item) => (
                  <Button
                    key={item.label}
                    onClick={() => handleRedirect(item.path)}
                    sx={{
                      color: '#444',
                      fontWeight: 600,
                      textTransform: 'none',
                      fontSize: '0.82rem',
                      whiteSpace: 'nowrap',
                      px: 1.2,
                      py: 0.8,
                      borderRadius: 1,
                      '&:hover': { color: '#800080', backgroundColor: '#f3e8ff' }
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
            )}

            {/* Login Button — always visible on desktop */}
            {isDesktop && (
              <Button
                variant="contained"
                onClick={() => navigate('/login')}
                sx={{
                  backgroundColor: '#800080',
                  fontWeight: 700,
                  px: 2.5,
                  textTransform: 'none',
                  whiteSpace: 'nowrap',
                  '&:hover': { backgroundColor: '#600060' }
                }}
              >
                Login
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', lg: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 270 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default EcommerceNavbar;
