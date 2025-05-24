import { useState } from "react";
import { format } from "date-fns";
import { Box, TextField, Button, Paper } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

function Searchbar({ searchDB }: any) {
  const [searchFields, setSearchFields] = useState({
    itemID: "",
    description: "",
    category: "",
    type: "",
    route: "",
    garage: "",
    startDate: null as Date | null,
    endDate: null as Date | null,
    status: "",
  });

  const handleChange = (field: string, value: any) => {
    setSearchFields((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSearch = () => {
    const formattedFields = {
      ...searchFields,
      startDate: searchFields.startDate
        ? format(searchFields.startDate, "yyyy-MM-dd")
        : "",
      endDate: searchFields.endDate
        ? format(searchFields.endDate, "yyyy-MM-dd")
        : "",
    };

    searchDB(formattedFields);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Paper sx={{ p: 1 }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            mb: 2,
          }}
        >
          {/* First Column */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              flex: 1,
              minWidth: 150,
            }}
          >
            <TextField
              label="Item ID"
              value={searchFields.itemID}
              onChange={(e) => handleChange("itemID", e.target.value)}
              onKeyDown={handleKeyDown}
              size="small"
              fullWidth
            />
            <TextField
              label="Description"
              value={searchFields.description}
              onChange={(e) => handleChange("description", e.target.value)}
              onKeyDown={handleKeyDown}
              size="small"
              fullWidth
            />
          </Box>

          {/* Second Column */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              flex: 1,
              minWidth: 150,
            }}
          >
            <TextField
              label="Category"
              value={searchFields.category}
              onChange={(e) => handleChange("category", e.target.value)}
              onKeyDown={handleKeyDown}
              size="small"
              fullWidth
            />
            <TextField
              label="Type"
              value={searchFields.type}
              onChange={(e) => handleChange("type", e.target.value)}
              onKeyDown={handleKeyDown}
              size="small"
              fullWidth
            />
          </Box>

          {/* Third Column */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              flex: 1,
              minWidth: 150,
            }}
          >
            <TextField
              label="Route"
              value={searchFields.route}
              onChange={(e) => handleChange("route", e.target.value)}
              onKeyDown={handleKeyDown}
              size="small"
              fullWidth
            />
            <TextField
              label="Garage"
              value={searchFields.garage}
              onChange={(e) => handleChange("garage", e.target.value)}
              onKeyDown={handleKeyDown}
              size="small"
              fullWidth
            />
          </Box>

          {/* Fourth Column */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              flex: 1,
              minWidth: 150,
            }}
          >
            <DatePicker
              label="From"
              value={searchFields.startDate}
              onChange={(date) => handleChange("startDate", date)}
              format="dd-MM-yyyy"
              slotProps={{
                textField: { size: "small", fullWidth: true },
              }}
            />
            <TextField
              label="Status"
              value={searchFields.status}
              onChange={(e) => handleChange("status", e.target.value)}
              onKeyDown={handleKeyDown}
              size="small"
              fullWidth
            />
          </Box>

          {/* Fifth Column */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              flex: 1,
              minWidth: 150,
            }}
          >
            <DatePicker
              label="To"
              value={searchFields.endDate}
              onChange={(date) => handleChange("endDate", date)}
              format="dd-MM-yyyy"
              slotProps={{
                textField: { size: "small", fullWidth: true },
              }}
            />
            <Button
              variant="contained"
              onClick={handleSearch}
              sx={{ height: 40 }}
            >
              Search
            </Button>
          </Box>
        </Box>
      </Paper>
    </LocalizationProvider>
  );
}

export default Searchbar;
