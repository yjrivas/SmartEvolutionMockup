import { useState, useEffect, useMemo } from "react";
import { AppBar, Avatar, Box, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import Notifications from "../components/notificaciones/notification"; // Importamos el componente Notifications

const user = { name: "Yorvis" }; // Nombre del usuario

const Header = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Factura vencida",
      body: "La factura #3030303 del emisor 'Empresa XYZ' se ha vencido.",
      timestamp: new Date(),
    },
    {
      id: 2,
      title: "Factura vencida",
      body: "La factura #3030304 del emisor 'Empresa ABC' se ha vencido.",
      timestamp: new Date(),
    },
  ]);

  const [newNotifications, setNewNotifications] = useState(2); // Cantidad de notificaciones nuevas

  const nameInitials = useMemo(
    () =>
      user.name
        .split(" ")
        .map((name, i) => (i > 1 ? "" : name[0].toUpperCase()))
        .join(""),
    [user.name]
  );

  // Estados para controlar el menú del avatar
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  // Estado para la hora
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  // Actualizar la hora cada segundo
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(interval);
  }, []);

  // Manejar el clic en el avatar para abrir/cerrar el menú
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget); // Establecemos el ancla en el avatar
    setOpen(true); // Abrimos el menú
  };

  // Cerrar el menú
  const handleClose = () => {
    setOpen(false);
  };

  // Manejar el clic en una notificación (puedes agregar lógica para abrir una vista detallada)
  const handleNotificationClick = (notification) => {
    console.log("Ver notificación completa", notification.id);
    // Aquí puedes agregar la lógica para redirigir a la vista completa de la notificación
  };

  return (
    <AppBar elevation={0} position="relative" sx={{ backgroundColor: "#fff", borderBottom: "1.4px solid #5EA3A380", padding: "0% 5%" }}>
      <Toolbar disableGutters sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>

        {/* Logo importado desde S3 */}
        <Box sx={{ aspectRatio: "90/30", width: "max(90px + 2vw, 45px)" }}>
          <img src="https://smartevolution.s3.amazonaws.com/assets/logo-smart.png" alt="Logo Smart Evolution" style={{ width: "100%", height: "auto" }} />
        </Box>

        {/* Mensaje de Bienvenida */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="h6" sx={{ color: "#488B8F", fontWeight: "bold" }}>
            ¡Bienvenido, {user.name}!
          </Typography>
        </Box>

        {/* Hora actual */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="body1" sx={{ color: "#555" }}>
            {currentTime}
          </Typography>

          {/* Componente de Notificaciones */}
          <Notifications 
            notifications={notifications}
            newNotifications={newNotifications}
            onNotificationClick={handleNotificationClick} 
          />

          {/* Avatar del Usuario */}
          <IconButton onClick={handleMenuClick}>
            <Avatar sx={{ bgcolor: deepPurple[500], cursor: "pointer" }}>
              {nameInitials}
            </Avatar>
          </IconButton>

          {/* Menú del Usuario */}
          <Menu
            id="user-menu"
            anchorEl={anchorEl} // Usamos anchorEl para anclar el menú al avatar
            open={open} // El menú se abre si `open` es true
            onClose={handleClose} // Cerramos el menú cuando se hace clic afuera
          >
            <MenuItem onClick={() => console.log("Ver Perfil")}>Ver Perfil</MenuItem>
            <MenuItem onClick={() => console.log("Cerrar sesión")}>Cerrar sesión</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
