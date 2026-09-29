import React, { useMemo } from 'react';
import {
  Box,
  Button,
  Chip,
  Typography
} from '@mui/material';
import { useSearchParams, useNavigate } from 'react-router-dom';
import AdminReusableTable, { ColumnDefinition } from '../../utils/AdminReusableTable';
import { useGetAssignedAccounts } from '../../queries/Agent';
import TokenService from '../../queries/token/tokenService';
import { AssignedAccount } from '../../types';

const Collections: React.FC = () => {
  const agentId = TokenService.getMemberId();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const typeFilter = searchParams.get('type');

  // const [openDialog, setOpenDialog] = useState(false);
  // const [selectedAccount, setSelectedAccount] = useState<AssignedAccount | null>(null);
  // const [amount, setAmount] = useState('');

  const { data, isLoading } = useGetAssignedAccounts(agentId || '', !!agentId);
  // const collectPaymentMutation = useCollectPayment(agentId || '');

  const allAccounts = Array.isArray(data?.data) ? data.data : [];

  // Filter accounts by type if filter is specified in URL
  const accounts = useMemo(() => {
    if (!typeFilter) return allAccounts;
    return allAccounts.filter((acc: AssignedAccount) => acc.account_type === typeFilter);
  }, [allAccounts, typeFilter]);

  // const handleOpenDialog = (account: AssignedAccount) => {
  //   setSelectedAccount(account);
  //   setOpenDialog(true);
  //   setAmount('');
  // };

  // const handleCloseDialog = () => {
  //   setOpenDialog(false);
  //   setSelectedAccount(null);
  //   setAmount('');
  // };

  // const handleCollect = async () => {
  //   if (!selectedAccount || !amount || !selectedAccount.account_id) return;
  //   try {
  //     const response = await collectPaymentMutation.mutateAsync({
  //       accountId: selectedAccount.account_id,
  //       amount: parseFloat(amount)
  //     });
  //     if (response.success) {
  //       toast.success(`Successfully collected ₹${amount} from ${selectedAccount.account_holder}`);
  //       handleCloseDialog();
  //     } else {
  //       toast.error(response.message || 'Failed to collect payment');
  //     }
  //   } catch (error: any) {
  //     toast.error(error?.response?.data?.message || 'Failed to collect payment');
  //     console.error('Collection error:', error);
  //   }
  // };

  const columns: ColumnDefinition<AssignedAccount>[] = [
    {
      id: 'date_of_opening',
      label: 'Date Of Opening',
      sortable: true,
      renderCell: (row) => {
        if (!row.date_of_opening) return '-';
        const date = new Date(row.date_of_opening);
        return date.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        });
      },
    },
    {
      id: 'account_no',
      label: 'Account No',
      sortable: true,
    },
    {
      id: 'member_id',
      label: 'Member ID',
      sortable: true,
      renderCell: (row) => row.member_id || '-',
    },
    {
      id: 'account_holder',
      label: 'Account Holder',
      sortable: true,
    },
    {
      id: 'account_type',
      label: 'Account Type',
      sortable: true,
      renderCell: (row) => (
        <Chip
          label={row.account_type || '-'}
          size="small"
          sx={{
            backgroundColor: '#e0e7ff',
            color: '#4338ca',
            fontWeight: 600,
            borderRadius: 1,
          }}
        />
      ),
    },
    {
      id: 'date_of_maturity',
      label: 'Date Of Maturity',
      sortable: true,
      renderCell: (row) => {
        if (!row.date_of_maturity) return '-';
        const date = new Date(row.date_of_maturity);
        return date.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        });
      },
    },
    {
      id: 'balance',
      label: 'Balance',
      align: 'right',
      sortable: true,
      renderCell: (row) => `₹ ${row.balance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    },
    {
      id: 'status',
      label: 'Status',
      sortable: true,
      renderCell: (row) => {
        const status = row.status.toLowerCase();
        return (
          <Chip
            label={row.status}
            size="small"
            sx={{
              backgroundColor:
                status === 'active' ? '#d1fae5' :
                  status === 'pending' ? '#fef3c7' :
                    '#f1f5f9',
              color:
                status === 'active' ? '#065f46' :
                  status === 'pending' ? '#92400e' :
                    '#64748b',
              fontWeight: 500,
              borderRadius: 1,
              textTransform: 'capitalize',
            }}
          />
        );
      },
    },
    // {
    //   id: 'account_id',
    //   label: 'Action',
    //   align: 'center',
    //   renderCell: (row) => (
    //     row.account_type === 'Member Profile' ? (
    //       <Chip label="Profile Only" size="small" variant="outlined" />
    //     ) : (
    //       <Button
    //         variant="contained"
    //         size="small"
    //         sx={{
    //           textTransform: 'none',
    //           background: 'linear-gradient(135deg, #16a34a 0%, #22c55e 100%)',
    //           '&:hover': {
    //             background: 'linear-gradient(135deg, #15803d 0%, #16a34a 100%)',
    //           },
    //         }}
    //         onClick={(e) => {
    //           e.stopPropagation();
    //           handleOpenDialog(row);
    //         }}
    //       >
    //         Collect
    //       </Button>
    //     )
    //   ),
    // },
  ];

  return (
    <>
      <Box sx={{ mt: 10, px: 3, pb: 4 }}>
        {/* Filter Header */}
        {typeFilter && (
          <Box sx={{
            mb: 2,
            p: 2,
            borderRadius: 2,
            background: 'linear-gradient(135deg, #667EEA 0%, #818CF8 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography sx={{ color: 'white', fontWeight: 500 }}>
                Showing accounts for:
              </Typography>
              <Chip
                label={typeFilter}
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  color: '#4338ca',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                }}
              />
            </Box>
            <Button
              variant="contained"
              size="small"
              onClick={() => navigate('/agent/collections')}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.3)',
                },
              }}
            >
              Show All Accounts
            </Button>
          </Box>
        )}

        <AdminReusableTable
          columns={columns}
          data={accounts}
          title={typeFilter ? `${typeFilter} Accounts` : 'List Of Members'}
          isLoading={isLoading}
          emptyMessage={typeFilter ? `No ${typeFilter} accounts found` : 'No assigned accounts found'}
          onExport={() => {
            // TODO: Implement export functionality if needed
            console.log('Export accounts');
          }}
        />
      </Box>
    </>
  );
};

export default Collections;
