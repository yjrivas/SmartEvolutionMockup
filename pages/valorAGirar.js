import React from 'react';
import ModalValorAGirar from '../src/components/ValoragirarModal/ModalValorAGirar';

const ValorAGirarPage = () => {
  return (
    <ModalValorAGirar
      handleClose={() => window.close()} // Cerrar la ventana al llamar handleClose
    />
  );
};

export default ValorAGirarPage;