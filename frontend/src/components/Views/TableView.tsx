import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Chip,
  useTheme,
} from "@mui/material";

interface TableViewProps {
  columns: { header: string; accessor: string }[];
  data: Record<string, any>[];
  onRowClick?: (item: any) => void;
}

const TableView = ({ columns, data, onRowClick }: TableViewProps) => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedData = data.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const statusColorMap: Record<string, string> = {
    Expired: theme.palette.error.main,
    "To Collect": theme.palette.info.main,
    Claimed: theme.palette.success.main,
    Unclaimed: theme.palette.grey[500],
    Open: theme.palette.error.main,
    Closed: theme.palette.success.main,
  };

  const renderCell = (col: string, value: any) => {
    if (col === "status" && value in statusColorMap) {
      const bg = statusColorMap[value];
      return (
        <Chip
          label={value}
          size="small"
          sx={{
            bgcolor: bg,
            color: theme.palette.getContrastText(bg),
          }}
        />
      );
    }
    return value?.toString() ?? "";
  };

  return (
    <Paper sx={{ width: "100%", mb: 4 }}>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={col.accessor}
                  sx={{ fontWeight: "bold", fontSize: "0.85rem", py: 1 }}
                >
                  {col.header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row, rowIndex) => (
              <TableRow
                hover
                key={rowIndex}
                onClick={() => onRowClick?.(row)}
                sx={{
                  cursor: onRowClick ? "pointer" : "default",
                  fontSize: "0.85rem",
                }}
              >
                {columns.map((col) => (
                  <TableCell
                    key={col.accessor}
                    sx={{ py: 0.5, fontSize: "0.85rem" }}
                  >
                    {renderCell(col.accessor, row[col.accessor])}
                  </TableCell>
                ))}
              </TableRow>
            ))}

            {/* Fill empty rows */}
            {Array.from({ length: rowsPerPage - paginatedData.length }).map(
              (_, idx) => (
                <TableRow key={`empty-${idx}`}>
                  {columns.map((col) => (
                    <TableCell
                      key={col.accessor}
                      sx={{ py: 0.5, fontSize: "0.85rem" }}
                    />
                  ))}
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={data.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[10]}
      />
    </Paper>
  );
};

export default TableView;
