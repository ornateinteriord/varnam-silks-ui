import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  CardContent,
  Tab,
  Tabs,
  TextField,
  Typography,
  Button,
  Chip,
  Stack,
} from "@mui/material";
import { useState } from "react";
import "./Payout.scss";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DataTable from "react-data-table-component";
import { DASHBOARD_CUTSOM_STYLE } from "../../../utils/DataTableColumnsProvider";
import { useGetWithdrawalRequests } from "../../../queries/admin/withdrawal";
import PayWithdrawalDialog from "../Withdrawal/PayWithdrawalDialog";

const Payout = () => {
  const [value, setValue] = useState(0);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handlePayClick = (request: any) => {
    setSelectedRequest(request);
    setDialogOpen(true);
  };

  const handleChange = (_e: any, newValue: any) => {
    setValue(newValue);
  };

  const renderContent = () => {
    switch (value) {
      case 0:
        return (
          <Requests
            tabTitle={"Withdrawal Requests"}
            onPayClick={handlePayClick}
          />
        );
      case 1:
        return <Proccessed tabTitle={"Processed Withdrawals"} />;
      default:
        return null;
    }
  };

  return (
    <>
      <Typography variant="h4" sx={{ margin: "2rem", mt: 10, fontWeight: 700, color: "#1a237e" }}>
        Payouts
      </Typography>
      <Card sx={{ margin: "2rem", mt: 2, borderRadius: 2, boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}>
        <CardContent>
          <Box className="tabs-list">
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              className="tabs"
            >
              <Tab className="tab-list-1" label="Withdrawal Requests" />
              <Tab className="tab-list-2" label="Processed Withdrawals" />
            </Tabs>
            <Box className="tab-content">{renderContent()}</Box>
          </Box>
        </CardContent>
      </Card>

      <PayWithdrawalDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        request={selectedRequest}
      />
    </>
  );
};

export default Payout;

interface PayoutTableProps {
  data: any[];
  columns: any;
  tabTitle: string;
  loading?: boolean;
  searchTerm: string;
  onSearchChange: (val: string) => void;
}

const PayoutTable = ({
  data,
  columns,
  tabTitle,
  loading,
  searchTerm,
  onSearchChange,
}: PayoutTableProps) => {
  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
          mt: 2,
          backgroundColor: "#0a2558",
          color: "#fff",
          "& .MuiSvgIcon-root": { color: "#fff" },
        }}
      >
        <Typography sx={{ fontWeight: 600 }}>{tabTitle}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "flex-end",
            marginBottom: "1rem",
          }}
        >
          <TextField
            size="small"
            placeholder="Search by ID, name, amount..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            sx={{ minWidth: 260 }}
          />
        </Box>
        <DataTable
          columns={columns}
          data={data}
          pagination
          customStyles={DASHBOARD_CUTSOM_STYLE}
          paginationPerPage={25}
          progressPending={loading}
          paginationRowsPerPageOptions={[25, 50, 100]}
          highlightOnHover
          noDataComponent={<div style={{ padding: "2rem", color: "#64748b" }}>No withdrawal data available</div>}
        />
      </AccordionDetails>
    </Accordion>
  );
};

export const Requests = ({
  tabTitle,
  onPayClick,
}: {
  tabTitle: string;
  onPayClick: (request: any) => void;
}) => {
  const [search, setSearch] = useState("");
  const { data: requestsData, isLoading } = useGetWithdrawalRequests("Pending");
  const requests = requestsData?.data || [];

  const filteredRequests = requests.filter((req: any) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    const id = String(req.member_id || "").toLowerCase();
    const name = String(req.member_details?.name || req.account_holder_name || "").toLowerCase();
    const amount = String(req.amount || "");
    const reqId = String(req.withdraw_request_id || "").toLowerCase();
    return id.includes(q) || name.includes(q) || amount.includes(q) || reqId.includes(q);
  });

  const columns = [
    {
      name: "Date",
      selector: (row: any) =>
        new Date(row.requested_date).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
      sortable: true,
      minWidth: "120px",
    },
    {
      name: "User / Member Name",
      selector: (row: any) => row.member_details?.name || row.account_holder_name || "N/A",
      sortable: true,
      minWidth: "170px",
      cell: (row: any) => (
        <Typography sx={{ fontWeight: 600, fontSize: "0.875rem", color: "#1e293b" }}>
          {row.member_details?.name || row.account_holder_name || "N/A"}
        </Typography>
      ),
    },
    {
      name: "User ID",
      selector: (row: any) => row.member_id || "-",
      sortable: true,
      minWidth: "150px",
      cell: (row: any) => {
        const isAgent = row.user_type === "AGENT" || String(row.member_id || "").startsWith("AG");
        return (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography sx={{ fontFamily: "monospace", fontWeight: 600, fontSize: "0.85rem" }}>
              {row.member_id}
            </Typography>
            <Chip
              label={isAgent ? "Agent" : "Member"}
              size="small"
              sx={{
                fontSize: "0.68rem",
                height: "20px",
                bgcolor: isAgent ? "rgba(99, 102, 241, 0.1)" : "rgba(16, 185, 129, 0.1)",
                color: isAgent ? "#4338ca" : "#047857",
                fontWeight: 600,
              }}
            />
          </Box>
        );
      },
    },
    {
      name: "Mobile No.",
      selector: (row: any) => row.member_details?.contactno || "-",
      sortable: true,
      minWidth: "130px",
    },
    {
      name: "Amount",
      selector: (row: any) => row.amount || 0,
      sortable: true,
      minWidth: "120px",
      cell: (row: any) => (
        <Typography sx={{ fontWeight: 700, color: "#059669", fontSize: "0.95rem" }}>
          ₹{Number(row.amount || 0).toFixed(2)}
        </Typography>
      ),
    },
    {
      name: "Wallet Balance",
      selector: (row: any) => row.balance ?? row.member_details?.balance ?? 0,
      sortable: true,
      minWidth: "140px",
      cell: (row: any) => (
        <Typography sx={{ fontWeight: 600, color: "#4f46e5", fontSize: "0.9rem" }}>
          ₹{Number(row.balance ?? row.member_details?.balance ?? 0).toFixed(2)}
        </Typography>
      ),
    },
    {
      name: "Status",
      selector: (row: any) => row.status || "-",
      sortable: true,
      minWidth: "110px",
      cell: (row: any) => (
        <Chip
          label={row.status}
          size="small"
          sx={{
            bgcolor: "#fef9c3",
            color: "#854d0e",
            fontWeight: 600,
            borderRadius: 1,
          }}
        />
      ),
    },
    {
      name: "Action",
      minWidth: "120px",
      cell: (row: any) => (
        <Button
          variant="contained"
          size="small"
          onClick={() => onPayClick(row)}
          sx={{
            textTransform: "none",
            bgcolor: "#4f46e5",
            "&:hover": { bgcolor: "#4338ca" },
            borderRadius: 1,
            fontWeight: 600,
            px: 2,
          }}
        >
          Pay Now
        </Button>
      ),
      sortable: false,
    },
  ];

  return (
    <PayoutTable
      data={filteredRequests}
      columns={columns}
      tabTitle={tabTitle}
      loading={isLoading}
      searchTerm={search}
      onSearchChange={setSearch}
    />
  );
};

export const Proccessed = ({ tabTitle }: { tabTitle: string }) => {
  const [search, setSearch] = useState("");
  const { data: requestsData, isLoading } = useGetWithdrawalRequests("Completed");
  const requests = requestsData?.data || [];

  const filteredRequests = requests.filter((req: any) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    const id = String(req.member_id || "").toLowerCase();
    const name = String(req.member_details?.name || req.account_holder_name || "").toLowerCase();
    const amount = String(req.amount || "");
    const txId = String(req.transaction_id || "").toLowerCase();
    return id.includes(q) || name.includes(q) || amount.includes(q) || txId.includes(q);
  });

  const columns = [
    {
      name: "Date",
      selector: (row: any) =>
        new Date(row.processed_date || row.requested_date).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
      sortable: true,
      minWidth: "120px",
    },
    {
      name: "User / Member Name",
      selector: (row: any) => row.member_details?.name || row.account_holder_name || "N/A",
      sortable: true,
      minWidth: "170px",
      cell: (row: any) => (
        <Typography sx={{ fontWeight: 600, fontSize: "0.875rem", color: "#1e293b" }}>
          {row.member_details?.name || row.account_holder_name || "N/A"}
        </Typography>
      ),
    },
    {
      name: "User ID",
      selector: (row: any) => row.member_id || "-",
      sortable: true,
      minWidth: "150px",
      cell: (row: any) => {
        const isAgent = row.user_type === "AGENT" || String(row.member_id || "").startsWith("AG");
        return (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography sx={{ fontFamily: "monospace", fontWeight: 600, fontSize: "0.85rem" }}>
              {row.member_id}
            </Typography>
            <Chip
              label={isAgent ? "Agent" : "Member"}
              size="small"
              sx={{
                fontSize: "0.68rem",
                height: "20px",
                bgcolor: isAgent ? "rgba(99, 102, 241, 0.1)" : "rgba(16, 185, 129, 0.1)",
                color: isAgent ? "#4338ca" : "#047857",
                fontWeight: 600,
              }}
            />
          </Box>
        );
      },
    },
    {
      name: "Amount",
      selector: (row: any) => row.amount || 0,
      sortable: true,
      minWidth: "120px",
      cell: (row: any) => (
        <Typography sx={{ fontWeight: 700, color: "#059669", fontSize: "0.95rem" }}>
          ₹{Number(row.amount || 0).toFixed(2)}
        </Typography>
      ),
    },
    {
      name: "Transaction ID",
      selector: (row: any) => row.transaction_id || "-",
      sortable: true,
      minWidth: "170px",
      cell: (row: any) => (
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <CheckCircleIcon sx={{ fontSize: 16, color: "#10b981" }} />
          <Typography variant="caption" sx={{ color: "#64748b", fontFamily: "monospace", fontWeight: 600 }}>
            {row.transaction_id || "-"}
          </Typography>
        </Stack>
      ),
    },
    {
      name: "Status",
      selector: (row: any) => row.status || "-",
      sortable: true,
      minWidth: "110px",
      cell: (row: any) => (
        <Chip
          label={row.status}
          size="small"
          sx={{
            bgcolor: "#dcfce7",
            color: "#166534",
            fontWeight: 600,
            borderRadius: 1,
          }}
        />
      ),
    },
  ];

  return (
    <PayoutTable
      data={filteredRequests}
      columns={columns}
      tabTitle={tabTitle}
      loading={isLoading}
      searchTerm={search}
      onSearchChange={setSearch}
    />
  );
};