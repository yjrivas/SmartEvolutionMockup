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
import UpdateStatusModal from "../preoperations/update/update";
import DeleteModal from "../preoperations/delete/delete";

/**
 * El componente de PreOperations gestiona la visualizacion de los datos de preoperacions.
 * Este componente incluye consultas a la api o datos de pruebas.
 * y ejecuta acciones de actualizar estado, borrar operaciones de factura pero aun no tiene definidas las opciones de ver o editar.
 *
 * @component
 * @example
 * return (
 *   <PreOperations />
 * )
 *
 * @returns {JSX.Element} Renderiza el componente.
 */
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
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedOperation, setSelectedOperation] = useState(null);
  const [currentStatus, setCurrentStatus] = useState("");
  const [operationLabel, setOperationLabel] = useState("");
  const [operationToDelete, setOperationToDelete] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

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

  const handleActionClick = (action, operation) => {
    if (action === "Actualizar Estado") {
      setSelectedOperation(operation.id); // Establecer el ID de la operación
      setCurrentStatus(operation.estado);  // Establecer el estado actual
      setOperationLabel(`Factura: ${operation.factura_fraccion}`); // Establecer el número de factura/fracción
      setOpenUpdateModal(true); // Abrir el modal
    }
  };
  

  // Función que maneja la acción de eliminar
  const handleDeleteOperation = (operationId) => {
    setRows(rows.filter(row => row.id !== operationId)); // Filtrar las filas y eliminar la operación
  };

  const handleActionClickdelete = (action, operation) => {
    if (action === "Eliminar") {
      setOperationToDelete(operation); // Establecemos la operación seleccionada para eliminar
      setOpenDeleteModal(true); // Abrimos el modal de confirmación
    }
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false); // Cerramos el modal sin hacer nada
    setOperationToDelete(null); // Limpiar la operación seleccionada
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
        const isOperationApproved = params.row.estado === "Aprobado";
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
              <MenuItem onClick={() => handleActionClick("Actualizar Estado", params.row)}>
                Actualizar Estado
              </MenuItem>
              <MenuItem onClick={() => handleActionClick("Ver Operación")}>
                Ver Operación
              </MenuItem>
              <MenuItem onClick={() => handleActionClick("Editar")}>Editar</MenuItem>
              { !isOperationApproved && (
                <MenuItem onClick={() => handleActionClickdelete("Eliminar", params.row)}>
                  Eliminar
                </MenuItem>
              )}
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

  /* Experimento para exportar los datos del data grid a un archivo csv que pueda ser leido por Excel*/
  const handleExportExcel = () => {
    // Obtener los datos de las filas visibles en la página actual del DataGrid
    const currentRows = rows; // Aquí, rows son los datos actuales de la página.
  
    // Generar los encabezados de las columnas
    const columnHeaders = columns.map(col => col.headerName);
  
    // Convertir las filas de datos en formato CSV
    const csvContent = [
      columnHeaders.join(","), // Cabecera de las columnas
      ...currentRows.map(row =>
        columns.map(col => row[col.field] ? row[col.field] : "").join(",") // Filas de datos
      ),
    ].join("\n");
  
    // Crear un Blob con el contenido CSV
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  
    // Crear un enlace de descarga
    const link = document.createElement("a");
  
    // Crear un URL para el Blob
    const url = URL.createObjectURL(blob);
    
    // Configurar el enlace para que descargue el archivo CSV
    link.setAttribute("href", url);
    link.setAttribute("download", "datos_exportados.csv"); // Nombre del archivo
  
    // Simular un clic en el enlace para iniciar la descarga
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
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
        <MenuItem onClick={handleExportExcel}>
          Exportar a CSV
        </MenuItem>
        </Menu>
      </div>

      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        paginationMode="server"
        rowCount={rowCount}
        loading={loading}
        page={page} // ✅ Mantiene la sincronización de la página
        rowsPerPageOptions={[5, 10, 15, 20]} // ✅ Debe coincidir con CustomPagination
        onPageChange={(newPage) => setPage(newPage)} // ✅ Sincroniza cambios de página
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)} // ✅ Sincroniza cambios de filas por página
        components={{
          Pagination: () => (
            <CustomPagination
              page={page} // ✅ Pasar la página actual
              pageCount={Math.ceil(rowCount / pageSize)} // ✅ Calcula el total de páginas
              onPageChange={setPage} // ✅ Cambia la página
              rowsPerPage={pageSize} // ✅ Tamaño de página actual
              onRowsPerPageChange={setPageSize} // ✅ Cambia la cantidad de filas por página
              totalItems={rowCount} // ✅ Pasar el total de elementos
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

      <UpdateStatusModal
        open={openUpdateModal}
        handleClose={() => setOpenUpdateModal(false)}
        operationId={selectedOperation}
        currentStatus={currentStatus}
        operationLabel={operationLabel} // Pasar el número de factura o fracción
        onUpdate={(id, status) => console.log(`Actualizar operación ${id} a estado ${status}`)}
      />


      <DeleteModal
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        operationToDelete={operationToDelete}
        onDelete={(id) => handleDeleteOperation(id)}
      />
    </div>
  );
};

export default PreOperations;
