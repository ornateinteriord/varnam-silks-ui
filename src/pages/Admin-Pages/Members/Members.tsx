import DataTable from 'react-data-table-component';
import {
  Card, CardContent, Accordion, AccordionSummary, AccordionDetails,
  TextField, Typography, Button, Grid, CircularProgress,
  Dialog, DialogTitle, DialogContent, DialogActions,
  Box, Divider,
  FormControl, Select, MenuItem, InputLabel,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CheckCircle, WarningAmber } from '@mui/icons-material';
import { DASHBOARD_CUTSOM_STYLE, getMembersColumns, getPendingMembersColumns, getPermissionsColumns } from '../../../utils/DataTableColumnsProvider';
import './Members.scss'
import { MuiDatePicker } from '../../../components/common/DateFilterComponent';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useGetAllMembersDetails, useUpdateMemberStatus, useImpersonate } from '../../../api/Admin';
import { useNavigate } from 'react-router-dom';
import useSearch from '../../../hooks/SearchQuery';
import { useActivatePackage } from '../../../api/Memeber';

interface MemberTableProps {
  title: string;
  summaryTitle: string;
  data: any[];
  showEdit?: boolean;
  showView?: boolean;
  showActivate?: boolean;
  isLoading?: boolean;
  onActivate?: (member: any) => void;
  isActivating?: boolean;
  showDashboard?: boolean;
}

const MemberTable = ({
  title,
  summaryTitle,
  data,
  showEdit = false,
  showView = false,
  showActivate = false,
  isLoading = false,
  onActivate,
  isActivating = false,
  showDashboard = false
}: MemberTableProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [fromDate, setFromDate] = useState<string | null>(null);
  const [toDate, setToDate] = useState<string | null>(null);
  const { searchQuery, setSearchQuery, filteredData } = useSearch(data)

  const [dashboardDialogOpen, setDashboardDialogOpen] = useState(false);
  const [memberToImpersonate, setMemberToImpersonate] = useState<any>(null);
  const { mutate: impersonate, isPending: isImpersonating } = useImpersonate();

  const navigate = useNavigate()

  const handleDashboardClick = (member: any) => {
    setMemberToImpersonate(member);
    setDashboardDialogOpen(true);
  };

  const confirmImpersonation = () => {
    if (!memberToImpersonate) return;

    impersonate(memberToImpersonate.Member_id, {
      onSuccess: (response) => {
        if (response.success && response.token) {
          setDashboardDialogOpen(false);
          // Open the impersonation route in a new tab with the token
          const url = `${window.location.origin}/impersonate?token=${response.token}`;
          window.open(url, '_blank');
          setMemberToImpersonate(null);
        }
      }
    });
  };

  const handleEditClick = (memberId: string) => {
    setIsEdit(true);
    setSelectedMemberId(memberId);
  };

  const handleViewClick = (memberId: string) => {
    navigate(`/admin/members/${memberId}`);
  };

  const handleActivateClick = (member: any) => {
    if (onActivate) {
      onActivate(member);
    }
  };

  useEffect(() => {
    if (isEdit) {
      navigate(`/admin/members/${selectedMemberId}`)
    }
  }, [isEdit])

  // Determine which columns to use based on props
  const getColumns = () => {
    if (showActivate && onActivate) {
      return getPendingMembersColumns(handleActivateClick, isActivating);
    } else {
      return getMembersColumns(
        showEdit, 
        handleEditClick, 
        showView ? handleViewClick : undefined, 
        showDashboard ? handleDashboardClick : undefined
      );
    }
  };

  return (
    <>
      <Grid className="filter-container" sx={{ margin: '2rem', mt: 2 }}>
        <Typography variant="h4">
          {title}
        </Typography>
        <Grid className="filter-actions" >
          <MuiDatePicker date={fromDate} setDate={setFromDate} label="From Date" />
          <MuiDatePicker date={toDate} setDate={setToDate} label="To Date" />
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#0a2558',
              '&:hover': { backgroundColor: '#0a2558' }
            }}
          >
            Search
          </Button>
        </Grid>
      </Grid>
      <Card sx={{ margin: '2rem', mt: 2 }}>
        <CardContent>
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                backgroundColor: '#0a2558',
                color: '#fff',
                '& .MuiSvgIcon-root': { color: '#fff' }
              }}
            >
              {summaryTitle}
            </AccordionSummary>
            <AccordionDetails>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginBottom: '1rem' }}>
                <TextField
                  size="small"
                  placeholder="Search..."
                  sx={{ minWidth: 200 }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <DataTable
                columns={getColumns()}
                data={filteredData}
                pagination
                customStyles={DASHBOARD_CUTSOM_STYLE}
                paginationPerPage={25}
                progressPending={isLoading}
                progressComponent={
                  <CircularProgress size={"4rem"} sx={{ color: "#0a2558" }} />
                }
                paginationRowsPerPageOptions={[25, 50, 100]}
                highlightOnHover
              />
            </AccordionDetails>
          </Accordion>
        </CardContent>
      </Card>

      {/* ── Go to Dashboard Confirmation Dialog ── */}
      <Dialog
        open={dashboardDialogOpen}
        onClose={() => !isImpersonating && setDashboardDialogOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: { borderRadius: '16px', p: 1 }
        }}
      >
        <DialogTitle sx={{ fontWeight: 700, color: '#0a2558', pb: 1 }}>
          Go to Dashboard?
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ color: '#555', mb: 2 }}>
            Do you want to open the dashboard for member <strong>{memberToImpersonate?.Name} ({memberToImpersonate?.Member_id})</strong> in a new tab?
          </Typography>
          <Typography variant="caption" color="text.secondary">
            This will allow you to view the application as this member.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
          <Button
            onClick={() => setDashboardDialogOpen(false)}
            disabled={isImpersonating}
            variant="outlined"
            sx={{ borderRadius: '8px', textTransform: 'none' }}
          >
            Cancel
          </Button>
          <Button
            onClick={confirmImpersonation}
            disabled={isImpersonating}
            variant="contained"
            sx={{
              backgroundColor: '#0a2558',
              '&:hover': { backgroundColor: '#081d47' },
              borderRadius: '8px',
              textTransform: 'none',
              px: 3
            }}
          >
            {isImpersonating ? <CircularProgress size={20} color="inherit" /> : 'Go to Dashboard'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

interface Member {
  Member_id: string;
  Date_of_joining: string;
  password: string;
  Sponsor_name: number | string;
  spackage: number | string;
  mobileno: number | string;
  status: string;
  Name: string;
  package_value?: number | string;
}

type status = "All" | "active" | "Inactive" | "Pending";

const useMembers = (status: status) => {
  const { data: members, isLoading, isError, error } = useGetAllMembersDetails()

  useEffect(() => {
    if (isError) {
      const err = error as any;
      toast.error(
        err?.response.data.message || "Failed to fetch Transaction details"
      );
    }
  }, [isError, error]);

  const memberdata = Array.isArray(members)
    ? members.filter((member: Member) => (status === "All" ? true : member.status === status)).map((member: Member, index) => ({
      ...member,
      sNo: index + 1,
    }))
    : [];

  return { memberdata, isLoading };
};

export const Members = () => {
  const { memberdata, isLoading } = useMembers("All");
  return (
    <MemberTable
      title="Members"
      summaryTitle="List of All Members"
      showEdit
      showView
      data={memberdata}
      isLoading={isLoading}
    />
  );
};

export const ActiveMembers = () => {
  const { memberdata, isLoading } = useMembers("active")
  return (
    <MemberTable
      title="Active Members"
      summaryTitle="List of Active Members"
      showView
      showDashboard
      data={memberdata}
      isLoading={isLoading}
    />
  )
}

export const InActiveMembers = () => {
  const { memberdata, isLoading } = useMembers("Inactive")
  return (
    <MemberTable
      title="Inactive Members"
      summaryTitle="List of Inactive Members"
      showView
      data={memberdata}
      isLoading={isLoading}
    />
  )
}

export const PendingMembers = () => {
  const { memberdata, isLoading } = useMembers("Pending");
  const { mutate: activatePackage, isPending: isActivating } = useActivatePackage();


  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [packageAmount, setPackageAmount] = useState<string>('');
  const [activationType, setActivationType] = useState<'with' | 'without'>('with');

  const handleActivateClick = (member: any) => {
    setSelectedMember(member);
    // Determine the existing package amount to pre-fill
    let initialPackage = '';
    const amt = member?.amount || member?.plan_amount || member?.package_value || member?.spackage;
    const dur = member?.duration;
    
    if (amt && dur) {
      initialPackage = `${amt}_${dur}`;
    } else if (amt && !dur) {
      // If we only have amount, try to guess duration or let user choose
      initialPackage = `${amt}_12`;
    }
    
    setPackageAmount(initialPackage);
    setActivationType('with');
    setDialogOpen(true);
  };

  const handleConfirm = () => {
    if (!selectedMember) return;

    const mId = selectedMember.member_id || selectedMember.Member_id;

    if (activationType === 'without') {
      activatePackage(
        { memberId: mId, packageType: 'NONE' },
        {
          onSuccess: () => {
            setDialogOpen(false);
            setSelectedMember(null);
            setPackageAmount('');
            toast.success(`${selectedMember.Name} activated successfully without a package.`);
          },
          onError: () => {
            setDialogOpen(false);
          },
        }
      );
      return;
    }

    if (!packageAmount) {
      toast.error('Please select a valid package amount.');
      return;
    }

    const packageType = packageAmount;

    activatePackage(
      { memberId: mId, packageType },
      {
        onSuccess: () => {
          // if (response.success) {
          //   toast.success(`${selectedMember.Name} activated successfully!`);
          // }
          setDialogOpen(false);
          setSelectedMember(null);
          setPackageAmount('');
        },
        onError: () => {
          setDialogOpen(false);
        },
      }
    );
  };

  const primaryColor = '#0a2558';

  return (
    <>
      <MemberTable
        title="Pending Members"
        summaryTitle="List of Pending Members"
        data={memberdata}
        showActivate={true}
        isLoading={isLoading}
        onActivate={handleActivateClick}
        isActivating={isActivating}
      />

      {/* ── Activation Confirmation Dialog ── */}
      <Dialog
        open={dialogOpen}
        onClose={() => !isActivating && setDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ backgroundColor: primaryColor, color: '#fff', fontWeight: 600 }}>
          Confirm Member Activation
        </DialogTitle>

        <DialogContent sx={{ pt: 3 }}>
          {/* Member Details */}
          <Box sx={{ backgroundColor: '#f5f7fa', borderRadius: 2, p: 2, mb: 3 }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Member Details
            </Typography>
            <Divider sx={{ mb: 1.5 }} />
            <Grid container spacing={1.5}>
              <Grid item xs={6}>
                <Typography variant="caption" color="text.secondary">Member ID</Typography>
                <Typography variant="body2" fontWeight={600}>{selectedMember?.Member_id || selectedMember?.member_id}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" color="text.secondary">Name</Typography>
                <Typography variant="body2" fontWeight={600}>{selectedMember?.Name || selectedMember?.name}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" color="text.secondary">Mobile</Typography>
                <Typography variant="body2" fontWeight={600}>{selectedMember?.mobileno || selectedMember?.contactno}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" color="text.secondary">Package Amount</Typography>
                <Typography variant="body2" fontWeight={600}>
                  {selectedMember?.package_value
                    ? `₹${selectedMember.package_value}`
                    : selectedMember?.spackage
                      ? `₹${selectedMember.spackage}`
                      : selectedMember?.plan_amount
                        ? `₹${selectedMember.plan_amount}`
                        : selectedMember?.amount
                          ? `₹${selectedMember.amount}${selectedMember.duration ? ` - ${selectedMember.duration} Months` : ''}`
                          : '-'}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" color="text.secondary">Sponsor</Typography>
                <Typography variant="body2" fontWeight={600}>{selectedMember?.Sponsor_name || selectedMember?.introducer_name || '-'}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption" color="text.secondary">Current Status</Typography>
                <Typography variant="body2" fontWeight={600} sx={{ color: '#FFC000' }}>
                  {selectedMember?.status || selectedMember?.STATUS}
                </Typography>
              </Grid>
            </Grid>
          </Box>

          {/* Activation Type Selection */}
          {/* <FormControl component="fieldset" sx={{ mb: 3 }}>
            <FormLabel component="legend" sx={{ fontWeight: 600, color: primaryColor, mb: 1 }}>Activation Type</FormLabel>
            <RadioGroup
              row
              value={activationType}
              onChange={(e) => setActivationType(e.target.value as 'with' | 'without')}
            >
              <FormControlLabel
                value="with"
                control={<Radio sx={{ color: primaryColor, '&.Mui-checked': { color: primaryColor } }} />}
                label={<Typography variant="body2" fontWeight={600}>With Package</Typography>}
              />
              <FormControlLabel
                value="without"
                control={<Radio sx={{ color: primaryColor, '&.Mui-checked': { color: primaryColor } }} />}
                label={<Typography variant="body2" fontWeight={600}>Without Package</Typography>}
              />
            </RadioGroup>
          </FormControl> */}

          {/* Select Package Amount Entry */}
          {activationType === 'with' && (
            <FormControl fullWidth>
              <InputLabel id="package-amount-select-label" sx={{ '&.Mui-focused': { color: primaryColor } }}>Package Amount</InputLabel>
              <Select
                labelId="package-amount-select-label"
                value={packageAmount}
                label="Package Amount"
                onChange={(e) => setPackageAmount(e.target.value as string)}
                sx={{
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: primaryColor },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: primaryColor }
                }}
              >
                <MenuItem value="1000_12">1000 - 12 Months (Maturity: ₹14,000)</MenuItem>
                <MenuItem value="1000_18">1000 - 18 Months (Maturity: ₹21,000)</MenuItem>
                <MenuItem value="1000_24">1000 - 24 Months (Maturity: ₹28,000)</MenuItem>
                <MenuItem value="2000_12">2000 - 12 Months (Maturity: ₹28,000)</MenuItem>
                <MenuItem value="2000_18">2000 - 18 Months (Maturity: ₹42,000)</MenuItem>
                <MenuItem value="2000_24">2000 - 24 Months (Maturity: ₹56,000)</MenuItem>
                <MenuItem value="3000_12">3000 - 12 Months (Maturity: ₹42,000)</MenuItem>
                <MenuItem value="3000_18">3000 - 18 Months (Maturity: ₹63,000)</MenuItem>
                <MenuItem value="3000_24">3000 - 24 Months (Maturity: ₹84,000)</MenuItem>
              </Select>
              <Typography variant="caption" sx={{ mt: 1, ml: 1.5, color: 'text.secondary' }}>
                Select the package amount to activate this member
              </Typography>
            </FormControl>
          )}

        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
          <Button
            onClick={() => setDialogOpen(false)}
            disabled={isActivating}
            variant="outlined"
            sx={{ borderColor: '#ccc', color: '#555' }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={isActivating}
            variant="contained"
            startIcon={isActivating ? <CircularProgress size={18} sx={{ color: '#fff' }} /> : <CheckCircle />}
            sx={{
              backgroundColor: primaryColor,
              '&:hover': { backgroundColor: '#081d47' },
              '&:disabled': { backgroundColor: '#ccc' },
            }}
          >
            {isActivating ? 'Activating...' : 'Confirm Activation'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export const PermissionsMembers = () => {
  const { data: members, isLoading } = useGetAllMembersDetails();
  const { mutate: updateStatus, isPending: isUpdating } = useUpdateMemberStatus();

  // Confirmation dialog state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<{ id: string, name: string, currentStatus: string } | null>(null);

  const handleToggleClick = (memberId: string, currentStatus: string, name: string) => {
    setSelectedMember({ id: memberId, name: name, currentStatus });
    setConfirmOpen(true);
  };

  const handleConfirmToggle = () => {
    if (!selectedMember) return;

    const isActive = selectedMember.currentStatus.toLowerCase() === 'active';
    const newStatus = isActive ? 'Inactive' : 'Active';

    // Use upgrade_status for this specific ROI permissions page
    updateStatus({ memberId: selectedMember.id, upgrade_status: newStatus }, {
      onSuccess: () => {
        toast.success(`Member ${newStatus === 'Active' ? 'activated' : 'inactive'} success`);
        setConfirmOpen(false);
        setSelectedMember(null);
      },
      onError: () => {
        setConfirmOpen(false);
      }
    });
  };

  // Update handleToggleStatus wrapper for the column definition
  const onToggleRequest = (memberId: string, currentStatus: string) => {
    const member = filteredData.find(m => m.Member_id === memberId);
    handleToggleClick(memberId, currentStatus, member?.Name || 'Member');
  };

  // Filter members who are "ROI Active" (have a package)
  const filteredData = Array.isArray(members)
    ? members.filter((member: any) => member.upgrade_status === 'Active' || member.upgrade_status === 'Inactive' || member.package_value > 0)
      .map((member: any, index: number) => ({
        ...member,
        sNo: index + 1,
      }))
    : [];

  return (
    <>
      <Grid className="filter-container" sx={{ margin: '2rem', mt: 2 }}>
        <Typography variant="h4">Member Permissions</Typography>
      </Grid>
      <Card sx={{ margin: '2rem', mt: 2 }}>
        <CardContent>
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                backgroundColor: '#0a2558',
                color: '#fff',
                '& .MuiSvgIcon-root': { color: '#fff' }
              }}
            >
              List of ROI Active Members
            </AccordionSummary>
            <AccordionDetails>
              <DataTable
                columns={getPermissionsColumns(onToggleRequest, isUpdating)}
                data={filteredData}
                pagination
                customStyles={DASHBOARD_CUTSOM_STYLE}
                paginationPerPage={25}
                progressPending={isLoading}
                progressComponent={
                  <CircularProgress size={"4rem"} sx={{ color: "#0a2558" }} />
                }
                paginationRowsPerPageOptions={[25, 50, 100]}
                highlightOnHover
              />
            </AccordionDetails>
          </Accordion>
        </CardContent>
      </Card>

      {/* ── Status Toggle Confirmation Dialog (Modern) ── */}
      <Dialog
        open={confirmOpen}
        onClose={() => !isUpdating && setConfirmOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '20px',
            padding: '16px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            overflow: 'visible'
          }
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', py: 2 }}>
          {/* Top Icon Circle */}
          <Box sx={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 3,
            backgroundColor: selectedMember?.currentStatus.toLowerCase() === 'active' ? '#fff0f0' : '#f0fff4',
            color: selectedMember?.currentStatus.toLowerCase() === 'active' ? '#ff4d4d' : '#2ecc71',
            boxShadow: '0 10px 20px rgba(0,0,0,0.05)'
          }}>
            {selectedMember?.currentStatus.toLowerCase() === 'active' ?
              <WarningAmber sx={{ fontSize: '40px' }} /> :
              <CheckCircle sx={{ fontSize: '40px' }} />
            }
          </Box>

          <Typography variant="h5" sx={{ fontWeight: 700, color: '#1a237e', mb: 1.5 }}>
            {selectedMember?.currentStatus.toLowerCase() === 'active' ? 'Inactive Member?' : 'Active Member?'}
          </Typography>

          <Typography variant="body1" sx={{ color: '#5f6368', px: 2, mb: 4, lineHeight: 1.6 }}>
            Are you sure you want to {selectedMember?.currentStatus.toLowerCase() === 'active' ? 'Inactive' : 'Active'}{' '}
            this member <strong>{selectedMember?.name}</strong>?
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, width: '100%', px: 2 }}>
            <Button
              fullWidth
              onClick={() => setConfirmOpen(false)}
              disabled={isUpdating}
              variant="outlined"
              sx={{
                borderRadius: '12px',
                py: 1.5,
                textTransform: 'none',
                fontWeight: 600,
                borderColor: '#e0e0e0',
                color: '#5f6368',
                '&:hover': { backgroundColor: '#f8f9fa', borderColor: '#d0d0d0' }
              }}
            >
              No, Keep it
            </Button>
            <Button
              fullWidth
              onClick={handleConfirmToggle}
              disabled={isUpdating}
              variant="contained"
              sx={{
                borderRadius: '12px',
                py: 1.5,
                textTransform: 'none',
                fontWeight: 600,
                boxShadow: 'none',
                backgroundColor: selectedMember?.currentStatus === 'active' ? '#ff4d4d' : '#2ecc71',
                '&:hover': {
                  backgroundColor: selectedMember?.currentStatus === 'active' ? '#e60000' : '#27ae60',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                }
              }}
            >
              {isUpdating ? <CircularProgress size={24} color="inherit" /> : `Yes, ${selectedMember?.currentStatus === 'active' ? 'Disable' : 'Enable'}`}
            </Button>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

export default Members;

