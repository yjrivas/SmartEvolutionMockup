import React from "react";
import Link from "next/link";

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



// import React from "react";
// //import AdvancedDateRangePicker from "../src/components/AdvancedDateRangePicker";
// import PreOperations from "../src/components/Pre-operation";
// //import operation from "../src/components/Operation";

// const HomePage = () => (
//   <div style={{ padding: "2rem", color: "#488b8f" }}>
//       <h2>Pre-Operaciones</h2>
//       <PreOperations />
//     </div>
// );

// export default HomePage;

// import React from 'react';
// import PreOperations from '../src/components/Pre-operation';

// const HomePage =() => (
//     <div div style={{ padding: '2rem' }}>
//       <h1>Pre-operaciones</h1>
//       <PreOperations />
//     </div>
//   );
// export default HomePage;

// import React from 'react';
// import AdvancedDateRangePicker from '../src/components/AdvancedDateRangePicker';

// const HomePage = () => (
//   <div style={{ padding: '2rem' }}>
//     <h1>Selector de Rango de Fechas</h1>
//     <AdvancedDateRangePicker />
//   </div>
// );

// export default HomePage;