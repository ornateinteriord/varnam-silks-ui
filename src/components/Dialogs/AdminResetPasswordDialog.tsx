import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  Divider,
  InputAdornment,
  Alert,
  IconButton,
} from "@mui/material";
import LockResetIcon from "@mui/icons-material/LockReset";
import KeyIcon from "@mui/icons-material/Key";
import CloseIcon from "@mui/icons-material/Close";
import ReplayIcon from "@mui/icons-material/Replay";
import { useAdminResetPassword } from "../../api/Admin";

interface AdminResetPasswordDialogProps {
  open: boolean;
  onClose: () => void;
  targetId: string;
  targetName?: string;
  defaultPassword?: string;
  roleType?: string;
}

const AdminResetPasswordDialog: React.FC<AdminResetPasswordDialogProps> = ({
  open,
  onClose,
  targetId,
  targetName,
  defaultPassword,
  roleType = "Account",
}) => {
  const [customPassword, setCustomPassword] = useState("");
  const { mutate: resetPassword, isPending } = useAdminResetPassword();

  const handleReset = (newPassword: string) => {
    if (!targetId || !newPassword) return;
    resetPassword(
      { targetId, newPassword },
      {
        onSuccess: () => {
          setCustomPassword("");
          onClose();
        },
      }
    );
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "12px",
          boxShadow: "0 8px 32px rgba(10, 37, 88, 0.15)",
        },
      }}
    >
      <DialogTitle
        sx={{
          backgroundColor: "#0a2558",
          color: "#fff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          py: 2,
          px: 3,
        }}
      >
        <Box display="flex" alignItems="center" gap={1.5}>
          <LockResetIcon sx={{ fontSize: 28 }} />
          <Typography variant="h6" fontWeight="600">
            Reset {roleType} Password
          </Typography>
        </Box>
        <IconButton onClick={onClose} sx={{ color: "#fff" }} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3, mt: 1 }}>
        <Box mb={2.5}>
          <Typography variant="subtitle1" fontWeight="bold" color="#0a2558">
            Target Account Details
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ID: <strong>{targetId}</strong> {targetName ? `| Name: ${targetName}` : ""}
          </Typography>
        </Box>

        <Alert severity="info" sx={{ mb: 3, borderRadius: "8px" }}>
          Changing this password will immediately update access credentials across all system portals without requiring the existing password.
        </Alert>

        {defaultPassword && (
          <Box
            sx={{
              p: 2,
              mb: 3,
              borderRadius: "8px",
              border: "1px dashed #0a2558",
              backgroundColor: "rgba(10, 37, 88, 0.03)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 1.5,
            }}
          >
            <Box>
              <Typography variant="subtitle2" fontWeight="600" color="#0a2558">
                Reset to Registered Default
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Default Password (Mobile/Contact): <strong>{defaultPassword}</strong>
              </Typography>
            </Box>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              startIcon={<ReplayIcon />}
              disabled={isPending}
              onClick={() => handleReset(defaultPassword)}
              sx={{
                borderColor: "#0a2558",
                color: "#0a2558",
                "&:hover": { borderColor: "#581c87", backgroundColor: "rgba(10, 37, 88, 0.08)" },
              }}
            >
              Reset to Default
            </Button>
          </Box>
        )}

        <Divider sx={{ my: 2.5 }}>
          <Typography variant="caption" color="text.secondary" fontWeight="bold">
            OR SET CUSTOM PASSWORD
          </Typography>
        </Divider>

        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="New Custom Password"
            variant="outlined"
            fullWidth
            type="text"
            value={customPassword}
            onChange={(e) => setCustomPassword(e.target.value)}
            placeholder="Enter new password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <KeyIcon sx={{ color: "#0a2558" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": { borderColor: "#0a2558" },
                "&.Mui-focused fieldset": { borderColor: "#0a2558" },
              },
            }}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2.5, backgroundColor: "#f9fafb", borderTop: "1px solid #e5e7eb" }}>
        <Button onClick={onClose} color="inherit" disabled={isPending}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={() => handleReset(customPassword)}
          disabled={!customPassword.trim() || isPending}
          sx={{
            backgroundColor: "#0a2558",
            px: 3,
            "&:hover": { backgroundColor: "#581c87" },
          }}
        >
          {isPending ? "Resetting..." : "Set Custom Password"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AdminResetPasswordDialog;
