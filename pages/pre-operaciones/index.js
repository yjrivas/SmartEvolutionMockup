import React from "react";
import PreOperations from "../../src/components/Pre-operation";
import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";

const PreOperacionesPage = () => (
  <div className="page-container">
    <div className="header">
      <h2 className="header-title">
        <Link href="/" className="icon-button color-primary">
          <HomeIcon />
        </Link>
        Pre-Operaciones
      </h2>
      <Link href="/operaciones">
        <button className="button-outline button-primary">Operaciones</button>
      </Link>
    </div>
    <PreOperations />
  </div>
);

export default PreOperacionesPage;
