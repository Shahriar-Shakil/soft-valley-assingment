import { Box, Grid, IconButton, TextField } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import Layout from "../Layout";
// select
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { DatePicker } from "antd";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";

const { RangePicker } = DatePicker;

export default function FilterLeads() {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
      <Grid item sm={12} md={9}>
        <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
          <Grid item xs={12} sm={6} md={3}>
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
          <Grid item xs={12} sm={6} md={3}>
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
          <Grid item xs={12} sm={6} md={3}>
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
          <Button variant="contained" fullWidth={true}>
            Filter
          </Button>
          <Button variant="outlined" fullWidth={true}>
            Reset
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
}
