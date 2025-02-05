import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { Menu, MenuItem, IconButton, Tooltip } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DocumentIcon from "@mui/icons-material/Description";
import CustomPagination from "./CustomPagination";
import mockData from "./ValoragirarModal/mockData"; // Datos de prueba

const Operations = () => {
  const [rows, setRows] = useState([]);
  const [groupedRows, setGroupedRows] = useState([]);
  const [selectedOperation, setSelectedOperation] = useState(null);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [rowCount, setRowCount] = useState(0);

  // Cargar datos de prueba inicialmente
  useEffect(() => {
    setRows(mockData);
    setRowCount(mockData.length);
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/preoperaciones", {
        params: { page: page + 1, page_size: pageSize },
      });
      setRows(response.data.results);
      setRowCount(response.data.total_count); // Ajustar el número total de filas
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, pageSize]);

  const handleGroupOperations = () => {
    const grouped = rows.reduce((acc, row) => {
      const groupKey = row.estado;
      if (!acc[groupKey]) acc[groupKey] = { id: groupKey, estado: groupKey, children: [] };
      acc[groupKey].children.push(row);
      return acc;
    }, {});
    setGroupedRows(Object.values(grouped));
  };

  const columns = [
    { field: "estado", headerName: "Estado", width: 160 },
    { field: "id", headerName: "ID", width: 80 },
    { field: "creado_el", headerName: "Creado el", width: 110 },
    { field: "emisor", headerName: "Emisor", width: 200 },
    { field: "tasa_desc", headerName: "Tasa Desc.", width: 90 },
    { field: "tasa_inv", headerName: "Tasa Inv.", width: 90 },
    { field: "Valor Nominal", headerName: "Valor Nominal", width: 110 },
    { field: "Valor Inversionista", headerName: "Valor Inversionista", width: 110 },
    {
      field: "Acciones",
      headerName: "Acciones",
      width: 90,
      renderCell: (params) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Tooltip title="Ver Detalles">
            <IconButton onClick={() => handleOperationRowClick(params.row.id)}>
              <DocumentIcon />
            </IconButton>
          </Tooltip>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  const operationColumns = [
    { field: "factura_fraccion", headerName: "# Factura / Fracción", width: 150 },
    { field: "emisor", headerName: "Emisor", width: 200 },
    { field: "inversionista", headerName: "Inversionista", width: 200 },
    { field: "tasa_desc", headerName: "Tasa Desc.", width: 90 },
    { field: "tasa_inv", headerName: "Tasa Inv.", width: 90 },
    { field: "Valor Nominal", headerName: "Valor Nominal", width: 110 },
    { field: "Valor Inversionista", headerName: "Valor Inversionista", width: 110 },
  ];

  const handleOperationRowClick = (operationId) => {
    const selectedOp = groupedRows.find((op) => op.id === operationId);
    setSelectedOperation(selectedOp);
  };

  return (
    <div style={{ height: 600, width: "100%" }}>
      <button onClick={handleGroupOperations}>Agrupar Operaciones</button>
      {selectedOperation ? (
        <>
          <h3>Detalles de la Operación: {selectedOperation.estado}</h3>
          <DataGrid
            rows={selectedOperation.children}
            columns={operationColumns}
            pageSize={5}
            loading={loading}
          />
        </>
      ) : (
        <DataGrid
          rows={groupedRows.length > 0 ? groupedRows : rows}
          columns={columns}
          pageSize={pageSize}
          paginationMode="server"
          rowCount={rowCount}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onPageChange={(newPage) => setPage(newPage)}
          loading={loading}
          rowsPerPageOptions={[5, 10, 20, 50]}
          components={{ Pagination: CustomPagination }}
        />
      )}
    </div>
  );
};

 export default Operations;
