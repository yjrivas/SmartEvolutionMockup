import { useState } from "react";
import { useEffect } from "react";
import Axios from "axios";
import Link from "next/link";
import { parseISO } from 'date-fns';
import SearchIcon from '@mui/icons-material/Search'; // Importa el ícono de búsqueda
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import {
  Box,
  Button,
  CircularProgress,
  Fade,
  Grid,
  Popover,
  IconButton,
  Typography,
  TextField,
  Tooltip,
} from "@mui/material";
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, subWeeks, subMonths } from "date-fns";
//import styled from "@emotion/styled";
//import TitleModal from "@components/modals/titleModal";

//import DateFormat from "@formats/DateFormat";
//import ValueFormat from "@formats/ValueFormat";

//import { useFetch } from "@hooks/useFetch";

//import BackButton from "@styles/buttons/BackButton";
//import CustomTooltip from "@styles/customTooltip";
//import BaseField from "@styles/fields/BaseField";
//import InputTitles from "@styles/inputTitles";
//import scrollSx from "@styles/scroll";
//import CustomDataGrid from "@styles/tables";
//import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
//import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
//import dayjs from 'dayjs';
//import { GetNegotiationSummaryPDF, GetSummaryList } from "./queries";
import ClearIcon from '@mui/icons-material/Clear';

//import moment from "moment";


// const StyledButton = styled(Button)`
//   color: #488b8f;
//   border-color: #488b8f;
//   text-transform: none;
//   margin: 5px 0;
//   &:hover {
//     color: #fff;
//     background-color: #3c7071;
//     border-color: #488b8f;
//   }
// `;

// const StyledApplyButton = styled(Button)`
//   background-color: #488b8f;
//   color: #fff;
//   text-transform: none;
//   &:hover {
//     background-color: #3c7071;
//   }
// `;

export const SummaryListComponent = () => {
  const columns = [
    {
      field: "NoOP",
      headerName: "NO. OP",
      width: 100,
      renderCell: (params) => {
        return <InputTitles>{params.value}</InputTitles>;
      },
    },
    {
      field: "date",
      headerName: "FECHA",
      width: 130,
      renderCell: (params) => {
        return (
          <InputTitles>
            {params.value ? moment(params.value).format("DD/MM/YYYY") : ""}
          </InputTitles>
        );
      },
    },
    {
      field: "emitter",
      headerName: "NOMBRE EMISOR",
      width: 280,
      renderCell: (params) => {
        return (
          <CustomTooltip
            title={params.value}
            arrow
            placement="bottom-start"
            TransitionComponent={Fade}
            PopperProps={{
              modifiers: [
                {
                  name: "offset",
                  options: {
                    offset: [0, 0],
                  },
                },
              ],
            }}
          >
            <InputTitles>{params.value}</InputTitles>
          </CustomTooltip>
        );
      },
    },
    {
      field: "payer",
      headerName: "NOMBRE PAGADOR",
      width: 280,
      renderCell: (params) => {
        return (
          <CustomTooltip
            title={params.value}
            arrow
            placement="bottom-start"
            TransitionComponent={Fade}
            PopperProps={{
              modifiers: [
                {
                  name: "offset",
                  options: {
                    offset: [0, 0],
                  },
                },
              ],
            }}
          >
            <InputTitles>{params.value}</InputTitles>
          </CustomTooltip>
        );
      },
    },

    {
      field: "total",
      headerName: "DESEMBOLSOS",
      width: 170,
      renderCell: (params) => {
        return (
          <InputTitles>
            <ValueFormat prefix="$ " value={params.value} />
          </InputTitles>
        );
      },
    },
    {
      field: "totalDeposits",
      headerName: "TOTAL CONSIGNACIONES",
      width: 170,
      renderCell: (params) => {
        return (
          <InputTitles>
            <ValueFormat prefix="$ " value={params.value} />
          </InputTitles>
        );
      },
    },
    {
      field: "pendingToDeposit",
      headerName: "PENDIENTE DESEMBOLSO",
      width: 190,
      renderCell: (params) => {
        return (
          <InputTitles>
            <ValueFormat prefix="$ " value={params.value} />
          </InputTitles>
        );
      },
    },

    //Iconos de acciones
    {
      field: "Editar resumen",
      headerName: "",
      width: 50,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        return (
          <Link
            href={`/administration/negotiation-summary?modify&id=${params.row.NoOP}&opId=${params.row.id}`}
          >
            <CustomTooltip
              title="Editar resumen"
              arrow
              placement="bottom-start"
              TransitionComponent={Fade}
              PopperProps={{
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: [0, -15],
                    },
                  },
                ],
              }}
            >
              <Typography
                fontFamily="icomoon"
                fontSize="1.9rem"
                color="#999999"
                borderRadius="5px"
                sx={{
                  "&:hover": {
                    backgroundColor: "#B5D1C980",
                    color: "#488B8F",
                  },
                  cursor: "pointer",
                }}
              >
                &#xe900;
              </Typography>
            </CustomTooltip>
          </Link>
        );
      },
    },
    {
      field: "Imprimir resumen",
      headerName: "",
      width: 50,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        return (
          <CustomTooltip
            title="Imprimir resumen"
            arrow
            placement="bottom-start"
            TransitionComponent={Fade}
            PopperProps={{
              modifiers: [
                {
                  name: "offset",
                  options: {
                    offset: [0, -15],
                  },
                },
              ],
            }}
          >
            <IconButton
              onClick={() => handleNegotiationSummaryClick(params.row.NoOP)}
            >
              <i
                className="fa-regular fa-print"
                style={{
                  fontSize: "1.3rem",
                  color: "#999999",
                  borderRadius: "5px",

                  "&:hover": {
                    backgroundColor: "#B5D1C980",
                    color: "#488B8F",
                  },
                }}
              ></i>
            </IconButton>
          </CustomTooltip>
        );
      },
    },
  ];

  const [filter, setFilter] = useState("");
  const [query, setQuery] = useState("");
  const [filterInput, setFilterInput] = useState("");
  const [errorFilter, setError] = useState("");
  const [dataFiltered, setDataFiltered] = useState(null);
  const [dateSelectedFilter,setDateSelectedFilter]=useState([])
  const [dataFilteredByDate,setDataFilteredByDate]=useState(null)
  const [isDateFilter,setIsDateFilter] = useState(false)
  const [filterParams, setFilterParams] = useState({
    id: "",
    emitter: "",
    startDate: "",
    endDate: "",
    page: 1,
  });
  
  
  // Hooks
  const {
    fetch: fetch,
    loading: loading,
    error: error,
    data: data,
  } = useFetch({
    service: GetSummaryList,
    init: true,
  });
  let dataCount = 0;

  if (Array.isArray(dataFiltered?.results)) {
    // Si `dataFiltered.results` es un array, contamos los elementos
    dataCount = dataFiltered.count;
  } else if (typeof dataFiltered?.data === "object") {
    // Si `dataFiltered.data` es un objeto, asumimos que hay un solo resultado
    dataCount = 1;
  } else if (Array.isArray(data?.results)) {
    // Si `data.results` es un array, contamos los elementos
    dataCount = data.count;
  }
  

  

  
  const [page, setPage] = useState(1);


  const summary = (
    
    dataFiltered?.results // Si `dataFiltered.data` es un array con elementos
      ? dataFiltered.results.map((summary) => ({
          id: summary.id,
          NoOP: summary.opId,
          date: summary.date,
          emitter: summary.emitter,
          payer: summary.payer,
          total: summary.total,
          totalDeposits: summary.totalDeposits,
          pendingToDeposit: summary.pendingToDeposit,
        }))
      : dataFiltered?.data // Si `dataFiltered.data` no es un array, se asume que es un objeto único
      ? [
          {
            id: dataFiltered.data.id,
            NoOP: dataFiltered.data.opId,
            date: dataFiltered.data.date,
            emitter: dataFiltered.data.emitter,
            payer: dataFiltered.data.payer,
            total: dataFiltered.data.total,
            totalDeposits: dataFiltered.data.totalDeposits,
            pendingToDeposit: dataFiltered.data.pendingToDeposit,
          },
        ]
      : data?.results // Si `data` tiene `results`, mapeamos los resultados
      ? data.results.map((summary) => ({
          id: summary.id,
          NoOP: summary.opId,
          date: summary.date,
          emitter: summary.emitter,
          payer: summary.payer,
          total: summary.total,
          totalDeposits: summary.totalDeposits,
          pendingToDeposit: summary.pendingToDeposit,
        }))
      : [] // Si no hay ni `data` ni `dataFiltered`, devolvemos un array vacío
  ) || [];
  

  //Configuración filtro numero operacion y emisor
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const {
    fetch: fetchNegotiationSummmary,
    loading: loadingNegotiationSummary,
    error: errorNegotiationSummary,
    data: dataNegotiationSummary,
  } = useFetch({ service: GetNegotiationSummaryPDF, init: false });

  const handleNegotiationSummaryClick = (id) => {
    fetchNegotiationSummmary(id);
    handleOpen();
  };


  const API_URL = process.env.NEXT_PUBLIC_API_URL;

   // Leer parámetros iniciales de la URL
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get("id") || "";
    const emitter = searchParams.get("emitter") || "";

    if (emitter) {
      setFilterInput(emitter);
    } else if (id) {
      setFilterInput(id);
    }
  }, []);



  const [pageFiltered,setPageFiltered]=useState(1)
  const [modeFilter,setModelFilter]=useState("")

  // Actualizar `pageFiltered` cada vez que `page` cambie
  useEffect(() => {
    console.log('pagina',page)
    setPageFiltered(page);
  }, [page]);



  const handleFilterChange = (e) => {
    setFilterInput(e.target.value);
    const { name, value } = e.target;
    setFilterParams((prevParams) => ({
      ...prevParams,
      [name]: value, // Actualiza el valor del filtro específico
    }));
    
  };

  const isNumber = (value) => {
    return /^\d+$/.test(value); // Comprueba si es un número entero
  };
 



  const [isFirstLoad, setIsFirstLoad] = useState(true); // Controla si es la primera carga o un cambio de página
  const [isFilterApplied, setIsFilterApplied] = useState(false); // Controla si el filtro está aplicado
  
  // Efecto para aplicar el filtro al cargar la página o cuando cambia filterInput
  useEffect(() => {
    if (filterInput !== "") {
      console.log('a')
      
      fetchFilteredData(); // Aplica el filtro
      setIsFilterApplied(true); // Marca que el filtro ha sido aplicado
    } else {
      setIsFilterApplied(false); // Si no hay filtro, reseteamos el estado
    }
  }, [filterInput]);
  
  // Efecto para manejar la paginación, que solo se activa después de aplicar el filtro
  useEffect(() => {
    if (!isFirstLoad && isFilterApplied) {
      console.log('b')
      
      fetchFilteredData(); 
      
    }
  }, [pageFiltered, isFirstLoad, isFilterApplied]);
  
  // Efecto que se ejecuta al inicio para marcar que es la primera carga y no cambiar el filtro
  useEffect(() => {
    if (isFirstLoad && filterInput !== "") {
      setIsFirstLoad(false); // Después de la primera carga, cambiamos el estado
      setPage(1)
    }
  }, [isFirstLoad, filterInput]);


  const fetchFilteredData = async () => {
    let url = `${API_URL}/report/negotiationSummary`;
    let params = new URLSearchParams(window.location.search); // Inicializamos con los parámetros actuales de la URL
    console.log("Hacemos peticiones de objetos filtrados");

    // Si hay un filtro
    if (filterInput !== "") {
        if (isNumber(filterInput)) {
            // Si el filtro es un número, es un filtro por `id`
            setModelFilter("id");
            params.set("id", filterInput);
            params.set("mode", "filter");
            params.set("emitter", ""); // Limpiamos otros filtros relacionados
        } else {
            // Si el filtro es texto, es un filtro por `emitter`
            setModelFilter("emitter");
            params.set("id", ""); // Limpiamos otros filtros relacionados
            params.set("mode", "filter");
            params.set("emitter", filterInput);
            params.set("page", pageFiltered);
        }
    }
    
    console.log(params.toString())
    console.log('filterInput',filterInput)
    console.log('paginas',page,pageFiltered)
    let params2={}
    try {
        console.log("Parámetros resultantes:", params.toString()); // Para verificar los parámetros

        // Actualizamos la URL del navegador con los parámetros modificados
        window.history.pushState(null, "", `?${params.toString()}`);
        try {
          // Realizamos la solicitud al backend con los parámetros actualizados
          const response = await Axios.get(url, {
              headers: {
                  authorization: `Bearer ${localStorage.getItem("access-token")}`,
              },
              params: Object.fromEntries(params.entries()), // Convertimos URLSearchParams a un objeto plano
          });
      
          console.log("Respuesta exitosa:", response.data);
          setDataFiltered(response.data); // Actualizamos los datos con la respuesta
          setError(""); // Limpiamos cualquier error previo
          return response; // O realiza la acción deseada con la respuesta
      } catch (error) {
          console.error("Error en la solicitud:", error);
          
          
          try {
            params.set("page", 1);
          setPage(1)
              const response = await Axios.get(url, {
                  headers: {
                      authorization: `Bearer ${localStorage.getItem("access-token")}`,
                  },
                  params: Object.fromEntries(params.entries()),
              });
                // Reiniciamos el parámetro "page" a 1 y hacemos una nueva solicitud
              
              console.log("Respuesta exitosa después de reiniciar página:", response.data);
              window.history.pushState(null, "", `?${params.toString()}`);
              
              setDataFiltered(response.data); // Actualizamos los datos con la respuesta
              setError(""); // Limpiamos cualquier error previo
              return response; // O realiza la acción deseada con la respuesta
          } catch (retryError) {
              console.error("Error en la solicitud después de reiniciar página:", retryError);
              throw retryError; // Propaga el error si no puedes manejarlo
          }
      }
      

      
    } catch (err) {
        setError("Error al realizar la solicitud. Verifique su entrada.");
        console.error("Error en la solicitud:", err);
    }
};

 

// Función para limpiar filtros
const clearFilters = async () => {
  try {
    // Actualizar la URL eliminando los parámetros de consulta
    window.history.pushState(null, "", "/administration/negotiation-summary/summaryList");

    // Restablecer el estado
    setFilterInput(""); // Limpiar el input del filtro
    setPageFiltered(1); // Restablecer la página filtrada
    setPage(1); // Restablecer la página a la inicial
    setError(""); // Limpiar errores

    // Realizar la solicitud inicial sin filtros
    const response = await fetch({
      page: 1, // Página inicial
    });

    // Actualizar los datos mostrados
    setDataFiltered(response.data);
  } catch (err) {
    setError("Error al limpiar los filtros.");
    console.error("Error al limpiar los filtros:", err);
  }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Configuración de datepicker
 // Restablecer el filtro
 const handleClear = async () => {
  let url = `${API_URL}/report/negotiationSummary`;
  setStartDatePicker(today);
  setAnchorEl(null); // Cierra el picker
  setEndDatePicker(today);
  setErrorPicker("");
  try{
       // Obtener los parámetros actuales de la URL
        const params = new URLSearchParams(window.location.search);

        // Eliminar los parámetros específicos
        params.delete("startDate");
        params.delete("endDate");

        // Actualizar la URL en el navegador
        window.history.pushState(null, "", `?${params.toString()}`);

            
        // Realizar la solicitud al backend
        const response = await Axios.get(url, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
          params: params,
        });

        setDataFiltered(response.data);
        setError(""); // Limpiar errores previos



  }
  
  catch (err) {
    setError("Error al realizar la solicitud. Verifique su entrada.");
    console.error("Error en la solicitud:", err);
  }
};


const formatDateSelected = (date) => {
  const d = new Date(date);
  return d.toISOString().split('T')[0]; // Esto devuelve el formato YYYY-MM-DD
};
const today = new Date();
const [anchorEl, setAnchorEl] = useState(null);
const [startDatePicker, setStartDatePicker] = useState(today);
const [endDatePicker, setEndDatePicker] = useState(today);
const [errorPicker, setErrorPicker] = useState("");

const openPicker = Boolean(anchorEl);

const handleOpenPicker = (event) => setAnchorEl(event.currentTarget);
const handleClosePickerSimple = () => {
  setOpen(false);
  
  setAnchorEl(null); // Cierra el picker
};

const handleClosePicker = async () => {
  let url = `${API_URL}/report/negotiationSummary`;
  let params = {}; // Parámetros de la solicitud

  setAnchorEl(null); // Cierra el picker
  setPage(1);
  // Asegúrate de que startDatePicker y endDatePicker estén en el formato adecuado
  const formattedStartDate = formatDateSelected(startDatePicker); // Formatear la fecha de inicio
  const formattedEndDate = formatDateSelected(endDatePicker); // Formatear la fecha de fin

  setDataFilteredByDate([formattedStartDate, formattedEndDate]); // Establece las fechas formateadas
  setIsDateFilter(true); // Activa el filtro de fecha
  
  // Si hay un filtro, asignamos los parámetros
  if (formattedStartDate !== "" && formattedEndDate !== "") {
    // Verificamos si filterInput es un número o un texto
    if (!isNaN(filterInput)) {
      // Si es un número, lo asignamos a 'id'
      params = {
        id: filterInput || "",
        mode: "filter",
        emitter: "", // No asignamos 'emitter' si es un número
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        page: 1,
      };
    } else {
      // Si es texto, lo asignamos a 'emitter'
      params = {
        id: "",
        mode: "filter",
        emitter: filterInput || "", // Asignamos 'emitter' si es un texto
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        page: 1,
      };
    }
  }

  try {
    // Obtener los parámetros actuales de la URL
    const currentParams = new URLSearchParams(window.location.search);
    
    // Merge de los parámetros actuales con los nuevos
    Object.keys(params).forEach((key) => {
      // Solo actualizamos el parámetro si tiene un valor no vacío
      if (params[key] !== "" && params[key] !== null) {
        currentParams.set(key, params[key]); // Modificar o agregar los parámetros
      } else if (!currentParams.has(key)) {
        // Si el parámetro no existe, se agrega con su valor
        currentParams.append(key, params[key]);
      }
    });

    console.log(currentParams.toString()); // Verificar los parámetros resultantes

    // Actualizar la URL del navegador con los nuevos parámetros
    window.history.pushState(null, "", `?${currentParams.toString()}`);

    // Realizar la solicitud al backend
    const response = await Axios.get(url, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
      params: params,
    });

    setDataFiltered(response.data);
    setError(""); // Limpiar errores previos
  } catch (err) {
    setError("Error al realizar la solicitud. Verifique su entrada.");
    console.error("Error en la solicitud:", err);
  }
};






const setQuickFilter = (type) => {
  const options = { weekStartsOn: 1 }; // Configura la semana para que empiece el lunes
  switch (type) {
    case "today":
      setStartDatePicker(today);
      setEndDatePicker(today);
      break;
    case "thisWeek":
      setStartDatePicker(startOfWeek(today, options));
      setEndDatePicker(endOfWeek(today, options));
      break;
    case "lastWeek":
      setStartDatePicker(startOfWeek(subWeeks(today, 1), options));
      setEndDatePicker(endOfWeek(subWeeks(today, 1), options));
      break;
    case "thisMonth":
      setStartDatePicker(startOfMonth(today));
      setEndDatePicker(endOfMonth(today));
      break;
    case "lastMonth":
      setStartDatePicker(startOfMonth(subMonths(today, 1)));
      setEndDatePicker(endOfMonth(subMonths(today, 1)));
      break;
    default:
      setStartDatePicker(today);
      setEndDatePicker(today);
  }
};




 // Manejar el cambio de fecha
 const handleDateChange = (type, value) => {
  const selectedDate = parseISO(value); // Evitar problemas con la hora
  if (isNaN(selectedDate.getTime())) {
    setError(`La fecha ${type === "start" ? "de inicio" : "de fin"} no es válida.`);
    return;
  }

  if (type === "start") {
    if (endDatePicker && selectedDate > endDatePicker) {
      setError("La fecha de inicio no puede ser posterior a la fecha de fin.");
      return;
    }
    setStartDatePicker(selectedDate);
  } else if (type === "end") {
    if (startDatePicker && selectedDate < startDatePicker) {
      setError("La fecha de fin no puede ser anterior a la fecha de inicio.");
      return;
    }
    setEndDatePicker(selectedDate);
  }

  setError("");
};


  return (
    <>
     
      <Box
  container
  display="flex"
  flexDirection="row"
  justifyContent="flex-start"  // Alinea a la izquierda
  alignItems="center"          // Alinea verticalmente los elementos
  gap="1rem"                   // Espacio entre el botón y el título
>
  <BackButton path="/administration" />
  <Typography
    letterSpacing={0}
    fontSize="1.7rem"
    fontWeight="regular"
    marginBottom="0.7rem"
    color="#5EA3A3"
  >
    Consulta de resumen de negociación
  </Typography>
</Box>



      





<Box
  display="flex"
  alignItems="center" // Alinea los elementos verticalmente
  justifyContent="space-between" // Espaciado entre los elementos
  sx={{
    width: '100%', // Asegura que el contenedor ocupe todo el ancho disponible
    padding: '16px', // Espaciado interno para separación
    gap: '20px', // Espacio entre el filtro y el botón de rango de fechas
    marginRigth: '10px', // Elimina cualquier margen adicional
    marginLeft: '-15px', // Mueve el contenedor 10 píxeles a la izquierda
  }}
>
  {/* Filtro */}
  <Box
    display="flex"
    alignItems="center"
    gap="8px"
    sx={{
      border: '1px solid #488f8f', // Borde gris claro
      borderRadius: '4px', // Bordes redondeados
      padding: '1px 1px', // Espaciado interno
      backgroundColor: '#f8f9fa', // Fondo gris claro
      width: '760px', // Ancho específico del componente
      
    }}
  >
    <TextField
      placeholder="Ingrese número de operación o emisor"
      variant="standard"
      value={filterInput}
      onChange={handleFilterChange}
      required
      InputProps={{
        disableUnderline: true, // Elimina la línea inferior
        sx: {
          fontSize: '0.875rem', // Tamaño del texto
          color: '#6c757d', // Color del texto
        },
      }}
      sx={{
        flex: 1, // El input ocupará el máximo espacio disponible
        '& .MuiInputBase-root': {
          padding: 0.2, // Ajusta el padding interno
        },
      }}
    />

    <Button
      onClick={clearFilters}
      variant="text"
      size="small"
      sx={{
        minWidth: 'unset', // Ajusta el tamaño del botón
        padding: 0.23,
        color: '#488f8f', // Color del ícono
        
      }}
    >
      <ClearIcon />
    </Button>
  </Box>

  {/* Botón para abrir el rango de fechas */}
  <Button
    onClick={handleOpenPicker}
    variant="outlined"
    startIcon={<CalendarTodayIcon />}
    sx={{
      textTransform: "none",
      borderColor: "#488b8f",
      color: "#488b8f",
      whiteSpace: "nowrap", // Evita que el texto del botón se divida en varias líneas
      backgroundColor: '#f8f9fa',
      marginRigth: "7px", // Mueve el botón 10 píxeles a la izquierda
      width: '260px'
    }}
  >
    {startDatePicker && endDatePicker
      ? `${format(startDatePicker, "dd/MM/yyyy")} - ${format(endDatePicker, "dd/MM/yyyy")}`
      : "Seleccionar rango"}
  </Button>


  <Link
          href="/administration/negotiation-summary?register"
          underline="none"
        >
  <Button
  variant="standard"
  color="primary"
  size="large"
  
  sx={{
    height: "2.6rem",
    backgroundColor: "transparent",
    border: "1.4px solid #63595C",
    borderRadius: "4px",
  }}
>
  <Tooltip title="Registrar Nuevo Resumen de Negociación" placement="top">
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Typography
        letterSpacing={0}
        fontSize="80%"
        fontWeight="bold"
        color="#63595C"
      >
        Nuevo Resumen
      </Typography>
      <Typography
        fontFamily="icomoon"
        fontSize="1.2rem"
        color="#63595C"
        marginLeft="0.9rem"
      >
        &#xe927;
      </Typography>
    </div>
  </Tooltip>
</Button>
</Link>
</Box>

{/* Popover para rango de fechas */}
      <Popover
        open={openPicker}
        anchorEl={anchorEl}
        onClose={handleClosePickerSimple}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box sx={{ padding: 2, width: 300 }}>
          <Typography variant="subtitle2" gutterBottom>
            Seleccionar Rango de Fechas
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="date"
                label="Fecha Inicio"
                value={startDatePicker ? format(startDatePicker, "yyyy-MM-dd") : ""}
                onChange={(e) => handleDateChange("start", e.target.value)}
                InputLabelProps={{ shrink: true }}
                error={!!errorPicker  && errorPicker .includes("inicio")}
                helperText={errorPicker  && errorPicker .includes("inicio") ? errorPicker  : ""}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="date"
                label="Fecha Fin"
                value={endDatePicker ? format(endDatePicker, "yyyy-MM-dd") : ""}
                onChange={(e) => handleDateChange("end", e.target.value)}
                InputLabelProps={{ shrink: true }}
                error={!!errorPicker && errorPicker .includes("fin")}
                helperText={errorPicker  && errorPicker .includes("fin") ? errorPicker  : ""}
              />
            </Grid>
          </Grid>

          {/* Filtros rápidos */}
          <Box sx={{ marginTop: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Filtros Rápidos
            </Typography>
            <StyledButton fullWidth onClick={() => setQuickFilter("today")}>
              Hoy
            </StyledButton>
            <StyledButton fullWidth onClick={() => setQuickFilter("thisWeek")}>
              Esta Semana
            </StyledButton>
            <StyledButton fullWidth onClick={() => setQuickFilter("lastWeek")}>
              Semana Anterior
            </StyledButton>
            <StyledButton fullWidth onClick={() => setQuickFilter("thisMonth")}>
              Este Mes
            </StyledButton>
            <StyledButton fullWidth onClick={() => setQuickFilter("lastMonth")}>
              Mes Anterior
            </StyledButton>
          </Box>

          {/* Botones de acciones */}
          <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
            <Button
              variant="text"
              color="primary"
              onClick={handleClear}
              sx={{ textTransform: "none" }}
            >
              Limpiar
            </Button>
            <StyledApplyButton onClick={handleClosePicker}>Aplicar</StyledApplyButton>
          </Box>
        </Box>
      </Popover>


   


      <Box
        container
        marginTop={4}
        display="flex"
        flexDirection="column"
        width="100%"
        height="100%"
      >
        <CustomDataGrid
          rows={summary}
          columns={columns}
          pageSize={15}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          disableColumnMenu
          components={{
            ColumnSortedAscendingIcon: () => (
              <Typography fontFamily="icomoon" fontSize="0.7rem">
                &#xe908;
              </Typography>
            ),

            ColumnSortedDescendingIcon: () => (
              <Typography fontFamily="icomoon" fontSize="0.7rem">
                &#xe908;
              </Typography>
            ),

            NoRowsOverlay: () => (
              <Typography
                fontSize="0.9rem"
                fontWeight="600"
                color="#488B8F"
                height="100%"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                No hay resumenes de negociación registrados
              </Typography>
            ),

            Pagination: () => (
              <Box
                container
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography fontSize="0.8rem" fontWeight="600" color="#5EA3A3">
                  {page * 15 - 14} - {page * 15} de {dataCount}{" "}
                </Typography>
                <Box
                  container
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                >
                  <Typography
                    fontFamily="icomoon"
                    fontSize="1.2rem"
                    marginRight="0.3rem"
                    marginLeft="0.5rem"
                    sx={{
                      cursor: "pointer",
                      transform: "rotate(180deg)",
                      color: "#63595C",
                    }}
                    onClick={() => {
                      if (page > 1) {
                        if(data){
                          const backPage = page - 1;
                          const currentParams = new URLSearchParams(window.location.search);
                          currentParams.set("page", backPage); // Establecer la nueva página
                          if (currentParams.has('emitter') &&
                          currentParams.has('startDate') &&
                          currentParams.has('endDate') &&
                          currentParams.has('page'))
                            {
                              console.log("Navegación con filtros activos");
                              console.log('atras')
                              window.history.pushState(null, "", `?${currentParams.toString()}`);
                              setPage(page - 1);
                              
                              fetchFilteredData() 
                              
                            }
                            else{
                              window.history.pushState(null, "", `?${currentParams.toString()}`);
                              fetch({
                                page: page - 1,
                                ...(Boolean(filter) && { [filter]: query }),
                              });
                              
                              setPage(page - 1);
                            }
                          
                         
                          

                        }
                        
                        
                       
                        
                      }
                    }}
                  >
                    &#xe91f;
                  </Typography>
                  <Typography
                    fontFamily="icomoon"
                    fontSize="1.2rem"
                    marginRight="0.3rem"
                    marginLeft="0.5rem"
                    sx={{
                      cursor: "pointer",

                      color: "#63595C",
                    }}
                    onClick={() => {
                      const nextPage = page + 1;
                      const currentParams = new URLSearchParams(window.location.search);
                      currentParams.set("page", nextPage); // Establecer la nueva página
                      if (page < dataCount / 15) {
                        if(data){
                          console.log('fetch hacia adelante')
                          
                          
                          console.log(currentParams.toString())
                          const pagea = currentParams.get("page");
                          const ida = currentParams.get("id");
                          const modea = currentParams.get("mode");
                          const emittera = currentParams.get("emitter");
                          const startDatea = currentParams.get("startDate");
                          const endDatea = currentParams.get("endDate")
                          if (emittera!="" &&
                            currentParams.has('emitter') &&
                          currentParams.has('startDate') &&
                          currentParams.has('endDate') &&
                          currentParams.has('page'))
                            {
                              console.log("Navegación con filtros activos");
                              console.log('adelante')
                              window.history.pushState(null, "", `?${currentParams.toString()}`);
                              setPage(page + 1);
                             
                             
                            }
                            else if (emittera=="" && startDatea!="" && currentParams.has('startDate') &&
                            currentParams.has('endDate') &&
                            currentParams.has('page'))
                              {
                                console.log("Navegación con filtros activos");
                                console.log('adelante')
                                window.history.pushState(null, "", `?${currentParams.toString()}`);
                                setPage(page + 1);
                               fetchFilteredData()
                               
                              }
                            else{
                              console.log('else aqui')
                              window.history.pushState(null, "", `?${currentParams.toString()}`);
                              fetch({
                                page: page + 1,
                                ...(Boolean(filter) && { [filter]: query }),
                              });
                              
                              setPage(page + 1);
                            }
                          
                         
                        }
                       
                        
                        
                      }
                    }}
                  >
                    &#xe91f;
                  </Typography>
                </Box>
              </Box>
            ),
          }}
          componentsProps={{
            pagination: {
              color: "#5EA3A3",
            },
          }}
          loading={loading}
        />
        <TitleModal
          open={open}
          handleClose={handleClose}
          containerSx={{
            width: "70%",
            height: "60%",
          }}
          title={"Resumen de negociación (PDF)"}
        >
          <Box
            display="flex"
            flexDirection="column"
            mt={5}
            sx={{ ...scrollSx }}
            height="50vh"
            alignItems="center"
          >
            {loadingNegotiationSummary && (
              <CircularProgress style={{ color: "#488B8F" }} />
            )}
            {dataNegotiationSummary && dataNegotiationSummary?.pdf && (
              <iframe
                src={`data:application/pdf;base64,${dataNegotiationSummary?.pdf}`}
                width="100%"
                height="100%"
              />
            )}
          </Box>
        </TitleModal>
      </Box>
    </>
  );
};

// import React, { useState, useEffect } from "react";
// import { DataGrid } from "@mui/x-data-grid";
// import mockData from "./ValoragirarModal/mockData"; // Datos de prueba

// const Operations = () => {
//   const [rows, setRows] = useState([]);
//   const [pageSize, setPageSize] = useState(10);
//   const [loading, setLoading] = useState(false);
//   const [rowCount, setRowCount] = useState(0);

//   // Cargar datos de prueba inicialmente
//   useEffect(() => {
//     setRows(mockData);
//     setRowCount(mockData.length);
//   }, []);

//   // Columnas básicas para DataGrid
//   const columns = [
//     { field: "estado", headerName: "Estado", width: 160 },
//     { field: "id", headerName: "ID", width: 80 },
//     { field: "creado_el", headerName: "Creado el", width: 110 },
//     { field: "emisor", headerName: "Emisor", width: 200 },
//     { field: "tasa_desc", headerName: "Tasa Desc.", width: 90 },
//     { field: "tasa_inv", headerName: "Tasa Inv.", width: 90 },
//     { field: "Valor Nominal", headerName: "Valor Nominal", width: 110 },
//     { field: "Valor Inversionista", headerName: "Valor Inversionista", width: 110 },
//   ];

//   return (
//     <div style={{ height: 600, width: "100%" }}>
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         pageSize={pageSize}
//         onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
//         loading={loading}
//         rowsPerPageOptions={[5, 10, 20, 50]}
//       />
//     </div>
//   );
// };

// export default Operations;

// import React, { useState, useEffect } from "react";
// import { DataGrid } from "@mui/x-data-grid";
// import axios from "axios";
// import { Menu, MenuItem, IconButton, Tooltip } from "@mui/material";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import DocumentIcon from "@mui/icons-material/Description";
// import CustomPagination from "./CustomPagination";
// import mockData from "./ValoragirarModal/mockData"; // Datos de prueba

// const Operations = () => {
//   const [rows, setRows] = useState([]);
//   const [groupedRows, setGroupedRows] = useState([]);
//   const [selectedOperation, setSelectedOperation] = useState(null);
//   const [page, setPage] = useState(0);
//   const [pageSize, setPageSize] = useState(10);
//   const [loading, setLoading] = useState(false);
//   const [rowCount, setRowCount] = useState(0);

//   // Cargar datos de prueba inicialmente
//   useEffect(() => {
//     setRows(mockData);
//     setRowCount(mockData.length);
//   }, []);

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get("/api/preoperaciones", {
//         params: { page: page + 1, page_size: pageSize },
//       });
//       setRows(response.data.results);
//       setRowCount(response.data.total_count); // Ajustar el número total de filas
//     } catch (error) {
//       console.error("Error fetching data", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [page, pageSize]);

//   const handleGroupOperations = () => {
//     const grouped = rows.reduce((acc, row) => {
//       const groupKey = row.estado;
//       if (!acc[groupKey]) acc[groupKey] = { id: groupKey, estado: groupKey, children: [] };
//       acc[groupKey].children.push(row);
//       return acc;
//     }, {});
//     setGroupedRows(Object.values(grouped));
//   };

//   const columns = [
//     { field: "estado", headerName: "Estado", width: 160 },
//     { field: "id", headerName: "ID", width: 80 },
//     { field: "creado_el", headerName: "Creado el", width: 110 },
//     { field: "emisor", headerName: "Emisor", width: 200 },
//     { field: "tasa_desc", headerName: "Tasa Desc.", width: 90 },
//     { field: "tasa_inv", headerName: "Tasa Inv.", width: 90 },
//     { field: "Valor Nominal", headerName: "Valor Nominal", width: 110 },
//     { field: "Valor Inversionista", headerName: "Valor Inversionista", width: 110 },
//     {
//       field: "Acciones",
//       headerName: "Acciones",
//       width: 90,
//       renderCell: (params) => (
//         <div style={{ display: "flex", justifyContent: "center" }}>
//           <Tooltip title="Ver Detalles">
//             <IconButton onClick={() => handleOperationRowClick(params.row.id)}>
//               <DocumentIcon />
//             </IconButton>
//           </Tooltip>
//           <IconButton>
//             <MoreVertIcon />
//           </IconButton>
//         </div>
//       ),
//     },
//   ];

//   const operationColumns = [
//     { field: "factura_fraccion", headerName: "# Factura / Fracción", width: 150 },
//     { field: "emisor", headerName: "Emisor", width: 200 },
//     { field: "inversionista", headerName: "Inversionista", width: 200 },
//     { field: "tasa_desc", headerName: "Tasa Desc.", width: 90 },
//     { field: "tasa_inv", headerName: "Tasa Inv.", width: 90 },
//     { field: "Valor Nominal", headerName: "Valor Nominal", width: 110 },
//     { field: "Valor Inversionista", headerName: "Valor Inversionista", width: 110 },
//   ];

//   const handleOperationRowClick = (operationId) => {
//     const selectedOp = groupedRows.find((op) => op.id === operationId);
//     setSelectedOperation(selectedOp);
//   };

//   return (
//     <div style={{ height: 600, width: "100%" }}>
//       <button onClick={handleGroupOperations}>Agrupar Operaciones</button>
//       {selectedOperation ? (
//         <>
//           <h3>Detalles de la Operación: {selectedOperation.estado}</h3>
//           <DataGrid
//             rows={selectedOperation.children}
//             columns={operationColumns}
//             pageSize={5}
//             loading={loading}
//           />
//         </>
//       ) : (
//         <DataGrid
//           rows={groupedRows.length > 0 ? groupedRows : rows}
//           columns={columns}
//           pageSize={pageSize}
//           paginationMode="server"
//           rowCount={rowCount}
//           onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
//           onPageChange={(newPage) => setPage(newPage)}
//           loading={loading}
//           rowsPerPageOptions={[5, 10, 20, 50]}
//           components={{ Pagination: CustomPagination }}
//         />
//       )}
//     </div>
//   );
// };

// export default Operations;
