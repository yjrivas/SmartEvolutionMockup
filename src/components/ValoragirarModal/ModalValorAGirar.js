import React, { useState } from 'react';
import { Modal, Box, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import MinimizeIcon from '@mui/icons-material/Minimize'; // Importar el ícono de minimizar
import FullscreenIcon from '@mui/icons-material/Fullscreen'; // Ícono para maximizar
import mockData from "./mockData"; // Importar datos de prueba

const ModalValorAGirar = ({ open, handleClose, data }) => {
  const [isMinimized, setIsMinimized] = useState(false); // Estado para minimizar

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  // Usa `data` o `mockData` si no se pasa `data` como prop
  const effectiveData = data || mockData;

  return (
    <>
      {/* Modal Principal */}
      <Modal open={open && !isMinimized} onClose={handleClose}>
        <Box className="modal-container">
          <div className="modal-header">
            <h2>Valor a Girar</h2>
            <div>
              <IconButton onClick={handleMinimize}>
                <MinimizeIcon /> {/* Ícono de minimizar */}
              </IconButton>
              <IconButton onClick={handleClose}>
                <ClearIcon />
              </IconButton>
            </div>
          </div>
          <div className="modal-body">
            <div className="modal-row">
              <div className="modal-column">
                <p><strong>Comisión:</strong> {effectiveData.comision}</p>
                <p><strong>IVA:</strong> {effectiveData.iva}</p>
                <p><strong>Retefuente:</strong> {effectiveData.retefuente}</p>
                <p><strong>Reteica:</strong> {effectiveData.reteica}</p>
                <p><strong>ReteIVA:</strong> {effectiveData.reteIva}</p>
              </div>
              <div className="modal-column">
                <p><strong>Otros:</strong> {effectiveData.otros}</p>
                <p><strong>Valor Inversor:</strong> {effectiveData.valorInversor}</p>
                <p><strong>Facturar Neto:</strong> {effectiveData.facturarNeto}</p>
                <p><strong>Valor Futuro:</strong> {effectiveData.valorFuturo}</p>
                <p><strong>Valor a Girar:</strong> {effectiveData.valorAGirar}</p>
              </div>
            </div>
          </div>
        </Box>
      </Modal>

      {/* Modal Minimizada */}
      {open && isMinimized && (
        <Box className="modal-minimized">
          <div className="modal-minimized-content">
            <p><strong>Comisión:</strong> {effectiveData.comision}</p>
            <p><strong>IVA:</strong> {effectiveData.iva}</p>
            <p><strong>Retefuente:</strong> {effectiveData.retefuente}</p>
            <p><strong>Reteica:</strong> {effectiveData.reteica}</p>
            <p><strong>Valor a Girar:</strong> {effectiveData.valorAGirar}</p>
            <p><strong>ReteIVA:</strong> {effectiveData.reteIva}</p>
            <p><strong>Otros:</strong> {effectiveData.otros}</p>
            <p><strong>Valor Inversor:</strong> {effectiveData.valorInversor}</p>
            <p><strong>Facturar Neto:</strong> {effectiveData.facturarNeto}</p>
            <p><strong>Valor Futuro:</strong> {effectiveData.valorFuturo}</p>

            <IconButton onClick={handleMinimize}>
              <FullscreenIcon /> {/* Ícono para maximizar */}
            </IconButton>
            <IconButton onClick={handleClose}>
              <ClearIcon /> {/* Ícono para cerrar */}
            </IconButton>
          </div>
        </Box>
      )}
    </>
  );
};

export default ModalValorAGirar;
