import React from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Box, Typography } from "@mui/material";

const CustomPagination = ({
  page,
  pageCount,
  onPageChange,
  rowsPerPageOptions,
  onRowsPerPageChange,
  rowsPerPage,
}) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      padding="8px"
    >
      {/* Control para seleccionar filas por página */}
      <Box display="flex" alignItems="center">
        <Typography variant="body2" marginRight="8px">
          Filas por página:
        </Typography>
        <Select
          value={rowsPerPage}
          onChange={(event) => onRowsPerPageChange(event.target.value)}
          size="small"
        >
          {rowsPerPageOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {/* Paginación */}
      <Pagination
        count={pageCount}
        page={page + 1} // MUI Pagination es 1-based, pero DataGrid es 0-based
        onChange={(event, value) => onPageChange(value - 1)}
        showFirstButton
        showLastButton
        renderItem={(item) => (
          <PaginationItem
            {...item}
            slots={{
              first: FirstPageIcon, // Ícono para el botón "Primera página"
              last: LastPageIcon, // Ícono para el botón "Última página"
            }}
          />
        )}
      />
    </Box>
  );
};

export default CustomPagination;