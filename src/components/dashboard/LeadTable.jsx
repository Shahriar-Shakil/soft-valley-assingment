import { IconButton, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import { request } from "../../config/api";
import { useLeadList } from "../../data/useLeads";
import { API_LEAD_LIST } from "../../lib/api-endpoints";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import { useSWRConfig } from "swr";
import { useRecoilState } from "recoil";
import { filterLeadAtom } from "../../recoil/atoms";
const columns = [
  { field: "name", headerName: "Lead Name", width: 150, sortable: false },
  { field: "phone", headerName: "Phone", width: 110, sortable: false },
  {
    field: "followup_date",
    headerName: "Followup Date",
    width: 130,
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
    field: "lastNote",
    headerName: "Last Note",
    width: 90,
    sortable: false,
    renderCell: () => {
      return <>-</>;
    },
  },
  {
    field: "assigned",
    headerName: "Assigned",
    sortable: false,
    width: 80,
    renderCell: () => {
      return <>-</>;
    },
  },
  { field: "email", headerName: "Email", minWidth: 200, sortable: false },
  {
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
    field: "Actions",
    headerName: "actions",
    width: 200,
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
