// components/Sidebar.js
import { useState } from "react";
import Link from "next/link";
import { Drawer, Box, IconButton, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { ReactComponent as Logo } from "@mui/icons-material/Home"; // O cualquier otro logo

const containerSx = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  boxSizing: "border-box",
  height: "100%",
  width: 250, // Ancho del Sidebar
  backgroundColor: "#FFFFFF", // Fondo blanco del Sidebar
  borderRight: "2px solid #B5D1C9",
  zIndex: 1200, // Asegura que esté por encima del contenido
};

const primaryPathsContainerSx = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: 2.25,
  flex: 1,
  borderBottom: "2px solid #B5D1C9",
  overflowY: "auto",
};

const buttonSx = {
  width: "70%",
  height: "clamp(36px, 10%, 48px)",
  textTransform: "none", // Evita la mayúscula en los botones
};

const primaryPaths = [
  { href: "/pre-operaciones", text: "Pre-operaciones" },
  { href: "/operaciones", text: "Operaciones" },
];

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <Box>
      {/* Icono de menú */}
      <IconButton
        onClick={toggleSidebar}
        sx={{
          position: "fixed",
          top: 20,
          left: 20,
          zIndex: 1300, // Asegura que el ícono de menú esté sobre el contenido
        }}
      >
        <MenuIcon sx={{ color: "#488B8F" }} />
      </IconButton>

      {/* Sidebar (Drawer como overlay) */}
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleSidebar}
        sx={{
          "& .MuiDrawer-paper": {
            width: 250, // Ancho del sidebar
            height: "100%", // Asegura que el sidebar ocupe toda la altura
            position: "fixed", // Fijado sobre todo el contenido
            top: 0,
            left: 0,
            zIndex: 1200, // Asegura que el sidebar esté por encima de todo
            backgroundColor: "#FFFFFF",
            boxShadow: "2px 0px 5px rgba(0, 0, 0, 0.2)", // Sombra para dar el efecto de overlay
          },
        }}
      >
        <Box sx={containerSx}>
          {/* Logo de MUI (puedes cambiarlo a un logo personalizado si deseas) */}
          <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 3 }}>
            <Logo sx={{ fontSize: 40, color: "#488B8F" }} />
          </Box>

          {/* Contenedor de las rutas principales */}
          <Box sx={primaryPathsContainerSx}>
            {primaryPaths.map((path, i) => (
              <Link key={`button-nav-${i}`} href={path.href} passHref>
                <Button sx={buttonSx} onClick={toggleSidebar}>
                  {path.text}
                </Button>
              </Link>
            ))}
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
