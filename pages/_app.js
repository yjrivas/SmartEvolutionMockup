import "../styles/global.css"; // Importar estilos globales
import Layout from "../src/components/layout"; // Importar el Layout Global

/**
 * La aplicación principal que envuelve todas las páginas con el Layout.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {React.ComponentType} props.Component - Página activa.
 * @param {Object} props.pageProps - Props iniciales de la página.
 * @returns {JSX.Element} Renderizado de la página con el layout global.
 */
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
