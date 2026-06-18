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
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import { useSignupMutation } from "../../api/Auth";
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
  });

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [genderError, setGenderError] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [registrationData, setRegistrationData] = useState<{ memberId: string; password: string; email: string }>({
    memberId: "",
    password: "",
    email: "",
  });

  // Fetch Agent Info to get Sponsor Name
  const { data: agentData } = useGetAgentById(agentId, !!agentId);
  const agentName = agentData?.data?.name || TokenService.getUserName() || "";

  const { mutate, isPending } = useSignupMutation();

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
        ...formData,
      };

      mutate(finalData, {
        onSuccess: (response) => {
          if (response.success) {
            setRegistrationData({
              memberId: response.data?.member_id,
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
    </Box>
  );
};

export default AddNew;
