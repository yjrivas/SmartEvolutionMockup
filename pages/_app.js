import '../styles/global.css'; // Importar estilos globales

/**
 * La aplicacion principal basica que inicializa las paginas. 
 *
 * @param {Object} props - Las propiedades trasnferidas al componente.
 * @param {React.ComponentType} props.Component - El componente de la pagina activa.
 * @param {Object} props.pageProps - Las propiedades iniciales donde fueron precargas.
 * @returns {JSX.Element} La renderizacion de la pagina del componente.
 */
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
