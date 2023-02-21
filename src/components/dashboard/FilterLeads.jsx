import { Grid } from "@mui/material";
import React, { useState } from "react";
// select
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import { DatePicker } from "antd";
import { useRecoilState } from "recoil";
import { useLeadsAssignee } from "../../data/useLeadsAssignee";
import { useLeadsSource } from "../../data/useLeadsSource";
import { useLeadsStatus } from "../../data/useLeadsStatus";
import { filterLeadAtom } from "../../recoil/atoms";

const { RangePicker } = DatePicker;

export default function FilterLeads() {
  const { data: leadsStatus, loading: statusLoading } = useLeadsStatus();
  const { data: assignee, loading: assigneeLoading } = useLeadsAssignee();
  const { data: source, loading: sourceLoading } = useLeadsSource();

  const [status, setStatus] = React.useState([]);
  const [selectedSource, setSelectedSource] = useState([]);
  const [selectedAssignee, setSelectedAssignee] = useState([]);

  const [dates, setDates] = useState(null);

  const [filterState, setFilterState] = useRecoilState(filterLeadAtom);
  const handleStatus = (event) => {
    const {
      target: { value },
    } = event;
    setStatus(typeof value === "string" ? value.split(",") : value);
  };
  const handleSource = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedSource(typeof value === "string" ? value.split(",") : value);
  };
  const handleAssignee = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedAssignee(typeof value === "string" ? value.split(",") : value);
  };
  const handleRangePicker = (dates, dateStrings) => {
    setDates(dateStrings);
  };
  const handleReset = () => {
    setStatus([]);
    setSelectedSource([]);
    setSelectedAssignee([]);
    setDates(null);
    setFilterState({
      search: "",
      lead_status_id: [],
      source_id: [],
      user_id: [],
      contacted_date_from: "",
      contacted_date_to: "",
    });
  };
  const handleFilter = () => {
    setFilterState((prev) => {
      return {
        ...prev,
        lead_status_id: status,
        source_id: selectedSource,
        user_id: selectedAssignee,
        contacted_date_from: dates?.[0] ? dates?.[0] : "",
        contacted_date_to: dates?.[1] ? dates?.[1] : "",
      };
    });
  };
  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
      <Grid item sm={12} md={9}>
        <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl sx={{ m: 1, width: "100%" }} size="small">
              <InputLabel id="select-status">Statuses</InputLabel>
              <Select
                labelId="select-status"
                id="select-status"
                value={status}
                label="Statuses"
                onChange={handleStatus}
                multiple
              >
                {leadsStatus?.map((leadsStatus) => {
                  return (
                    <MenuItem
                      sx={{ color: leadsStatus?.color }}
                      key={leadsStatus?.id}
                      value={leadsStatus?.id}
                    >
                      {leadsStatus.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl sx={{ m: 1, width: "100%" }} size="small">
              <InputLabel id="select-source">Source</InputLabel>
              <Select
                labelId="select-source"
                id="select-source"
                value={selectedSource}
                label="Source"
                onChange={handleSource}
                multiple
              >
                {source?.map((eachSource) => {
                  return (
                    <MenuItem key={eachSource?.id} value={eachSource?.id}>
                      {eachSource.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl sx={{ m: 1, width: "100%" }} size="small">
              <InputLabel id="select-assignees">Assignees</InputLabel>
              <Select
                labelId="select-assignees"
                id="select-assignees"
                value={selectedAssignee}
                label="Assignees"
                onChange={handleAssignee}
                multiple
              >
                {assignee?.map((eachAssignee) => {
                  return (
                    <MenuItem key={eachAssignee?.id} value={eachAssignee?.id}>
                      {eachAssignee.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <RangePicker
              onChange={handleRangePicker}
              style={{
                height: "2.4375em",
                width: "100%",
                borderRadius: "4px",
                border: "1px solid #AFAFAF",
                cursor: "pointer",
                fontSize: "17px",
                padding: "16px",
                marginLeft: "8px",
              }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        md={3}
        sm={12}
        sx={{ display: "flex", alignItems: "center", width: "100%" }}
      >
        <Stack spacing={2} direction="row" sx={{ width: "100%" }}>
          <Button variant="contained" fullWidth={true} onClick={handleFilter}>
            Filter
          </Button>
          <Button variant="outlined" fullWidth={true} onClick={handleReset}>
            Reset
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
}
