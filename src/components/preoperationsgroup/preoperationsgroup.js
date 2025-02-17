import React, { useState, useEffect } from "react";
import axios from "axios";
import AdvancedDateRangePicker from "../AdvancedDateRangePicker";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Menu, MenuItem, IconButton, Collapse, Table, TableBody, TableCell, TableHead, TableRow, Paper, Typography, TableContainer, Tooltip } from "@mui/material";
import CustomPagination from "../CustomPagination";
//import ClearIcon from "@mui/icons-material/Clear";
import DocumentIcon from '@mui/icons-material/Description';
import { sampleData } from "../../data/mockData";
import ModalValorAGirar from "../../components/ValoragirarModal/ModalValorAGirar";
import mockData from "../ValoragirarModal/mockData"; // Ruta corregida
import { sampleDataPreOperations } from "../../data/mockData";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Link from 'next/link';
import SearchBar from "./searchBar";

// Lógica de filtrado
const useFilteredOperations = (search) => {
  return sampleData.filter((row) =>
    row.op.toLowerCase().includes(search.toLowerCase()) ||
    row.creado_el.toLowerCase().includes(search.toLowerCase())
  );
};
//const rowsPerPageOptions = [5, 10, 15, 20]; // Asegúrate de que esta variable esté definida

const ITEMS_PER_PAGE = 5;

const getPagedDetails = (detalles, page) => {
  const startIndex = page * ITEMS_PER_PAGE;
  return detalles.slice(startIndex, startIndex + ITEMS_PER_PAGE);
};

const Row = ({ row, openRowId, setOpenRowId }) => {
  const isOpen = openRowId === row.id;
  const [page, setPage] = useState(0);

  const handleToggle = () => {
    setOpenRowId(isOpen ? null : row.id);
  };

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
          <IconButton size="small" onClick={handleToggle}>
            {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
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
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <Paper style={{ margin: 16 }}>
              <Typography variant="h6" gutterBottom component="div" className="subheader-title" sx={{ fontSize: '14px' }}>
                <span>Detalles </span>
                <span>#{row.op}</span>
              </Typography>
              <Table size="small" aria-label="detalles">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ width: "90px" }}>Estado</TableCell>
                    <TableCell style={{ width: "150px" }}>Factura</TableCell>
                    <TableCell style={{ width: "50px" }}>Fracción</TableCell>
                    <TableCell style={{ width: "180px" }}>Pagador</TableCell>
                    <TableCell style={{ width: "180px" }}>Inversionista</TableCell>
                    <TableCell style={{ width: "50px" }}>Tasa Desc.</TableCell>
                    <TableCell style={{ width: "50px" }}>Tasa Inver.</TableCell>
                    <TableCell style={{ width: "150px" }}>Valor Inversionista</TableCell>
                    <TableCell style={{ width: "150px" }}>Fecha Probable</TableCell>
                    <TableCell style={{ width: "150px" }}>Fecha Fin</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pagedDetails.map((detalle, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <span className={getBadgeClass(detalle.estado)}>{detalle.estado}</span>
                      </TableCell>
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
                <span style={{ fontSize: "10px" }}> Página {page + 1} de {totalPages} </span>
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

const OperacionesPorGrupo = () => {
  const [search, setSearch] = useState('');
  const [rows, setRows] = useState(sampleData);
  const [openRowId, setOpenRowId] = useState(null); // Estado para manejar el colapso
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  // const [rowCount, setRowCount] = useState(sampleData.length);
  const [loading, setLoading] = useState(false);
  const filteredData = useFilteredOperations(search); // Usamos el hook para obtener las operaciones filtradas
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const [openWindow, setOpenWindow] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedData, setSelectedData] = useState(sampleData);


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

  const handleOpenModal = (rowData = null) => {
    if (rowData) {
      setSelectedData(rowData); // Si se pasa una fila, usa sus datos
    } else {
      setSelectedData(null); // Si no, muestra datos generales
    }
    setOpenModal(true);
  };
  
  


  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const [rowsPerPage, setRowsPerPage] = useState(5); // ✅ Define rowsPerPage con un valor inicial


  return (
    <div style={{ height: 600, width: "100%" }}>
      <div className="search-and-actions-container">
        {/* Barra de búsqueda */}
        <SearchBar
          data={sampleData}
          onSearch={(searchTerm) => setSearch(searchTerm)}
          placeholder="Buscar o filtrar resultados..."
          searchKeys={["op", "emisor", "factura"]}
          style={{ flex: 1, minWidth: "250px" }} // Se asegura de que no se reduzca demasiado
        />

        {/* Botones alineados en una sola línea */}
        <Link href="/pre-operaciones">
          <button className="button">Ver Por Factura</button>
        </Link>

         {/* El botón de Valor a Girar siempre estará visible, pero el contenido cambiará según la fila seleccionada */}
        <button className="button" onClick={handleOpenModal} disabled={!selectedData}>
          Valor a Girar
        </button>

        <ModalValorAGirar open={openModal} handleClose={handleCloseModal} data={selectedData} />


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
          <MenuItem onClick={() => console.log("Exportar en Excel")}>Exportar en Excel</MenuItem>
        </Menu>
      </div>
      <TableContainer component={Paper}>
        <Table aria-label="operaciones">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Operación</TableCell>
              <TableCell>Creado El</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Facturas</TableCell>
              <TableCell>Emisor</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE).map((row) => (
              <Row
                key={row.id}
                row={row}
                openRowId={openRowId}
                setOpenRowId={setOpenRowId}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CustomPagination
        page={page}
        pageCount={Math.ceil(filteredData.length / rowsPerPage)} // ✅ Usa filteredData.length
        onPageChange={setPage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={setRowsPerPage}
        totalItems={filteredData.length} // ✅ Pasa el número total de elementos
      />


    </div>
  );
};

export default OperacionesPorGrupo;