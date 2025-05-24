import React, { useState } from "react";
import {
  Box,
  Typography,
  Collapse,
  Grid,
  Divider,
  Paper,
  Stack,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function HistoryDetails({ data }: { data: any }) {
  const history = data?.historyDetails || [];
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const sortedHistory = [...history].sort(
    (a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const toggleExpand = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  if (sortedHistory.length === 0) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography>No history available.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      {/* Header Row */}
      <Grid
        container
        spacing={2}
        sx={{
          fontWeight: "bold",
          borderBottom: "1px solid",
          borderColor: "divider",
          pb: 1,
          mb: 1,
        }}
      >
        <Grid item xs={4}>
          Date
        </Grid>
        <Grid item xs={4}>
          Action
        </Grid>
        <Grid item xs={3}>
          By
        </Grid>
        <Grid item xs={1} />
      </Grid>

      {sortedHistory.map((entry: any, index: number) => {
        const isExpanded = expandedIndex === index;

        return (
          <Paper
            key={index}
            variant="outlined"
            sx={{ mb: 1, cursor: "pointer" }}
            onClick={() => toggleExpand(index)}
          >
            <Grid container spacing={2} alignItems="center" sx={{ p: 1 }}>
              <Grid item xs={4}>
                <Typography variant="body2">
                  {new Date(entry.date).toLocaleString()}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body2">{entry.action}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body2">{entry.by || "System"}</Typography>
              </Grid>
              <Grid item xs={1} sx={{ textAlign: "right" }}>
                {isExpanded ? (
                  <KeyboardArrowUpIcon />
                ) : (
                  <KeyboardArrowDownIcon />
                )}
              </Grid>
            </Grid>

            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
              <Divider />
              <Grid container spacing={2} sx={{ p: 2 }}>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    From:
                  </Typography>
                  {entry.action === "Created"
                    ? Object.entries(entry.changes).map(
                        ([field, value]: [string, any], i) => (
                          <Stack
                            key={i}
                            direction="row"
                            justifyContent="space-between"
                            sx={{ mb: 0.5 }}
                          >
                            <Typography color="text.secondary">
                              {field}:
                            </Typography>
                            <Typography>
                              {value.to?.toString() || "N/A"}
                            </Typography>
                          </Stack>
                        )
                      )
                    : Object.entries(entry.changes).map(
                        ([field, value]: [string, any], i) => (
                          <Stack
                            key={i}
                            direction="row"
                            justifyContent="space-between"
                            sx={{ mb: 0.5 }}
                          >
                            <Typography color="text.secondary">
                              {field}:
                            </Typography>
                            <Typography>
                              {value.from?.toString() || "N/A"}
                            </Typography>
                          </Stack>
                        )
                      )}
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    To:
                  </Typography>
                  {entry.action === "Created"
                    ? Object.entries(entry.changes).map(
                        ([field, value]: [string, any], i) => (
                          <Stack
                            key={i}
                            direction="row"
                            justifyContent="space-between"
                            sx={{ mb: 0.5 }}
                          >
                            <Typography color="text.secondary">
                              {field}:
                            </Typography>
                            <Typography>
                              {value.to?.toString() || "N/A"}
                            </Typography>
                          </Stack>
                        )
                      )
                    : Object.entries(entry.changes).map(
                        ([field, value]: [string, any], i) => (
                          <Stack
                            key={i}
                            direction="row"
                            justifyContent="space-between"
                            sx={{ mb: 0.5 }}
                          >
                            <Typography color="text.secondary">
                              {field}:
                            </Typography>
                            <Typography>
                              {value.to?.toString() || "N/A"}
                            </Typography>
                          </Stack>
                        )
                      )}
                </Grid>
              </Grid>
            </Collapse>
          </Paper>
        );
      })}
    </Box>
  );
}

export default HistoryDetails;
