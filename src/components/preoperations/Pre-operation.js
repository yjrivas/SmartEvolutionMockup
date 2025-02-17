import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Link from 'next/link';
import axios from "axios";
import AdvancedDateRangePicker from "../AdvancedDateRangePicker";
import CustomPagination from "../CustomPagination";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Menu, MenuItem, IconButton, InputAdornment } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import DocumentIcon from '@mui/icons-material/Description';
import { Tooltip } from "@mui/material";
import ModalValorAGirar from "../ValoragirarModal/ModalValorAGirar";
import mockData from "../ValoragirarModal/mockData"; // Ruta corregida
import { sampleDataPreOperations } from "../../data/mockData"; 

const PreOperations = () => {
  const [rows, setRows] = useState(sampleDataPreOperations); // Usando los datos predefinidos como respaldo cuando no existe una API
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [rowCount, setRowCount] = useState(sampleDataPreOperations.length);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const [openWindow, setOpenWindow] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedData, setSelectedData] = useState(mockData);

  const handleOpenRegisterOperation = () => {
    if (openWindow && !openWindow.closed) {
      openWindow.focus();
    } else {
      const newWindow = window.open("/pre-operaciones/RegisterOperation", "_blank", "width=800, height=600");
      setOpenWindow(newWindow);
      newWindow.onbeforeunload = () => {
        setOpenWindow(null);
      };
    }
  };

const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/preoperaciones", {
        params: {
          page: page + 1,
          page_size: pageSize,
          search,
          start_date: dateRange.start,
          end_date: dateRange.end,
        },
      });
      
      // Filtrar los datos para que solo se muestren los estados que quieres
      const filteredData = response.data.results.filter((item) =>
        ["Por aprobar", "Aprobado", "Rechazado"].includes(item.estado) // Filtramos solo los estados requeridos
      );

      // Si hay datos filtrados, actualizamos las filas y el conteo
      if (filteredData.length > 0) {
        setRows(filteredData);
        setRowCount(filteredData.length);
      } else {
        // Si no hay datos que cumplan con el filtro, usamos los datos de mockData
        setRows(sampleDataPreOperations);
        setRowCount(sampleDataPreOperations.length);
      }
    } catch (error) {
      console.error("Error fetching data", error);
      // En caso de error en la API, usar mockData
      setRows(sampleDataPreOperations);
      setRowCount(sampleDataPreOperations.length);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, pageSize, search, dateRange]);

  const columns = [
    { field: "estado", headerName: "Estado", width: 160,
      renderCell: (params) => {
        let badgeClass = "";
        switch (params.value) {
          case "Por aprobar":
            badgeClass = "badge por-aprobar";
            break;
          case "Aprobado":
            badgeClass = "badge aprobado";
            break;
          case "Rechazado":
            badgeClass = "badge rechazado";
            break;
          default:
            badgeClass = "badge";
        }
        return <span className={badgeClass}>{params.value}</span>;
      },
    },
    
    { field: "id", headerName: "ID", width: 80 },
    { field: "creado_el", headerName: "Creado el", width: 110 },
    { field: "factura_fraccion", headerName: "# Factura / Fracción", width: 90 },
    { field: "emisor", headerName: "Emisor", width: 200 },
    { field: "inversionista", headerName: "Inversionista", width: 200 },
    { field: "pagador", headerName: "Pagador", width: 150 },
    { field: "tasa_desc", headerName: "Tasa Desc.", width: 90 },
    { field: "porcentaje_desc", headerName: "% Desc.", width: 90 }, // Nueva columna
    { field: "tasa_inv", headerName: "Tasa Inv.", width: 90 },
    { field: "Valor Nominal", headerName: "Valor Nominal", width: 110,
      valueFormatter: ({ value }) => {
        if (value == null) return "$0.00";
        return new Intl.NumberFormat("es-CO", {
          style: "currency",
          currency: "COP",
        }).format(value);
      },
    },
    { field: "Valor Inversionista", headerName: "Valor Inversionista", width: 110,
      valueFormatter: ({ value }) => {
        if (value == null) return "$0.00";
        return new Intl.NumberFormat("es-CO", {
          style: "currency",
          currency: "COP",
        }).format(value);
      },
    },
    { field: "Fecha probable", headerName: "Fecha Probable", width: 110 },
    { field: "Fecha Fin", headerName: "Fecha Fin", width: 110 },
    { field: "Acciones", headerName: "Acciones", width: 90,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Tooltip title="Crear o ver resumen de negociación" arrow>
              <IconButton
                onClick={() => console.log("Redirigiendo a la vista de operación", params.row.id)}
                style={{ marginRight: 10 }}
              >
                <DocumentIcon />
              </IconButton>
            </Tooltip>
            <IconButton onClick={handleMenuClick} className="context-menu">
              <MoreVertIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={openMenu} onClose={handleCloseMenu}>
              <MenuItem onClick={() => handleActionClick("Actualizar Estado")}>
                Actualizar Estado
              </MenuItem>
              <MenuItem onClick={() => handleActionClick("Ver Operación")}>
                Ver Operación
              </MenuItem>
              <MenuItem onClick={() => handleActionClick("Editar")}>Editar</MenuItem>
              <MenuItem onClick={() => handleActionClick("Eliminar")}>
                Eliminar
              </MenuItem>
            </Menu>
          </div>
        );
      },
    },
  ];

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleExportXML = () => {
    alert("Exportar como XML");
    handleCloseMenu();
  };

  const handleClearSearch = () => {
    setSearch("");
  };

  const handleOpenModal = () => {
    console.log("Datos seleccionados para el modal:", selectedData);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const [rowsPerPage, setRowsPerPage] = useState(5); // ✅ Define rowsPerPage con un valor inicial

  return (
    <div style={{ height: 600, width: "100%" }}>
      <div className="search-and-actions-container">
        <input
          type="text"
          placeholder="Buscar o filtrar resultados..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          inputProps={{
            endAdornment: search && (
              <InputAdornment position="end">
                <IconButton onClick={handleClearSearch}>
                  <ClearIcon sx={{ color: "#488b8f" }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          className="search-bar"
        />
        <div>
          {/* Botón para redirigir a la página Por grupo */}
          <Link href="/pre-operaciones/operacionesporgrupo">
            <button className="button">
              Ver Por Grupo
            </button>
          </Link>
        </div>
        <div>
          <button className="button" onClick={handleOpenModal}>Valor a Girar</button>
          <ModalValorAGirar open={openModal} handleClose={handleCloseModal} data={selectedData} />
        </div>
        <AdvancedDateRangePicker
          onDateRangeChange={(range) => setDateRange(range)}
          className="date-picker"
        />
        <button className="button" onClick={handleOpenRegisterOperation}>
          Registrar Operación
        </button>
        <IconButton onClick={handleMenuClick} className="context-menu">
          <MoreVertIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} open={openMenu} onClose={handleCloseMenu}>
          <MenuItem onClick={handleExportXML}>Exportar en Excel</MenuItem>
        </Menu>
      </div>

      {/* DataGrid */}
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        paginationMode="server"
        rowCount={rowCount}
        loading={loading}
        rowsPerPageOptions={[5, 10, 20, 50]}
        components={{
          Pagination: (props) => (
            <CustomPagination
              page={page} // Pasa la página actual
              pageCount={Math.ceil(rowCount / pageSize)} // Calcula el número de páginas
              onPageChange={setPage} // Función para cambiar la página
              rowsPerPage={pageSize} // Tamaño de página actual
              onRowsPerPageChange={setPageSize} // Función para cambiar las filas por página
              totalItems={rowCount} // Número total de elementos
            />
          ),
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

export default PreOperations;