// components/RegisterOperationForm.js
import React, { useState } from 'react';
import { InputAdornment, Box, Modal, Typography, Switch, TextField, Button, Grid, Autocomplete, Accordion, AccordionSummary, AccordionDetails, Tooltip, IconButton } from '@mui/material';
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"; // Icono del dólar
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import esLocale from 'date-fns/locale/es';
import { Formik, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InfoIcon from '@mui/icons-material/Info';


const emisores = ['Emisor A', 'Emisor B', 'Emisor C'];
// Relación Emisor-Corredor
const corredorPorEmisor = {
  'Emisor A': 'Corredor A',
  'Emisor B': 'Corredor B',
  'Emisor C': 'Corredor C',
};

// Relación Inversionista-Corredor
const corredorPorInversionista = {
  'Inversionista X': 'Corredor A',
  'Inversionista Y': 'Corredor B',
  'Inversionista Z': 'Corredor C',
};
const inversionistas = ['Inversionista X', 'Inversionista Y', 'Inversionista Z'];
const tipoOperaciones = ['Compra Título', 'Lorem Ipsum', 'Lorem Ipsum'];

// Simulación de correlativo (luego se obtendrá del backend)
const getNextOperationNumber = () => 1001; // Ejemplo: siempre empieza en 1001

// Datos de prueba: Cuentas por inversionista
const cuentasPorInversionista = {
  'Inversionista X': [
    { cuenta: '1234567890123', saldo: 100000000 },
    { cuenta: '9876543210123', saldo: 50000000 },
  ],
  'Inversionista Y': [
    { cuenta: '1122334455667', saldo: 200000000 },
    { cuenta: '9988776655443', saldo: 75000000 },
  ],
  'Inversionista Z': [
    { cuenta: '5566778899001', saldo: 150000000 },
    { cuenta: '6677889900112', saldo: 10000000 },
  ],
};

const fetchFacturasPorEmisor = async (emisor, pagina = 1, itemsPorPagina = 5) => {
  // Simulación de datos de prueba sin "valorNominal" y "porcentajeDescuento"
  const facturasPorEmisor = {
    'Emisor A': [
      { serial: 'FV1234567', monto: 100000000, fechaEmision: new Date('2023-10-01'), fechaFin: new Date('2023-10-31') },
      { serial: 'FV7654321', monto: 50000000, fechaEmision: new Date('2023-10-02'), fechaFin: new Date('2023-11-01') },
      { serial: 'FV1111111', monto: 200000000, fechaEmision: new Date('2023-10-03'), fechaFin: new Date('2023-11-02') },
      { serial: 'FV2222222', monto: 30000000, fechaEmision: new Date('2023-10-04'), fechaFin: new Date('2023-11-03') },
      { serial: 'FV3333333', monto: 150000000, fechaEmision: new Date('2023-10-05'), fechaFin: new Date('2023-11-04') },
    ],
    'Emisor B': [
      { serial: 'FV9876543', monto: 75000000, fechaEmision: new Date('2023-10-06'), fechaFin: new Date('2023-11-05') },
      { serial: 'FV1239876', monto: 200000000, fechaEmision: new Date('2023-10-07'), fechaFin: new Date('2023-11-06') },
      { serial: 'FV4444444', monto: 10000000, fechaEmision: new Date('2023-10-08'), fechaFin: new Date('2023-11-07') },
      { serial: 'FV5555555', monto: 50000000, fechaEmision: new Date('2023-10-09'), fechaFin: new Date('2023-11-08') },
      { serial: 'FV6666666', monto: 120000000, fechaEmision: new Date('2023-10-10'), fechaFin: new Date('2023-11-09') },
    ],
    'Emisor C': [
      { serial: 'FV4567890', monto: 150000000, fechaEmision: new Date('2023-10-11'), fechaFin: new Date('2023-11-10') },
      { serial: 'FV0987654', monto: 30000000, fechaEmision: new Date('2023-10-12'), fechaFin: new Date('2023-11-11') },
      { serial: 'FV7777777', monto: 80000000, fechaEmision: new Date('2023-10-13'), fechaFin: new Date('2023-11-12') },
      { serial: 'FV8888888', monto: 90000000, fechaEmision: new Date('2023-10-14'), fechaFin: new Date('2023-11-13') },
      { serial: 'FV9999999', monto: 250000000, fechaEmision: new Date('2023-10-15'), fechaFin: new Date('2023-11-14') },
    ],
  };

  // Simulación de retardo de red
  await new Promise((resolve) => setTimeout(resolve, 500));

  const facturas = facturasPorEmisor[emisor] || [];
  const inicio = (pagina - 1) * itemsPorPagina;
  const fin = pagina * itemsPorPagina;
  const facturasPaginadas = facturas.slice(inicio, fin);

  return {
    facturas: facturasPaginadas,
    total: facturas.length,
  };
};


// Formatear monto como moneda colombiana
const formatCurrency = (value) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
  }).format(value);

// Función para formatear el número con separadores de miles
const formatNumberWithThousandsSeparator = (value) => {
  return value
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Agrega separadores de miles
};

const validationSchema = Yup.object({
  numeroOperacion: Yup.number()
    .required('Este campo es obligatorio')
    .typeError('Debe ser un número válido'), // Validación para campo numérico
  fechaOperacion: Yup.date().required('Este campo es obligatorio'),
  tipoOperacion: Yup.string()
    .required('Este campo es obligatorio')
    .oneOf(tipoOperaciones, 'Tipo de operación no válido'),
  nombreEmisor: Yup.string().required('Este campo es obligatorio'),
  corredorEmisor: Yup.string().required('Este campo es obligatorio'),
  nombrePagador: Yup.string().required('Este campo es obligatorio'),
  facturas: Yup.array().of(
    Yup.object({
      nombreInversionista: Yup.string().required('Este campo es obligatorio'),
      cuentaInversionista: Yup.string().required('Este campo es obligatorio'),
      factura: Yup.string().required('Este campo es obligatorio'),
      fraccion: Yup.number().required('Este campo es obligatorio'),
      valorFuturo: Yup.number()
        .required('Este campo es obligatorio')
        .typeError('Debe ser un número válido'),
      porcentajeDescuento: Yup.number()
        .required('Este campo es obligatorio')
        .min(0, 'El descuento no puede ser menor a 0%')
        .max(100, 'El descuento no puede ser mayor a 100%'),
      fechaEmision: Yup.date().required('Este campo es obligatorio'),
      valorNominal: Yup.number().required('Este campo es obligatorio'),
      tasaInversionista: Yup.number().required('Este campo es obligatorio'),
      fechaFin: Yup.date().required('Este campo es obligatorio'),
      diasOperaciones: Yup.date().required('Este campo es obligatorio'),
      comisionSF: Yup.number().required('Este campo es obligatorio'),
      gastoMantenimiento: Yup.number().required('Este campo es obligatorio'),
    })
  ),
});


const RegisterOperationForm = () => {

  const [] = useState([
    { id: 1, titulo: "Factura 1", contenido: "Detalles de Factura 1" }
  ]);
  const [expanded, setExpanded] = useState(0); // Primer acordeón abierto por defecto

  const handleChange = (index) => (_event, isExpanded) => {
    setExpanded(isExpanded ? index : false);
  };

  const initialValues = {
    numeroOperacion: getNextOperationNumber(), // Valor por defecto (correlativo)
    fechaOperacion: new Date(), // Fecha actual por defecto
    tipoOperacion: 'Compra Título', // Valor por defecto
    nombreEmisor: '',
    corredorEmisor: '',
    nombrePagador: '',
    facturas: [
      {
        nombreInversionista: '',
        cuentaInversionista: '',
        factura: '',
        fraccion: 1,
        valorFuturo: '',
        valorFuturoManual: false, // Rastrea si el valor futuro ha sido editado manualmente
        fechaEmision: null,
        valorNominal: 0,
        tasaInversionista: 0,
        fechaFin: null,
        diasOperaciones: '',
        comisionSF: 0,
        gastoMantenimiento: 0,
      },
    ],
  };


  const [openModal, setOpenModal] = useState(false);
  console.log("Estado de openModal:", openModal);

  // Función para abrir la modal
  const handleOpenModal = () => {
    console.log("Abriendo modal...");
    setOpenModal(true);
  };

  // Función para cerrar la modal
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Función para confirmar la operación
  const handleConfirm = (values) => {
    console.log("Operación registrada:", values);
    handleCloseModal();
    // Aquí puedes agregar más lógica para guardar la operación, etc.
  };

  // Función de envío del formulario
  const handleSubmit = (values, { setSubmitting }) => {
    // Validar que todos los campos obligatorios estén completos
    const isFormValid = Object.keys(values).every((key) => {
      if (Array.isArray(values[key])) {
        return values[key].every((item) => Object.keys(item).every((subKey) => item[subKey] !== ''));
      }
      return values[key] !== '';
    });

    console.log("Formulario válido:", isFormValid); // Ahora isFormValid está definida

    if (isFormValid) {
      // Si el formulario es válido, abre la modal
      handleOpenModal();
    } else {
      alert("Por favor, complete todos los campos obligatorios.");
    }
    setSubmitting(false); //Asegurar que se llame para levantar la modal
  };


  const [isRecompra, setIsRecompra] = useState(false); // Estado para el aviso de Recompra
  const [facturasFiltradas, setFacturasFiltradas] = useState([]); // Facturas filtradas por emisor
  const [cuentasFiltradas, setCuentasFiltradas] = useState([]); // Cuentas filtradas por inversionista


  // Función para cargar cuentas cuando se selecciona un inversionista
  const cargarCuentas = (inversionista) => {
    if (inversionista) {
      setCuentasFiltradas(cuentasPorInversionista[inversionista] || []);
    } else {
      setCuentasFiltradas([]);
    }
  };


  // Función para verificar si es una recompra
  const checkRecompra = (numeroOperacion) => {
    // Simulación: Si el número de operación es par, es una recompra
    return numeroOperacion % 2 === 0;
  };

  // Función para cargar facturas desde el backend
  const cargarFacturas = async (emisor) => {
    if (emisor) {
      const { facturas } = await fetchFacturasPorEmisor(emisor);
      setFacturasFiltradas(facturas); // Aquí filtramos las facturas
    } else {
      setFacturasFiltradas([]); // Si no hay emisor, no mostramos facturas
    }
  };

  // Función para calcular el valor nominal basado en el valor futuro y el porcentaje de descuento
  const calcularValorNominal = (valorFuturo, porcentajeDescuento) => {
    return valorFuturo * (1 - porcentajeDescuento / 100);
  };

// Función para calcular el porcentaje de descuento basado en el valor futuro y el valor nominal
const calcularPorcentajeDescuento = (valorFuturo, valorNominal) => {
  if (valorFuturo === 0) return 0;
  return ((1 - valorNominal / valorFuturo) * 100).toFixed(2);
};

//Formatear la fecha en la cabecera del acordeon. 
const formatDate = (date) => {
  if (!date) return "N/A";
  const options = { day: "2-digit", month: "short", year: "numeric" };
  return new Date(date).toLocaleDateString("es-ES", options);
};

// Primero, necesitamos agregar un estado para saber si el serial de la factura es nuevo
const [isNewInvoice, setIsNewInvoice] = useState(false);

// Lista de facturas registradas en el sistema (esto es un ejemplo, deberías obtenerlo de los datos del sistema)
const registeredInvoices = ["12345", "67890", "54321"]; // Lista de seriales registrados (esto debería ser dinámico)

// Función para verificar si el serial de la factura es nuevo
const handleInvoiceSerialChange = (e, index) => {
  const serial = e.target.value;
  const isNew = !registeredInvoices.includes(serial); // Verifica si el serial está en la lista de facturas registradas
  setIsNewInvoice(isNew); // Actualiza el estado si la factura es nueva

  // Si es nueva, agregamos los campos adicionales
  if (isNew) {
    setFieldValue(`facturas[${index}].fechaEmision`, null); // Inicializar el valor de fecha de emisión
    setFieldValue(`facturas[${index}].fechaVencimiento`, null); // Inicializar el valor de fecha de vencimiento
    setFieldValue(`facturas[${index}].saldoDisponible`, 0); // Inicializar el saldo disponible
    setFieldValue(`facturas[${index}].fechaProbable`, null); // Inicializar la fecha probable
  }
};

  
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={esLocale}>
      {/* Para mostrar los toast */}
      <ToastContainer position="top-right" autoClose={5000} />
      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Registrar Operación
        </Typography>
        <Formik 
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
          {/* {({ values, setFieldValue, touched, errors, handleBlur }) => ( */}
          {({ values, setFieldValue, touched, errors, handleBlur }) => (
            <Form>
              <Grid container spacing={2}>
                {/* Primera fila: Número de Operación, Fecha de Operación y Tipo de Operación */}
                <Grid item xs={12} md={1.5}>
                  <TextField
                    label="Número de Operación *"
                    fullWidth
                    type="number"
                    value={values.numeroOperacion}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFieldValue('numeroOperacion', value);
                      setIsRecompra(checkRecompra(value)); // Verifica si es recompra
                    }}
                    onBlur={handleBlur}
                    error={touched.numeroOperacion && Boolean(errors.numeroOperacion)}
                    helperText={touched.numeroOperacion && errors.numeroOperacion}
                    inputProps={{ min: 0 }} // Asegura que no se ingresen números negativos
                  />
                  {/* Aviso de Recompra */}
                  {isRecompra && (
                    <Typography variant="body2" color="warning.main" sx={{ mt: 0.5 }}>
                      Operación de Recompra
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} md={1.5}>
                  <DatePicker
                    label="Fecha de Operación *"
                    value={values.fechaOperacion}
                    onChange={(newValue) => setFieldValue('fechaOperacion', newValue)}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <Autocomplete
                    options={tipoOperaciones}
                    value={values.tipoOperacion} // Valor por defecto
                    renderInput={(params) => (
                      <TextField {...params} label="Tipo de Operación *" fullWidth />
                    )}
                    onChange={(event, newValue) => setFieldValue('tipoOperacion', newValue)}
                    onBlur={handleBlur}
                    error={touched.numeroOperacion && Boolean(errors.numeroOperacion)}
                    helperText={touched.numeroOperacion && errors.numeroOperacion}
                  />
                </Grid>

                {/* Campo de Emisor */}
                <Grid item xs={12} md={4}>
                  <Autocomplete
                    options={emisores}
                    onChange={async (event, newValue) => {
                      if (values.nombreEmisor !== newValue) {
                        setFieldValue('nombreEmisor', newValue);
                        setFieldValue('corredorEmisor', newValue ? corredorPorEmisor[newValue] : '');
                        
                        // Limpiar solo el número de factura sin tocar otros valores
                        setFieldValue('facturas', values.facturas.map(factura => ({
                          ...factura,
                          factura: '', // Se limpia solo este campo
                        })));
                        // Cargar nuevas facturas si se ha seleccionado un nuevo emisor
                        if (newValue) {
                          await cargarFacturas(newValue);
                        }
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Nombre Emisor *"
                        fullWidth
                        error={touched.nombreEmisor && Boolean(errors.nombreEmisor)}
                        helperText={touched.nombreEmisor && errors.nombreEmisor}
                      />
                    )}
                  />
                </Grid>
                {/*Selector de Corredor Emisor */}
                <Grid item xs={12} md={3}>
                  <Autocomplete
                    options={[corredorPorEmisor[values.nombreEmisor]]} // Solo muestra el corredor asignado al emisor
                    value={values.corredorEmisor} // El valor ya asignado del corredor
                    onChange={(event, newValue) => setFieldValue('corredorEmisor', newValue)}
                    disabled // Deshabilita la selección del corredor
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Corredor Emisor *"
                        fullWidth
                        name="corredorEmisor"
                        error={touched.corredorEmisor && Boolean(errors.corredorEmisor)}
                        helperText={touched.corredorEmisor && errors.corredorEmisor}
                      />
                    )}
                  />
                </Grid>
                {/*Array para cada acordeon de facturas de la operacion */}
                <FieldArray name="facturas">
                  {({ push, remove }) => (
                    <>
                      {values.facturas.map((factura, index) => (
                        <Grid item xs={12} key={index}>
                          {/* Contenedor principal para el botón de eliminar y el acordeón */}
                          <Grid container alignItems="flex-start" spacing={2}>
                            
                            {/* Acordeón */}
                            <Grid item xs>
                              <Accordion
                              key={factura.id} 
                              expanded={expanded === index} 
                              onChange={handleChange(index)}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Grid container alignItems="center" spacing={2}>
                                {/* Número de factura de la cabecera del acordeon */}
                                <Grid item>
                                  <Typography>
                                    {factura.factura || `Factura ${index + 1}`}
                                  </Typography>
                                </Grid>
                                {/* Fecha de emisión y vencimiento de la cabecera del acordeon*/}
                                <Grid item>
                                  <Typography variant="body2" color="textSecondary">
                                    Emisión: {factura.fechaEmision ? formatDate(factura.fechaEmision) : "-- -- ----"} | 
                                    Vencimiento: {factura.fechaFin ? formatDate(factura.fechaFin) : "-- -- ----"}
                                  </Typography>
                                </Grid>
                              </Grid>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Grid container spacing={3}>
                                 {/** Selector de Facturas */} 
                                  <Grid item xs={12} md={2}>
                                    <Autocomplete
                                      options={facturasFiltradas.map((factura) => factura.serial)} // Facturas registradas
                                      value={factura.factura || ''} // Valor de la factura seleccionada
                                      onChange={(event, newValue) => {
                                        if (newValue) {
                                          // Si se selecciona una factura existente
                                          const selectedFactura = facturasFiltradas.find(
                                            (factura) => factura.serial === newValue
                                          );
                                          if (selectedFactura) {
                                            setFieldValue(`facturas[${index}].factura`, newValue); // Guardar serial seleccionado
                                            setFieldValue(`facturas[${index}].fechaEmision`, selectedFactura.fechaEmision);
                                            setFieldValue(`facturas[${index}].valorNominal`, selectedFactura.valorNominal);
                                            setFieldValue(`facturas[${index}].fechaFin`, selectedFactura.fechaFin);
                                            setFieldValue(`facturas[${index}].saldoDisponible`, selectedFactura.monto); // Establecer saldo disponible
                                            
                                            // Cálculo del valor futuro
                                            const saldoDisponible = selectedFactura.monto || 0;
                                            const fraccion = factura.fraccion || 1;
                                            const valorFuturoCalculado = saldoDisponible / fraccion;
                                            setFieldValue(`facturas[${index}].valorFuturo`, valorFuturoCalculado);
                                            
                                            // Desactivar la opción de ingresar nuevos valores manualmente
                                            setIsNewInvoice(false); // No es una nueva factura
                                          }
                                        }
                                      }}
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          label="Número de Factura *"
                                          fullWidth
                                          onBlur={() => {
                                            // Si no se selecciona una factura registrada, habilitar la opción de crear una nueva
                                            if (!factura.factura) {
                                              setIsNewInvoice(true);
                                              setFieldValue(`facturas[${index}].fechaEmision`, null); 
                                              setFieldValue(`facturas[${index}].fechaVencimiento`, null);
                                              setFieldValue(`facturas[${index}].saldoDisponible`, 0); 
                                              setFieldValue(`facturas[${index}].fechaProbable`, null); 
                                            }
                                          }}
                                        />
                                      )}
                                    />
                                  </Grid>
                                    {/* Fracción */}
                                    <Grid item xs={12} md={1}>
                                        <TextField
                                          label="Fracción"
                                          fullWidth
                                          type="number"
                                          value={factura.fraccion || 1}  // Valor por defecto si no existe fracción
                                          onChange={(e) => {
                                            const fraccion = parseFloat(e.target.value) || 1;  // Evitar valores inválidos
                                            setFieldValue(`facturas[${index}].fraccion`, fraccion);  // Actualizar el valor de la fracción en el estado

                                            // Recalcular el valor futuro automáticamente cuando cambia la fracción
                                            const saldoDisponible = factura.saldoDisponible || 0;
                                            const valorFuturoCalculado = Math.floor(saldoDisponible / fraccion);  // Truncar los decimales

                                            // Actualizamos el valor futuro sin decimales
                                            setFieldValue(`facturas[${index}].valorFuturo`, valorFuturoCalculado);
                                          }}
                                          onBlur={handleBlur}  // Si tienes alguna lógica de validación, puedes usar onBlur
                                          helperText={touched.facturas?.[index]?.fraccion && errors.facturas?.[index]?.fraccion} // Ayuda para mostrar errores
                                          error={touched.facturas?.[index]?.fraccion && Boolean(errors.facturas?.[index]?.fraccion)}  // Mostrar errores si es necesario
                                        />
                                      </Grid>

                                      {/** Saldo Disponible en factura */} 
                                      <Grid item xs={12} md={3}>
                                        <TextField
                                          label="Saldo Disponible en factura"
                                          fullWidth
                                          value={formatCurrency(isNewInvoice ? factura.saldoDisponible || 0 : values.facturas[index]?.saldoDisponible || 0)}
                                          onChange={(e) => setFieldValue(`facturas[${index}].saldoDisponible`, e.target.value)} // Permitir cambio solo si es nueva factura
                                          disabled={!isNewInvoice} // Deshabilitar si no es una nueva factura
                                        />
                                      </Grid>
                                      {/* Campos adicionales si es una nueva factura */}
                                      {isNewInvoice && (
                                        <>
                                          {/* Fecha de Emisión */}
                                          <Grid item xs={12} md={3}>
                                            <DatePicker
                                              label="Fecha de Emisión"
                                              value={factura.fechaEmision}
                                              onChange={(newValue) => setFieldValue(`facturas[${index}].fechaEmision`, newValue)}
                                              renderInput={(params) => <TextField {...params} fullWidth />}
                                            />
                                          </Grid>

                                          {/* Fecha de Vencimiento */}
                                          <Grid item xs={12} md={3}>
                                            <DatePicker
                                              label="Fecha de Vencimiento"
                                              value={factura.fechaVencimiento}
                                              onChange={(newValue) => setFieldValue(`facturas[${index}].fechaVencimiento`, newValue)}
                                              renderInput={(params) => <TextField {...params} fullWidth />}
                                            />
                                          </Grid>
                                        </>
                                      )}


                                      {/** Fecha Probable */}
                                      <Grid item xs={12} md={1.5}>
                                        <DatePicker
                                          label="Fecha Probable"
                                          value={isNewInvoice ? factura.fechaProbable : factura.fechaEmision} // Si es nueva factura, permitir fecha probable, sino, usar fecha emisión
                                          onChange={(newValue) => {
                                            setFieldValue(
                                              `facturas[${index}].${isNewInvoice ? "fechaProbable" : "fechaEmision"}`, 
                                              newValue
                                            );
                                          }}
                                          renderInput={(params) => <TextField {...params} fullWidth />}
                                          disabled={!isNewInvoice} // Deshabilitar si no es nueva factura
                                        />
                                      </Grid>

                                      {/* Fecha de Vencimiento */}
                                      {/* <Grid item xs={12} md={2}>
                                        <DatePicker
                                          label="Vencimiento Factura"
                                          value={factura.fechaFin}
                                          onChange={(newValue) => setFieldValue(`facturas[${index}].fechaFin`, newValue)}
                                          renderInput={(params) => <TextField {...params} fullWidth />}
                                        /> */}
                                      {/* </Grid> */} 
                                      {/* Nombre de Inversionista */}
                                      <Grid item xs={12} md={4.5}>
                                        <Autocomplete
                                          options={inversionistas}
                                          onChange={async (event, newValue) => {
                                            if (values.facturas[index].nombreInversionista !== newValue) {
                                              // Limpiar el campo de cuenta de inversionista y monto disponible
                                              setFieldValue(`facturas[${index}].cuentaInversionista`, ''); // Limpiar la cuenta de inversionista
                                              setFieldValue(`facturas[${index}].montoDisponibleCuenta`, 0); // Limpiar monto disponible

                                              setFieldValue(`facturas[${index}].nombreInversionista`, newValue); // Establecer el nuevo inversionista
                                              setFieldValue(`facturas[${index}].corredorInversionista`, corredorPorInversionista[newValue]);

                                              // Cargar las cuentas correspondientes al nuevo inversionista
                                              await cargarCuentas(newValue);
                                            }
                                          }}
                                          renderInput={(params) => (
                                            <TextField
                                              {...params}
                                              label="Nombre Inversionista / ID *"
                                              fullWidth
                                            />
                                          )}
                                        />
                                      </Grid>

                                      {/* Cuenta de Inversionista */}
                                      <Grid item xs={12} md={3}>
                                        <Autocomplete
                                          options={cuentasPorInversionista[values.facturas[index]?.nombreInversionista] || []}
                                          getOptionLabel={(option) => option.cuenta} // Mostrar el número de cuenta
                                          value={cuentasPorInversionista[values.facturas[index]?.nombreInversionista]?.find(
                                            (cuenta) => cuenta.cuenta === values.facturas[index]?.cuentaInversionista
                                          ) || null} // Asegurarse de que el valor actual esté correctamente asignado
                                          onChange={(event, newValue) => {
                                            setFieldValue(`facturas[${index}].cuentaInversionista`, newValue ? newValue.cuenta : '');
                                            // Actualiza el Monto Disponible Cuenta Inversionista con el saldo de la cuenta seleccionada
                                            setFieldValue(`facturas[${index}].montoDisponibleCuenta`, newValue ? newValue.saldo : 0);
                                          }}
                                          renderInput={(params) => (
                                            <TextField
                                              {...params}
                                              label="Cuenta Inversionista *"
                                              fullWidth
                                            />
                                          )}
                                        />
                                      </Grid>
                                      {/*Monto disponible en cuenta inversionista */}                                    
                                      <Grid item xs={12} md={3}>
                                        <TextField
                                          label="Monto Disponible Cuenta Inversionista"
                                          fullWidth
                                          value={formatCurrency(values.facturas[index]?.montoDisponibleCuenta || 0)}
                                          disabled // Deshabilita la edición manual
                                        />
                                      </Grid>
                                    {/*Selector de Pagadores*/}
                                    <Grid item xs={12} md={6}>
                                      <Autocomplete
                                        options={emisores}
                                        onChange={(event, newValue) => setFieldValue('nombrePagador', newValue)}
                                        renderInput={(params) => (
                                          <TextField {...params}
                                          label="Nombre Pagador *" 
                                          fullWidth
                                          error={touched.nombrePagador && Boolean(errors.nombrePagador)}
                                            helperText={touched.nombrePagador && errors.nombrePagador}
                                          />
                                        )}
                                        
                                      />
                                    </Grid>
                                    {/* Valor Futuro */}
                                    <Grid item xs={12} md={3} style={{ position: 'relative' }}>
                                    <TextField
                                      label="Valor Futuro"
                                      fullWidth
                                      type="text" // Usamos tipo "text" para manejar el formato
                                      value={factura.valorFuturo ? formatNumberWithThousandsSeparator(Math.floor(factura.valorFuturo)) : ""}
                                      onChange={(e) => {
                                        const rawValue = e.target.value.replace(/[^\d]/g, "");
                                        const valorFuturoManual = parseFloat(rawValue) || 0;
                                        setFieldValue(`facturas[${index}].valorFuturo`, valorFuturoManual);
                                        setFieldValue(`facturas[${index}].valorFuturoManual`, true);

                                        if (!factura.valorNominalManual) {
                                          const nuevoValorNominal = calcularValorNominal(valorFuturoManual, factura.porcentajeDescuento || 0);
                                          setFieldValue(`facturas[${index}].valorNominal`, nuevoValorNominal);
                                        }
                                      }}
                                      onFocus={(e) => {
                                        e.target.value = factura.valorFuturo ? factura.valorFuturo.toString() : "";
                                      }}
                                      onBlur={(e) => {
                                        const rawValue = e.target.value.replace(/[^\d]/g, "");
                                        const valorFuturoManual = parseFloat(rawValue) || 0;
                                        setFieldValue(`facturas[${index}].valorFuturo`, valorFuturoManual);
                                        handleBlur(e); // Lógica de Formik para manejar el blur
                                      }}
                                      placeholder={`Sugerido: ${factura.saldoDisponible && factura.fraccion 
                                        ? formatNumberWithThousandsSeparator(Math.floor((factura.saldoDisponible || 0) / (factura.fraccion || 1))) 
                                        : "N/A"}`}
                                      helperText={
                                        !factura.valorFuturoManual
                                          ? `Valor sugerido: ${factura.saldoDisponible && factura.fraccion 
                                              ? formatNumberWithThousandsSeparator(Math.floor((factura.saldoDisponible || 0) / (factura.fraccion || 1))) 
                                              : "N/A"}`
                                          : "Valor ingresado manualmente"
                                      }
                                      error={touched.facturas?.[index]?.valorFuturo && Boolean(errors.facturas?.[index]?.valorFuturo)}
                                      InputProps={{
                                        startAdornment: (
                                          <InputAdornment position="start">
                                            <AttachMoneyIcon style={{ color: 'rgb(94, 163, 163)', fontSize: '1.2rem' }} />
                                          </InputAdornment>
                                        ),
                                      }}
                                    />
                                      {/** Ícono Infotip con Tooltip */}
                                      <Tooltip 
                                        title="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer turpis eros, elementum et egestas sit amet, ullamcorper non purus.
                                        Donec id tincidunt mauris, non consequat dolor. Duis semper elementum rutrum. In hac habitasse platea dictumst. Pellentesque et felis interdum, efficitur nulla ut, vestibulum risus."
                                        placement="top-end" // Cambiar la posición para que esté a la derecha, alineado con el campo
                                        enterDelay={200} // Retardo para aparecer rápidamente
                                        leaveDelay={200} // Retardo para desaparecer rápidamente
                                        arrow
                                        PopperProps={{
                                          modifiers: [
                                            {
                                              name: 'offset',
                                              options: {
                                                offset: [0, 5], // Ajusta el desplazamiento del tooltip
                                              },
                                            },
                                          ],
                                        }}
                                      >
                                        <IconButton
                                          size="small"
                                          style={{
                                            position: 'absolute', // Alineado dentro del contenedor
                                            top: '50%', 
                                            right: 2, // Colocado a la derecha del campo
                                            transform: 'translateY(-50%)', // Centrado verticalmente en el campo
                                            padding: 0.8,
                                            marginLeft: 8,
                                          }}
                                        >
                                          <InfoIcon style={{ fontSize: '1rem', color: 'rgb(94, 163, 163)' }} />
                                        </IconButton>
                                      </Tooltip>
                                    </Grid>
                                    {/* Campo de porcentaje de descuento */}
                                    <Grid item xs={12} md={1} style={{ position: 'relative' }}>
                                      <TextField
                                        label="% Descuento"
                                        fullWidth
                                        type="number"
                                        value={factura.porcentajeDescuento ?? 0}
                                        onChange={(e) => {
                                          let value = e.target.value ? Math.min(Math.max(Number(e.target.value), 0), 100) : 0;
                                          setFieldValue(`facturas[${index}].porcentajeDescuento`, value);

                                          // Recalcular el valor nominal con el nuevo % de descuento
                                          const valorFuturo = factura.valorFuturo || 0;
                                          const nuevoValorNominal = calcularValorNominal(valorFuturo, value);
                                          setFieldValue(`facturas[${index}].valorNominal`, nuevoValorNominal);
                                          setFieldValue(`facturas[${index}].valorNominalManual`, false); // Marcar como automático
                                        }}
                                        inputProps={{ min: 0, max: 100 }}
                                      />                                   
                                    {/** Ícono Infotip con Tooltip */}
                                      <Tooltip 
                                        title="Este campo se utiliza para aplicar un descuento sobre el valor futuro de la factura."
                                        placement="top-end" // Cambiar la posición para que esté a la derecha, alineado con el campo
                                        enterDelay={200} // Retardo para aparecer rápidamente
                                        leaveDelay={200} // Retardo para desaparecer rápidamente
                                        arrow
                                        PopperProps={{
                                          modifiers: [
                                            {
                                              name: 'offset',
                                              options: {
                                                offset: [0, 5], // Ajusta el desplazamiento del tooltip
                                              },
                                            },
                                          ],
                                        }}
                                      >
                                        <IconButton
                                          size="small"
                                          style={{
                                            position: 'absolute', // Alineado dentro del contenedor
                                            top: '50%', 
                                            right: 2, // Colocado a la derecha del campo
                                            transform: 'translateY(-50%)', // Centrado verticalmente en el campo
                                            padding: 0.8,
                                            marginLeft: 8,
                                          }}
                                        >
                                          <InfoIcon style={{ fontSize: '1rem', color: 'rgb(94, 163, 163)' }} />
                                        </IconButton>
                                      </Tooltip>
                                    </Grid>
                                    {/*Tasa Descuento */}
                                    <Grid item xs={12} md={2}>
                                      <TextField
                                        label="Tasa Descuento"
                                        fullWidth
                                        type="number"
                                        value={factura.tasaInversionista}
                                        onChange={(e) => setFieldValue(`facturas[${index}].tasaInversionista`, e.target.value)}
                                      />
                                    </Grid>

                                    {/* Campo de valor nominal */}
                                    <Grid item xs={12} md={3}>
                                      <TextField
                                        label="Valor Nominal"
                                        fullWidth
                                        value={factura.valorNominal ? formatNumberWithThousandsSeparator(Math.floor(factura.valorNominal)) : ""}
                                        onChange={(e) => {
                                          // Eliminar caracteres no numéricos para mantener el valor limpio
                                          const rawValue = e.target.value.replace(/[^\d]/g, "");
                                          let nuevoValorNominal = parseFloat(rawValue) || 0;
                                          const valorFuturo = factura.valorFuturo || 0;

                                          // No permitir que el valor nominal sea mayor que el valor futuro
                                          if (nuevoValorNominal > valorFuturo) {
                                            nuevoValorNominal = valorFuturo;
                                          }

                                          // Validación: Mostrar Toast si el valor nominal es mayor al saldo disponible
                                          const saldoDisponible = values.facturas[index]?.saldoDisponible || 0; // Obtener saldo disponible desde el estado

                                          if (nuevoValorNominal > saldoDisponible) {
                                            toast.error(
                                              "El Valor nominal de la factura es superior al saldo disponible en la cuenta del inversionista", 
                                              { position: "top-right", autoClose: 5000 }
                                            );
                                          }

                                          setFieldValue(`facturas[${index}].valorNominal`, nuevoValorNominal);
                                          setFieldValue(`facturas[${index}].valorNominalManual`, true); // Marcar como editado manualmente

                                          // Recalcular el % de descuento con el nuevo valor nominal
                                          const nuevoPorcentajeDescuento = calcularPorcentajeDescuento(valorFuturo, nuevoValorNominal);
                                          setFieldValue(`facturas[${index}].porcentajeDescuento`, nuevoPorcentajeDescuento);
                                        }}
                                        onFocus={(e) => {
                                          // Al hacer foco, eliminamos el formato para permitir la edición del valor numérico
                                          e.target.value = factura.valorNominal ? factura.valorNominal.toString() : "";
                                        }}
                                        onBlur={(e) => {
                                          // Al perder el foco, aplicar el formato de separadores de miles y asegurarse que sea un número entero
                                          const rawValue = e.target.value.replace(/[^\d]/g, "");
                                          const valorNominal = parseFloat(rawValue) || 0;
                                          setFieldValue(`facturas[${index}].valorNominal`, valorNominal);
                                        }}
                                        placeholder={`Sugerido: ${factura.valorFuturo && factura.porcentajeDescuento !== undefined ? formatNumberWithThousandsSeparator(Math.floor(factura.valorFuturo * (1 - (factura.porcentajeDescuento / 100)))) : ""}`} // Aquí se calcula el valor nominal sugerido
                                        helperText={
                                          !factura.valorNominalManual
                                            ? `Valor sugerido: ${factura.valorFuturo && factura.porcentajeDescuento !== undefined ? formatNumberWithThousandsSeparator(Math.floor(factura.valorFuturo * (1 - (factura.porcentajeDescuento / 100)))) : ""}`
                                            : "Valor ingresado manualmente"
                                        }
                                        InputProps={{
                                          startAdornment: (
                                            <InputAdornment position="start">
                                              <AttachMoneyIcon style={{ color: 'rgb(94, 163, 163)', fontSize: '1.2rem' }} />
                                            </InputAdornment>
                                          ),
                                        }}
                                        error={touched.facturas?.[index]?.valorNominal && Boolean(errors.facturas?.[index]?.valorNominal)}
                                      />
                                    </Grid>
                                    <Grid item xs={12} md={1.5}>
                                      <TextField
                                        label="Tasa Inversionista"
                                        fullWidth
                                        type="number"
                                        value={factura.tasaInversionista}
                                        onChange={(e) => setFieldValue(`facturas[${index}].tasaInversionista`, e.target.value)}
                                      />
                                    </Grid>
                                    <Grid item xs={12} md={1.5}>
                                      <DatePicker
                                        label="Fecha Fin"
                                        value={factura.fechaFin}
                                        onChange={(newValue) => setFieldValue(`facturas[${index}].fechaFin`, newValue)}
                                        renderInput={(params) => <TextField {...params} fullWidth />}
                                      />
                                    </Grid>
                                    <Grid item xs={12} md={1}>
                                      <TextField
                                        label="Días Operación"
                                        fullWidth
                                        type="number"
                                        value={factura.comisionSF}
                                        onChange={(e) => setFieldValue(`facturas[${index}].comisionSF`, e.target.value)}
                                      />
                                    </Grid>
                                    {/* Campo Utilidad Inversión*/ }
                                    <Grid item xs={12} md={3}>
                                      <TextField
                                        label="Utilidad Inversión"
                                        fullWidth
                                        value={formatCurrency(factura.valorNominal)} // Formato moneda
                                        disabled // Bloquear edición
                                        InputProps={{
                                          inputComponent: "input", // Asegura que se muestre correctamente
                                        }}
                                      />
                                    </Grid>
                                    {/* Valor Presente Inversión*/ }
                                    <Grid item xs={12} md={4}>
                                      <TextField
                                        label="Valor Presente Inversión"
                                        fullWidth
                                        value={formatCurrency(factura.valorNominal)} // Formato moneda
                                        disabled // Bloquear edición
                                        InputProps={{
                                          inputComponent: "input", // Asegura que se muestre correctamente
                                        }}
                                      />
                                    </Grid>
                                    {/* Valor Presente SF*/ }
                                    <Grid item xs={12} md={4}>
                                      <TextField
                                        label="Valor Presente SF"
                                        fullWidth
                                        value={formatCurrency(factura.valorNominal)} // Formato moneda
                                        disabled // Bloquear edición
                                        InputProps={{
                                          inputComponent: "input", // Asegura que se muestre correctamente
                                        }}
                                      />
                                    </Grid>
                                    {/* Comisión SF*/ }
                                    <Grid item xs={12} md={4}>
                                      <TextField
                                        label="Comisión SF"
                                        fullWidth
                                        value={formatCurrency(factura.valorNominal)} // Formato moneda
                                        disabled // Bloquear edición
                                        InputProps={{
                                          inputComponent: "input", // Asegura que se muestre correctamente
                                        }}
                                      />
                                    </Grid>
                                    {/*Selector de Corredor Inversionista */}
                                    <Grid item xs={12} md={4}>
                                      <TextField
                                        label="Corredor Inversionista *"
                                        fullWidth
                                        value={factura.corredorInversionista || ''} // Mostrar el corredor asignado
                                        disabled // Bloquear edición
                                        InputProps={{
                                          inputComponent: "input", // Asegura que se muestre correctamente
                                        }}
                                      />
                                    </Grid>
                                    {/* Gasto de Mantenimiento */}
                                    <Grid item xs={12} md={4}>
                                      <div className="flex flex-row gap-2 items-center p-2 border rounded-lg shadow-md">
                                        <label className="text-lg font-medium flex-shrink-0">Gasto de Mantenimiento (GM)</label>
                                        <Switch
                                          checked={factura.activo || false} // Se gestiona el estado activo de la factura
                                          onChange={(event) => setFieldValue(`facturas[${index}].activo`, event.target.checked)}
                                        />
                                        <TextField
                                          type="text"
                                          placeholder="$ 0,00"
                                          value={factura.gastoMantenimiento || ""}
                                          onChange={(e) => setFieldValue(`facturas[${index}].gastoMantenimiento`, e.target.value)}
                                          disabled={!factura.activo} // Deshabilita el campo si no está activo
                                          fullWidth
                                          variant="outlined"
                                          className={`flex-1 ${factura.activo ? "bg-white" : "bg-gray-200 text-gray-500"}`}
                                        />
                                      </div>
                                    </Grid>
                                  </Grid>
                                </AccordionDetails>
                              </Accordion>
                            </Grid>
                            {/* Botón de eliminar */}
                            <Grid item xs="auto">
                              <IconButton onClick={() => remove(index)}>
                                <DeleteIcon />
                              </IconButton>
                            </Grid>
                          </Grid>
                        </Grid>
                      ))}
                      <Grid item xs={12}>
                        <Button variant="contained" onClick={() => push({})}>
                          Agregar Factura
                        </Button>
                      </Grid>
                    </>
                  )}
                </FieldArray>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary">
                    Registrar Operación
                  </Button>
                </Grid>
              </Grid>
             {/* Modal de Confirmación */}
              <Modal open={openModal} onClose={handleCloseModal}>
                <Box sx={{ 
                  position: 'absolute', 
                  top: '50%', 
                  left: '50%', 
                  transform: 'translate(-50%, -50%)', 
                  backgroundColor: 'white', 
                  padding: 4, 
                  borderRadius: 2 
                }}>
                  <Typography variant="h6" mb={2}>¿Estás seguro de registrar la operación?</Typography>
                  <Button variant="outlined" onClick={handleCloseModal}>Cancelar</Button>
                  <Button variant="contained" color="primary" onClick={() => handleConfirm(values)}>Confirmar</Button>
                </Box>
              </Modal>
                </Form>
          )}
        </Formik>
      </Box>
    </LocalizationProvider>
  );
};

export default RegisterOperationForm;