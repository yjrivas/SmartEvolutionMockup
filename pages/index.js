import React from "react";
import Link from "next/link";

/**
 * El componente del HomePage renderiza la pagina principal del prototipo de Smart Evolution.
 * Este componente incluye un mensaje de bienvenida con botones de navegacion simples como accesos directos a las demas vistas.
 *
 * @returns {JSX.Element} La renderizacion del componente HomePage.
 */
const HomePage = () => (
  <div style={{ padding: "2rem", color: "#488b8f" }}>
    <h2>Prototipo Smart Evolution</h2>
    <nav style={{ marginBottom: "1rem" }}>
      <Link href="/pre-operaciones">
        <button style={styles.button}>Ir a Pre-Operaciones</button>
      </Link>
      <Link href="/operaciones">
        <button style={styles.button}>Ir a Operaciones</button>
      </Link>
    </nav>
    <p>Bienvenido al prototipo de Smart Evolution. Usa los botones para navegar entre las secciones.</p>
  </div>
);

const styles = {
  button: {
    margin: "0 10px",
    padding: "10px 20px",
    backgroundColor: "#488b8f",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default HomePage;