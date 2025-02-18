import React from "react";
import { Modal, Box, Button, Typography } from "@mui/material";

const DeleteModal = ({ open, onClose, operationToDelete, onDelete }) => {
  if (!operationToDelete) return null; // Si no hay operación, no renderizamos nada

  const isOperationApproved = operationToDelete.estado === "Aprobada"; // Verificamos si la operación está aprobada

  const handleDelete = () => {
    if (!isOperationApproved) {
      onDelete(operationToDelete.id); // Llamamos a la función de eliminación pasando el ID de la operación
      onClose(); // Cerramos el modal después de eliminar
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="modal-container">
        <div className="modal-header">
          <h3>Confirmar Eliminación</h3>
        </div>
        <Typography className="confirmation-text">
          {isOperationApproved ? (
            // Mensaje si la operación está "Aprobada"
            `La operación con factura #${operationToDelete.factura_fraccion} ya ha sido aprobada y no puede ser eliminada.`
          ) : (
            // Mensaje de confirmación de eliminación si no está aprobada
            `¿Estás seguro de que deseas eliminar la factura #${operationToDelete.factura_fraccion} de la operación ${operationToDelete.id}?`
          )}
        </Typography>
        <div className="modal-actions">
          <Button 
            onClick={handleDelete} 
            className="button-primary " 
            disabled={isOperationApproved} // Deshabilitar si la operación está "Aprobada"
          >
            Sí, Eliminar
          </Button>
          <Button onClick={onClose} className="button-primary  button-outline">
            No, Cancelar
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
