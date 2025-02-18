import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { deepPurple } from "@mui/material/colors";

const user = { name: "Yorvis" }; // Nombre del usuario
const logout = () => console.log("Cerrando sesión..."); // Simulación de logout

const navSpacingSx = {
  backgroundColor: "#fff",
  borderBottom: "1.4px solid #5EA3A380",
  padding: "0% 5%",
};

const iconWrapperSx = {
  width: 40,
  height: 40,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "#488B8F",
  fontSize: 24,
};

const imageWrapperSx = {
  aspectRatio: "90/30",
  width: "max(90px + 2vw, 45px)", // Ajusta el tamaño de la imagen
};

// Estilo de animación CSS
const animationSx = {
  animation: "fadeInSlide 2s ease-out", // Aparecer con deslizamiento
};

// Aquí se definen las animaciones en CSS
const animations = {
  "@keyframes fadeInSlide": {
    "0%": {
      opacity: 0,
      transform: "translateY(-20px)",
    },
    "100%": {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
  "@keyframes bounceIn": {
    "0%": {
      opacity: 0,
      transform: "scale(0.3)",
    },
    "50%": {
      opacity: 1,
      transform: "scale(1.1)",
    },
    "100%": {
      opacity: 1,
      transform: "scale(1)",
    },
  },
  "@keyframes blink": {
    "0%": {
      opacity: 1,
    },
    "50%": {
      opacity: 0.5,
    },
    "100%": {
      opacity: 1,
    },
  },
};

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const downScale = useMediaQuery("(max-width: 1600px)");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Formato de hora con segundos
  const formattedTime = useMemo(() => {
    return currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  }, [currentTime]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const nameInitials = useMemo(
    () =>
      user.name
        .split(" ")
        .map((name, i) => (i > 1 ? "" : name[0].toUpperCase()))
        .join(""),
    [user.name]
  );

  return (
    <AppBar elevation={0} position="relative" sx={navSpacingSx}>
      <Toolbar disableGutters sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        
        {/* Logo importado desde S3 */}
        <Link href="/" passHref>
          <a>
            <Box sx={imageWrapperSx}>
              <Image
                layout="responsive"
                src="https://smartevolution.s3.amazonaws.com/assets/logo-smart.png" // URL del logo desde S3
                width={120} // Ajusta el tamaño según sea necesario
                height={40} // Ajusta el tamaño según sea necesario
                alt="Logo Smart Evolution"
              />
            </Box>
          </a>
        </Link>

        {/* Contenedor del mensaje de bienvenida alineado a la izquierda */}
        <Box sx={{ display: "flex", alignItems: "center", marginLeft: "15px", gap: 2 }}>
          <Typography
            variant="h6"
            sx={{
              color: "#488B8F", // Color primario
              fontWeight: "bold",
              animation: "bounceIn 2s ease-in-out", // Animación de rebote
            }}
          >
            ¡Bienvenido, {user.name}!
          </Typography>
        </Box>

        {/* Contenedor de la hora, alineado a la derecha cerca de las notificaciones */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography
            variant="body1"
            sx={{
              color: "#555",
              animation: "blink 1s infinite", // Aplicamos la animación de parpadeo a la hora
            }}
          >
            {formattedTime}
          </Typography>

          {/* Icono de Notificaciones */}
          <IconButton>
            <NotificationsIcon sx={iconWrapperSx} />
          </IconButton>

          {/* Avatar del Usuario */}
          <IconButton onClick={handleClick}>
            <Avatar sx={{ bgcolor: deepPurple[500], cursor: "pointer" }}>
              {nameInitials}
            </Avatar>
          </IconButton>

          {/* Menú del Usuario */}
          <Menu
            id="user-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{ "aria-labelledby": "menu-button" }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={() => console.log("Ver Perfil")}>Ver Perfil</MenuItem>
            <MenuItem onClick={logout}>Cerrar sesión</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
