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
  rowsPerPageOptions = [5, 10, 15, 20], // Valores por defecto
  onRowsPerPageChange,
  rowsPerPage,
  totalItems, // ✅ Recibe la cantidad total de elementos
}) => {
  // Calcular el rango de elementos mostrados
  const startItem = page * rowsPerPage + 1;
  const endItem = Math.min((page + 1) * rowsPerPage, totalItems);

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
          onChange={(event) => onRowsPerPageChange(parseInt(event.target.value, 10))} // ✅ Asegura que el valor es un número
          size="small"
        >
          {rowsPerPageOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>

      </Box>

      {/* Mostrar "5 de 10" con el rango de elementos */}
      <Typography variant="body2">
        {startItem} - {endItem} de {totalItems}
      </Typography>

      {/* Paginación */}
      <Pagination
        count={pageCount}
        page={page + 1} // Ajustar índice para Material-UI
        onChange={(_event, value) => onPageChange(value - 1)} //  Ajustar índice a DataGrid
        showFirstButton
        showLastButton
        renderItem={(item) => (
          <PaginationItem
            {...item}
            slots={{
              first: FirstPageIcon,
              last: LastPageIcon,
            }}
          />
        )}
      />

    </Box>
  );
};

export default CustomPagination;
