
export const sampleData = [
    {
      id: 1,
      op: "P-013",
      creado_el: "13 Ago 2024",
      tipo: "Compra título",
      facturas: 6,
      emisor: "EMISOR A",
      detalles: [
        {
        estado: "Por aprobar",
          factura: "10001",
          fraccion: "1",
          pagador: "PAGADOR A",
          inversionista: "INVERSIONISTA A",
          tasaDesc: "26.46%",
          tasaInver: "15.44%",
          valorInversionista: "$100,000,000.00",
          fechaProbable: "24 Oct 2025",
          fechaFin: "05 Dic 2025"
          
        },
        {
        estado: "Aprobado",
        factura: "10002",
          fraccion: "2",
          pagador: "PAGADOR B",
          inversionista: "INVERSIONISTA B",
          tasaDesc: "24.50%",
          tasaInver: "14.20%",
          valorInversionista: "$50,000,000.00",
          fechaProbable: "15 Nov 2025",
          fechaFin: "20 Ene 2026"
        },
        {
        estado: "Rechazado",
        factura: "10003",
          fraccion: "3",
          pagador: "PAGADOR C",
          inversionista: "INVERSIONISTA C",
          tasaDesc: "23.10%",
          tasaInver: "13.75%",
          valorInversionista: "$30,000,000.00",
          fechaProbable: "05 Dic 2025",
          fechaFin: "10 Feb 2026"
        },
        {
          
        estado: "Por aprobar",
        factura: "10004",
          fraccion: "4",
          pagador: "PAGADOR D",
          inversionista: "INVERSIONISTA D",
          tasaDesc: "22.00%",
          tasaInver: "12.50%",
          valorInversionista: "$40,000,000.00",
          fechaProbable: "20 Dic 2025",
          fechaFin: "15 Mar 2026"
        },
        {
        estado: "Por aprobar",
        factura: "10005",
          fraccion: "5",
          pagador: "PAGADOR E",
          inversionista: "INVERSIONISTA E",
          tasaDesc: "21.50%",
          tasaInver: "12.00%",
          valorInversionista: "$20,000,000.00",
          fechaProbable: "10 Ene 2026",
          fechaFin: "20 Abr 2026"
        },
        {
        estado: "Aprobado",
        factura: "10006",
          fraccion: "6",
          pagador: "PAGADOR F",
          inversionista: "INVERSIONISTA F",
          tasaDesc: "20.75%",
          tasaInver: "11.75%",
          valorInversionista: "$25,000,000.00",
          fechaProbable: "05 Feb 2026",
          fechaFin: "25 May 2026"
        }
      ]
    },
    {
      id: 2,
      op: "P-014",
      creado_el: "10 Ago 2024",
      tipo: "Compra título",
      facturas: 3,
      emisor: "EMISOR B",
      detalles: [
        {
        estado: "Por aprobar",
        factura: "20001",
          fraccion: "1",
          pagador: "PAGADOR C",
          inversionista: "INVERSIONISTA C",
          tasaDesc: "22.30%",
          tasaInver: "13.80%",
          valorInversionista: "$75,000,000.00",
          fechaProbable: "10 Oct 2025",
          fechaFin: "30 Dic 2025"
        },
        {
        estado: "Aprobado",
        factura: "20002",
          fraccion: "2",
          pagador: "PAGADOR D",
          inversionista: "INVERSIONISTA D",
          tasaDesc: "21.00%",
          tasaInver: "12.90%",
          valorInversionista: "$40,000,000.00",
          fechaProbable: "05 Nov 2025",
          fechaFin: "10 Feb 2026"
        },
        {
        estado: "Rechazado",
        factura: "20003",
          fraccion: "3",
          pagador: "PAGADOR E",
          inversionista: "INVERSIONISTA E",
          tasaDesc: "23.75%",
          tasaInver: "14.50%",
          valorInversionista: "$60,000,000.00",
          fechaProbable: "20 Nov 2025",
          fechaFin: "15 Ene 2026"
        }
      ]
    },
    {
      id: 3,
      op: "P-015",
      creado_el: "08 Ago 2024",
      tipo: "Recompra",
      facturas: 1,
      emisor: "EMISOR C",
      detalles: [
        {
        estado: "Rechazado",
          factura: "30001",
          fraccion: "1",
          pagador: "PAGADOR F",
          inversionista: "INVERSIONISTA F",
          tasaDesc: "20.00%",
          tasaInver: "12.00%",
          valorInversionista: "$90,000,000.00",
          fechaProbable: "18 Oct 2025",
          fechaFin: "05 Ene 2026"
        }
      ]
    },
    {
      id: 4,
      op: "P-016",
      creado_el: "05 Ago 2024",
      tipo: "Recompra",
      facturas: 2,
      emisor: "EMISOR D",
      detalles: [
        {
          estado: "Vigente",
            factura: "40001",
            fraccion: "1",
            pagador: "PAGADOR F",
            inversionista: "INVERSIONISTA F",
            tasaDesc: "20.00%",
            tasaInver: "12.00%",
            valorInversionista: "$90,000,000.00",
            fechaProbable: "18 Oct 2025",
            fechaFin: "05 Ene 2026"
          },
          {
            estado: "Cancelada",
              factura: "40001",
              fraccion: "1",
              pagador: "PAGADOR F",
              inversionista: "INVERSIONISTA F",
              tasaDesc: "20.00%",
              tasaInver: "12.00%",
              valorInversionista: "$90,000,000.00",
              fechaProbable: "18 Oct 2025",
              fechaFin: "05 Ene 2026"
            },
            {
              estado: "Vencida",
                factura: "40001",
                fraccion: "1",
                pagador: "PAGADOR F",
                inversionista: "INVERSIONISTA F",
                tasaDesc: "20.00%",
                tasaInver: "12.00%",
                valorInversionista: "$90,000,000.00",
                fechaProbable: "18 Oct 2025",
                fechaFin: "05 Ene 2026"
              }
  


      ]
    },
    {
      id: 5,
      op: "P-017",
      creado_el: "02 Ago 2024",
      tipo: "Recompra",
      facturas: 3,
      emisor: "EMISOR E",
      detalles: []
    }
  ];

// Datos para PreOperations (versión plana)
export const sampleDataPreOperations = sampleData.flatMap((operacion) =>
    operacion.detalles.map((detalle, index) => ({
      id: operacion.id * 1000 + index,
      factura_fraccion: `${detalle.factura} / ${detalle.fraccion}`,
      emisor: operacion.emisor,
      inversionista: detalle.inversionista,
      pagador: detalle.pagador,
      estado: detalle.estado,
      creado_el: operacion.creado_el,
      tasa_desc: parseFloat(detalle.tasaDesc.replace("%", "")) || 0,
      porcentaje_desc: parseFloat(detalle.tasaDesc.replace("%", "")) || 0,
      tasa_inv: parseFloat(detalle.tasaInver.replace("%", "")) || 0,
      "Valor Nominal": parseFloat(detalle.valorInversionista.replace(/[^0-9.-]+/g, "")) || 0,
      "Valor Inversionista": parseFloat(detalle.valorInversionista.replace(/[^0-9.-]+/g, "")) || 0,
      "Fecha probable": detalle.fechaProbable,
      "Fecha Fin": detalle.fechaFin
    }))
  );
  
  export default sampleData;