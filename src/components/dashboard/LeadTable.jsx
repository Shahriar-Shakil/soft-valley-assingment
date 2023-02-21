import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import { useRecoilState } from "recoil";
import { useLeadList } from "../../data/useLeads";
import { filterLeadAtom } from "../../recoil/atoms";

const columns = [
  {
    flex: 1,
    field: "name",
    headerName: "Lead Name",

    sortable: false,
    flex: 1,
  },
  { flex: 1, field: "phone", headerName: "Phone", sortable: false },
  {
    flex: 1,
    field: "followup_date",
    headerName: "Followup Date",

    renderCell: (params) => {
      if (params.row.followup_date) {
        return <Moment>{params.row.followup_date}</Moment>;
      } else {
        return <>-</>;
      }
    },
    sortable: false,
  },
  {
    flex: 1,
    field: "lastNote",
    headerName: "Last Note",
    sortable: false,
    renderCell: () => {
      return <>-</>;
    },
  },
  {
    flex: 1,
    field: "assigned",
    headerName: "Assigned",
    sortable: false,
    renderCell: () => {
      return <>-</>;
    },
  },
  {
    flex: 1,
    field: "email",
    headerName: "Email",
    sortable: false,
  },
  {
    flex: 1,
    field: "lead_preferred_countries",
    headerName: "Preferred Countries",
    renderCell: (params) => {
      let countries = params?.row?.lead_preferred_countries?.map(
        (country) => country.name
      );
      return (
        <>
          {countries.length
            ? countries?.map((country, index) => (
                <span style={{ fontSize: "12px" }} key={country}>
                  {(index ? ", " : "") + country}
                </span>
              ))
            : "-"}
        </>
      );
    },
    sortable: false,
  },
  {
    flex: 1,
    field: "status",
    headerName: "Status",
    renderCell: (params) => {
      return (
        <Typography
          component="span"
          sx={{ fontSize: "12px", color: params.row.lead_status.color }}
        >
          {params.row.lead_status.name}
        </Typography>
      );
    },
    sortable: false,
  },
  {
    flex: 1,
    field: "source",
    headerName: "source",
    sortable: false,
    renderCell: (params) => {
      return (
        <Typography sx={{ fontSize: "12px" }} component="span">
          {params.row.source.name}
        </Typography>
      );
    },
    sortable: false,
  },
  {
    flex: 1,
    field: "Actions",
    headerName: "actions",
    sortable: false,

    renderCell: () => {
      return (
        <Stack direction="row">
          <IconButton aria-label="delete">
            <ContentPasteSearchIcon sx={{ width: "18px", height: "18px" }} />
          </IconButton>
          <IconButton size="small" aria-label="delete">
            <EditIcon sx={{ width: "18px", height: "18px" }} />
          </IconButton>
          <IconButton size="small" aria-label="delete">
            <DeleteIcon sx={{ width: "18px", height: "18px" }} />
          </IconButton>
        </Stack>
      );
    },
  },
];

export default function LeadTable() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filterState, setFilterState] = useRecoilState(filterLeadAtom);

  const { data, loading, error } = useLeadList({ page, pageSize, filterState });

  const [tableData, setTableData] = useState(data?.data || []);
  const handlePageChange = (newPage) => {
    if (newPage !== 0) setPage(newPage);
  };
  const [rowCountState, setRowCountState] = useState(data?.total || 1);
  useEffect(() => {
    setRowCountState((prevRowCountState) =>
      data?.total !== undefined ? data?.total : prevRowCountState
    );
    setTableData((prevTableData) =>
      data?.data !== undefined ? data?.data : prevTableData
    );
  }, [data, setRowCountState]);
  return (
    <>
      <div style={{ width: "100%" }}>
        <DataGrid
          sx={{
            " .MuiDataGrid-columnSeparator": {
              display: "none",
            },
          }}
          rows={tableData}
          loading={loading}
          columns={columns}
          pagination
          page={data?.current_page}
          pageSize={data?.per_page}
          rowsPerPageOptions={[10, 25, 50, 100]}
          rowCount={rowCountState}
          onPageChange={handlePageChange}
          onPageSizeChange={(newPage) => setPageSize(newPage)}
          paginationMode="server"
          checkboxSelection
          autoHeight={true}
        />
      </div>
    </>
  );
}
