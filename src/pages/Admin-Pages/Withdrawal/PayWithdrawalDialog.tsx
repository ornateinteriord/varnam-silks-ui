import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
    TextField,
    CircularProgress,
    Divider,
    Chip,
    Grid,
    Paper,
    IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PersonIcon from '@mui/icons-material/Person';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { toast } from 'react-toastify';
import { useApproveWithdrawal } from '../../../queries/admin/withdrawal';
import { useGetMemberById } from '../../../queries/Member';
import { useGetAgentById, useGetAgentCommissionTransactions } from '../../../queries/Agent';

interface PayWithdrawalDialogProps {
    open: boolean;
    onClose: () => void;
    request: any;
}

const PayWithdrawalDialog: React.FC<PayWithdrawalDialogProps> = ({ open, onClose, request }) => {
    const approveMutation = useApproveWithdrawal();
    const [remarks, setRemarks] = useState('');
    const [processing, setProcessing] = useState(false);

    // Fetch member and agent details to ensure all bank and profile info is retrieved
    const { data: memberData, isLoading: memberLoading } = useGetMemberById(request?.member_id || '', !!request?.member_id);
    const { data: agentData, isLoading: agentLoading } = useGetAgentById(request?.member_id || '', !!request?.member_id);
    const { data: commTxData } = useGetAgentCommissionTransactions(request?.member_id || '', !!request?.member_id);

    if (!request) return null;

    const member = memberData?.data;
    const agent = agentData?.data;
    const enriched = request?.member_details;

    const isAgent = request?.user_type === 'AGENT' || !!agent || (!member && String(request?.member_id || '').startsWith('AG'));
    const userName = member?.name || agent?.name || enriched?.name || request?.account_holder_name || 'N/A';
    const mobileNo = member?.contactno || agent?.mobile || enriched?.contactno || 'Not Provided';
    
    // Balance calculation (use real-time commission availableBalance from agent wallet, request balance, or profile)
    const balance = commTxData?.data?.summary?.availableBalance ?? request?.balance ?? enriched?.balance ?? (isAgent ? (agent?.commission_balance ?? 0) : 0);

    const grossAmount = request?.amount || 0;
    const deductionRate = (request?.deduction_rate !== undefined && request?.deduction_rate !== null)
        ? request?.deduction_rate
        : (isAgent ? 10 : 0);
    const deductionAmount = (request?.deduction_amount !== undefined && request?.deduction_amount !== null)
        ? request?.deduction_amount
        : (isAgent ? Math.round((grossAmount * (deductionRate / 100)) * 100) / 100 : 0);
    const netPayable = (request?.net_amount !== undefined && request?.net_amount !== null && request?.net_amount > 0)
        ? request?.net_amount
        : Math.round((grossAmount - deductionAmount) * 100) / 100;

    // Bank Details
    const bankName = (enriched?.bank_name && enriched?.bank_name !== 'Not Provided' && enriched?.bank_name !== 'N/A')
        ? enriched?.bank_name
        : (member?.bank_name || agent?.bank_name || (request?.bank_name && request?.bank_name !== 'N/A' ? request?.bank_name : '') || 'Not Provided');

    const accountNumber = (enriched?.account_number && enriched?.account_number !== 'Not Provided' && enriched?.account_number !== 'N/A')
        ? enriched?.account_number
        : (member?.account_number || agent?.account_number || (request?.bank_account_number && request?.bank_account_number !== 'N/A' ? request?.bank_account_number : '') || 'Not Provided');

    const ifscCode = (enriched?.ifsc_code && enriched?.ifsc_code !== 'Not Provided' && enriched?.ifsc_code !== 'N/A')
        ? enriched?.ifsc_code
        : (member?.ifsc_code || agent?.ifsc_code || (request?.ifsc_code && request?.ifsc_code !== 'N/A' ? request?.ifsc_code : '') || 'Not Provided');

    const accountHolder = (enriched?.account_holder_name && enriched?.account_holder_name !== 'Not Provided' && enriched?.account_holder_name !== 'N/A')
        ? enriched?.account_holder_name
        : (member?.name || agent?.name || (request?.account_holder_name && request?.account_holder_name !== 'N/A' ? request?.account_holder_name : '') || userName);

    const handleAction = async (action: 'Pay' | 'Reject') => {
        if (action === 'Reject' && !remarks) {
            toast.error("Please enter rejection remarks");
            return;
        }

        setProcessing(true);
        try {
            // Auto-generate transaction ID for admin payments
            const autoTransactionId = action === 'Pay' ? `ADM${Date.now()}` : '';

            const response = await approveMutation.mutateAsync({
                request_id: request.withdraw_request_id,
                action,
                transaction_id: autoTransactionId,
                remarks
            });

            if (response.success) {
                toast.success(response.message || (action === 'Pay' ? "Withdrawal payment completed successfully!" : "Withdrawal request rejected"));
                onClose();
            } else {
                toast.error(response.message || "Action failed");
            }
        } catch (error: any) {
            toast.error(error?.message || "Action failed");
        } finally {
            setProcessing(false);
        }
    };

    const isLoading = memberLoading && agentLoading;

    return (
        <Dialog 
            open={open} 
            onClose={onClose} 
            maxWidth="sm" 
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.15)'
                }
            }}
        >
            <DialogTitle sx={{ 
                bgcolor: '#4f46e5', 
                color: 'white', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                py: 2,
                px: 3
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <AccountBalanceWalletIcon />
                    <Box>
                        <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem', color: 'white' }}>
                            Payable Withdrawal Request
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                            Review details and process payout
                        </Typography>
                    </Box>
                </Box>
                <IconButton onClick={onClose} sx={{ color: 'white' }} size="small">
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ p: 3, pt: '20px !important' }}>
                {isLoading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                        <CircularProgress sx={{ color: '#4f46e5' }} />
                    </Box>
                ) : (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                        {/* Financial Highlights */}
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={isAgent ? 4 : 6}>
                                <Paper sx={{
                                    p: 2,
                                    borderRadius: '12px',
                                    bgcolor: 'rgba(99, 102, 241, 0.08)',
                                    border: '1px solid rgba(99, 102, 241, 0.25)',
                                    textAlign: 'center'
                                }} elevation={0}>
                                    <Typography variant="caption" sx={{ color: '#4338ca', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                                        Gross Request
                                    </Typography>
                                    <Typography variant="h5" sx={{ color: '#312e81', fontWeight: 800, mt: 0.5 }}>
                                        ₹{grossAmount.toFixed(2)}
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: '#6366f1', fontSize: '0.7rem' }}>
                                        Debited from wallet
                                    </Typography>
                                </Paper>
                            </Grid>

                            {isAgent && (
                                <Grid item xs={12} sm={4}>
                                    <Paper sx={{
                                        p: 2,
                                        borderRadius: '12px',
                                        bgcolor: 'rgba(239, 68, 68, 0.08)',
                                        border: '1px solid rgba(239, 68, 68, 0.25)',
                                        textAlign: 'center'
                                    }} elevation={0}>
                                        <Typography variant="caption" sx={{ color: '#dc2626', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                                            10% Deduction
                                        </Typography>
                                        <Typography variant="h5" sx={{ color: '#b91c1c', fontWeight: 800, mt: 0.5 }}>
                                            -₹{deductionAmount.toFixed(2)}
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: '#ef4444', fontSize: '0.7rem' }}>
                                            TDS / Admin charge
                                        </Typography>
                                    </Paper>
                                </Grid>
                            )}

                            <Grid item xs={12} sm={isAgent ? 4 : 6}>
                                <Paper sx={{
                                    p: 2,
                                    borderRadius: '12px',
                                    bgcolor: 'rgba(16, 185, 129, 0.12)',
                                    border: '1px solid rgba(16, 185, 129, 0.35)',
                                    textAlign: 'center'
                                }} elevation={0}>
                                    <Typography variant="caption" sx={{ color: '#047857', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                                        Net Payable
                                    </Typography>
                                    <Typography variant="h5" sx={{ color: '#059669', fontWeight: 900, mt: 0.5 }}>
                                        ₹{netPayable.toFixed(2)}
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: '#059669', fontSize: '0.7rem', fontWeight: 600 }}>
                                        Actual amount to pay
                                    </Typography>
                                </Paper>
                            </Grid>
                        </Grid>

                        {/* Balance Strip */}
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            px: 2,
                            py: 1,
                            borderRadius: '10px',
                            bgcolor: '#f1f5f9',
                            border: '1px dashed #cbd5e1'
                        }}>
                            <Typography variant="caption" sx={{ color: '#475569', fontWeight: 500 }}>
                                Available Wallet Balance: <strong>₹{balance?.toFixed(2)}</strong>
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#475569', fontWeight: 500 }}>
                                Balance After Withdrawal: <strong>₹{Math.max(0, balance - grossAmount).toFixed(2)}</strong>
                            </Typography>
                        </Box>

                        {/* User / Agent Information Section */}
                        <Paper sx={{
                            p: 2.5,
                            borderRadius: '12px',
                            bgcolor: '#f8fafc',
                            border: '1px solid #e2e8f0'
                        }} elevation={0}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <PersonIcon sx={{ color: '#6366f1', fontSize: 20 }} />
                                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1e293b' }}>
                                        User Information
                                    </Typography>
                                </Box>
                                <Chip
                                    label={isAgent ? 'Agent' : 'Member'}
                                    size="small"
                                    sx={{
                                        fontWeight: 700,
                                        fontSize: '0.75rem',
                                        bgcolor: isAgent ? 'rgba(99, 102, 241, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                                        color: isAgent ? '#4338ca' : '#047857'
                                    }}
                                />
                            </Box>

                            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 1.5 }}>
                                <Box>
                                    <Typography variant="caption" sx={{ color: '#64748b' }}>User / Member ID</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#1e293b', fontFamily: 'monospace' }}>
                                        {request.member_id}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="caption" sx={{ color: '#64748b' }}>Full Name</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#1e293b' }}>
                                        {userName}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="caption" sx={{ color: '#64748b' }}>Mobile Number</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#334155' }}>
                                        {mobileNo}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="caption" sx={{ color: '#64748b' }}>Request ID</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#64748b', fontSize: '0.8rem' }}>
                                        {request.withdraw_request_id || '-'}
                                    </Typography>
                                </Box>
                            </Box>
                        </Paper>

                        {/* Bank Details Section */}
                        <Paper sx={{
                            p: 2.5,
                            borderRadius: '12px',
                            bgcolor: '#f8fafc',
                            border: '1px solid #e2e8f0'
                        }} elevation={0}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                                <AccountBalanceIcon sx={{ color: '#059669', fontSize: 20 }} />
                                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1e293b' }}>
                                    Bank Details
                                </Typography>
                            </Box>

                            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 1.5 }}>
                                <Box>
                                    <Typography variant="caption" sx={{ color: '#64748b' }}>Bank Name</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#1e293b' }}>
                                        {bankName}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="caption" sx={{ color: '#64748b' }}>Account Holder Name</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#1e293b' }}>
                                        {accountHolder}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="caption" sx={{ color: '#64748b' }}>Account Number</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#1e293b', fontFamily: 'monospace' }}>
                                        {accountNumber}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="caption" sx={{ color: '#64748b' }}>IFSC Code</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#1e293b', fontFamily: 'monospace' }}>
                                        {ifscCode}
                                    </Typography>
                                </Box>
                            </Box>
                        </Paper>

                        {/* Remarks Section */}
                        <Box>
                            <TextField
                                label="Remarks (Optional for Approval / Required for Rejection)"
                                fullWidth
                                size="small"
                                multiline
                                rows={2}
                                value={remarks}
                                onChange={(e) => setRemarks(e.target.value)}
                                placeholder={isAgent ? `e.g. Paid net ₹${netPayable.toFixed(2)} after 10% deduction (₹${deductionAmount.toFixed(2)})` : "Enter payment reference, note, or rejection reason..."}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '10px'
                                    }
                                }}
                            />
                        </Box>
                    </Box>
                )}
            </DialogContent>

            <Divider />

            <DialogActions sx={{ px: 3, py: 2, gap: 1.5, bgcolor: '#f9fafb' }}>
                <Button
                    onClick={() => handleAction('Reject')}
                    color="error"
                    variant="outlined"
                    disabled={processing}
                    sx={{
                        borderRadius: '10px',
                        textTransform: 'none',
                        fontWeight: 600,
                        px: 3,
                        borderColor: '#fca5a5',
                        '&:hover': {
                            borderColor: '#ef4444',
                            bgcolor: '#fef2f2'
                        }
                    }}
                >
                    Reject Request
                </Button>
                <Button
                    onClick={() => handleAction('Pay')}
                    variant="contained"
                    disabled={processing}
                    sx={{
                        borderRadius: '10px',
                        textTransform: 'none',
                        fontWeight: 700,
                        px: 4,
                        bgcolor: '#059669',
                        '&:hover': {
                            bgcolor: '#047857'
                        },
                        boxShadow: '0 4px 12px rgba(5, 150, 105, 0.25)'
                    }}
                >
                    {processing ? <CircularProgress size={22} sx={{ color: 'white' }} /> : `Confirm & Pay ₹${netPayable.toFixed(2)}`}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PayWithdrawalDialog;

