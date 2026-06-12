import { Box } from '@mui/material';
import EcommerceNavbar from '../../components/Ecommerce/EcommerceNavbar';
import Hero from '../../components/Ecommerce/Hero';
import CategoryBento from '../../components/Ecommerce/CategoryBento';
import Features from '../../components/Ecommerce/Features';
import EcommerceFooter from '../../components/Ecommerce/EcommerceFooter';

const Home = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#fff' }}>
      <EcommerceNavbar />
      <Hero />
      <CategoryBento />
      <Features />
      <EcommerceFooter />
    </Box>
  );
};

export default Home;
