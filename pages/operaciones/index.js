import React from "react";
import Operations from "../../src/components/Operation";
import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";

const OperacionesPage = () => (
  <div className="page-container">
    <div className="header">
      <h2 className="header-title">
        <Link href="/" className="icon-button color-primary">
          <HomeIcon />
        </Link>
        Operaciones
      </h2>
      <Link href="/pre-operaciones">
        <button className="button-outline button-primary">Pre-Operaciones</button>
      </Link>
    </div>
    <Operations />
  </div>
);

export default OperacionesPage;
