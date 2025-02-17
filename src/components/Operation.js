import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { Menu, MenuItem, IconButton, Tooltip } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DocumentIcon from "@mui/icons-material/Description";
import CustomPagination from "./CustomPagination";
import mockData from "./ValoragirarModal/mockData"; // Datos de prueba
import AdvancedDateRangePicker from "./AdvancedDateRangePicker"; 

const Operations = () => {
  const [rows, setRows] = useState([]); // Inicialmente vacío
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [search, setSearch] = useState(""); // Estado para el campo de búsqueda
  const openMenu = Boolean(anchorEl);

  // Cargar datos de prueba inicialmente
  useEffect(() => {
    setRows(mockData);
    setRowCount(mockData.length);
  }, []);

  // Función para cargar datos desde la API
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/operaciones", {
        params: { page: page + 1, page_size: pageSize, search }, // Incluir el parámetro de búsqueda
      });
      setRows(response.data.results);
      setRowCount(response.data.total_count); // Ajustar el número total de filas
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  // Llamar a la API cuando cambie la página, el tamaño de la página o el término de búsqueda
  useEffect(() => {
    fetchData();
  }, [page, pageSize, search]);

  // Manejar clic en el menú contextual
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  // Manejar acciones
  const handleActionClick = (action, id) => {
    console.log(`Realizar acción: ${action} en la operación ${id}`);
    alert(`Realizar acción: ${action} en la operación ${id}`);
    handleCloseMenu();
  };

  // Columnas de la tabla
  const columns = [
    {
      field: "estado",
      headerName: "Estado",
      width: 160,
      renderCell: (params) => {
        let badgeClass = "";
        switch (params.value) {
          case "Vigente":
            badgeClass = "badge vigente";
            break;
          case "Cancelada":
            badgeClass = "badge cancelado";
            break;
          case "Vencida":
            badgeClass = "badge vencido";
            break;
          default:
            badgeClass = "badge";
        }
        return <span className={badgeClass}>{params.value}</span>;
      },
    },
    { field: "id", headerName: "ID", width: 80 },
    { field: "creado_el", headerName: "Creado el", width: 110 },
    { field: "factura_fraccion", headerName: "# Factura / Fracción", width: 150 },
    { field: "emisor", headerName: "Emisor", width: 200 },
    { field: "inversionista", headerName: "Inversionista", width: 200 },
    { field: "tasa_desc", headerName: "Tasa Desc.", width: 90 },
    { field: "tasa_inv", headerName: "Tasa Inv.", width: 90 },
    {
      field: "Valor Nominal",
      headerName: "Valor Nominal",
      width: 110,
      valueFormatter: ({ value }) =>
        new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP" }).format(value),
    },
    {
      field: "Valor Inversionista",
      headerName: "Valor Inversionista",
      width: 110,
      valueFormatter: ({ value }) =>
        new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP" }).format(value),
    },
    {
      field: "Acciones",
      headerName: "Acciones",
      width: 120,
      renderCell: (params) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Tooltip title="Registrar Recaudo">
            <IconButton onClick={() => handleActionClick("Ver Operación", params.row.id)}>
              <DocumentIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Ver Operacion">
            <IconButton onClick={() => handleActionClick("Registrar Recaudo", params.row.id)}>
              <MoreVertIcon />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div style={{ height: 600, width: "100%" }}>
      {/* Filtros y acciones */}
      <div className="search-and-actions-container">
        <input
          type="text"
          placeholder="Buscar o filtrar resultados..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar"
        />
        <AdvancedDateRangePicker
          onDateRangeChange={(range) => setDateRange(range)}
          className="date-picker"
        />
        <IconButton onClick={handleMenuClick} className="context-menu">
          <MoreVertIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} open={openMenu} onClose={handleCloseMenu}>
          <MenuItem onClick={() => alert("Exportar en Excel")}>Exportar en Excel</MenuItem>
        </Menu>
      </div> 

      {/* Tabla */}
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        paginationMode="server"
        rowCount={rowCount}
        onPageChange={(newPage) => setPage(newPage)}
        loading={loading}
        rowsPerPageOptions={[5, 10, 20, 50]}
        components={{
          Pagination: CustomPagination,
        }}
        localeText={{
          noRowsLabel: "No hay filas",
          toolbarPaginationRowsPerPage: "Filas por página:",
          columnMenuLabel: "Menú de columna",
          columnMenuShowColumns: "Mostrar columnas",
          columnMenuFilter: "Filtro",
          columnMenuHideColumn: "Ocultar columna",
          columnMenuUnsort: "Desordenar",
          columnMenuSortAsc: "Ordenar ASC",
          columnMenuSortDesc: "Ordenar DESC",
          columnMenuManageColumns: "Administrar columnas",
        }}
      />
    </div>
  );
};

export default Operations;