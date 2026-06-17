import { Container, Typography, Box, Paper, Button } from "@mui/material";
import { Truck, Clock, Globe, ShieldCheck, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ShippingPolicy = () => {
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

    const PolicySection = ({ icon: Icon, title, children }: any) => (
        <motion.div variants={fadeInUp}>
            <Paper 
                elevation={0} 
                sx={{ 
                    p: { xs: 3, md: 5 }, 
                    mb: 4,
                    borderRadius: 3,
                    bgcolor: "#fff",
                    boxShadow: "0px 10px 40px rgba(0,0,0,0.05)",
                    border: "1px solid rgba(212, 175, 55, 0.2)"
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                    <Box sx={{ p: 1.5, bgcolor: "rgba(212, 175, 55, 0.1)", borderRadius: "50%", color: "#800080", mr: 2 }}>
                        <Icon size={24} />
                    </Box>
                    <Typography variant="h5" sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, color: "#2c1820" }}>
                        {title}
                    </Typography>
                </Box>
                {children}
            </Paper>
        </motion.div>
    );

    return (
        <Box sx={{ bgcolor: "#faf8f5", minHeight: "100vh", pb: 10 }}>
            <Box 
                sx={{ 
                    bgcolor: "#2c1820", 
                    color: "#fff",
                    pt: { xs: 4, md: 6 },
                    pb: { xs: 6, md: 10 },
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
                            Shipping & Return Policy
                        </Typography>
                        <Typography variant="subtitle1" sx={{ color: "rgba(255,255,255,0.7)", fontWeight: 300 }}>
                            Information about how we deliver your beautiful sarees and our return guidelines.
                        </Typography>
                    </motion.div>
                </Container>
                
                {/* Decorative Elements */}
                <Box sx={{ position: 'absolute', top: -100, right: -100, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(128,0,128,0.2) 0%, rgba(44,24,32,0) 70%)', zIndex: 1 }} />
            </Box>

            <Container maxWidth="lg" sx={{ mt: { xs: -4, md: -8 }, position: "relative", zIndex: 3 }}>
                <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
                    <PolicySection icon={Truck} title="Shipping Details">
                        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, color: "#4a4a4a" }}>
                            At Varnam Silks, we ensure that your orders are packed securely and dispatched at the earliest. 
                            We partner with trusted courier services to deliver your sarees safely to your doorstep.
                        </Typography>
                        
                        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mt: 4 }}>
                            <Box sx={{ p: 3, bgcolor: 'rgba(212, 175, 55, 0.05)', borderRadius: 2, borderLeft: '4px solid #800080' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <Clock size={20} style={{ color: "#800080", marginRight: '8px' }} />
                                    <Typography variant="subtitle1" fontWeight="bold" color="#2c1820">Processing Time</Typography>
                                </Box>
                                <Typography variant="body2" color="text.secondary">
                                    Orders are processed and dispatched within 1-2 business days from the date of order confirmation.
                                </Typography>
                            </Box>
                            <Box sx={{ p: 3, bgcolor: 'rgba(212, 175, 55, 0.05)', borderRadius: 2, borderLeft: '4px solid #800080' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <Globe size={20} style={{ color: "#800080", marginRight: '8px' }} />
                                    <Typography variant="subtitle1" fontWeight="bold" color="#2c1820">Delivery Time</Typography>
                                </Box>
                                <Typography variant="body2" color="text.secondary">
                                    Standard delivery takes 3-7 business days across India. International shipping takes 7-14 business days.
                                </Typography>
                            </Box>
                        </Box>
                    </PolicySection>

                    <PolicySection icon={ShieldCheck} title="Return Policy">
                        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, color: "#4a4a4a" }}>
                            We want you to love your Varnam Silk saree. If you are not completely satisfied with your purchase, we offer a hassle-free return policy subject to certain conditions.
                        </Typography>
                        <Box component="ul" sx={{ pl: 4, '& li': { mb: 1.5, color: '#4a4a4a' } }}>
                            <li><Typography variant="body1">Returns are accepted within 7 days from the date of delivery.</Typography></li>
                            <li><Typography variant="body1">The saree must be unworn, unwashed, and in its original condition with all tags and packaging intact.</Typography></li>
                            <li><Typography variant="body1">Items that have been customized, such as stitched blouses or fall/picot done, are not eligible for returns.</Typography></li>
                            <li><Typography variant="body1">To initiate a return, please contact our support team with your order number and images of the product.</Typography></li>
                            <li><Typography variant="body1">Return shipping charges may apply depending on the reason for return.</Typography></li>
                        </Box>
                    </PolicySection>
                </motion.div>
            </Container>
        </Box>
    );
};

export default ShippingPolicy;
