import { Container, Typography, Box, Paper, TextField, Button, Grid } from "@mui/material";
import { Phone, Mail, MapPin, Clock, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Contact = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        console.log("Form submitted:", formData);
        // Reset form
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    };

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
                            Get in Touch
                        </Typography>
                        <Typography variant="h6" sx={{ color: "rgba(255,255,255,0.7)", fontWeight: 300, maxWidth: "600px" }}>
                            We'd love to hear from you. Whether you have a question about our collections, shipping, or need assistance, our team is ready to answer all your questions.
                        </Typography>
                    </motion.div>
                </Container>
                
                {/* Decorative Elements */}
                <Box sx={{ position: 'absolute', top: -100, right: -100, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(128,0,128,0.2) 0%, rgba(44,24,32,0) 70%)', zIndex: 1 }} />
            </Box>

            <Container maxWidth="lg" sx={{ mt: { xs: -4, md: -8 }, position: "relative", zIndex: 3 }}>
                <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
                    <Grid container spacing={4}>
                        {/* Contact Information */}
                        <Grid item xs={12} md={5}>
                            <motion.div variants={fadeInUp}>
                                <Paper 
                                    elevation={0} 
                                    sx={{ 
                                        p: { xs: 3, md: 5 }, 
                                        height: "100%", 
                                        borderRadius: 3,
                                        bgcolor: "#fff",
                                        boxShadow: "0px 10px 40px rgba(0,0,0,0.05)",
                                        border: "1px solid rgba(212, 175, 55, 0.2)"
                                    }}
                                >
                                    <Typography variant="h5" sx={{ fontFamily: "'Playfair Display', serif", color: "#2c1820", mb: 4, fontWeight: 600 }}>
                                        Contact Information
                                    </Typography>

                                    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
                                        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 3 }}>
                                            <Box sx={{ p: 1.5, bgcolor: "rgba(212, 175, 55, 0.1)", borderRadius: "50%", color: "#800080" }}>
                                                <MapPin size={24} />
                                            </Box>
                                            <Box>
                                                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#2c1820", mb: 0.5 }}>
                                                    Our Boutique
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                                                    Varnam Silks,<br />
                                                    Bangalore, Karnataka
                                                </Typography>
                                            </Box>
                                        </Box>

                                        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 3 }}>
                                            <Box sx={{ p: 1.5, bgcolor: "rgba(212, 175, 55, 0.1)", borderRadius: "50%", color: "#800080" }}>
                                                <Phone size={24} />
                                            </Box>
                                            <Box>
                                                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#2c1820", mb: 0.5 }}>
                                                    Phone
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                                                    +91 98765 43210
                                                </Typography>
                                            </Box>
                                        </Box>

                                        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 3 }}>
                                            <Box sx={{ p: 1.5, bgcolor: "rgba(212, 175, 55, 0.1)", borderRadius: "50%", color: "#800080" }}>
                                                <Mail size={24} />
                                            </Box>
                                            <Box>
                                                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#2c1820", mb: 0.5 }}>
                                                    Email
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                                                    support@varnamsilks.com
                                                </Typography>
                                            </Box>
                                        </Box>

                                        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 3 }}>
                                            <Box sx={{ p: 1.5, bgcolor: "rgba(212, 175, 55, 0.1)", borderRadius: "50%", color: "#800080" }}>
                                                <Clock size={24} />
                                            </Box>
                                            <Box>
                                                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#2c1820", mb: 0.5 }}>
                                                    Business Hours
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                                                    Monday - Saturday: 10:00 AM - 8:00 PM<br />
                                                    Sunday: Closed
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Paper>
                            </motion.div>
                        </Grid>

                        {/* Contact Form */}
                        <Grid item xs={12} md={7}>
                            <motion.div variants={fadeInUp}>
                                <Paper 
                                    elevation={0} 
                                    sx={{ 
                                        p: { xs: 3, md: 5 }, 
                                        borderRadius: 3,
                                        bgcolor: "#fff",
                                        boxShadow: "0px 10px 40px rgba(0,0,0,0.05)",
                                        border: "1px solid rgba(212, 175, 55, 0.2)"
                                    }}
                                >
                                    <Typography variant="h5" sx={{ fontFamily: "'Playfair Display', serif", color: "#2c1820", mb: 4, fontWeight: 600 }}>
                                        Send us a Message
                                    </Typography>

                                    <form onSubmit={handleSubmit}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    fullWidth
                                                    label="Your Name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                    variant="outlined"
                                                    color="secondary"
                                                    sx={{ '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: '#800080' } } }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    fullWidth
                                                    label="Email Address"
                                                    name="email"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    color="secondary"
                                                    sx={{ '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: '#800080' } } }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    fullWidth
                                                    label="Phone Number"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    color="secondary"
                                                    sx={{ '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: '#800080' } } }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    fullWidth
                                                    label="Subject"
                                                    name="subject"
                                                    value={formData.subject}
                                                    onChange={handleChange}
                                                    required
                                                    color="secondary"
                                                    sx={{ '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: '#800080' } } }}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    fullWidth
                                                    label="Message"
                                                    name="message"
                                                    multiline
                                                    rows={4}
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    required
                                                    color="secondary"
                                                    sx={{ '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: '#800080' } } }}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    size="large"
                                                    fullWidth
                                                    sx={{
                                                        bgcolor: "#800080",
                                                        color: "#fff",
                                                        py: 1.5,
                                                        fontSize: "1.1rem",
                                                        textTransform: "none",
                                                        fontWeight: 400,
                                                        letterSpacing: "0.5px",
                                                        borderRadius: 2,
                                                        "&:hover": {
                                                            bgcolor: "#600060",
                                                            boxShadow: "0 8px 20px rgba(128, 0, 128, 0.3)",
                                                        },
                                                    }}
                                                >
                                                    Send Message
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Paper>
                            </motion.div>
                        </Grid>
                    </Grid>
                </motion.div>
            </Container>
        </Box>
    );
};

export default Contact;
