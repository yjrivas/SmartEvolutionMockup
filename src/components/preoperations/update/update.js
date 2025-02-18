import React, { useState, useEffect } from "react";
import { Box, Button, MenuItem, Modal, Select, Typography } from "@mui/material";

const UpdateStatusModal = ({ open, handleClose, operationId, currentStatus, onUpdate, onUpdateAll }) => {
  const [status, setStatus] = useState(currentStatus);
  const [isConfirming, setIsConfirming] = useState(false);
  const [operationLabel, setOperationLabel] = useState(`Factura: ${operationId ? operationId : "Sin ID"}`);

  // Asegurar que operationLabel se actualiza cuando operationId cambie
  useEffect(() => {
    setOperationLabel(`Factura: ${operationId || "Sin ID"}`);
  }, [operationId]);

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleUpdateCurrent = () => {
    if (operationId) {
      onUpdate(operationId, status, handleClose);
    } else {
      console.error("No se proporcionó un ID de operación válido.");
    }
  };

  const handleConfirmUpdate = () => {
    setIsConfirming(true);
    setOperationLabel("Factura: Todas");
  };

  const handleUpdateAll = () => {
    onUpdateAll(status, handleClose);
  };

  const handleResetModal = () => {
    setIsConfirming(false);
    setOperationLabel(`Factura: ${operationId || "Sin ID"}`);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="modal-container">
        <div className="modal-header">
          <h3>Actualizar Estado:</h3>
          <span className="operation-id" style={{ fontWeight: "bold", marginLeft: "8px" }}>
            {operationLabel}
          </span>
        </div>

        {!isConfirming ? (
          <>
            <Select
              value={status}
              onChange={handleStatusChange}
              className="status-select"
              sx={{ width: "100%", height: "40px" }}
            >
              <MenuItem value="Aprobado">Aprobado</MenuItem>
              <MenuItem value="Rechazado">Rechazado</MenuItem>
            </Select>

            <div className="modal-actions">
              <Button onClick={handleConfirmUpdate} className="button-update-all" disabled={!status}>
                Actualizar Todos
              </Button>
              <Button onClick={handleUpdateCurrent} className="button-outline" disabled={!status}>
                Actualizar
              </Button>
            </div>
          </>
        ) : (
          <>
            <Typography className="confirmation-text">
              Está por actualizar todas las facturas con el estado:
              <strong className="confirmation-text strong"> {status} </strong>. ¿Desea continuar?
            </Typography>
            <div className="modal-actions">
              <Button onClick={handleUpdateAll} className=" button-outline button-primary" disabled={!status}>
                Sí, Actualizar
              </Button>
              <Button onClick={handleResetModal} className="cancel-button button-outline button-primary">
                No, Volver
              </Button>
            </div>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default UpdateStatusModal;
