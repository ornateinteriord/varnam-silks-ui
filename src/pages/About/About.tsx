import { Container, Typography, Box, Paper, Button, Grid } from "@mui/material";
import { Building2, Target, Award, ArrowLeft, ShieldCheck, Heart, Diamond } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import kanchipuramImg from "../../assets/kanchipuram.png";
import bridalImg from "../../assets/bridal.png";

const About = () => {
    const navigate = useNavigate();

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <Box sx={{ bgcolor: "#faf8f5", minHeight: "100vh", pb: 10 }}>
            {/* Header Section */}
            <Box 
                sx={{ 
                    bgcolor: "#2c1820", 
                    color: "#fff",
                    pt: { xs: 4, md: 6 },
                    pb: { xs: 8, md: 12 },
                    px: 3,
                    position: "relative",
                    overflow: "hidden"
                }}
            >
                <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
                    <Button
                        startIcon={<ArrowLeft size={20} />}
                        onClick={() => navigate("/")}
                        sx={{
                            color: "#d4af37",
                            mb: 4,
                            "&:hover": {
                                backgroundColor: "rgba(212, 175, 55, 0.1)",
                            },
                        }}
                    >
                        Return to Home
                    </Button>
                    <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
                        <Typography
                            variant="h3"
                            sx={{
                                fontWeight: 400,
                                fontFamily: "'Playfair Display', serif",
                                mb: 2,
                                fontSize: { xs: '2rem', md: '2.5rem' },
                                letterSpacing: "1px",
                                color: "#fff"
                            }}
                        >
                            Our Story
                        </Typography>
                        <Typography variant="h6" sx={{ color: "rgba(255,255,255,0.7)", fontWeight: 300, maxWidth: "600px" }}>
                            Where tradition meets timeless elegance. Experience the beauty of handwoven silk, one saree at a time.
                        </Typography>
                    </motion.div>
                </Container>
                
                {/* Decorative Elements */}
                <Box sx={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(128,0,128,0.2) 0%, rgba(44,24,32,0) 70%)', zIndex: 1 }} />
            </Box>

            <Container maxWidth="lg" sx={{ mt: { xs: -6, md: -10 }, position: "relative", zIndex: 3 }}>
                <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
                    {/* Welcome Section */}
                    <Grid container spacing={4} sx={{ mb: 6 }}>
                        <Grid item xs={12} md={6}>
                            <motion.div variants={fadeInUp}>
                                <Paper 
                                    elevation={0} 
                                    sx={{ 
                                        p: { xs: 3, md: 5 }, 
                                        height: '100%',
                                        borderRadius: 3,
                                        bgcolor: "#fff",
                                        boxShadow: "0px 10px 40px rgba(0,0,0,0.05)",
                                        border: "1px solid rgba(212, 175, 55, 0.2)",
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Typography variant="h4" sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, mb: 3, color: "#2c1820" }}>
                                        Welcome to Varnam Collections
                                    </Typography>
                                    <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, color: "#4a4a4a" }}>
                                        We take pride in offering authentic handwoven silk sarees, crafted with precision and passion by skilled artisans.
                                    </Typography>
                                    <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, color: "#4a4a4a" }}>
                                        Whether you're looking for a stunning bridal saree, a festive drape, or an everyday silk treasure, Varnam Silks is here to wrap you in elegance and tradition. 
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontStyle: 'italic', mt: 3, color: "#d4af37", fontWeight: 600 }}>
                                        Threads of tradition woven just for you!
                                    </Typography>
                                </Paper>
                            </motion.div>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <motion.div variants={fadeInUp}>
                                <Box sx={{ 
                                    width: '100%', 
                                    height: '100%', 
                                    minHeight: '350px',
                                    borderRadius: 3, 
                                    overflow: 'hidden', 
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                                    position: 'relative'
                                }}>
                                    <img src={bridalImg} alt="Varnam Silks Bridal Collection" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute' }} />
                                </Box>
                            </motion.div>
                        </Grid>
                    </Grid>

                    {/* Legacy & Vision */}
                    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 4, mb: 6 }}>
                        <motion.div variants={fadeInUp}>
                            <Paper elevation={0} sx={{ p: 4, height: '100%', borderRadius: 3, bgcolor: "#fff", boxShadow: "0px 10px 40px rgba(0,0,0,0.05)", border: "1px solid rgba(212, 175, 55, 0.2)" }}>
                                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                                    <Box sx={{ p: 1.5, bgcolor: "rgba(212, 175, 55, 0.1)", borderRadius: "50%", color: "#800080", mr: 2 }}>
                                        <Award size={28} />
                                    </Box>
                                    <Typography variant="h5" sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, color: "#2c1820" }}>
                                        Our Legacy
                                    </Typography>
                                </Box>
                                <Typography variant="body1" sx={{ lineHeight: 1.8, color: "#4a4a4a" }}>
                                    Rooted in the rich heritage of Indian weaving, we bring you the finest Kanchipuram, Mysore, Banarasi, and other exquisite silk sarees. Each piece in our collection is a masterpiece, woven with pure mulberry silk and intricate zari work, reflecting the artistry passed down through generations.
                                </Typography>
                            </Paper>
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <Paper elevation={0} sx={{ p: 4, height: '100%', borderRadius: 3, bgcolor: "#fff", boxShadow: "0px 10px 40px rgba(0,0,0,0.05)", border: "1px solid rgba(212, 175, 55, 0.2)" }}>
                                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                                    <Box sx={{ p: 1.5, bgcolor: "rgba(212, 175, 55, 0.1)", borderRadius: "50%", color: "#800080", mr: 2 }}>
                                        <Target size={28} />
                                    </Box>
                                    <Typography variant="h5" sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, color: "#2c1820" }}>
                                        Our Vision
                                    </Typography>
                                </Box>
                                <Typography variant="body1" sx={{ lineHeight: 1.8, color: "#4a4a4a" }}>
                                    We believe a saree is more than just fabric—it is a symbol of heritage, grace, and celebration. Our mission is to make timeless weaves accessible to saree lovers worldwide, preserving the rich legacy of Indian craftsmanship.
                                </Typography>
                            </Paper>
                        </motion.div>
                    </Box>

                    {/* Image Break */}
                    <motion.div variants={fadeInUp}>
                        <Box sx={{ 
                            width: '100%', 
                            height: { xs: '200px', md: '350px' }, 
                            mb: 6, 
                            borderRadius: 3, 
                            overflow: 'hidden', 
                            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                            position: 'relative'
                        }}>
                            <img src={kanchipuramImg} alt="Varnam Silks Kanchipuram Collection" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', position: 'absolute' }} />
                            <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(44,24,32,0.8), transparent)' }} />
                            <Typography variant="h3" sx={{ position: 'absolute', bottom: 30, left: 40, color: '#fff', fontFamily: "'Playfair Display', serif", fontWeight: 600 }}>
                                Handwoven Perfection
                            </Typography>
                        </Box>
                    </motion.div>

                    {/* Commitment */}
                    <motion.div variants={fadeInUp}>
                        <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, mb: 6, borderRadius: 3, bgcolor: "#fff", boxShadow: "0px 10px 40px rgba(0,0,0,0.05)", border: "1px solid rgba(212, 175, 55, 0.2)" }}>
                            <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
                                <Box sx={{ p: 1.5, bgcolor: "rgba(212, 175, 55, 0.1)", borderRadius: "50%", color: "#800080", mr: 2 }}>
                                    <Heart size={28} />
                                </Box>
                                <Typography variant="h5" sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, color: "#2c1820" }}>
                                    Our Commitment
                                </Typography>
                            </Box>
                            <Grid container spacing={3}>
                                {[
                                    { title: "Authenticity Guaranteed", description: "Sourced directly from master weavers, ensuring pure handloom silk." },
                                    { title: "Exquisite Designs", description: "A blend of traditional motifs and contemporary patterns to suit every occasion." },
                                    { title: "Uncompromised Quality", description: "Luxurious silk with fine craftsmanship for long-lasting elegance." },
                                    { title: "Customer-Centric Approach", description: "Personalized service, seamless shopping, and a commitment to excellence." },
                                ].map((value, index) => (
                                    <Grid item xs={12} sm={6} key={index}>
                                        <Box sx={{ p: 3, bgcolor: "#faf8f5", borderRadius: 2, height: '100%', border: "1px solid rgba(212, 175, 55, 0.1)" }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                                                {index % 2 === 0 ? <ShieldCheck size={20} style={{ color: "#d4af37", marginRight: '8px' }} /> : <Diamond size={20} style={{ color: "#d4af37", marginRight: '8px' }} />}
                                                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#2c1820" }}>
                                                    {value.title}
                                                </Typography>
                                            </Box>
                                            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                                                {value.description}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </Paper>
                    </motion.div>

                    {/* Footer Contact Info */}
                    <motion.div variants={fadeInUp}>
                        <Paper elevation={0} sx={{ p: 4, borderRadius: 3, background: "linear-gradient(135deg, #2c1820 0%, #4a2133 100%)", color: "white", display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box sx={{ display: "flex", alignItems: "center", mb: { xs: 2, md: 0 } }}>
                                <Box sx={{ p: 1.5, bgcolor: "rgba(212, 175, 55, 0.2)", borderRadius: "50%", color: "#d4af37", mr: 2 }}>
                                    <Building2 size={28} />
                                </Box>
                                <Box>
                                    <Typography variant="h6" sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, color: "#d4af37" }}>
                                        Visit Our Store
                                    </Typography>
                                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                        Varnam Silks, Bangalore, Karnataka
                                    </Typography>
                                </Box>
                            </Box>
                            <Button 
                                variant="outlined" 
                                onClick={() => navigate("/contact")}
                                sx={{ 
                                    borderColor: "#d4af37", 
                                    color: "#d4af37", 
                                    px: 4, 
                                    py: 1, 
                                    borderRadius: 8,
                                    "&:hover": { borderColor: "#fff", color: "#fff", bgcolor: "rgba(255,255,255,0.1)" }
                                }}
                            >
                                Contact Support
                            </Button>
                        </Paper>
                    </motion.div>

                </motion.div>
            </Container>
        </Box>
    );
};

export default About;
