import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Grid,
  Typography,
  Popover,
} from "@mui/material";
import {
  format,
  parseISO,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  subWeeks,
  subMonths,
} from "date-fns";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import styled from "@emotion/styled";

// Estilos personalizados para botones
const StyledButton = styled(Button)`
  color: var(--primary-color);
  border-color: var(--primary-color);
  text-transform: none;
  margin: 5px 0;
  &:hover {
    color: var(--white-color);
    background-color: var(--secondary-color);
    border-color: var(--primary-color);
  }
`;

const StyledApplyButton = styled(Button)`
  background-color: var(--primary-color);
  color: var(--white-color);
  text-transform: none;
  &:hover {
    background-color: var(--secondary-color);
  }
`;

function AdvancedDateRangePicker() {
  const today = new Date();
  const [anchorEl, setAnchorEl] = useState(null); // Controla el estado del Popover
  const [startDate, setStartDate] = useState(format(today, "yyyy-MM-dd")); // Almacena la fecha de inicio como string
  const [endDate, setEndDate] = useState(format(today, "yyyy-MM-dd")); // Almacena la fecha de fin como string
  const [error, setError] = useState(""); // Almacena errores relacionados con la validación de fechas

  const open = Boolean(anchorEl);

  // Abrir el Popover
  const handleOpen = (event) => setAnchorEl(event.currentTarget);

  // Cerrar el Popover
  const handleClose = () => setAnchorEl(null);

  // Restablece el filtro a los valores iniciales
  const handleClear = () => {
    setStartDate(format(today, "yyyy-MM-dd"));
    setEndDate(format(today, "yyyy-MM-dd"));
    setError("");
  };

  // Configura rápidamente un rango de fechas predefinido
  const setQuickFilter = (type) => {
    const options = { weekStartsOn: 1 }; // Configura el inicio de la semana (lunes)
    switch (type) {
      case "today":
        setStartDate(format(today, "yyyy-MM-dd"));
        setEndDate(format(today, "yyyy-MM-dd"));
        break;
      case "thisWeek":
        setStartDate(format(startOfWeek(today, options), "yyyy-MM-dd"));
        setEndDate(format(endOfWeek(today, options), "yyyy-MM-dd"));
        break;
      case "lastWeek":
        setStartDate(format(startOfWeek(subWeeks(today, 1), options), "yyyy-MM-dd"));
        setEndDate(format(endOfWeek(subWeeks(today, 1), options), "yyyy-MM-dd"));
        break;
      case "thisMonth":
        setStartDate(format(startOfMonth(today), "yyyy-MM-dd"));
        setEndDate(format(endOfMonth(today), "yyyy-MM-dd"));
        break;
      case "lastMonth":
        setStartDate(format(startOfMonth(subMonths(today, 1)), "yyyy-MM-dd"));
        setEndDate(format(endOfMonth(subMonths(today, 1)), "yyyy-MM-dd"));
        break;
      default:
        setStartDate(format(today, "yyyy-MM-dd"));
        setEndDate(format(today, "yyyy-MM-dd"));
    }
    setError("");
  };

  // Manejar cambios en las fechas asegurando formato y zona horaria
  const handleDateChange = (type, value) => {
    const parsedDate = parseISO(value); // Convertir la fecha ingresada en un objeto Date

    if (isNaN(parsedDate)) {
      setError(`La fecha ${type === "start" ? "de inicio" : "de fin"} no es válida.`);
      return;
    }

    if (type === "start") {
      setStartDate(format(parsedDate, "yyyy-MM-dd")); // Formatear y almacenar como cadena
      if (parsedDate > parseISO(endDate)) {
        setError("La fecha de inicio no puede ser posterior a la fecha de fin.");
        return;
      }
    } else if (type === "end") {
      setEndDate(format(parsedDate, "yyyy-MM-dd")); // Formatear y almacenar como cadena
      if (parsedDate < parseISO(startDate)) {
        setError("La fecha de fin no puede ser anterior a la fecha de inicio.");
        return;
      }
    }
    setError("");
  };

  return (
    <div>
      {/* Botón para abrir el rango de fechas */}
      <Button
        onClick={handleOpen}
        variant="outlined"
        startIcon={<CalendarTodayIcon />}
        sx={{
          textTransform: "none",
          borderColor: "var(--primary-color)",
          color: "var(--primary-color)",
          "&:hover": {
            color: "var(--white-color)",
            backgroundColor: "var(--secondary-color)",
            borderColor: "var(--primary-color)",
          },
        }}
      >
        {startDate && endDate
          ? `${format(parseISO(startDate), "dd/MM/yyyy")} - ${format(parseISO(endDate), "dd/MM/yyyy")}`
          : "Seleccionar rango"}
      </Button>

      {/* Popover para rango de fechas */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box sx={{ padding: 2, width: 300 }}>
          <Typography variant="subtitle2" gutterBottom>
            Seleccionar Rango de Fechas
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="date"
                label="Fecha Inicio"
                value={startDate}
                onChange={(e) => handleDateChange("start", e.target.value)}
                InputLabelProps={{ shrink: true }}
                error={!!error && error.includes("inicio")}
                helperText={error && error.includes("inicio") ? error : ""}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="date"
                label="Fecha Fin"
                value={endDate}
                onChange={(e) => handleDateChange("end", e.target.value)}
                InputLabelProps={{ shrink: true }}
                error={!!error && error.includes("fin")}
                helperText={error && error.includes("fin") ? error : ""}
              />
            </Grid>
          </Grid>

          {/* Filtros rápidos */}
          <Box sx={{ marginTop: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Filtros Rápidos
            </Typography>
            <StyledButton fullWidth onClick={() => setQuickFilter("today")}>
              Hoy
            </StyledButton>
            <StyledButton fullWidth onClick={() => setQuickFilter("thisWeek")}>
              Esta Semana
            </StyledButton>
            <StyledButton fullWidth onClick={() => setQuickFilter("lastWeek")}>
              Semana Anterior
            </StyledButton>
            <StyledButton fullWidth onClick={() => setQuickFilter("thisMonth")}>
              Este Mes
            </StyledButton>
            <StyledButton fullWidth onClick={() => setQuickFilter("lastMonth")}>
              Mes Anterior
            </StyledButton>
          </Box>

          {/* Botones de acciones */}
          <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
            <Button
              variant="text"
              onClick={handleClear}
              sx={{
                textTransform: "none",
                color: "#488b8f",
                "&:hover": {
                  color: "#376b6d",
                },
              }}
            >
              Limpiar
            </Button>
            <StyledApplyButton onClick={handleClose}>Aplicar</StyledApplyButton>
          </Box>
        </Box>
      </Popover>
    </div>
  );
}

export default AdvancedDateRangePicker;