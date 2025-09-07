import {
  useTheme,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Chip,
} from "@mui/material";
import { useState } from "react";
import { useItemSelection } from "../../util/useItemSelection";

interface TableViewProps {
  columns: { header: string; accessor: string }[];
  data: Record<string, any>[];
  onRowClick?: (item: any) => void;
  selectedItems?: string[];
  setSelectedItems?: React.Dispatch<React.SetStateAction<string[]>>;
}

const TableView = ({
  columns,
  data,
  onRowClick,
  selectedItems: propSelectedItems,
  setSelectedItems: propSetSelectedItems,
}: TableViewProps) => {
  const theme = useTheme();
  const {
    selectedItems: contextSelectedItems,
    setSelectedItems: contextSetSelectedItems,
  } = useItemSelection();

  // Use props if provided, fallback to context
  const selectedItems =
    propSelectedItems !== undefined ? propSelectedItems : contextSelectedItems;
  const setSelectedItems =
    propSetSelectedItems !== undefined
      ? propSetSelectedItems
      : contextSetSelectedItems;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const paginatedData = data.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
          sx={{ bgcolor: bg, color: theme.palette.getContrastText(bg) }}
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
              <TableCell padding="checkbox">Selected</TableCell>
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
            {paginatedData.map((row, rowIdx) => {
              const rowId =
                row.userId || row.itemID || row.containerID || rowIdx;
              return (
                <TableRow
                  hover
                  key={rowId}
                  onClick={() => onRowClick?.(row)}
                  sx={{
                    cursor: onRowClick ? "pointer" : "default",
                    fontSize: "0.85rem",
                  }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedItems.includes(rowId)}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => {
                        if (e.target.checked)
                          setSelectedItems([...selectedItems, rowId]);
                        else
                          setSelectedItems(
                            selectedItems.filter((id) => id !== rowId)
                          );
                      }}
                    />
                  </TableCell>
                  {columns.map((col, colIdx) => (
                    <TableCell
                      key={`${col.accessor}-${colIdx}`}
                      sx={{ py: 0.5, fontSize: "0.85rem" }}
                    >
                      {renderCell(col.accessor, row[col.accessor])}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}

            {/* Empty rows */}
            {Array.from({ length: rowsPerPage - paginatedData.length }).map(
              (_, idx) => (
                <TableRow key={`empty-${idx}`}>
                  <TableCell padding="checkbox" />
                  {columns.map((col, colIdx) => (
                    <TableCell
                      key={`${col.accessor}-empty-${colIdx}`}
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
