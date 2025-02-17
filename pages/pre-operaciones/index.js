import React from "react";
import PreOperations from "../../src/components/preoperations/Pre-operation";
import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";

/**
 * El componente PreOperacionesPage renderiza la pagina de pre-operaciones.
 * Este componente inclusye un header con un link hacia el Home y un boton para navegar a la pagina de operaciones.
 * El contenido principal de la pagina es renderiza por el componente PreOperations.
 *
 * @component
 * @returns {JSX.Element} El componete renderizado.
 */
const PreOperacionesPage = () => (
  <div className="page-container">
    <div className="header" style={{ display: "flex", alignItems: "center" }}>
      <h2 className="header-title" style={{ flexGrow: 1 }}>
        <Link href="/" className="icon-button color-primary">
          <HomeIcon />
        </Link>
        Pre-Operaciones
      </h2>
      
      {/* Botón Operaciones */}
      <Link href="/operaciones">
        <button className="button-outline button-primary" style={{ marginRight: "10px" }}>
          Operaciones
        </button>
      </Link>
      
      {/* Botón Notificaciones de compra */}
      <Link href="/notificaciones-compra">
        <button className="button-outline button-primary">
          Notificaciones de compra
        </button>
      </Link>
    </div>
    <PreOperations />
  </div>
);

export default PreOperacionesPage;
