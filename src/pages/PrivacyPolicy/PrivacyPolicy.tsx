import { Container, Typography, Box, Paper, Button } from "@mui/material";
import { Shield, Lock, Eye, UserCheck, Database, AlertCircle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const PrivacyPolicy = () => {
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
                            Privacy Policy
                        </Typography>
                        <Typography variant="subtitle1" sx={{ color: "rgba(255,255,255,0.7)", fontWeight: 300 }}>
                            Last Updated: {new Date().toLocaleDateString()}
                        </Typography>
                    </motion.div>
                </Container>
                
                {/* Decorative Elements */}
                <Box sx={{ position: 'absolute', top: -100, right: -100, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(128,0,128,0.2) 0%, rgba(44,24,32,0) 70%)', zIndex: 1 }} />
            </Box>

            <Container maxWidth="lg" sx={{ mt: { xs: -4, md: -8 }, position: "relative", zIndex: 3 }}>
                <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
                    <PolicySection icon={Shield} title="Introduction">
                        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, color: "#4a4a4a" }}>
                            At Varnam Silks, we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you visit our website or make a purchase from us.
                        </Typography>
                    </PolicySection>

                    <PolicySection icon={Database} title="Information We Collect">
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: "#2c1820" }}>
                            Personal Information
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, color: "#4a4a4a" }}>
                            We collect personal information that you voluntarily provide to us when registering as a customer or placing an order,
                            including but not limited to:
                        </Typography>
                        <Box component="ul" sx={{ pl: 4, mb: 3, '& li': { mb: 1, color: '#4a4a4a' } }}>
                            <li>Full name, and gender</li>
                            <li>Contact information (email address, phone number, shipping and billing address)</li>
                            <li>Payment information (credit card numbers are processed securely by our payment gateways)</li>
                            <li>Purchase history and preferences</li>
                        </Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: "#2c1820" }}>
                            Usage Information
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, color: "#4a4a4a" }}>
                            We automatically collect certain information when you access our platform, including:
                        </Typography>
                        <Box component="ul" sx={{ pl: 4, '& li': { mb: 1, color: '#4a4a4a' } }}>
                            <li>Device information and browser type</li>
                            <li>IP address and location data</li>
                            <li>Usage patterns and preferences</li>
                        </Box>
                    </PolicySection>

                    <PolicySection icon={Eye} title="How We Use Your Information">
                        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, color: "#4a4a4a" }}>
                            We use the collected information for the following purposes:
                        </Typography>
                        <Box component="ul" sx={{ pl: 4, '& li': { mb: 1, color: '#4a4a4a' } }}>
                            <li>To process and fulfill your orders</li>
                            <li>To communicate with you about your order status and provide customer support</li>
                            <li>To comply with legal and regulatory requirements</li>
                            <li>To detect and prevent fraud and unauthorized activities</li>
                            <li>To improve our services and user experience</li>
                            <li>To send you updates, newsletters, and promotional materials (with your consent)</li>
                        </Box>
                    </PolicySection>

                    <PolicySection icon={Lock} title="Data Security">
                        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, color: "#4a4a4a" }}>
                            We implement appropriate technical and organizational security measures to protect your personal
                            information against unauthorized access, alteration, disclosure, or destruction. These measures include:
                        </Typography>
                        <Box component="ul" sx={{ pl: 4, '& li': { mb: 1, color: '#4a4a4a' } }}>
                            <li>Encryption of sensitive data during transmission and storage</li>
                            <li>Regular security assessments and audits</li>
                            <li>Access controls and authentication mechanisms</li>
                            <li>Employee training on data protection and privacy</li>
                            <li>Secure backup and disaster recovery procedures</li>
                        </Box>
                    </PolicySection>

                    <PolicySection icon={UserCheck} title="Your Rights">
                        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, color: "#4a4a4a" }}>
                            You have the following rights regarding your personal information:
                        </Typography>
                        <Box component="ul" sx={{ pl: 4, '& li': { mb: 1, color: '#4a4a4a' } }}>
                            <li>Right to access and obtain a copy of your personal data</li>
                            <li>Right to rectify inaccurate or incomplete information</li>
                            <li>Right to request deletion of your personal data (subject to legal obligations)</li>
                            <li>Right to restrict or object to certain processing activities</li>
                            <li>Right to data portability</li>
                            <li>Right to withdraw consent at any time</li>
                        </Box>
                    </PolicySection>

                    <PolicySection icon={AlertCircle} title="Data Retention">
                        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, color: "#4a4a4a" }}>
                            We retain your personal information for as long as necessary to fulfill the purposes outlined in
                            this Privacy Policy, unless a longer retention period is required or permitted by law. When we no
                            longer need your information, we will securely delete or anonymize it.
                        </Typography>
                    </PolicySection>

                    <motion.div variants={fadeInUp}>
                        <Paper 
                            elevation={0} 
                            sx={{ 
                                p: { xs: 3, md: 5 }, 
                                borderRadius: 3,
                                bgcolor: "rgba(212, 175, 55, 0.05)",
                                border: "1px solid rgba(212, 175, 55, 0.2)"
                            }}
                        >
                            <Typography variant="h5" sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, mb: 3, color: "#2c1820" }}>
                                Contact Us
                            </Typography>
                            <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, color: "#4a4a4a" }}>
                                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices,
                                please contact us at:
                            </Typography>
                            <Typography variant="body1" sx={{ color: "#4a4a4a", lineHeight: 1.8 }}>
                                <strong>Email:</strong> support@varnamsilks.com<br />
                                <strong>Address:</strong> Varnam Silks, Bangalore, Karnataka
                            </Typography>
                        </Paper>
                    </motion.div>
                </motion.div>
            </Container>
        </Box>
    );
};

export default PrivacyPolicy;
