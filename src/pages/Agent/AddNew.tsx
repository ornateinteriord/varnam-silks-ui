import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Box,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import { useSignupMutation } from "../../api/Auth";
import { useCreatePaymentOrder } from "../../api/Memeber";
import { useCreateAccountByAgent } from "../../queries/admin";
import TokenService from "../../queries/token/tokenService";
import { useGetAgentById } from "../../queries/Agent";

const AddNew: React.FC = () => {
  const agentId = TokenService.getMemberId() || "";

  const [formData, setFormData] = useState<Record<string, string>>({
    gender: "",
    Name: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobileno: "",
    pincode: "",
    amount: "",
    duration: "",
    maturityValue: "",
    paymentMode: "Offline",
  });

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [genderError, setGenderError] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [registrationData, setRegistrationData] = useState<{ memberId: string; password: string; email: string }>({
    memberId: "",
    password: "",
    email: "",
  });

  // Fetch Agent Info to get Sponsor Name
  const { data: agentData } = useGetAgentById(agentId, !!agentId);
  const agentName = agentData?.data?.name || TokenService.getUserName() || "";

  const { mutate, isPending } = useSignupMutation();
  const { mutate: createOrder } = useCreatePaymentOrder();
  const { mutateAsync: createAccountAsync } = useCreateAccountByAgent();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      gender: e.target.value,
    }));
    setGenderError(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation
    if (!formData.gender) {
      setGenderError(true);
      return;
    }

    if (!formData.password || formData.password.length <= 5) {
      setErrorMessage("Password must be at least 6 characters*");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    if (!agentId) {
      setErrorMessage("Agent ID is required to register a member.");
      return;
    }

    try {
      setPaymentDialogOpen(true);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const handleConfirmRegistration = () => {
    setPaymentDialogOpen(false);
    try {
      // Create the final data object
      const finalData = {
        name: formData.Name,
        contactno: formData.mobileno,
        introducer: agentId,
        introducer_name: agentName,
        password: formData.password,
        emailid: formData.email,
        gender: formData.gender,
        pincode: formData.pincode,
        sponsor_id: agentId,
        Sponsor_code: agentId,
        Sponsor_name: agentName,
        payment_mode: formData.paymentMode.toLowerCase(),
        status: formData.paymentMode === 'Offline' ? 'Pending' : 'active',
        ...formData,
      };

      mutate(finalData, {
        onSuccess: async (response) => {
          if (response.success) {
            const memberIdStr = response.data?.member_id;
            const hasPlan = formData.amount && formData.duration;
            let createdAccountId = null;
            let createdAccountNo = null;
            let createdAccountType = null;

            if (hasPlan) {
              try {
                const accountData = {
                  branch_id: agentData?.data?.branch_code || "VSB000001",
                  date_of_opening: new Date().toISOString().split('T')[0],
                  member_id: memberIdStr,
                  account_type: "AGP003", 
                  account_operation: "Single",
                  introducer: agentId,
                  entered_by: agentName,
                  ref_id: `${formData.amount}-${formData.duration}`,
                  interest_rate: 0,
                  duration: parseInt(formData.duration) || 0,
                  date_of_maturity: null,
                  assigned_to: agentId,
                  account_amount: formData.paymentMode === 'Online' ? 0 : parseFloat(formData.amount),
                  plan_amount: parseFloat(formData.amount),
                  joint_member: null,
                  payment_mode: formData.paymentMode.toLowerCase(),
                };
                const accRes = await createAccountAsync(accountData);
                if (accRes.success) {
                  const responseAny = accRes as any;
                  createdAccountId = responseAny.data?.account_id || responseAny.account_id;
                  createdAccountNo = responseAny.data?.account_no || responseAny.account_no;
                  createdAccountType = responseAny.data?.account_type || responseAny.account_type || "AGP003";
                }
              } catch (err) {
                console.error("Auto account creation failed", err);
              }
            }

            if (formData.paymentMode === 'Online') {
              const orderData = {
                payment_type: hasPlan && createdAccountNo ? 'ACCOUNT_OPENING' : 'MEMBER_REGISTRATION',
                member_id: memberIdStr,
                amount: parseFloat(formData.amount) || 0,
                mobileno: formData.mobileno,
                Name: formData.Name,
                email: formData.email,
                account_id: createdAccountId,
                account_no: createdAccountNo,
                account_type: createdAccountType,
                description: hasPlan && createdAccountNo ? `Account Opening - ${createdAccountNo}` : `Member Registration - ${memberIdStr}`,
                customer: {
                  customer_id: memberIdStr,
                  customer_email: formData.email || "customer@example.com",
                  customer_phone: formData.mobileno,
                  customer_name: formData.Name
                },
                notes: {
                  introducer: agentId,
                  amount: parseFloat(formData.amount) || 0,
                  duration: parseInt(formData.duration) || 0,
                  maturity: parseFloat(formData.maturityValue) || 0
                }
              };
              createOrder(orderData);
              return;
            }

            setRegistrationData({
              memberId: memberIdStr,
              password: formData.password,
              email: formData.email,
            });
            setSuccessDialogOpen(true);
            // Reset form
            setFormData({
              gender: "",
              Name: "",
              email: "",
              password: "",
              confirmPassword: "",
              mobileno: "",
              pincode: "",
              amount: "",
              duration: "",
              maturityValue: "",
              paymentMode: "Offline",
            });
          }
        },
        onError: (error: any) => {
          setErrorMessage(error.response?.data?.message || "Registration failed");
        },
      });
    } catch (error) {
      console.error("Registration failed:", error);
      setErrorMessage("Registration failed. Please try again.");
    }
  };

  const handleCloseDialog = () => {
    setSuccessDialogOpen(false);
  };

  return (
    <Box sx={{ p: { xs: 1, sm: 3 } }}>
      <Card
        sx={{
          borderRadius: 4,
          boxShadow: "0 20px 40px -15px rgba(26, 35, 126, 0.15)",
          overflow: "hidden",
          border: "1px solid rgba(0,0,0,0.05)",
        }}
      >
        <Box
          sx={{
            background: "linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)",
            p: 3,
            color: "white",
            textAlign: "center",
          }}
        >
          <Typography variant="h5" fontWeight="800" sx={{ letterSpacing: 0.5 }}>
            Register New Member
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.85, mt: 0.5 }}>
            Add a new member to your network under your Agent ID
          </Typography>
        </Box>

        <CardContent sx={{ p: { xs: 2, sm: 4 } }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2.5}>
              {/* Sponsor Information (Read-Only) */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  size="small"
                  label="Sponsor Code (Your Agent ID)"
                  value={agentId}
                  disabled
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  size="small"
                  label="Sponsor Name"
                  value={agentName}
                  disabled
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, mt: 1 }}>
                  <Typography variant="subtitle2" fontWeight="700" sx={{ color: "#1a237e", textTransform: 'uppercase', letterSpacing: 1 }}>
                    Member Details
                  </Typography>
                  <Box sx={{ flexGrow: 1, height: '1px', bgcolor: 'rgba(26,35,126,0.1)', ml: 2 }} />
                </Box>
              </Grid>

              {/* Name */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  size="small"
                  required
                  name="Name"
                  label="Full Name"
                  value={formData.Name}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              {/* Email */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  size="small"
                  required
                  name="email"
                  type="email"
                  label="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              {/* Mobile */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  size="small"
                  required
                  name="mobileno"
                  label="Mobile Number"
                  value={formData.mobileno}
                  onChange={handleChange}
                  inputProps={{ maxLength: 10, pattern: "[0-9]{10}" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              {/* Pincode */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  size="small"
                  required
                  name="pincode"
                  label="Pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  inputProps={{ maxLength: 6, pattern: "[0-9]{6}" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOnIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              {/* Gender */}
              <Grid item xs={12}>
                <FormControl component="fieldset" error={genderError} size="small">
                  <FormLabel component="legend" sx={{ color: "text.primary", fontWeight: 500, fontSize: "0.875rem" }}>
                    Gender *
                  </FormLabel>
                  <RadioGroup row name="gender" value={formData.gender} onChange={handleRadioChange}>
                    <FormControlLabel value="Male" control={<Radio size="small" />} label={<Typography variant="body2">Male</Typography>} />
                    <FormControlLabel value="Female" control={<Radio size="small" />} label={<Typography variant="body2">Female</Typography>} />
                  </RadioGroup>
                  {genderError && <Typography color="error" variant="caption">Please select a gender</Typography>}
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, mt: 1 }}>
                  <Typography variant="subtitle2" fontWeight="700" sx={{ color: "#1a237e", textTransform: 'uppercase', letterSpacing: 1 }}>
                    Plan Details
                  </Typography>
                  <Box sx={{ flexGrow: 1, height: '1px', bgcolor: 'rgba(26,35,126,0.1)', ml: 2 }} />
                </Box>
              </Grid>

              {/* Deposit Amount */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small">
                  <InputLabel id="agent-add-amount">Select Deposit Amount</InputLabel>
                  <Select
                    labelId="agent-add-amount"
                    label="Select Deposit Amount"
                    value={formData.amount || ''}
                    onChange={(e) => {
                      const amt = e.target.value;
                      let dur = '';
                      let maturity = '';

                      if (amt === '100') {
                        dur = '120';
                        maturity = '15000';
                      }
                      
                      setFormData(prev => ({
                        ...prev,
                        amount: amt,
                        duration: dur,
                        maturityValue: maturity
                      }));
                    }}
                  >
                    <MenuItem value="100">₹100</MenuItem>
                    <MenuItem value="1000">₹1,000</MenuItem>
                    <MenuItem value="2000">₹2,000</MenuItem>
                    <MenuItem value="3000">₹3,000</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Duration */}
              {formData.amount && (
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="agent-add-duration">Select Plan Duration</InputLabel>
                    <Select
                      labelId="agent-add-duration"
                      label="Select Plan Duration"
                      value={formData.duration || ''}
                      onChange={(e) => {
                        const dur = e.target.value;
                        const amt = formData.amount;
                        let maturity = '';

                        if (amt === '1000') {
                          if (dur === '12') maturity = '14000';
                          if (dur === '18') maturity = '21000';
                          if (dur === '24') maturity = '28000';
                        } else if (amt === '2000') {
                          if (dur === '12') maturity = '28000';
                          if (dur === '18') maturity = '42000';
                          if (dur === '24') maturity = '56000';
                        } else if (amt === '3000') {
                          if (dur === '12') maturity = '42000';
                          if (dur === '18') maturity = '63000';
                          if (dur === '24') maturity = '84000';
                        } else if (amt === '100') {
                          if (dur === '120') maturity = '15000';
                        }
                        
                        setFormData(prev => ({
                          ...prev,
                          duration: dur,
                          maturityValue: maturity
                        }));
                      }}
                    >
                      {formData.amount === '100' && (
                        <MenuItem value="120">120 Months (10 Years) (Maturity: ₹15,000)</MenuItem>
                      )}
                      {formData.amount !== '100' && (
                        <MenuItem value="12">12 Months (Maturity: ₹{formData.amount === '1000' ? '14,000' : formData.amount === '2000' ? '28,000' : formData.amount === '3000' ? '42,000' : ''})</MenuItem>
                      )}
                      {formData.amount !== '100' && (
                        <MenuItem value="18">18 Months (Maturity: ₹{formData.amount === '1000' ? '21,000' : formData.amount === '2000' ? '42,000' : formData.amount === '3000' ? '63,000' : ''})</MenuItem>
                      )}
                      {formData.amount !== '100' && (
                        <MenuItem value="24">24 Months (Maturity: ₹{formData.amount === '1000' ? '28,000' : formData.amount === '2000' ? '56,000' : formData.amount === '3000' ? '84,000' : ''})</MenuItem>
                      )}
                    </Select>
                  </FormControl>
                </Grid>
              )}

              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, mt: 1 }}>
                  <Typography variant="subtitle2" fontWeight="700" sx={{ color: "#1a237e", textTransform: 'uppercase', letterSpacing: 1 }}>
                    Security
                  </Typography>
                  <Box sx={{ flexGrow: 1, height: '1px', bgcolor: 'rgba(26,35,126,0.1)', ml: 2 }} />
                </Box>
              </Grid>

              {/* Password */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  size="small"
                  required
                  name="password"
                  type="password"
                  label="Password"
                  value={formData.password}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              {/* Confirm Password */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  size="small"
                  required
                  name="confirmPassword"
                  type="password"
                  label="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              {errorMessage && (
                <Grid item xs={12}>
                  <Typography color="error" variant="body2" sx={{ textAlign: "center", fontWeight: "bold" }}>
                    {errorMessage}
                  </Typography>
                </Grid>
              )}

              {/* Submit Button */}
              <Grid item xs={12} sx={{ mt: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={isPending}
                  sx={{
                    py: 1.5,
                    background: "linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)",
                    color: "white",
                    fontWeight: "800",
                    borderRadius: 3,
                    textTransform: "none",
                    fontSize: "1rem",
                    boxShadow: "0 8px 20px -8px rgba(26, 35, 126, 0.6)",
                    transition: "all 0.3s ease",
                    "&:hover": { 
                      background: "linear-gradient(135deg, #0d47a1 0%, #1a237e 100%)",
                      boxShadow: "0 12px 24px -8px rgba(26, 35, 126, 0.8)",
                      transform: "translateY(-2px)" 
                    },
                  }}
                >
                  {isPending ? "Registering..." : "Register Member"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>

      {/* Success Dialog */}
      <Dialog open={successDialogOpen} onClose={handleCloseDialog} PaperProps={{ sx: { borderRadius: 4, p: 2, maxWidth: 400 } }}>
        <DialogTitle sx={{ textAlign: "center", color: "green", fontWeight: "bold", pb: 1 }}>
          Registration Successful!
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
            <Box sx={{ bgcolor: "#f5f5f5", p: 2, borderRadius: 2 }}>
              <Typography variant="body2" color="text.secondary">Member ID</Typography>
              <Typography variant="h6" fontWeight="bold" color="primary">{registrationData.memberId}</Typography>
            </Box>
            <Box sx={{ bgcolor: "#f5f5f5", p: 2, borderRadius: 2 }}>
              <Typography variant="body2" color="text.secondary">Password</Typography>
              <Typography variant="body1" fontWeight="medium">{registrationData.password}</Typography>
            </Box>
            <Box sx={{ bgcolor: "#f5f5f5", p: 2, borderRadius: 2 }}>
              <Typography variant="body2" color="text.secondary">Email ID</Typography>
              <Typography variant="body1" fontWeight="medium">{registrationData.email}</Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
          <Button onClick={handleCloseDialog} variant="contained" color="primary" sx={{ px: 4, borderRadius: 2 }}>
            Done
          </Button>
        </DialogActions>
      </Dialog>
      {/* Payment Mode Dialog */}
      <Dialog open={paymentDialogOpen} onClose={() => setPaymentDialogOpen(false)} PaperProps={{ sx: { borderRadius: 4, p: 2, maxWidth: 400, width: '100%' } }}>
        <DialogTitle sx={{ textAlign: "center", fontWeight: "bold", pb: 1, color: "#1a237e" }}>
          Select Payment Mode
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="body2" color="text.secondary" textAlign="center">
              Please select how you would like to complete the payment for this registration.
            </Typography>
            <FormControl component="fieldset" sx={{ mt: 1, alignSelf: 'center' }}>
              <RadioGroup 
                name="paymentMode" 
                value={formData.paymentMode} 
                onChange={(e) => setFormData(prev => ({ ...prev, paymentMode: e.target.value }))}
                sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
              >
                <FormControlLabel 
                  value="Offline" 
                  control={<Radio />} 
                  label={
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">Offline Payment</Typography>
                      <Typography variant="caption" color="text.secondary">Pay via Cash or Cheque</Typography>
                    </Box>
                  } 
                  sx={{ 
                    border: '1px solid', 
                    borderColor: formData.paymentMode === 'Offline' ? '#1a237e' : '#e0e0e0',
                    borderRadius: 2, 
                    p: 1, 
                    pr: 3,
                    bgcolor: formData.paymentMode === 'Offline' ? 'rgba(26,35,126,0.05)' : 'transparent',
                    transition: 'all 0.2s'
                  }}
                />
                <FormControlLabel 
                  value="Online" 
                  control={<Radio />} 
                  label={
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">Online Payment</Typography>
                      <Typography variant="caption" color="text.secondary">Pay instantly via Gateway</Typography>
                    </Box>
                  } 
                  sx={{ 
                    border: '1px solid', 
                    borderColor: formData.paymentMode === 'Online' ? '#1a237e' : '#e0e0e0',
                    borderRadius: 2, 
                    p: 1, 
                    pr: 3,
                    bgcolor: formData.paymentMode === 'Online' ? 'rgba(26,35,126,0.05)' : 'transparent',
                    transition: 'all 0.2s'
                  }}
                />
              </RadioGroup>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb: 2, gap: 2 }}>
          <Button onClick={() => setPaymentDialogOpen(false)} variant="outlined" sx={{ borderRadius: 2 }}>
            Cancel
          </Button>
          <Button onClick={handleConfirmRegistration} variant="contained" disabled={isPending} sx={{ borderRadius: 2, background: "linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)" }}>
            {isPending ? "Processing..." : "Confirm & Proceed"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddNew;
