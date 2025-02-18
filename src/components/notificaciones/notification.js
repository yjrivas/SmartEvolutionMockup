import { useState, useEffect } from "react";
import { IconButton, Menu, MenuItem, Box, Typography } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

const Notifications = ({ notifications, newNotifications, onNotificationClick }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Mostrar el mensaje cuando se ingresa a la vista
  useEffect(() => {
    if (newNotifications > 0) {
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000); // Mensaje visible por 3 segundos
    }
  }, [newNotifications]);

  return (
    <>
      {/* Mensaje de notificación (globo) */}
      {showMessage && (
        <Box className="notification-bubble">
          <Typography variant="body2" color="white">
            Tienes nuevas notificaciones
          </Typography>
        </Box>
      )}

      {/* Icono de Notificaciones */}
      <IconButton onClick={handleClick}>
        <NotificationsIcon sx={{
          width: 40,
          height: 40,
          color: newNotifications > 0 ? "#488B8F" : "#D3D3D3",
          fontSize: 24,
          position: "relative",
        }} />
        {newNotifications > 0 && (
          <Box
            sx={{
              position: "absolute",
              top: -5,
              right: -5,
              backgroundColor: "#FF0000",
              color: "#fff",
              borderRadius: "50%",
              width: "18px",
              height: "18px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "12px",
            }}
          >
            {newNotifications}
          </Box>
        )}
      </IconButton>

      {/* Menú de Notificaciones */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {notifications.map((notification) => (
          <MenuItem
            key={notification.id}
            onClick={() => onNotificationClick(notification)}
          >
            <Box>
              {/* Título */}
              <Typography variant="body2" sx={{ fontWeight: "bold", fontSize: "1rem", color: "var(--primary-color)" }}>
                {notification.title}
              </Typography>
              {/* Contenido */}
              <Typography variant="body2" sx={{ fontSize: "0.9rem", color: "var(--text-color)" }}>
                {notification.body}
              </Typography>
              {/* Fecha y Hora */}
              <Typography variant="body2" sx={{ fontSize: "0.75rem", color: "var(--secondary-color)" }}>
                {notification.timestamp.toLocaleString()}
              </Typography>
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default Notifications;
