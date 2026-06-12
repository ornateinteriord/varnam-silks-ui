import { Box, Container, Typography, Grid } from '@mui/material';
import kanchipuramImg from '../../assets/kanchipuram.png';
import bridalImg from '../../assets/bridal.png';
import mysoreImg from '../../assets/mysore.png';
import kanakavastraImg from '../../assets/kanakavastra.png';
import designerImg from '../../assets/designer.png';

const categories = [
  { id: 1, title: 'Bridal Wear', image: bridalImg, isFeatured: true },
  { id: 2, title: 'Kanchipuram Silks', image: kanchipuramImg, isFeatured: false },
  { id: 3, title: 'Mysore Silk Sarees', image: mysoreImg, isFeatured: false },
  { id: 4, title: 'Kanakavastra', image: kanakavastraImg, isFeatured: false },
  { id: 5, title: 'Designer Wear', image: designerImg, isFeatured: false },
];

const CategoryTile = ({ category }: { category: any }) => (
  <Box 
    onClick={() => window.open('https://varnamsilks.com', '_blank')}
    sx={{ 
    position: 'relative', 
    height: '100%',
    width: '100%',
    borderRadius: 3, 
    overflow: 'hidden',
    cursor: 'pointer',
    '&:hover .zoom-img': {
      transform: 'scale(1.05)'
    },
    '&:hover .overlay': {
      backgroundColor: 'rgba(0,0,0,0.2)'
    }
  }}>
    <Box 
      component="img" 
      src={category.image} 
      alt={category.title} 
      className="zoom-img"
      sx={{ 
        width: '100%', 
        height: '100%', 
        objectFit: 'cover',
        transition: 'transform 0.5s ease'
      }} 
    />
    <Box 
      className="overlay"
      sx={{ 
        position: 'absolute', 
        top: 0, left: 0, right: 0, bottom: 0, 
        backgroundColor: 'rgba(0,0,0,0.4)',
        transition: 'background-color 0.3s ease',
        display: 'flex',
        alignItems: 'flex-end',
        p: 3
      }} 
    >
      <Typography variant={category.isFeatured ? 'h5' : 'subtitle1'} sx={{ color: '#fff', fontWeight: 'bold', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
        {category.title}
      </Typography>
    </Box>
  </Box>
);

const CategoryBento = () => {
  const featured = categories.find(c => c.isFeatured);
  const regular = categories.filter(c => !c.isFeatured);

  return (
    <Box sx={{ py: 6, backgroundColor: '#f9f9f9' }}>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center', mb: 1, color: '#222' }}>
          Shop by Category
        </Typography>
        <Typography variant="body1" sx={{ textAlign: 'center', color: '#666', mb: 4 }}>
          Find the perfect saree for every occasion
        </Typography>

        <Grid container spacing={3} sx={{ maxWidth: '1100px', mx: 'auto' }}>
          {/* Featured Large Tile */}
          <Grid item xs={12} md={6}>
            <Box sx={{ height: { xs: '350px', md: '480px' } }}>
              <CategoryTile category={featured} />
            </Box>
          </Grid>
          
          {/* 4 Smaller Tiles */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={3}>
              {regular.map((cat) => (
                <Grid item xs={12} sm={6} key={cat.id}>
                  <Box sx={{ height: { xs: '200px', md: '228px' } }}>
                    <CategoryTile category={cat} />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CategoryBento;
