import SearchIcon from "@mui/icons-material/Search";
import { Grid, IconButton, TextField } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import Layout from "../Layout";
// select
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
//

export default function DashboardPage() {
  const [age, setAge] = React.useState("");
  const handleChange = (event) => {
    setAge(event.target.value);
  };
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
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          columns={{ xs: 4, sm: 9, md: 12 }}
        >
          <Grid item xs={3}>
            <FormControl sx={{ m: 1, width: "100%" }} size="small">
              <InputLabel id="demo-select-small">Statuses</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={age}
                label="Statuses"
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl sx={{ m: 1, width: "100%" }} size="small">
              <InputLabel id="demo-select-small">Source</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={age}
                label="Source"
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl sx={{ m: 1, width: "100%" }} size="small">
              <InputLabel id="demo-select-small">Assignees</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={age}
                label="Assignees"
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}></Grid>
          <Grid item xs={3}></Grid>
        </Grid>
      </Container>
    </Layout>
  );
}
