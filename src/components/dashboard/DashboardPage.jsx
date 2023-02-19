import SearchIcon from "@mui/icons-material/Search";
import { Box, Grid, IconButton, TextField } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import Layout from "../Layout";
// select
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FilterLeads from "./FilterLeads";
//

export default function DashboardPage() {
  return (
    <Layout>
      <Container maxWidth="" sx={{ mt: 2, mb: 2 }}>
        <TextField
          size="small"
          sx={{ input: { color: "" } }}
          id="standard-bare"
          variant="outlined"
          defaultValue=""
          placeholder="Search in leads table..."
          InputProps={{
            style: {
              fontSize: ".8em",
              height: 24,
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
      </Container>
    </Layout>
  );
}
