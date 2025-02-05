import React, { useState, useEffect } from "react";
import { DataGrid,} from "@mui/x-data-grid";
import axios from "axios";
import AdvancedDateRangePicker from "./AdvancedDateRangePicker";
import MoreVertIcon from "@mui/icons-material/MoreVert"; // Ícono para el menú contextual
import { Menu, MenuItem, IconButton, InputAdornment } from "@mui/material"; // Importar los componentes necesarios de Material-UI
import CustomPagination from "./CustomPagination";// Importar el componente de paginación personalizado
import ClearIcon from "@mui/icons-material/Clear"; // Importar el ícono de limpiar
import DocumentIcon from '@mui/icons-material/Description'; // Ícono para el documento
import { Tooltip } from "@mui/material"; // Importa Tooltip
//importacion de modal
import ModalValorAGirar from "./ValoragirarModal/ModalValorAGirar";

//datos de prueba
import mockData from "./ValoragirarModal/mockData";
//importacion de modal
//import Modal from "@mui/material/Modal";
import RegisterOperationForm from "../pre-operations/register/RegisterOperationForm";

// Datos de prueba
const sampleData = [
  {
    id: 1,
    factura_fraccion: "F001 / 1",
    emisor: "Nombre completo de la empresa A",
    inversionista: "Nombre completo del inversionista A",
    pagador: "Nombre completo del pagador A",
    estado: "Por aprobar",
    creado_el: "18-01-2025",
    tasa_desc: 5.0,
    tasa_inv: 4.5,
    "Valor Nominal": 100000000,
    "Valor Inversionista": 95000000,
    "Fecha probable": "18-01-2025",
    "Fecha Fin": "18-01-2025",
  },
  {
    id: 2,
    factura_fraccion: "F002 / 2",
    emisor: "Empresa B",
    inversionista: "Carlos Díaz",
    pagador: "Banco C",
    estado: "Aprobado",
    creado_el: "18-01-2025",
    tasa_desc: 5.5,
    tasa_inv: 4.7,
    "Valor Nominal": 200000000,
    "Valor Inversionista": 1900,
    "Fecha probable": "18-01-2025",
    "Fecha Fin": "18-01-2025",
  },
  {
    id: 3,
    factura_fraccion: "F003 / 3",
    emisor: "Empresa C",
    inversionista: "María López",
    pagador: "Banco A",
    estado: "Rechazado",
    creado_el: "01-03-2025",
    tasa_desc: 6.0,
    tasa_inv: 5.0,
    "Valor Nominal": 3000000000,
    "Valor Inversionista": 2800,
    "Fecha probable":"18-01-2025",
    "Fecha Fin": "18-01-2025",
  },
];

const PreOperations = () => {
  //const [rows, setRows] = useState([]);
  const [rows, setRows] = useState(sampleData);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  //const [rowCount, setRowCount] = useState(0);
  const [rowCount, setRowCount] = useState(sampleData.length);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState({ start: null, end: null });

  const [anchorEl, setAnchorEl] = useState(null); // Estado para controlar el menú
  const openMenu = Boolean(anchorEl); // Determina si el menú está abierto

  //Estado de la pestana de registro de operacion

  const [openWindow, setOpenWindow] = useState(null); // Estado para almacenar la referencia de la ventana

  // Función que maneja la apertura de la ventana de registro de operación
  const handleOpenRegisterOperation = () => {
    if (openWindow && !openWindow.closed) {
      // Si la ventana ya está abierta, solo le damos el foco (la trae al frente)
      openWindow.focus();
    } else {
      // Si la ventana no está abierta, la abrimos y guardamos la referencia
      const newWindow = window.open("/pre-operaciones/RegisterOperation", "_blank", "width=800, height=600");
      setOpenWindow(newWindow); // Guardamos la referencia de la ventana
      // Escuchar el evento de cierre de la ventana
      newWindow.onbeforeunload = () => {
        setOpenWindow(null); // Restablecer la referencia cuando la ventana se cierre
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
      setRows(response.data.results);
      setRowCount(response.data.total);
    } catch (error) {
      console.error("Error fetching data", error);
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
            badgeClass = "badge"; // Clase por defecto en caso de que no haya coincidencia
        }
  
        return <span className={badgeClass}>{params.value}</span>;
      },
    },,
    { field: "id", headerName: "ID", width: 80 },
    { field: "creado_el", headerName: "Creado el", width: 110 },
    { field: "factura_fraccion", headerName: "# Factura / Fracción", width: 90 },
    { field: "emisor", headerName: "Emisor", width: 200 },
    { field: "inversionista", headerName: "Inversionista", width: 200 },
    { field: "pagador", headerName: "Pagador", width: 150 },
    { field: "tasa_desc", headerName: "Tasa Desc.", width: 90 },
    { field: "tasa_inv", headerName: "Tasa Inv.", width: 90 },
    { field: "Valor Nominal", headerName: "Valor Nominal", width: 110,
      valueFormatter: ( {value} ) => {
        if(value == null) return "$0.00";
        return new Intl.NumberFormat("es-CO", {
          style: "currency",
          currency: "COP",
        }).format(value);
      },
     },
    { field: "Valor Inversionista", headerName: "Valor Inversionista", width: 110,
      valueFormatter: ( {value} ) => {
        if(value == null) return "$0.00";
        return new Intl.NumberFormat("es-CO", {
          style: "currency",
          currency: "COP",
        }).format(value);
     },
    },
    { field: "Fecha probable", headerName: "Fecha Probable", width: 110,
      // valueFormatter: ( {value} ) => {
      //   if(!value) return "No se ha establecido una fecha probable";
      //   const date = new Date(value); //Asegurarse de que la fecha sea válida (objeto date)
      //   if(isNaN(date.getTime())) return "Sin Fecha";
      //   return new Intl.DateTimeFormat("es-ES", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(value));
      // },
    },
    { field: "Fecha Fin", headerName: "Fecha Fin", width: 110 },
    { field: "Acciones", headerName: "Acciones", width: 90 ,
      renderCell: (params) => {
        const [anchorEl, setAnchorEl] = useState(null); // Estado para controlar el menú
        const openMenu = Boolean(anchorEl); // Determina si el menú está abierto

        const handleMenuClick = (event) => {
          setAnchorEl(event.currentTarget); // Establecer el elemento como el ancla para el menú
        };

        const handleCloseMenu = () => {
          setAnchorEl(null); // Cerrar el menú
        };

        const handleActionClick = (action) => {
          console.log(`Realizar acción: ${action}`);
          // Aquí puedes definir la lógica para cada acción
          alert(`Realizar acción: ${action}`);
          handleCloseMenu(); // Cerrar el menú después de la opción seleccionada
        };

        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            {/* Ícono de Documento - Acceso a otra vista con Tooltip */}
            <Tooltip title="Crear o ver resumen de negociación" arrow>
              <IconButton
                onClick={() => console.log("Redirigiendo a la vista de operación", params.row.id)}
                style={{ marginRight: 10 }}
              >
                <DocumentIcon />
              </IconButton>
            </Tooltip>
            {/* Menú contextual */}
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

        )
      }
      //   <Button
      //     variant="contained"
      //     color="primary"
      //     size="small"
      //     onClick={() => handleEdit(params.row.id)}
      //   >
      //     Editar
      //   </Button>
      // ),
    },
  ];



  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget); // Establecer el elemento como el ancla para el menú
  };

  const handleCloseMenu = () => {
    setAnchorEl(null); // Cerrar el menú
  };

  const handleExportXML = () => {
    // Aquí puedes definir la lógica para exportar como XML
    alert("Exportar como XML");
    handleCloseMenu(); // Cerrar el menú después de la opción seleccionada
  };

  const handleClearSearch = () => {
    setSearch(""); // Limpiar el campo de búsqueda
  }

  const [openModal, setOpenModal] = useState(false);
  const [selectedData, setSelectedData] = useState(mockData);
 
;

  const handleOpenModal = () => {
    console.log("Datos seleccionados para el modal:", selectedData);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div style={{ height: 600, width: "100%" }}>
      {/* Filtros y acciones */}
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
                  <ClearIcon sx={{ color: "#488b8f"}}/>
                </IconButton>
              </InputAdornment>
                ),
              }}
              className="search-bar"
        />
        <div>
          <button className= "button" onClick={handleOpenModal}>Valor a Girar</button>
          <ModalValorAGirar open={openModal} 
          handleClose={handleCloseModal} 
          data={selectedData} 
          />
        </div>
        <AdvancedDateRangePicker
          onDateRangeChange={(range) => setDateRange(range)}
          className="date-picker"
        />
        {/* Botón para abrir la ventana de registro de operación */}
      <button className="button" onClick={handleOpenRegisterOperation}>
        Registrar Operación
        {/*<RegisterOperationForm />/*/}
      </button>
        
        {/* Menú contextual */}
        <IconButton onClick={handleMenuClick} className="context-menu">
          <MoreVertIcon />
        </IconButton>

        {/* Menú desplegable */}
        <Menu
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleCloseMenu}
        >
          <MenuItem onClick={handleExportXML}>Exportar en Excel</MenuItem>
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
        rowsPerPageOptions={[5, 10, 20, 50]} // Mostrar opciones específicas de filas por página
        componets={{
          pagination: CustomPagination,
        }}
        //rowsPerPageOptions={[5, 10, 20, 50]}
        localeText={{
          // Traducciones personalizadas
          noRowsLabel: "No hay filas",
          toolbarPaginationRowsPerPage: "Filas por página:", // Traducción
          columnMenuLabel: "Menú de columna",
          columnMenuShowColumns: "Mostrar columnas",
          columnMenuFilter: "Filtro",
          columnMenuHideColumn: "Ocultar columna",
          columnMenuUnsort: "Desordenar",
          columnMenuSortAsc: "Ordenar ASC",
          columnMenuSortDesc: "Ordenar DESC", 
          columnMenuManageColumns: "Administrar columnas",
        }}// Traducción personalizada
        components={{
          Pagination: (props) => (
            <CustomPagination
            page={page}
            pageCount={Math.ceil(rowCount / pageSize)}
            onPageChange={setPage}
            rowsPerPage={pageSize}
            rowsPerPageOptions={[5, 10, 20, 50]}
            onRowsPerPageChange={setPageSize}
            />
          ),
        }}
      />
    </div>
  );
};

export default PreOperations;
