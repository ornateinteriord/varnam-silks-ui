import { Box, Typography, Button } from '@mui/material';

const Hero = () => {
  return (
    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <Box 
        sx={{ 
          height: { xs: '60vh', md: '80vh' }, 
          backgroundImage: 'url(http://varnamsilks.com/cdn/shop/files/7001fdc7-4a92-4a69-a530-259a4c69870e.jpg?v=1745519978)', 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}
      >
        <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.3)' }} />
        <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center', color: '#fff', px: 2 }}>
          <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2, textShadow: '2px 2px 4px rgba(0,0,0,0.5)', fontSize: { xs: '2.5rem', md: '4rem' } }}>
            Exclusive Silk Collection
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, textShadow: '1px 1px 2px rgba(0,0,0,0.5)', fontSize: { xs: '1.2rem', md: '1.5rem' } }}>
            Discover the elegance of traditional and modern sarees
          </Typography>
          <Button onClick={() => window.open('https://varnamsilks.com', '_blank')} variant="contained" size="large" sx={{ backgroundColor: '#b30000', '&:hover': { backgroundColor: '#800000' }, px: 4, py: 1.5, fontSize: '1.1rem' }}>
            Shop Now
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Hero;
