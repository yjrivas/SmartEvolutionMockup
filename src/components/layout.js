// components/Layout.js
import React from "react";
import Link from "next/link";
import Header from "./header"; // Importa el Header.js

const Layout = ({ children }) => {
  return (
    <div>
      {/* Aquí ahora se renderiza el Header importado */}
      <Header />

      {/* Contenido dinámico de cada página */}
      <main>{children}</main>
    </div>
  );
};

export default Layout;
