import { Box, Container, Grid, Typography, List, ListItem, Button } from '@mui/material';

const EcommerceFooter = () => {
  return (
    <Box component="footer" sx={{ backgroundColor: '#222', color: '#fff', pt: 8, pb: 4, mt: 'auto' }}>
      <Container maxWidth="xl">
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {/* Column 1: Brand & About */}
          <Grid item xs={12} md={4}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, letterSpacing: 1, textTransform: 'uppercase' }}>
              Varnam Silks
            </Typography>
            <Typography variant="body2" sx={{ color: '#aaa', lineHeight: 1.8, pr: { md: 4 } }}>
              Varnam is proud to be your go-to exclusive silk showroom, offering a diverse collection including handloom bridal silk sarees, traditional Kanchipuram sarees, soft silk, Mysore silk, and more. Our prices start as low as ₹400.
            </Typography>
          </Grid>

          {/* Column 2: Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, fontSize: '1rem' }}>
              COMPANY
            </Typography>
            <List disablePadding>
              {['About Us', 'Contact Us'].map((link) => (
                <ListItem key={link} disablePadding sx={{ mb: 1 }}>
                  <Typography component="a" sx={{ color: '#aaa', textDecoration: 'none', '&:hover': { color: '#fff' }, fontSize: '0.9rem', cursor: 'pointer' }}>
                    {link}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </Grid>

          {/* Column 3: Customer Policies */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, fontSize: '1rem' }}>
              POLICIES
            </Typography>
            <List disablePadding>
              {['Terms and Conditions', 'Privacy Policy', 'Shipping and Return Policy', 'Refund Policy'].map((link) => (
                <ListItem key={link} disablePadding sx={{ mb: 1 }}>
                  <Typography component="a" sx={{ color: '#aaa', textDecoration: 'none', '&:hover': { color: '#fff' }, fontSize: '0.9rem', cursor: 'pointer' }}>
                    {link}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </Grid>

          {/* Column 4: Newsletter & Contact */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, fontSize: '1rem' }}>
              GET IN TOUCH
            </Typography>
            <Typography variant="body2" sx={{ color: '#aaa', mb: 1 }}>
              Email: support@varnamsilks.com
            </Typography>
            <Typography variant="body2" sx={{ color: '#aaa', mb: 3 }}>
              Phone: +91 99999 99999
            </Typography>
            
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, fontSize: '1rem' }}>
              NEWSLETTER
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Box component="input" placeholder="Your email address" sx={{ flexGrow: 1, p: 1.5, border: 'none', borderRadius: 1, outline: 'none', backgroundColor: '#333', color: '#fff' }} />
              <Button variant="contained" sx={{ backgroundColor: '#b30000', '&:hover': { backgroundColor: '#800000' } }}>
                Subscribe
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ borderTop: '1px solid #444', pt: 3, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ color: '#aaa' }}>
            © {new Date().getFullYear()} Varnam Silks. All rights reserved.
          </Typography>
          <Typography variant="body2" sx={{ color: '#aaa', mt: { xs: 1, sm: 0 } }}>
            Designed for Elegance
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default EcommerceFooter;
