import { Container, Typography, Box, Paper, Button } from "@mui/material";
import { FileText, UserCheck, Ban, AlertTriangle, Scale, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Terms = () => {
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
                            Terms & Conditions
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
                    <PolicySection icon={FileText} title="Introduction">
                        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, color: "#4a4a4a" }}>
                            Welcome to Varnam Silks. These Terms and Conditions govern your use of our website and the purchase of our products. By accessing our site or purchasing our silk sarees, you agree to be bound by these terms.
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, color: "#4a4a4a" }}>
                            Please read these terms carefully before using our services. If you do not agree with any part of
                            these terms, you should not use our services.
                        </Typography>
                    </PolicySection>

                    <PolicySection icon={UserCheck} title="Membership and Eligibility">
                        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, color: "#4a4a4a" }}>
                            To become a member of our platform and use our services, you must:
                        </Typography>
                        <Box component="ul" sx={{ pl: 4, mb: 3, '& li': { mb: 1, color: '#4a4a4a' } }}>
                            <li>Be at least 18 years of age</li>
                            <li>Provide valid and accurate personal information</li>
                            <li>Agree to these Terms and Conditions and our Privacy Policy</li>
                        </Box>
                        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, color: "#4a4a4a" }}>
                            We reserve the right to refuse membership or terminate existing memberships at our discretion,
                            particularly in cases of fraudulent activity or violation of these terms.
                        </Typography>
                    </PolicySection>

                    <PolicySection icon={Scale} title="Services and Accounts">
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: "#2c1820" }}>
                            Account Usage
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, color: "#4a4a4a" }}>
                            Members are responsible for:
                        </Typography>
                        <Box component="ul" sx={{ pl: 4, mb: 3, '& li': { mb: 1, color: '#4a4a4a' } }}>
                            <li>Maintaining the confidentiality of account credentials</li>
                            <li>All activities that occur under their account</li>
                            <li>Notifying us immediately of any unauthorized access</li>
                            <li>Providing accurate and up-to-date information</li>
                        </Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: "#2c1820" }}>
                            Products
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, color: "#4a4a4a" }}>
                            We offer various handwoven silk sarees including:
                        </Typography>
                        <Box component="ul" sx={{ pl: 4, mb: 3, '& li': { mb: 1, color: '#4a4a4a' } }}>
                            <li>Bridal Silk Sarees</li>
                            <li>Kanchipuram Sarees</li>
                            <li>Mysore Silk and Banarasi Silk</li>
                            <li>Designer Fancy Silks</li>
                        </Box>
                        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, color: "#4a4a4a" }}>
                            We strive to display our products as accurately as possible, but colors may vary slightly due to monitor settings.
                        </Typography>
                    </PolicySection>

                    <PolicySection icon={AlertTriangle} title="Fees and Charges">
                        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, color: "#4a4a4a" }}>
                            Members are responsible for paying all applicable fees and charges as per the prevailing
                            rates. These may include:
                        </Typography>
                        <Box component="ul" sx={{ pl: 4, mb: 3, '& li': { mb: 1, color: '#4a4a4a' } }}>
                            <li>Product prices as listed</li>
                            <li>Shipping charges (if applicable)</li>
                            <li>Applicable taxes</li>
                        </Box>
                        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, color: "#4a4a4a" }}>
                            We reserve the right to modify our pricing with prior notice. Updated schedules
                            will be communicated through our platform or via email.
                        </Typography>
                    </PolicySection>

                    <PolicySection icon={Ban} title="Prohibited Activities">
                        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, color: "#4a4a4a" }}>
                            Members are strictly prohibited from:
                        </Typography>
                        <Box component="ul" sx={{ pl: 4, '& li': { mb: 1, color: '#4a4a4a' } }}>
                            <li>Using the platform for any illegal or unauthorized purpose</li>
                            <li>Providing false or misleading information</li>
                            <li>Attempting to gain unauthorized access to our systems</li>
                            <li>Engaging in fraudulent activities or money laundering</li>
                            <li>Violating any applicable laws or regulations</li>
                            <li>Transferring or selling account credentials to third parties</li>
                            <li>Using automated systems to access the platform</li>
                        </Box>
                    </PolicySection>

                    <motion.div variants={fadeInUp}>
                        <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, mb: 4, borderRadius: 3, bgcolor: "#fff", boxShadow: "0px 10px 40px rgba(0,0,0,0.05)", border: "1px solid rgba(212, 175, 55, 0.2)" }}>
                            <Typography variant="h5" sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, mb: 2, color: "#2c1820" }}>
                                Limitation of Liability
                            </Typography>
                            <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, color: "#4a4a4a" }}>
                                We shall not be liable for any indirect, incidental, special, or consequential damages arising out
                                of or related to your use of our services. We do not guarantee uninterrupted or error-free service.
                            </Typography>
                        </Paper>
                    </motion.div>

                    <motion.div variants={fadeInUp}>
                        <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, mb: 4, borderRadius: 3, bgcolor: "#fff", boxShadow: "0px 10px 40px rgba(0,0,0,0.05)", border: "1px solid rgba(212, 175, 55, 0.2)" }}>
                            <Typography variant="h5" sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, mb: 2, color: "#2c1820" }}>
                                Termination
                            </Typography>
                            <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, color: "#4a4a4a" }}>
                                We reserve the right to suspend or terminate your account and access to our services at any time,
                                with or without notice, for any violation of these terms or for any other reason we deem appropriate.
                            </Typography>
                        </Paper>
                    </motion.div>

                    <motion.div variants={fadeInUp}>
                        <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, mb: 4, borderRadius: 3, bgcolor: "#fff", boxShadow: "0px 10px 40px rgba(0,0,0,0.05)", border: "1px solid rgba(212, 175, 55, 0.2)" }}>
                            <Typography variant="h5" sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, mb: 2, color: "#2c1820" }}>
                                Governing Law
                            </Typography>
                            <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, color: "#4a4a4a" }}>
                                These Terms and Conditions shall be governed by and construed in accordance with the laws of India.
                                Any disputes arising out of or related to these terms shall be subject to the exclusive jurisdiction
                                of the courts in Bangalore, Karnataka.
                            </Typography>
                        </Paper>
                    </motion.div>

                    <motion.div variants={fadeInUp}>
                        <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: 3, bgcolor: "rgba(212, 175, 55, 0.05)", border: "1px solid rgba(212, 175, 55, 0.2)" }}>
                            <Typography variant="h5" sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, mb: 3, color: "#2c1820" }}>
                                Contact Information
                            </Typography>
                            <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, color: "#4a4a4a" }}>
                                For questions regarding these Terms and Conditions, please contact us:
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

export default Terms;
