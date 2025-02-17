import React from "react";
import PreOperationsGroup from "../../src/components/preoperationsgroup/preoperationsgroup";
import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";

/**
 * Este componente representa la pagina "Operaciones Por Grupo" .
 * 
 * Este componente renderiza el contenedor de la pagina junto al titulo y contenido personalizado.
 * El titulo incluye un icono con el enlace al home page y el boton para enlazar con la pagina "Operaciones".
 * El contenido de la seccion incluye el componente `PreOperationsGroup`.
 * 
 * @returns {JSX.Element} el componente renderizado.
 */
const OperacionesPorGrupo  = () => (
  <div className="page-container">
    <div className="header">
      <h2 className="header-title">
        <Link href="/" passHref className="icon-button color-primary">
          <HomeIcon />
        </Link>
        Pre-Operaciones por grupo
      </h2>
      <Link href="/operaciones" passHref>
        <button className="button-outline button-primary">Operaciones</button>
      </Link>
    </div>
    <PreOperationsGroup />
  </div>
);

export default OperacionesPorGrupo;