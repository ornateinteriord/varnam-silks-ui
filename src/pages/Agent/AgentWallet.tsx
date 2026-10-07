import { useState } from 'react';
import {
    Box, Typography, Card, CardContent, Button, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Paper, CircularProgress, Alert
} from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import TokenService from '../../queries/token/tokenService';
import { useGetAgentById, useGetAgentCommissionTransactions } from '../../queries/Agent';
import WithdrawMoneyDialog from '../../components/Wallet/WithdrawMoneyDialog';

const AgentWallet = () => {
    const navigate = useNavigate();
    const agentId = TokenService.getMemberId() || '';
    const [withdrawDialogOpen, setWithdrawDialogOpen] = useState(false);
    const [filter, setFilter] = useState<'ALL' | 'WITHDRAWAL' | 'COMMISSION'>('ALL');

    const { data: agentData } = useGetAgentById(agentId);
    const {
        data: transactionsData,
        isLoading: transactionsLoading,
        error: transactionsError
    } = useGetAgentCommissionTransactions(agentId);

    // Get commission balance from commission transactions summary
    const totalBalance = transactionsData?.data?.summary?.availableBalance || 0;

    // Get commission transactions
    const transactions = transactionsData?.data?.transactions || [];

    // Filter transactions based on selection
    const filteredTransactions = transactions.filter((t: any) => {
        const isWd =
            t.account_type === 'WITHDRAWAL' ||
            t.commission_category === 'Withdrawal' ||
            t.type === 'commission_withdrawal' ||
            t.type === 'DEBIT' ||
            t.source === 'Withdrawal' ||
            t.status === 'WITHDRAWN' ||
            Boolean(t.withdraw_request_id);

        if (filter === 'WITHDRAWAL') return isWd;
        if (filter === 'COMMISSION') return !isWd;
        return true;
    });

    const withdrawalCount = transactions.filter((t: any) =>
        t.account_type === 'WITHDRAWAL' ||
        t.commission_category === 'Withdrawal' ||
        t.type === 'commission_withdrawal' ||
        t.type === 'DEBIT' ||
        t.source === 'Withdrawal' ||
        t.status === 'WITHDRAWN' ||
        Boolean(t.withdraw_request_id)
    ).length;

    const commissionCount = transactions.length - withdrawalCount;

    // Format transaction for display
    const formatTransaction = (transaction: any) => {
        const isWithdrawal =
            transaction.account_type === 'WITHDRAWAL' ||
            transaction.category === 'Withdrawal' ||
            transaction.commission_category === 'Withdrawal' ||
            transaction.type === 'DEBIT' ||
            transaction.type === 'commission_withdrawal' ||
            transaction.source === 'Withdrawal' ||
            transaction.status === 'WITHDRAWN' ||
            Boolean(transaction.withdraw_request_id);

        const isCredit = !isWithdrawal && (
            transaction.status === 'CREDITED' ||
            transaction.type === 'CREDIT' ||
            transaction.type === 'commission_received' ||
            transaction.isCredit === true
        );

        const amount = transaction.commission_amount ?? transaction.amount ?? 0;

        let description = transaction.description;
        let category = transaction.commission_category || transaction.category || '';
        let incomeLabel = 'Direct Income';

        if (isWithdrawal) {
            description = transaction.description || 'Commission Withdrawal';
            incomeLabel = 'Commission Withdrawal';
            category = 'Withdrawal';
        } else {
            if (!category) {
                if (description && description.includes('Acc Opening')) {
                    category = 'Acc Opening Comm';
                } else if (description && description.includes('Monthly')) {
                    category = 'Monthly Comm';
                } else {
                    const level = Number(transaction.level) || 1;
                    const rate = Number(transaction.commission_rate) || 0;
                    if (level === 1) {
                        category = rate >= 20 ? 'Acc Opening Comm' : 'Monthly Comm';
                    } else if (level <= 6) {
                        category = rate >= 5 ? 'Acc Opening Comm' : 'Monthly Comm';
                    } else {
                        category = rate >= 2 ? 'Acc Opening Comm' : 'Monthly Comm';
                    }
                }
            }

            incomeLabel = (transaction.level === 1 || transaction.level === '1')
                ? 'Direct Income'
                : (transaction.level ? `Level ${transaction.level} Income` : 'Direct Income');

            description = `${incomeLabel} (${category})`;
        }

        const userId = transaction.source_id || transaction.member_id || (isWithdrawal ? (transaction.beneficiary_id || agentId) : '');
        const userName = transaction.source_name || transaction.member_name || (isWithdrawal ? (transaction.beneficiary_name || agentData?.data?.name || '') : '');

        return {
            id: transaction._id || transaction.transaction_id || transaction.withdraw_request_id,
            date: new Date(transaction.createdAt || transaction.transaction_date || transaction.date).toLocaleDateString('en-IN'),
            description,
            incomeLabel,
            category,
            amount: `${isCredit ? '+ ' : '- '}₹${Math.abs(amount).toFixed(2)}`,
            status: transaction.status || 'Completed',
            isCredit,
            type: isCredit ? 'commission_received' : 'commission_withdrawal',
            userId: userId || '-',
            userName: userName || ''
        };
    };

    const getStatusBadge = (status: string) => {
        const s = (status || '').toUpperCase();
        if (s === 'COMPLETED' || s === 'SUCCESS' || s === 'CREDITED') {
            return {
                bg: '#dcfce7',
                color: '#166534',
                label: status === 'CREDITED' ? 'Credited' : 'Completed'
            };
        }
        if (s === 'PENDING') {
            return {
                bg: '#fef9c3',
                color: '#854d0e',
                label: 'Pending'
            };
        }
        if (s === 'WITHDRAWN') {
            return {
                bg: '#e0e7ff',
                color: '#3730a3',
                label: 'Withdrawn'
            };
        }
        if (s === 'REJECTED') {
            return {
                bg: '#fee2e2',
                color: '#991b1b',
                label: 'Rejected'
            };
        }
        return {
            bg: '#f3f4f6',
            color: '#374151',
            label: status
        };
    };

    return (
        <Box sx={{ p: { xs: 2, sm: 3 }, mt: { xs: 2, sm: 8 } }}>
            {/* Back Button */}
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/agent/dashboard')}
                sx={{
                    mb: 3,
                    color: '#667EEA',
                    fontWeight: 600,
                    '&:hover': {
                        bgcolor: 'rgba(102, 126, 234, 0.08)'
                    }
                }}
            >
                Back to Dashboard
            </Button>

            {/* Header */}
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: '#1f2937' }}>
                Agent Wallet
            </Typography>

            {/* Welcome Text */}
            <Typography variant="body1" sx={{ mb: 3, color: '#6b7280' }}>
                Welcome, {agentData?.data?.name || 'Agent'}. Manage your commission balance and withdrawals here.
            </Typography>

            {/* Balance Section */}
            <Card sx={{
                mb: 4,
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #667EEA 0%, #5B21B6 100%)',
                color: 'white',
                boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)'
            }}>
                <CardContent sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    p: 4
                }}>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle1" sx={{ opacity: 0.8 }}>
                            Commission Balance
                        </Typography>
                        {transactionsLoading ? (
                            <CircularProgress size={40} sx={{ color: 'white', mt: 1 }} />
                        ) : (
                            <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                                ₹{totalBalance.toFixed(2)}
                            </Typography>
                        )}
                        <Typography variant="body2" sx={{ opacity: 0.7 }}>
                            Available for withdrawal
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2, mt: { xs: 3, md: 0 } }}>
                        <Button
                            variant="contained"
                            startIcon={<AccountBalanceWalletIcon />}
                            onClick={() => setWithdrawDialogOpen(true)}
                            sx={{
                                bgcolor: 'rgba(255,255,255,0.2)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: '12px',
                                px: 4,
                                py: 1.5,
                                fontWeight: 600,
                                textTransform: 'none',
                                fontSize: '1rem',
                                '&:hover': {
                                    bgcolor: 'rgba(255,255,255,0.3)',
                                    transform: 'scale(1.02)'
                                }
                            }}
                        >
                            Withdraw
                        </Button>
                    </Box>
                </CardContent>
            </Card>

            {/* Commission & Withdrawal Transactions Section */}
            <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'space-between',
                alignItems: { xs: 'flex-start', sm: 'center' },
                mb: 3,
                gap: 2
            }}>
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#374151' }}>
                        Recent Transactions
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#6b7280' }}>
                        Showing commission received and withdrawal requests with status
                    </Typography>
                </Box>
                {/* Filter Controls */}
                <Box sx={{
                    display: 'flex',
                    gap: 1,
                    bgcolor: '#f3f4f6',
                    p: 0.5,
                    borderRadius: '10px'
                }}>
                    <Button
                        size="small"
                        onClick={() => setFilter('ALL')}
                        sx={{
                            borderRadius: '8px',
                            px: 1.5,
                            py: 0.5,
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            textTransform: 'none',
                            bgcolor: filter === 'ALL' ? '#667EEA' : 'transparent',
                            color: filter === 'ALL' ? '#ffffff' : '#6b7280',
                            '&:hover': {
                                bgcolor: filter === 'ALL' ? '#5a6fd1' : 'rgba(0,0,0,0.04)'
                            }
                        }}
                    >
                        All ({transactions.length})
                    </Button>
                    <Button
                        size="small"
                        onClick={() => setFilter('WITHDRAWAL')}
                        sx={{
                            borderRadius: '8px',
                            px: 1.5,
                            py: 0.5,
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            textTransform: 'none',
                            bgcolor: filter === 'WITHDRAWAL' ? '#667EEA' : 'transparent',
                            color: filter === 'WITHDRAWAL' ? '#ffffff' : '#6b7280',
                            '&:hover': {
                                bgcolor: filter === 'WITHDRAWAL' ? '#5a6fd1' : 'rgba(0,0,0,0.04)'
                            }
                        }}
                    >
                        Withdrawals ({withdrawalCount})
                    </Button>
                    <Button
                        size="small"
                        onClick={() => setFilter('COMMISSION')}
                        sx={{
                            borderRadius: '8px',
                            px: 1.5,
                            py: 0.5,
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            textTransform: 'none',
                            bgcolor: filter === 'COMMISSION' ? '#667EEA' : 'transparent',
                            color: filter === 'COMMISSION' ? '#ffffff' : '#6b7280',
                            '&:hover': {
                                bgcolor: filter === 'COMMISSION' ? '#5a6fd1' : 'rgba(0,0,0,0.04)'
                            }
                        }}
                    >
                        Commission ({commissionCount})
                    </Button>
                </Box>
            </Box>

            {transactionsLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                    <CircularProgress sx={{ color: '#667EEA' }} />
                </Box>
            ) : transactionsError ? (
                <Alert severity="info" sx={{ borderRadius: '12px' }}>
                    No commission transactions found yet. Your commission history will appear here.
                </Alert>
            ) : filteredTransactions.length === 0 ? (
                <Paper sx={{ p: 4, textAlign: 'center', borderRadius: '12px', bgcolor: '#f9fafb' }}>
                    <AccountBalanceWalletIcon sx={{ fontSize: 48, color: '#9ca3af', mb: 2 }} />
                    <Typography variant="body1" color="text.secondary">
                        {filter === 'WITHDRAWAL' ? 'No withdrawal requests yet' : filter === 'COMMISSION' ? 'No commission earnings yet' : 'No transactions yet'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Your commission earnings and withdrawal transactions with their status will appear here
                    </Typography>
                </Paper>
            ) : (
                <TableContainer component={Paper} sx={{
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    border: '1px solid rgba(102, 126, 234, 0.1)'
                }}>
                    <Table>
                        <TableHead sx={{ bgcolor: 'rgba(102, 126, 234, 0.05)' }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold', color: '#374151' }}>Date</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: '#374151' }}>User ID (Username)</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: '#374151' }}>Description</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: '#374151' }}>Amount</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: '#374151' }}>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredTransactions.map((transaction: any) => {
                                const formatted = formatTransaction(transaction);
                                const badge = getStatusBadge(formatted.status);
                                return (
                                    <TableRow key={formatted.id} hover sx={{
                                        '&:hover': { bgcolor: 'rgba(102, 126, 234, 0.02)' }
                                    }}>
                                        <TableCell>{formatted.date}</TableCell>
                                        <TableCell>
                                            {formatted.userId !== '-' ? (
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexWrap: 'wrap' }}>
                                                    <Typography component="span" sx={{ fontWeight: 600, color: '#1f2937', fontSize: '0.875rem' }}>
                                                        {formatted.userId}
                                                    </Typography>
                                                    {formatted.userName ? (
                                                        <Typography component="span" sx={{ color: '#4b5563', fontSize: '0.875rem' }}>
                                                            ({formatted.userName})
                                                        </Typography>
                                                    ) : null}
                                                </Box>
                                            ) : (
                                                <Typography variant="body2" sx={{ color: '#9ca3af' }}>-</Typography>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                                                <Typography component="span" sx={{ fontWeight: 500, color: '#374151', fontSize: '0.875rem' }}>
                                                    {formatted.incomeLabel}
                                                </Typography>
                                                {formatted.category && formatted.category !== 'Withdrawal' && (
                                                    <Box sx={{
                                                        display: 'inline-block',
                                                        px: 1,
                                                        py: 0.25,
                                                        borderRadius: '6px',
                                                        fontSize: '0.72rem',
                                                        fontWeight: 600,
                                                        bgcolor: formatted.category === 'Acc Opening Comm' ? 'rgba(79, 70, 229, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                                                        color: formatted.category === 'Acc Opening Comm' ? '#4f46e5' : '#059669',
                                                        border: formatted.category === 'Acc Opening Comm' ? '1px solid rgba(79, 70, 229, 0.2)' : '1px solid rgba(16, 185, 129, 0.2)',
                                                    }}>
                                                        {formatted.category}
                                                    </Box>
                                                )}
                                            </Box>
                                        </TableCell>
                                        <TableCell sx={{
                                            fontWeight: 'bold',
                                            color: formatted.isCredit ? '#16a34a' : '#dc2626'
                                        }}>
                                            {formatted.amount}
                                        </TableCell>
                                        <TableCell>
                                            <Box sx={{
                                                display: 'inline-block',
                                                px: 1.5,
                                                py: 0.5,
                                                borderRadius: '6px',
                                                fontSize: '0.75rem',
                                                fontWeight: 'bold',
                                                bgcolor: badge.bg,
                                                color: badge.color,
                                            }}>
                                                {badge.label}
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {/* Withdraw Dialog */}
            <WithdrawMoneyDialog
                open={withdrawDialogOpen}
                onClose={() => setWithdrawDialogOpen(false)}
                isCommission={true}
                availableBalance={totalBalance}
            />
        </Box>
    );
};

export default AgentWallet;
