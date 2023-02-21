import SearchIcon from "@mui/icons-material/Search";
import { Box, Grid, IconButton, TextField } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import Layout from "../Layout";
// select
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FilterLeads from "./FilterLeads";
import LeadTable from "./LeadTable";
import { useRecoilState } from "recoil";
import { filterLeadAtom } from "../../recoil/atoms";
import useDebounce from "../../lib/useDebounce";
//

export default function LeadsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterState, setFilterState] = useRecoilState(filterLeadAtom);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(
    () => {
      if (debouncedSearchTerm) {
        setFilterState((prev) => {
          return {
            ...prev,
            search: searchTerm,
          };
        });
      }
    },
    [debouncedSearchTerm] // Only call effect if debounced search term changes
  );
  useEffect(() => {
    setSearchTerm(filterState?.search);
  }, [filterState]);
  return (
    <Layout>
      <Container maxWidth="" sx={{ mt: 2, mb: 2 }}>
        <TextField
          size="small"
          sx={{ input: { color: "" } }}
          id="standard-bare"
          variant="outlined"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search in leads table..."
          value={searchTerm}
          InputProps={{
            style: {
              fontSize: ".8em",
              // height: 24,
              borderRadius: "4px",
              width: 200,
            },
            endAdornment: (
              <IconButton>
                <SearchIcon sx={{ fontSize: ".8em" }} />
              </IconButton>
            ),
          }}
        />
      </Container>
      <Container maxWidth="" sx={{ mt: 2, mb: 2, py: 1, background: "#fff" }}>
        <FilterLeads />
        <LeadTable />
      </Container>
    </Layout>
  );
}
