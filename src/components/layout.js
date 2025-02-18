import React from "react";
import { useRouter } from "next/router";  // Importamos el hook useRouter
import Header from "./header"; // Importa tu Header

const Layout = ({ children }) => {
  const router = useRouter();

  // Verificar si la ruta actual es "/pre-operaciones/RegisterOperation" o "/login"
  const isRegisterPage = router.pathname === "/pre-operaciones/RegisterOperation";  // Ruta para registro de operaciones
  const isLoginPage = router.pathname === "/login"; // Ruta para login (si aplica)
  const isRegistroDeRecaudoPage = router.pathname === "/operaciones/operaciones/registroderecaudo"; // Ruta para login (si aplica)

  // Si estamos en la página de registro de operaciones o login, solo renderizamos el contenido sin el layout global
  if (isRegisterPage || isLoginPage || isRegistroDeRecaudoPage) {
    return <>{children}</>; // Solo el contenido sin el layout
  }

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
