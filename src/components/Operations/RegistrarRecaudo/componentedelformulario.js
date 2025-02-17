import { useState, useEffect } from "react";
import { Grid, TextField, Button, MenuItem, Typography } from "@mui/material";
import { useRouter } from "next/router"; // Importamos useRouter de Next.js

const ReceiptRegisterForm = () => {
  const router = useRouter(); // Usamos useRouter para obtener los parámetros de la URL
  const { id } = router.query; // Extraemos el parámetro 'id' de la URL

  const [formData, setFormData] = useState({
    fechaAplicacion: "", // Fecha de aplicación
    diasReales: "",
    estadoRecaudo: "",
    tipoRecaudo: "",
    nombreInversionista: "",
    cuenta: "",
    montoAplicacion: "",
    remanente: "",
    pendientePorCobrar: "",
    valorPresenteInversionista: "",
    diasCalculo: "",
    valorFuturoRecalculado: "",
    remanenteMesa: "",
    interesesAdicionales: "",
    diasAdicionales: "",
    interesesAdicionalesSM: "",
    interesesAdicionalesInv: "",
  });

  useEffect(() => {
    // Establecer la fecha de aplicación como la fecha actual
    const today = new Date().toISOString().split("T")[0]; // Solo la parte de la fecha
    setFormData((prev) => ({ ...prev, fechaAplicacion: today }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", formData);
    alert("Recaudo registrado con éxito");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <Typography variant="h4" gutterBottom>
        Registrar Recaudo a la Operación: {id} {/* Aquí mostramos el id de la operación */}
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Fecha Aplicación */}
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              type="date"
              label="Fecha Aplicación"
              name="fechaAplicacion"
              value={formData.fechaAplicacion}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          {/* Días Reales */}
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              type="number"
              label="Días Reales"
              name="diasReales"
              value={formData.diasReales}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          {/* Estado Recaudo */}
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              select
              label="Estado Recaudo"
              name="estadoRecaudo"
              value={formData.estadoRecaudo}
              onChange={handleChange}
              fullWidth
              required
            >
              <MenuItem value="Cancelado">Cancelado</MenuItem>
              <MenuItem value="Vencido">Vencido</MenuItem>
            </TextField>
          </Grid>

          {/* Tipo de Recaudo */}
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Tipo de Recaudo"
              name="tipoRecaudo"
              value={formData.tipoRecaudo}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          {/* Nombre Inversionista */}
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Nombre Inversionista"
              name="nombreInversionista"
              value={formData.nombreInversionista}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          {/* Cuenta */}
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Cuenta"
              name="cuenta"
              value={formData.cuenta}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          {/* Monto Aplicación */}
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              type="number"
              label="Monto Aplicación"
              name="montoAplicacion"
              value={formData.montoAplicacion}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          {/* Remanente */}
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              type="number"
              label="Remanente"
              name="remanente"
              value={formData.remanente}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          {/* Pendiente Por Cobrar */}
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              type="number"
              label="Pendiente Por Cobrar"
              name="pendientePorCobrar"
              value={formData.pendientePorCobrar}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          {/* Valor Presente Inversionista */}
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              type="number"
              label="Valor Presente Inversionista"
              name="valorPresenteInversionista"
              value={formData.valorPresenteInversionista}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          {/* Días Cálculo */}
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              type="number"
              label="Días Cálculo"
              name="diasCalculo"
              value={formData.diasCalculo}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          {/* Valor Futuro Recalculado */}
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              type="number"
              label="Valor Futuro Recalculado"
              name="valorFuturoRecalculado"
              value={formData.valorFuturoRecalculado}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          {/* Remanente Mesa */}
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              type="number"
              label="Remanente Mesa"
              name="remanenteMesa"
              value={formData.remanenteMesa}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          {/* Intereses Adicionales */}
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              type="number"
              label="Intereses Adicionales"
              name="interesesAdicionales"
              value={formData.interesesAdicionales}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          {/* Días Adicionales */}
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              type="number"
              label="Días Adicionales"
              name="diasAdicionales"
              value={formData.diasAdicionales}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          {/* Intereses Adicionales SM */}
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              type="number"
              label="Intereses Adicionales SM"
              name="interesesAdicionalesSM"
              value={formData.interesesAdicionalesSM}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          {/* Intereses Adicionales Inversión */}
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              type="number"
              label="Intereses Adicionales Inversión"
              name="interesesAdicionalesInv"
              value={formData.interesesAdicionalesInv}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          {/* Botón de Enviar */}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Registrar Recaudo
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default ReceiptRegisterForm;
