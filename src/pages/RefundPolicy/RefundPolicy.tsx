import { Container, Typography, Box, Paper, Button } from "@mui/material";
import { RefreshCw, Clock, CheckCircle, XCircle, Info, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const RefundPolicy = () => {
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
                            Refund Policy
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
                    <PolicySection icon={RefreshCw} title="Overview">
                        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, color: "#4a4a4a" }}>
                            At Varnam Silks, we aim to ensure complete satisfaction with your purchase. Due to the delicate nature of handwoven silk sarees, we have a strict refund and exchange policy in place.
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, color: "#4a4a4a" }}>
                            Please read this policy carefully to understand our refund procedures and your rights as a customer.
                        </Typography>
                    </PolicySection>

                    <PolicySection icon={CheckCircle} title="Eligible Refunds">
                        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, color: "#4a4a4a" }}>
                            Refunds may be processed in the following situations:
                        </Typography>
                        <Box component="ul" sx={{ pl: 4, mb: 2, '& li': { mb: 1, color: '#4a4a4a' } }}>
                            <li>
                                <strong>Defective Products:</strong> If you receive a product with a manufacturing defect or damage.
                            </li>
                            <li>
                                <strong>Wrong Item:</strong> If you receive an item different from what you ordered.
                            </li>
                            <li>
                                <strong>Order Cancellation:</strong> If you cancel your order before it has been dispatched from our warehouse.
                            </li>
                        </Box>
                    </PolicySection>

                    <PolicySection icon={XCircle} title="Non-Refundable Items">
                        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, color: "#4a4a4a" }}>
                            The following items are non-refundable:
                        </Typography>
                        <Box component="ul" sx={{ pl: 4, '& li': { mb: 1, color: '#4a4a4a' } }}>
                            <li>
                                <strong>Customized Products:</strong> Sarees with fall/picot work done, or blouse stitched to your measurements.
                            </li>
                            <li>
                                <strong>Sale Items:</strong> Products purchased during promotional sales or at a discount.
                            </li>
                            <li>
                                <strong>Worn/Washed Items:</strong> Any product that has been worn, washed, or altered in any way.
                            </li>
                        </Box>
                    </PolicySection>

                    <PolicySection icon={Clock} title="Refund Request Process">
                        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, color: "#4a4a4a" }}>
                            To request a refund, please follow these steps:
                        </Typography>
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: "#2c1820" }}>
                                Step 1: Contact Us
                            </Typography>
                            <Typography variant="body2" paragraph sx={{ lineHeight: 1.8, pl: 2, color: "#4a4a4a" }}>
                                Reach out to our support team via email at support@varnamsilks.com
                                within 48 hours of receiving your order, with images of the defect/issue.
                            </Typography>

                            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: "#2c1820" }}>
                                Step 2: Provide Details
                            </Typography>
                            <Typography variant="body2" paragraph sx={{ lineHeight: 1.8, pl: 2, color: "#4a4a4a" }}>
                                Include your order number, images of the product, and reason for the return/refund request.
                            </Typography>

                            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: "#2c1820" }}>
                                Step 3: Review
                            </Typography>
                            <Typography variant="body2" paragraph sx={{ lineHeight: 1.8, pl: 2, color: "#4a4a4a" }}>
                                Our team will review your request within 5-7 business days and contact you with an update.
                            </Typography>

                            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: "#2c1820" }}>
                                Step 4: Processing
                            </Typography>
                            <Typography variant="body2" sx={{ lineHeight: 1.8, pl: 2, color: "#4a4a4a" }}>
                                If approved, the refund will be processed within 10-15 business days to your original payment method
                                or account.
                            </Typography>
                        </Box>
                    </PolicySection>

                    <PolicySection icon={Info} title="Important Notes">
                        <Box component="ul" sx={{ pl: 4, '& li': { mb: 1.5, color: '#4a4a4a' } }}>
                            <li>
                                Refunds will be processed to the original payment method used for the transaction.
                            </li>
                            <li>
                                Bank processing times may vary, and it may take up to 7-10 business days for the refund to reflect
                                in your account after processing.
                            </li>
                            <li>
                                We reserve the right to reject refund requests that do not meet the criteria outlined in this policy.
                            </li>
                            <li>
                                In case of disputes, our decision shall be final and binding.
                            </li>
                            <li>
                                This policy is subject to change. Members will be notified of any significant changes.
                            </li>
                        </Box>
                    </PolicySection>

                    <motion.div variants={fadeInUp}>
                        <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: 3, bgcolor: "rgba(212, 175, 55, 0.05)", border: "1px solid rgba(212, 175, 55, 0.2)" }}>
                            <Typography variant="h5" sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, mb: 3, color: "#2c1820" }}>
                                Contact Us
                            </Typography>
                            <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, color: "#4a4a4a" }}>
                                For refund requests or questions about this policy, please contact:
                            </Typography>
                            <Typography variant="body1" sx={{ color: "#4a4a4a", lineHeight: 1.8 }}>
                                <strong>Email:</strong> support@varnamsilks.com<br />
                                <strong>Address:</strong> Varnam Silks, Bangalore, Karnataka<br />
                                <strong>Office Hours:</strong> Monday - Saturday, 10:00 AM - 8:00 PM
                            </Typography>
                        </Paper>
                    </motion.div>
                </motion.div>
            </Container>
        </Box>
    );
};

export default RefundPolicy;
