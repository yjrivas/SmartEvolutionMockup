import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import AdvancedDateRangePicker from "./AdvancedDateRangePicker2";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Menu, MenuItem, IconButton, InputAdornment, Collapse, Table, TableBody, TableCell, TableHead, TableRow, Paper, Typography } from "@mui/material";
import CustomPagination from "./CustomPagination";
import ClearIcon from "@mui/icons-material/Clear";
import DocumentIcon from '@mui/icons-material/Description';
import { Tooltip } from "@mui/material";
import ModalValorAGirar from "./ValoragirarModal/ModalValorAGirar";
import mockData from "./ValoragirarModal/mockData";
import RegisterOperationForm from "../pre-operations/register/RegisterOperationForm";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

//Datos de pruebas 
const sampleData = [
  {
    id: 1,
    estado: "Por aprobar",
    op: "P-013",
    creado_el: "13 Ago 2024",
    tipo: "Compra título",
    facturas: 6,
    emisor: "EMISOR A",
    detalles: [
      {
        factura: "10001",
        fraccion: "1",
        pagador: "PAGADOR A",
        inversionista: "INVERSIONISTA A",
        tasaDesc: "26.46%",
        tasaInver: "15.44%",
        valorInversionista: "$100,000,000.00",
        fechaProbable: "24 Oct 2025",
        fechaFin: "05 Dic 2025"
      },
      {
        factura: "10002",
        fraccion: "2",
        pagador: "PAGADOR B",
        inversionista: "INVERSIONISTA B",
        tasaDesc: "24.50%",
        tasaInver: "14.20%",
        valorInversionista: "$50,000,000.00",
        fechaProbable: "15 Nov 2025",
        fechaFin: "20 Ene 2026"
      },
      {
        factura: "10003",
        fraccion: "3",
        pagador: "PAGADOR C",
        inversionista: "INVERSIONISTA C",
        tasaDesc: "23.10%",
        tasaInver: "13.75%",
        valorInversionista: "$30,000,000.00",
        fechaProbable: "05 Dic 2025",
        fechaFin: "10 Feb 2026"
      },
      {
        factura: "10004",
        fraccion: "4",
        pagador: "PAGADOR D",
        inversionista: "INVERSIONISTA D",
        tasaDesc: "22.00%",
        tasaInver: "12.50%",
        valorInversionista: "$40,000,000.00",
        fechaProbable: "20 Dic 2025",
        fechaFin: "15 Mar 2026"
      },
      {
        factura: "10005",
        fraccion: "5",
        pagador: "PAGADOR E",
        inversionista: "INVERSIONISTA E",
        tasaDesc: "21.50%",
        tasaInver: "12.00%",
        valorInversionista: "$20,000,000.00",
        fechaProbable: "10 Ene 2026",
        fechaFin: "20 Abr 2026"
      },
      {
        factura: "10006",
        fraccion: "6",
        pagador: "PAGADOR F",
        inversionista: "INVERSIONISTA F",
        tasaDesc: "20.75%",
        tasaInver: "11.75%",
        valorInversionista: "$25,000,000.00",
        fechaProbable: "05 Feb 2026",
        fechaFin: "25 May 2026"
      }
    ]
  },
  {
    id: 2,
    estado: "Aprobado",
    op: "P-014",
    creado_el: "10 Ago 2024",
    tipo: "Venta título",
    facturas: 3,
    emisor: "EMISOR B",
    detalles: [
      {
        factura: "20001",
        fraccion: "1",
        pagador: "PAGADOR C",
        inversionista: "INVERSIONISTA C",
        tasaDesc: "22.30%",
        tasaInver: "13.80%",
        valorInversionista: "$75,000,000.00",
        fechaProbable: "10 Oct 2025",
        fechaFin: "30 Dic 2025"
      },
      {
        factura: "20002",
        fraccion: "2",
        pagador: "PAGADOR D",
        inversionista: "INVERSIONISTA D",
        tasaDesc: "21.00%",
        tasaInver: "12.90%",
        valorInversionista: "$40,000,000.00",
        fechaProbable: "05 Nov 2025",
        fechaFin: "10 Feb 2026"
      },
      {
        factura: "20003",
        fraccion: "3",
        pagador: "PAGADOR E",
        inversionista: "INVERSIONISTA E",
        tasaDesc: "23.75%",
        tasaInver: "14.50%",
        valorInversionista: "$60,000,000.00",
        fechaProbable: "20 Nov 2025",
        fechaFin: "15 Ene 2026"
      }
    ]
  },
  {
    id: 3,
    estado: "Aprobado",
    op: "P-015",
    creado_el: "08 Ago 2024",
    tipo: "Leasing",
    facturas: 1,
    emisor: "EMISOR C",
    detalles: [
      {
        factura: "30001",
        fraccion: "1",
        pagador: "PAGADOR F",
        inversionista: "INVERSIONISTA F",
        tasaDesc: "20.00%",
        tasaInver: "12.00%",
        valorInversionista: "$90,000,000.00",
        fechaProbable: "18 Oct 2025",
        fechaFin: "05 Ene 2026"
      }
    ]
  },
  {
    id: 4,
    estado: "Rechazado",
    op: "P-016",
    creado_el: "05 Ago 2024",
    tipo: "Factoring",
    facturas: 2,
    emisor: "EMISOR D",
    detalles: [
      {
        factura: "40001",
        fraccion: "1",
        pagador: "PAGADOR G",
        inversionista: "INVERSIONISTA G",
        tasaDesc: "19.50%",
        tasaInver: "11.50%",
        valorInversionista: "$85,000,000.00",
        fechaProbable: "22 Sep 2025",
        fechaFin: "10 Dic 2025"
      },
      {
        factura: "40002",
        fraccion: "2",
        pagador: "PAGADOR H",
        inversionista: "INVERSIONISTA H",
        tasaDesc: "18.75%",
        tasaInver: "10.75%",
        valorInversionista: "$70,000,000.00",
        fechaProbable: "15 Oct 2025",
        fechaFin: "25 Dic 2025"
      }
    ]
  },
  {
    id: 5,
    estado: "Por aprobar",
    op: "P-017",
    creado_el: "02 Ago 2024",
    tipo: "Descuento de pagaré",
    facturas: 3,
    emisor: "EMISOR E",
    detalles: [
      {
        factura: "50001",
        fraccion: "1",
        pagador: "PAGADOR I",
        inversionista: "INVERSIONISTA I",
        tasaDesc: "25.00%",
        tasaInver: "14.00%",
        valorInversionista: "$95,000,000.00",
        fechaProbable: "30 Sep 2025",
        fechaFin: "15 Ene 2026"
      },
      {
        factura: "50002",
        fraccion: "2",
        pagador: "PAGADOR J",
        inversionista: "INVERSIONISTA J",
        tasaDesc: "24.25%",
        tasaInver: "13.50%",
        valorInversionista: "$65,000,000.00",
        fechaProbable: "12 Oct 2025",
        fechaFin: "20 Dic 2025"
      },
      {
        factura: "50003",
        fraccion: "3",
        pagador: "PAGADOR K",
        inversionista: "INVERSIONISTA K",
        tasaDesc: "26.00%",
        tasaInver: "15.00%",
        valorInversionista: "$80,000,000.00",
        fechaProbable: "05 Nov 2025",
        fechaFin: "25 Ene 2026"
      }
    ]
  }
];


// const Row = ({ row }) => {
//   const [open, setOpen] = useState(false);

const ITEMS_PER_PAGE = 5;

const getPagedDetails = (detalles, page) => {
  const startIndex = page * ITEMS_PER_PAGE;
  return detalles.slice(startIndex, startIndex + ITEMS_PER_PAGE);
};
  
const Row = ({ row }) => {
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(0);
  
  // Obtenemos los detalles paginados para esta fila
  const pagedDetails = getPagedDetails(row.detalles, page);
  const totalPages = Math.ceil(row.detalles.length / ITEMS_PER_PAGE); 

  // Función para asignar clase de color al badge según el estado
  const getBadgeClass = (estado) => {
    switch (estado) {
      case "Por aprobar":
        return "badge por-aprobar";
      case "Aprobado":
        return "badge aprobado";
      case "Rechazado":
        return "badge rechazado";
      default:
        return "badge";
    }
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {/* Renderizar el badge con color */}
        <TableCell>
          <span className={getBadgeClass(row.estado)}>{row.estado}</span>
        </TableCell>
        <TableCell>{row.op}</TableCell>
        <TableCell>{row.creado_el}</TableCell>
        <TableCell>{row.tipo}</TableCell>
        <TableCell>{row.facturas}</TableCell>
        <TableCell>{row.emisor}</TableCell>
        <TableCell>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Tooltip title="Crear o ver resumen de negociación" arrow>
              <IconButton
                onClick={() => console.log("Redirigiendo a la vista de operación", row.id)}
                style={{ marginRight: 10 }}
              >
                <DocumentIcon />
              </IconButton>
            </Tooltip>
            <IconButton onClick={(event) => handleMenuClick(event, row.id)} className="context-menu">
              <MoreVertIcon />
            </IconButton>
          </div>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Paper style={{ margin: 16 }}>
              <Typography variant="h6" gutterBottom component="div" className="subheader-title">
                <span>Detalles de la Operación</span>
                <span>#{row.id}</span> {/* Aquí mostramos el ID de la operación */}
              </Typography>
              <Table size="small" aria-label="detalles">
                <TableHead>
                  <TableRow>
                    <TableCell>Factura</TableCell>
                    <TableCell>Fracción</TableCell>
                    <TableCell>Pagador</TableCell>
                    <TableCell>Inversionista</TableCell>
                    <TableCell>Tasa Desc.</TableCell>
                    <TableCell>Tasa Inver.</TableCell>
                    <TableCell>Valor Inversionista</TableCell>
                    <TableCell>Fecha Probable</TableCell>
                    <TableCell>Fecha Fin</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pagedDetails.map((detalle, index) => (
                    <TableRow key={index}>
                      <TableCell>{detalle.factura}</TableCell>
                      <TableCell>{detalle.fraccion}</TableCell>
                      <TableCell>{detalle.pagador}</TableCell>
                      <TableCell>{detalle.inversionista}</TableCell>
                      <TableCell>{detalle.tasaDesc}</TableCell>
                      <TableCell>{detalle.tasaInver}</TableCell>
                      <TableCell>{detalle.valorInversionista}</TableCell>
                      <TableCell>{detalle.fechaProbable}</TableCell>
                      <TableCell>{detalle.fechaFin}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
                <div style={{ display: "flex", justifyContent: "flex-end", gap: "5px", marginTop: "10px" }}>
                  <button style={{ color: "#488b8f", background: "none", border: "none", fontSize: "16px" }} onClick={() => setPage(0)} disabled={page === 0}>⏮</button>
                  <button style={{ color: "#488b8f", background: "none", border: "none", fontSize: "16px" }} onClick={() => setPage(page - 1)} disabled={page === 0}>◀</button>
                  <span syle={{fontSize: "10px"}}> Página {page + 1} de {totalPages} </span>
                  <button style={{ color: "#488b8f", background: "none", border: "none", fontSize: "16px" }} onClick={() => setPage(page + 1)} disabled={page + 1 >= totalPages}>▶</button>
                  <button style={{ color: "#488b8f", background: "none", border: "none", fontSize: "16px" }} onClick={() => setPage(totalPages - 1)} disabled={page + 1 >= totalPages}>⏭</button>
                </div>
            </Paper>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};


const PreOperations = () => {
  const [rows, setRows] = useState(sampleData);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [rowCount, setRowCount] = useState(sampleData.length);
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

  const handleMenuClick = (event, rowId) => {
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
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Estado</TableCell>
            <TableCell># OP</TableCell>
            <TableCell>Creado el</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Facturas</TableCell>
            <TableCell>Emisor</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PreOperations;
// import React, { useState, useEffect } from "react";
// import { DataGrid } from "@mui/x-data-grid";
// import axios from "axios";
// import AdvancedDateRangePicker from "./AdvancedDateRangePicker";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import { Menu, MenuItem, IconButton, InputAdornment } from "@mui/material";
// import CustomPagination from "./CustomPagination";
// import ClearIcon from "@mui/icons-material/Clear";
// import DocumentIcon from '@mui/icons-material/Description';
// import { Tooltip } from "@mui/material";
// import ModalValorAGirar from "./ValoragirarModal/ModalValorAGirar";
// import mockData from "./ValoragirarModal/mockData";
// import RegisterOperationForm from "../pre-operations/register/RegisterOperationForm";

// // Datos de prueba
// const sampleData = [
//   {
//     id: 1,
//     factura_fraccion: "F001 / 1",
//     emisor: "Nombre completo de la empresa A",
//     inversionista: "Nombre completo del inversionista A",
//     pagador: "Nombre completo del pagador A",
//     estado: "Por aprobar",
//     creado_el: "18-01-2025",
//     tasa_desc: 5.0,
//     porcentaje_desc: 15, // Nuevo campo
//     tasa_inv: 4.5,
//     "Valor Nominal": 100000000,
//     "Valor Inversionista": 95000000,
//     "Fecha probable": "18-01-2025",
//     "Fecha Fin": "18-01-2025",
//   },
//   {
//     id: 1,
//     factura_fraccion: "F0021 / 1",
//     emisor: "Nombre completo de la empresa A",
//     inversionista: "Nombre completo del inversionista R",
//     pagador: "Nombre completo del pagador A",
//     estado: "Por aprobar",
//     creado_el: "18-01-2025",
//     tasa_desc: 5.0,
//     porcentaje_desc: 10, // Nuevo campo
//     tasa_inv: 4.5,
//     "Valor Nominal": 100000000,
//     "Valor Inversionista": 95000000,
//     "Fecha probable": "18-01-2025",
//     "Fecha Fin": "18-01-2025",
//   },
//   {
//     id: 2,
//     factura_fraccion: "F002 / 2",
//     emisor: "Empresa B",
//     inversionista: "Carlos Díaz",
//     pagador: "Banco C",
//     estado: "Aprobado",
//     creado_el: "18-01-2025",
//     tasa_desc: 5.5,
//     porcentaje_desc: 20, // Nuevo campo
//     tasa_inv: 4.7,
//     "Valor Nominal": 200000000,
//     "Valor Inversionista": 1900,
//     "Fecha probable": "18-01-2025",
//     "Fecha Fin": "18-01-2025",
//   },
//   {
//     id: 3,
//     factura_fraccion: "F003 / 3",
//     emisor: "Empresa C",
//     inversionista: "María López",
//     pagador: "Banco A",
//     estado: "Rechazado",
//     creado_el: "01-03-2025",
//     tasa_desc: 6.0,
//     porcentaje_desc: 25, // Nuevo campo
//     tasa_inv: 5.0,
//     "Valor Nominal": 3000000000,
//     "Valor Inversionista": 2800,
//     "Fecha probable": "18-01-2025",
//     "Fecha Fin": "18-01-2025",
//   },
// ];

// const PreOperations = () => {
//   const [rows, setRows] = useState(sampleData);
//   const [page, setPage] = useState(0);
//   const [pageSize, setPageSize] = useState(10);
//   const [rowCount, setRowCount] = useState(sampleData.length);
//   const [loading, setLoading] = useState(false);
//   const [search, setSearch] = useState("");
//   const [dateRange, setDateRange] = useState({ start: null, end: null });
//   const [anchorEl, setAnchorEl] = useState(null);
//   const openMenu = Boolean(anchorEl);
//   const [openWindow, setOpenWindow] = useState(null);
//   const [openModal, setOpenModal] = useState(false);
//   const [selectedData, setSelectedData] = useState(mockData);

//   const handleOpenRegisterOperation = () => {
//     if (openWindow && !openWindow.closed) {
//       openWindow.focus();
//     } else {
//       const newWindow = window.open("/pre-operaciones/RegisterOperation", "_blank", "width=800, height=600");
//       setOpenWindow(newWindow);
//       newWindow.onbeforeunload = () => {
//         setOpenWindow(null);
//       };
//     }
//   };

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get("/api/preoperaciones", {
//         params: {
//           page: page + 1,
//           page_size: pageSize,
//           search,
//           start_date: dateRange.start,
//           end_date: dateRange.end,
//         },
//       });
//       setRows(response.data.results);
//       setRowCount(response.data.total);
//     } catch (error) {
//       console.error("Error fetching data", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [page, pageSize, search, dateRange]);

//   const columns = [
//     { field: "estado", headerName: "Estado", width: 160,
//       renderCell: (params) => {
//         let badgeClass = "";
//         switch (params.value) {
//           case "Por aprobar":
//             badgeClass = "badge por-aprobar";
//             break;
//           case "Aprobado":
//             badgeClass = "badge aprobado";
//             break;
//           case "Rechazado":
//             badgeClass = "badge rechazado";
//             break;
//           default:
//             badgeClass = "badge";
//         }
//         return <span className={badgeClass}>{params.value}</span>;
//       },
//     },
//     { field: "id", headerName: "ID", width: 80 },
//     { field: "creado_el", headerName: "Creado el", width: 110 },
//     { field: "factura_fraccion", headerName: "# Factura / Fracción", width: 90 },
//     { field: "emisor", headerName: "Emisor", width: 200 },
//     { field: "inversionista", headerName: "Inversionista", width: 200 },
//     { field: "pagador", headerName: "Pagador", width: 150 },
//     { field: "tasa_desc", headerName: "Tasa Desc.", width: 90 },
//     { field: "porcentaje_desc", headerName: "% Desc.", width: 90 }, // Nueva columna
//     { field: "tasa_inv", headerName: "Tasa Inv.", width: 90 },
//     { field: "Valor Nominal", headerName: "Valor Nominal", width: 110,
//       valueFormatter: ({ value }) => {
//         if (value == null) return "$0.00";
//         return new Intl.NumberFormat("es-CO", {
//           style: "currency",
//           currency: "COP",
//         }).format(value);
//       },
//     },
//     { field: "Valor Inversionista", headerName: "Valor Inversionista", width: 110,
//       valueFormatter: ({ value }) => {
//         if (value == null) return "$0.00";
//         return new Intl.NumberFormat("es-CO", {
//           style: "currency",
//           currency: "COP",
//         }).format(value);
//       },
//     },
//     { field: "Fecha probable", headerName: "Fecha Probable", width: 110 },
//     { field: "Fecha Fin", headerName: "Fecha Fin", width: 110 },
//     { field: "Acciones", headerName: "Acciones", width: 90,
//       renderCell: (params) => {
//         const [anchorEl, setAnchorEl] = useState(null);
//         const openMenu = Boolean(anchorEl);

//         const handleMenuClick = (event) => {
//           setAnchorEl(event.currentTarget);
//         };

//         const handleCloseMenu = () => {
//           setAnchorEl(null);
//         };

//         const handleActionClick = (action) => {
//           console.log(`Realizar acción: ${action}`);
//           alert(`Realizar acción: ${action}`);
//           handleCloseMenu();
//         };

//         return (
//           <div style={{ display: "flex", justifyContent: "center" }}>
//             <Tooltip title="Crear o ver resumen de negociación" arrow>
//               <IconButton
//                 onClick={() => console.log("Redirigiendo a la vista de operación", params.row.id)}
//                 style={{ marginRight: 10 }}
//               >
//                 <DocumentIcon />
//               </IconButton>
//             </Tooltip>
//             <IconButton onClick={handleMenuClick} className="context-menu">
//               <MoreVertIcon />
//             </IconButton>
//             <Menu anchorEl={anchorEl} open={openMenu} onClose={handleCloseMenu}>
//               <MenuItem onClick={() => handleActionClick("Actualizar Estado")}>
//                 Actualizar Estado
//               </MenuItem>
//               <MenuItem onClick={() => handleActionClick("Ver Operación")}>
//                 Ver Operación
//               </MenuItem>
//               <MenuItem onClick={() => handleActionClick("Editar")}>Editar</MenuItem>
//               <MenuItem onClick={() => handleActionClick("Eliminar")}>
//                 Eliminar
//               </MenuItem>
//             </Menu>
//           </div>
//         );
//       },
//     },
//   ];

//   const handleMenuClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleCloseMenu = () => {
//     setAnchorEl(null);
//   };

//   const handleExportXML = () => {
//     alert("Exportar como XML");
//     handleCloseMenu();
//   };

//   const handleClearSearch = () => {
//     setSearch("");
//   };

//   const handleOpenModal = () => {
//     console.log("Datos seleccionados para el modal:", selectedData);
//     setOpenModal(true);
//   };

//   const handleCloseModal = () => {
//     setOpenModal(false);
//   };

//   return (
//     <div style={{ height: 600, width: "100%" }}>
//       <div className="search-and-actions-container">
//         <input
//           type="text"
//           placeholder="Buscar o filtrar resultados..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           inputProps={{
//             endAdornment: search && (
//               <InputAdornment position="end">
//                 <IconButton onClick={handleClearSearch}>
//                   <ClearIcon sx={{ color: "#488b8f" }} />
//                 </IconButton>
//               </InputAdornment>
//             ),
//           }}
//           className="search-bar"
//         />
//         <div>
//           <button className="button" onClick={handleOpenModal}>Valor a Girar</button>
//           <ModalValorAGirar open={openModal} handleClose={handleCloseModal} data={selectedData} />
//         </div>
//         <AdvancedDateRangePicker
//           onDateRangeChange={(range) => setDateRange(range)}
//           className="date-picker"
//         />
//         <button className="button" onClick={handleOpenRegisterOperation}>
//           Registrar Operación
//         </button>
//         <IconButton onClick={handleMenuClick} className="context-menu">
//           <MoreVertIcon />
//         </IconButton>
//         <Menu anchorEl={anchorEl} open={openMenu} onClose={handleCloseMenu}>
//           <MenuItem onClick={handleExportXML}>Exportar en Excel</MenuItem>
//         </Menu>
//       </div>
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         pageSize={pageSize}
//         onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
//         paginationMode="server"
//         rowCount={rowCount}
//         onPageChange={(newPage) => setPage(newPage)}
//         loading={loading}
//         rowsPerPageOptions={[5, 10, 20, 50]}
//         components={{
//           Pagination: (props) => (
//             <CustomPagination
//               page={page}
//               pageCount={Math.ceil(rowCount / pageSize)}
//               onPageChange={setPage}
//               rowsPerPage={pageSize}
//               rowsPerPageOptions={[5, 10, 20, 50]}
//               onRowsPerPageChange={setPageSize}
//             />
//           ),
//         }}
//         localeText={{
//           noRowsLabel: "No hay filas",
//           toolbarPaginationRowsPerPage: "Filas por página:",
//           columnMenuLabel: "Menú de columna",
//           columnMenuShowColumns: "Mostrar columnas",
//           columnMenuFilter: "Filtro",
//           columnMenuHideColumn: "Ocultar columna",
//           columnMenuUnsort: "Desordenar",
//           columnMenuSortAsc: "Ordenar ASC",
//           columnMenuSortDesc: "Ordenar DESC",
//           columnMenuManageColumns: "Administrar columnas",
//         }}
//       />
//     </div>
//   );
// };

// export default PreOperations;