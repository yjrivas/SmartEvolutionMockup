import React, { useState, useEffect } from "react";
import { IconButton, InputAdornment, Paper, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

// Componente SearchBar
const SearchBar = ({ data, onSearch, placeholder = "Buscar...", searchKeys = [] }) => {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  // Función para filtrar los datos
  const filterData = (searchTerm) => {
    if (!searchTerm) {
      setFilteredData([]);
      return;
    }

    const searchLower = searchTerm.toLowerCase();

    const filtered = data.filter((item) => {
      // Buscar en las claves especificadas (searchKeys)
      return searchKeys.some((key) => {
        const value = item[key];
        return value && value.toString().toLowerCase().includes(searchLower);
      });
    });

    setFilteredData(filtered);
  };

  // Efecto para ejecutar la búsqueda cuando cambia el término
  useEffect(() => {
    filterData(search);
    onSearch(search); // Notificar al componente padre
  }, [search]);

  // Limpiar la búsqueda
  const handleClearSearch = () => {
    setSearch("");
  };

  return (
    <div style={{ position: "relative", width: "auto", flex: 1 }}>
      <input
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          minWidth: "250px", // Asegura que no se haga demasiado pequeño
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          boxSizing: "border-box",
        }}
      />
      {/* Botón de limpieza */}
      {search && (
        <InputAdornment position="end" style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)" }}>
          <IconButton onClick={handleClearSearch}>
            <ClearIcon sx={{ color: "#488b8f" }} />
          </IconButton>
        </InputAdornment>
      )}

      {/* Sugerencias */}
      {search && filteredData.length > 0 && (
        <Paper
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            backgroundColor: "white",
            border: "1px solid #ccc",
            borderTop: "none",
            maxHeight: "200px",
            overflowY: "auto",
            zIndex: 1,
          }}
        >
          {filteredData.map((item, index) => (
            <div
              key={index}
              style={{ padding: "10px", cursor: "pointer", borderBottom: "1px solid #eee" }}
              onClick={() => setSearch(item[searchKeys[0]])} // Seleccionar el primer campo de búsqueda
            >
              <Typography variant="body1">
                {searchKeys.map((key) => item[key]).join(" - ")}
              </Typography>
            </div>
          ))}
        </Paper>
      )}

      {/* Mensaje si no hay resultados */}
      {search && filteredData.length === 0 && (
        <Paper
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            backgroundColor: "white",
            border: "1px solid #ccc",
            borderTop: "none",
            padding: "10px",
            zIndex: 1,
          }}
        >
          <Typography variant="body1" style={{ color: "#888" }}>
            No hay resultados...
          </Typography>
        </Paper>
      )}
    </div>
  );
};

export default SearchBar;