"use strict";

let chart;
let chartCl;

let paso = 1;
let pasoCl = 1;
const ventanaFlotante = document.getElementById("ventanaFlotante");
const ventanaFlotanteclima = document.getElementById("ventanaClima");
const server = "http://192.168.3.122:1880";

const tempoColdExt = "#3275E4";
const tempOkExt = "#F4E441";
const tempMhotExt = "#FA9133";
const tempHotExt = "#F43B2F";

const humOkExt = "#37AED8";

const alertClima = "#BD1F1F";
const okClima = "#2bc12cff";

const neutral = "#8F8F8F";

const alertFiltro = "#DC5252";
const okFiltro = "#24A024";

const textOk = "#7DD129";
const textNotOk = "#DF1111";

const offline = "#DE7511";

const mouseOver = "#58B7D3";

const mouseOut = "#333";

const fab3FiltroEx8 = document.getElementById("filtroEX-8Fab3");
const fab3ClimaC80T = document.getElementById("climaGc80TFab3");
const fab3ClimaC80H = document.getElementById("climaGc80HFab3");
const fab3ClimaPeiT = document.getElementById("climaGpeinadorasTFab3");
const fab3ClimaPeiH = document.getElementById("climaGpeinadorasHFab3");
const fab3ClimaManT = document.getElementById("climaGmanuaresTFab3");
const fab3ClimaManH = document.getElementById("climaGmanuaresHFab3");
const fab3FiltroPei = document.getElementById("filtroPrepFab3-5");

const fab4FiltroClima = document.getElementById("filtroClimaFab4");
const fab4ClimaPrepT = document.getElementById("climaGprepTFab4");
const fab4ClimaPrepH = document.getElementById("climaGprepHFab4");

const fab4ClimaOpenEndT = document.getElementById("climaGopenEndTFab4");
const fab4ClimaOpenEndH = document.getElementById("climaGopenEndHFab4");

const fab4FiltroRetor = document.getElementById("filtroRetorFab4");
const fab4ClimaRetorT = document.getElementById("climaGoretorTFab4");
const fab4ClimaRetorH = document.getElementById("climaGoretorHFab4");

const fab6FiltroPrep = document.getElementById("filtroPrepFab6");
const fab6ClimaPrepT = document.getElementById("climaGPrepTFab6");
const fab6ClimaPrepH = document.getElementById("climaGPrepHFab6");

const fab6FiltroCont = document.getElementById("filtroContFab6");
const fab6ClimaContT = document.getElementById("climaGContTFab6");
const fab6ClimaContH = document.getElementById("climaGContHFab6");

const fab6FiltroBob = document.getElementById("filtroBobFab6");
const fab6ClimaBobT = document.getElementById("climaGBobTFab6");
const fab6ClimaBobH = document.getElementById("climaGBobHFab6");


const fab1FiltroColor = document.getElementById("filtroColorFab1");

const climaExt = (direccion) => {
  const tempExteriortext = document.getElementById("tspan4870");
  const tempExt = document.getElementById("tspan4870");
  const humExterior = document.getElementById("tspan4872");
  const fecha = document.getElementById("tspan4876");
  const fechaActual = new Date();
  const fechaText = `${fechaActual.getDate()} / ${
    fechaActual.getMonth() + 1
  } / ${fechaActual.getFullYear()}`;
  fecha.textContent = fechaText;

  const sector = new XMLHttpRequest();

  sector.onreadystatechange = () => {
    if (sector.readyState == XMLHttpRequest.DONE) {
      if (sector.status == 200) {
        const date = JSON.parse(sector.responseText);
        const tempExtdate = `${parseInt(date.datos[0].temperatura)} °C`;
        const humExtdata = `${parseInt(date.datos[0].humedad)} %`;
        if (date.datos[0].temperatura < 20) {
          tempExt.style.fill = tempoColdExt;
          tempExt.style.stroke = tempoColdExt;
        } else if (date.datos[0].temperatura < 30) {
          tempExt.style.fill = tempOkExt;
          tempExt.style.stroke = tempOkExt;
        } else if (
          date.datos[0].temperatura >= 30 &&
          date.datos[0].temperatura < 38
        ) {
          tempExt.style.fill = tempMhotExt;
          tempExt.style.stroke = tempMhotExt;
        } else if (date.datos[0].temperatura >= 38) {
          tempExt.style.fill = tempHotExt;
          tempExt.style.stroke = tempHotExt;
        }
        tempExteriortext.textContent = tempExtdate;
        humExterior.textContent = humExtdata;
      } else console.log("error", sector);
    }
  };
  sector.open("GET", direccion, true);
  sector.send();
};

const ventanaFlotanteFiltro = (direccion, boton, e, tipo) => {
  let ctx = document.getElementById("myChartfiltro");
  const sector = new XMLHttpRequest();
  let x = e.clientX + 15; // Agregar un desplazamiento a la derecha
  let y = e.clientY;
  boton.style.fill = mouseOver;

  if (e.clientY >= 45 && e.clientY < 100) y = y + 30;
  else if (e.clientY >= 100 && e.clientY < 200) y = y + 30;
  else if (e.clientY >= 200 && e.clientY < 300) {
    y = y + 10;
    x = x - 205;
  } else if (e.clientY >= 300 && e.clientY < 400) {
    y = y - 360;
  
  }
  else if (e.clientY >= 400 && e.clientY < 500) {
    y = y - 360;
    x = x - 180;
  } else if (e.clientY >= 500 && e.clientY < 600) {
    y = y - 360;
    x = x - 205;
  } else if (e.clientY >= 600 && e.clientY < 700) {
    y = y - 360;
    x = x - 35;
  } else y = y - 50;

  /* else if((e.clientY > 400) && (e.clientX > 1100)) {
    y = y - 360;
    x = x - 205;
    console.log('entra');
   }*/

  ventanaFlotante.style.left = x + "px";
  ventanaFlotante.style.top = y + "px";
  ventanaFlotante.style.display = "block";
  sector.onreadystatechange = () => {
    if (paso === 1) {
      if (sector.readyState == XMLHttpRequest.DONE) {
        if (sector.status == 200) {
          let date = JSON.parse(sector.responseText);
          const dataTempReal = date.datos[0];
          const limtieG = dataTempReal.limFiltroVentilador + 100;
          const datos = date.datos;
          const infoTFiltroV = `Diferencial de la Tela: (Limite Sup: ${dataTempReal.limFiltroVentilador} Pa)`;
          const infoFiltroVent = `${dataTempReal.filtroVentilador.toFixed(2)} Pa`;
          const infoTVent = `Ventilador: (Limite Inf: ${dataTempReal.limVentilador} Pa)`;
          const infoVent = `${dataTempReal.ventilador.toFixed(2)} Pa`;
          const infoTpicos = `Picos: (Limite Inf: ${dataTempReal.limPicos} Pa)`;
          const infoPicos = `${dataTempReal.picos.toFixed(2)} Pa`;
          const infoTRpm = `RPM: (Limite Inf: ${dataTempReal.limRpmFiltro} RPM)`;
          const infoRpm = `${dataTempReal.rpmFiltro} RPM`;
          const infoTCarro = `Carro: (Limite Inf: ${dataTempReal.limCarro})`;
          const infoCarro = `${dataTempReal.carro}`;
          const inst = document.getElementById("instalacion");
          const titleFiltroV = (document.getElementById("titleTela").textContent = infoTFiltroV);
          const diferencial = document.getElementById("filtroVent");
          const titleVent = (document.getElementById("titleVent").textContent = infoTVent);
          const vent = document.getElementById("vent");
          const titlePico = (document.getElementById("titlePicos").textContent = infoTpicos);
          const pico = document.getElementById("pico");
          const titleRpm = (document.getElementById("titleRpm").textContent = infoTRpm);
          const rpm = document.getElementById("rpm");
          const titleCarrp = (document.getElementById("titleCarro").textContent = infoTCarro);
          const carro = document.getElementById("carro");
          let datoss = [];
          let limite = [];
          inst.textContent = `${date.instalacion}`;

          if (this.chart) {
            this.chart.destroy();
          }

          let ultID = dataTempReal.ID;

          for (let i = 0; i < datos.length; i++) {
            let id = datos[i].ID;

            if (id === ultID) {
              ultID = id;
              let fecha = new Date(datos[i].fecha);
              let hora = fecha.getHours().toString().padStart(2, "0");
              let minuto = fecha.getMinutes().toString().padStart(2, "0");
              let horaText = `${hora}:${minuto}`;
              datoss.push({
                x: horaText,
                y: `${parseInt(datos[i].filtroVentilador)}`,
              });
              limite.push({
                x: horaText,
                y: `${datos[i].limFiltroVentilador}`,
              });
              ultID = ultID - 15;
            }
          }

          limite.reverse();
          datoss.reverse();
          //console.log(dataTempReal);
          //console.log(datoss);

          //chart.update();

          this.chart = new Chart(ctx, {
            type: "line",
            data: {
              datasets: [
                {
                  label: "Diferencial",
                  borderColor: "blue",
                  borderWidth: 1.5,
                  data: datoss,
                  //yAxisID: 'y',
                },
                {
                  label: "Límite",
                  borderColor: "#20A907",
                  borderWidth: 1,
                  data: limite,
                  //yAxisID: 'y1',
                },
              ],
            },
            options: {
              elements: {
                point: {
                  radius: 0, // Establecer el radio de los puntos en 0 para ocultarlos
                },
              },
              animations: {
                /*tension: {

                },*/
              },
              scales: {
                y: {
                  max: limtieG,
                  min: 0,
                  /* title: {
                                    display: true,
                                    text: 'Valores',
                                  },*/
                },
              },
            },
          });

          //console.log(datoss);
          //console.log(tiempo);

          if (tipo === 1) {
            diferencial.textContent = infoFiltroVent;
            dataTempReal.filtroVentilador > dataTempReal.limFiltroVentilador
              ? (diferencial.style.color = textNotOk)
              : (diferencial.style.color = textOk);
            vent.textContent = infoVent;
            dataTempReal.ventilador < dataTempReal.limVentilador
              ? (vent.style.color = textNotOk)
              : (vent.style.color = textOk);
            pico.textContent = infoPicos;
            dataTempReal.picos < dataTempReal.limPicos
              ? (pico.style.color = textNotOk)
              : (pico.style.color = textOk);
            rpm.textContent = infoRpm;
            dataTempReal.rpmFiltro < dataTempReal.limRpmFiltro
              ? (rpm.style.color = textNotOk)
              : (rpm.style.color = textOk);
            carro.textContent = infoCarro;
            dataTempReal.carro < dataTempReal.limCarro
              ? (carro.style.color = textNotOk)
              : (carro.style.color = textOk);
          }
        } else console.log("error", sector);

        paso = 0;
      }
    }
  };

  sector.open("GET", direccion, true);
  sector.send();
};

const ventanaFlotanteClima = (direccion, boton, e) => {
  let ctxCL = document.getElementById("myChartClima");
  const instalacion = document.getElementById("instalacionclima");
  const nombre = document.getElementById("nombre");
  const sector = new XMLHttpRequest();
  let x = e.clientX + 15; // Agregar un desplazamiento a la derecha
  let y = e.clientY;
  boton.style.fill = mouseOver;

  if (e.clientY >= 45 && e.clientY < 100) y = y + 30;
  else if (e.clientY >= 400 && e.clientY < 500 && e.clientX >= 1100) {
    y = y - 240;
    x = x - 250;
  } else if (e.clientY >= 500 && e.clientY < 600 && e.clientX >= 1100) {
    y = y - 340;
    x = x - 400;
  } else if (e.clientY >= 100 && e.clientY < 200) y = y + 30;
  else if (e.clientY >= 200 && e.clientY < 300) y = y + 10;
  else if (e.clientY >= 300 && e.clientY < 400) {
    y = y - 325;
    x = x - 305;
  }
  else if (e.clientY >= 400 && e.clientY < 500) {
    y = y - 325;
    x = x - 290;
  } else if (e.clientY >= 500 && e.clientY < 600) {
    y = y - 340;
    x = x - 305;
  } else if (e.clientY >= 600 && e.clientY < 800) {
    y = y - 340;
    x = x - 305;
  } else y = y - 50;

  /*else if((e.clientY > 400) && (e.clientX > 1100)) {
    y = y - 360;
    
    console.log('entra');
   }*/

  ventanaFlotanteclima.style.left = x + "px";
  ventanaFlotanteclima.style.top = y + "px";
  ventanaFlotanteclima.style.display = "block";

  sector.onreadystatechange = () => {
    if (pasoCl === 1) {
      if (sector.readyState == XMLHttpRequest.DONE) {
        pasoCl = 0;
        if (sector.status === 200) {
          const date = JSON.parse(sector.responseText);
          const dataTempRealcl = date.datos[0];
          const datos = date.datos;
          instalacion.textContent = `${date.instalacion}, ${date.nombre}`;
          //nombre.textContent = date.nombre;
          let historial = [];
          let limiteSup = [];
          let limiteInf = [];
          let limiteSupT;
          let limiteSupG;
          let limtieInfT;
          let limiteInfG;
          let colorG;
          let limiteColor;

          if (this.chartCl) {
            this.chartCl.destroy();
          }

          let ultIDcl = dataTempRealcl.ID;

          for (let i = 0; i < datos.length; i++) {
            let idcl = datos[i].ID;

            if (idcl === ultIDcl) {
              ultIDcl = idcl;
              let fecha = new Date(datos[i].fecha);
              let hora = fecha.getHours().toString().padStart(2, "0");
              let minuto = fecha.getMinutes().toString().padStart(2, "0");
              let horaText = `${hora}:${minuto}`;
              if (date.variable === "temperatura") {
                limiteInf.push({ x: horaText, y: `${datos[i].minTemp}` });
                historial.push({ x: horaText, y: `${datos[i].tempFabrica}` });
                limiteSup.push({ x: horaText, y: `${datos[i].maxTemp}` });
              } else if (date.variable === "humedad") {
                limiteInf.push({ x: horaText, y: `${datos[i].minHum}` });
                historial.push({ x: horaText, y: `${datos[i].humedad}` });
                limiteSup.push({ x: horaText, y: `${datos[i].maxHum}` });
              }
              ultIDcl = ultIDcl - 30;
            }
          }

          if (date.variable === "temperatura") {
            limiteSupT = `Limite Superior: ${dataTempRealcl.maxTemp}°C`;
            limiteSupG = dataTempRealcl.maxtemp;
            limtieInfT = `Limite Inferior: ${dataTempRealcl.minTemp}°C`;
            limiteInfG = dataTempRealcl.minTemp;
            colorG = "#FA7D07";
            limiteColor = "#A507FA";
          } else {
            limiteSupT = `Limite Superior: ${dataTempRealcl.maxHum}%`;
            (limiteSupG = dataTempRealcl.maxHum),
              (limtieInfT = `Limite Inferior: ${dataTempRealcl.minHum}%`);
            limiteInfG = dataTempRealcl.minHum;
            colorG = "#417CDF";
            limiteColor = "#20A907";
          }

          limiteInf.reverse();
          historial.reverse();
          limiteSup.reverse();

          //chartCl.update();

          this.chartCl = new Chart(ctxCL, {
            type: "line",
            data: {
              datasets: [
                {
                  label: limtieInfT,
                  borderColor: limiteColor,
                  borderWidth: 1.5,
                  data: limiteInf,
                  //yAxisID: 'y1',
                },
                {
                  label: date.variable,
                  borderColor: colorG,
                  borderWidth: 2,
                  data: historial,
                  //yAxisID: 'y1',
                },
                {
                  label: limiteSupT,
                  borderColor: limiteColor,
                  borderWidth: 1.5,
                  data: limiteSup,
                  //yAxisID: 'y1',
                }
              ],
            },
            options: {
              elements: {
                point: {
                  radius: 0, // Establecer el radio de los puntos en 0 para ocultarlos
                },
              },
              animations: {
                duration: 0,
                /*tension: {
                                  duration: 1000,
                                  easing: 'easeInQuad',
                                  from: 1,
                                  to: 0,
                                  loop: false
                                }*/
              },
              scales: {
                x: {
                  min: historial[0].x,
                },
                y: {
                  max: limiteSupG + 2,
                  //beginAtZero: true,
                  min: limiteInfG - 2,
                  /* title: {
                                    display: true,
                                    text: 'Valores',
                                  },*/
                },
              },
            },
          });
        } else console.log("error", sector);
      }
    }
  };

  sector.open("GET", direccion, true);
  sector.send();
};



const mouseOutf = (e, boton) => {
  boton.style.fill = mouseOut;
  ventanaFlotante.style.display = "none";
  paso = 1;
  this.chart.destroy();
};

const mouseOutfCl = (e, boton) => {
  boton.style.fill = "#333";
  ventanaFlotanteclima.style.display = "none";
  pasoCl = 1;
  this.chartCl.destroy();
};


const puestoClimaRef = (botonTemp, botonHum, textTemp, textHum, direccion) => {
  const sector = new XMLHttpRequest();
  sector.onreadystatechange = () => {
    const buttonTemp = document.getElementById(botonTemp);
    const buttonHum = document.getElementById(botonHum);

    if (sector.readyState == XMLHttpRequest.DONE) {
      if (sector.status == 200) {
        const date = JSON.parse(sector.responseText);
        const temp = date.datos[0].tempFabrica;
        const hum = date.datos[0].humedad;
        const minTemper = date.datos[0].minTemp;
        const maxTemper = date.datos[0].maxTemp;
        const minHum = date.datos[0].minHum;
        const maxHum = date.datos[0].maxHum;
        const infoTemp = `T: ${parseInt(temp)}°C`;
        const infoHum = `H: ${parseInt(hum)}%`;

        document.getElementById(textTemp).textContent = infoTemp;
        document.getElementById(textHum).textContent = infoHum;

        temp < minTemper || temp > maxTemper
          ? (buttonTemp.style.fill = alertClima)
          : (buttonTemp.style.fill = okClima);

        hum < minHum || hum > maxHum
          ? (buttonHum.style.fill = alertClima)
          : (buttonHum.style.fill = okClima);
      } else console.log("error", sector);
    }
  };

  sector.open("GET", direccion, true);
  sector.send();
};

const puestoClima = (botonTemp, botonHum, textTemp, textHum, direccion) => {
  const sector = new XMLHttpRequest();
  sector.onreadystatechange = () => {
    const buttonTemp = document.getElementById(botonTemp);
    const buttonHum = document.getElementById(botonHum);

    if (sector.readyState == XMLHttpRequest.DONE) {
      if (sector.status == 200) {
        //console.log(sector.responseText);
        const date = JSON.parse(sector.responseText);
        const temp = parseInt(date.datos[0].tempFabrica);
        const hum = parseInt(date.datos[0].humedad);
        const infoTemp = `T: ${temp}°C`;
        const infoHum = `H: ${hum}%`;

        document.getElementById(textTemp).textContent = infoTemp;
        document.getElementById(textHum).textContent = infoHum;

        buttonTemp.style.fill = neutral;
        buttonHum.style.fill = neutral;
      } else console.log("error", sector);
    }
  };

  sector.open("GET", direccion, true);
  sector.send();
};

const botonF = (botonFiltro, direccion) => {
  const sector = new XMLHttpRequest();
  sector.onreadystatechange = () => {
    const buttonFiltro = document.getElementById(botonFiltro);

    if (sector.readyState == XMLHttpRequest.DONE) {
      if (sector.status == 200) {
        const datos = JSON.parse(sector.responseText);
        const estadoFiltro = datos.estado;

        estadoFiltro === 1
          ? (buttonFiltro.style.stroke = okFiltro)
          : (buttonFiltro.style.stroke = alertFiltro);
      } else console.log("error", sector);
    }
  };

  sector.open("GET", direccion, true);
  sector.send();
};

const actualizarDatos = () => {
  const climaExterior = climaExt(`${server}/dataFab9exterior`);

  const fab6PrepClima = puestoClimaRef(
    "climaPrepTFab6",
    "climaPrepHFab6",
    "tempPrepFab6",
    "humPrepFab6",
    `${server}/dataFab6prepClima`
  );
  const fab6PrepFiltro = botonF(
    "filtroPrepFab6",
    `${server}/dataFab6prepFiltro`
  );

  const fab6ContClima = puestoClimaRef(
    "climaContTFab6",
    "climaContHFab6",
    "tempContFab6",
    "humContFab6",
    `${server}/dataFab6contClima`
  );
  const fab6ContFiltro = botonF(
    "filtroContFab6",
    `${server}/dataFab6contFiltros`
  );

  const fab6BobinajeClima = puestoClimaRef(
    "climaBobTFab6",
    "climaBobHFab6",
    "tempBobFab6",
    "humBobFab6",
    `${server}/dataFab6bobClima`
  );
  const fab6BobinajeFiltro = botonF(
    "filtroBobFab6",
    `${server}/dataFab6bobFiltros`
  );

  const fab4PreparacionClima = puestoClimaRef(
    "climaPrepTFab4",
    "climaPrepHFab4",
    "tempPrepFab4",
    "humPrepFab4",
    `${server}/dataFab4prepClima`
  );
  const fab4ClimaFiltro = botonF(
    "filtroClimaFab4",
    `${server}/dataFab4climaFiltro`
  );
  const fab4OpenEndClima = puestoClima(
    "climaOpen-EndTFab4",
    "climaOpen-EndHFab4",
    "tempOpenEndFab4",
    "humOpenEndFab4",
    `${server}/dataFab4openClima`
  );

  const fab4RetorFiltro = botonF(
    "filtroRetorFab4",
    `${server}/dataFab4retorcidoFiltro`
  );
  const fab4RetorcidoClima = puestoClima(
    "climaRetorTFab4",
    "climaRetorHFab4",
    "tempRetorFab4",
    "humRetorFab4",
    `${server}/dataFab4retorcidoClima`
  );

  const fab9Carda1 = puestoClimaRef(
    "climaPrepTFab9-1",
    "climaPrepHFab9-1",
    "tempCardaFab9",
    "humCardaFab9",
    `${server}/dataFab9carda-1Clima`
  );
  const fab9Carda2 = puestoClima(
    "climaPrepTFab9-2",
    "climaPrepHFab9-2",
    "tempCardas-2Fab9",
    "humCardas-2Fab9",
    `${server}/dataFab9carda-2Clima`
  );
  const fab9PrepFiltro = botonF(
    "filtroPrepFab9",
    `${server}/dataFab9prepFiltro`
  );
  const fab9PrepClima = puestoClima(
    "climaPrepTFab9-3",
    "climaPrepHFab9-3",
    "tempPrepFab9",
    "humPrepFab9",
    `${server}/dataFab9prepClima`
  );

  const fab9OpenEndClima = puestoClimaRef(
    "climaOpenEndTFab9",
    "climaOpenEndHFab9",
    "tempOpenEndFab9",
    "humOpenEndFab9",
    `${server}/dataFab9openEndClima`
  );
  const fab9OpenFiltro = botonF(
    "filtroOpenEndFab9",
    `${server}/dataFab9openEndFiltro`
  );

  const fab9Empaque = puestoClimaRef(
    "climaEmpaqueTFab9",
    "climaEmpaqueHFab9",
    "tempEmpaqueFab9",
    "humEmpaqueFab9",
    `${server}/dataFab9empaque`
  );

  const fab3Ex8Filtro = botonF("filtroEX-8Fab3", `${server}/dataFab3ex8`);
  const fab3C80Clima = puestoClima(
    "climaC80TFab3",
    "climaC80HFab3",
    "tempC80Fab3",
    "humC80Fab3",
    `${server}/dataFab3C80Clima`
  );

  const fab3PeinadorasClima = puestoClimaRef(
    "climaPeiTFab3",
    "climaPeiHFab3",
    "tempPeiFab3",
    "humPeiFab3",
    `${server}/dataFab3PeinadorasClima`
  );
  const fab3PeinadorasFiltro = botonF(
    "filtroPrepFab3-5",
    `${server}/dataFab3PeinadorasFiltro`
  );

  const fab3ManuaresClima = puestoClimaRef(
    "climaManTFab3",
    "climaManHFab3",
    "tempManFab3",
    "humManFab3",
    `${server}/dataFab3ManuaresClima`
  );
  const fab3PrepaFiltro = botonF(
    "filtroPrepFab3",
    `${server}/dataFab3PrepFiltro`
  );

  const fab3CardaFiltro = botonF(
    "filtroCardasFab3",
    `${server}/dataFab3CardaFiltro`
  );

  const fab3G30Clima = puestoClimaRef(
    "climaG30TFab3",
    "climaG30HFab3",
    "tempG30Fab3",
    "humG30Fab3",
    `${server}/dataFab3G30Clima`
  );
  const fab3G30Filtro = botonF("filtroContFab3", `${server}/dataFab3G30Filtro`);

  const fab3G33Clima = puestoClimaRef(
    "climaG33TFab3",
    "climaG33HFab3",
    "tempG33Fab3",
    "humG33Fab3",
    `${server}/dataFab3G33Clima`
  );
  const fab3G33Filtro = botonF("filtroG33Fab3", `${server}/dataFab3G33Filtro`);

  const fab3BobClima = puestoClimaRef(
    "climaBobinajeTFab3",
    "climaBobinajeHFab3",
    "tempBobinajeFab3",
    "humBobinajeFab3",
    `${server}/dataFab3BobinajeClima`
  );
  const fab3BobFiltro = botonF(
    "filtroBobFab3",
    `${server}/dataFab3BobinajeFiltro`
  );

  const fab1ColorClima = puestoClimaRef(
    "climaColorTFab1",
    "climaColorHFab1",
    "tempColorFab1",
    "humColorFab1",
    `${server}/dataFab1ColorClima`
  );
  const fab1ColorFiltro = botonF(
    "filtroColorFab1",
    `${server}/dataFab1ColorFiltro`
  );

  const fab1PeinadorasClima = puestoClimaRef(
    "climaPeinadorasTFab1",
    "climaPeinadorasHFab1",
    "tempPeiFab1",
    "humPeiFab1",
    `${server}/dataFab1PeinadorasClima`
  );
  const fab1ManuaresClima = puestoClima
  (
    "climaManuaresTFab1",
    "climaManuaresHFab1",
    "tempManuaresFab1",
    "humManuaresFab1",
    `${server}/dataFab1ManuaresClima`
  );
  const fab1PrepFiltro = botonF(
    "filtroPrepFab1",
    `${server}/dataFab1PrepFiltro`
  );
  const fab1CardasFiltro = botonF(
    "filtroCardasFab1",
    `${server}/dataFab1CardaFiltros`
  );

  const fab1ContFiltro = botonF(
    "filtroContinuasFab1",
    `${server}/dataFab1ContinuasFiltro`
  );
  const fab1Continuas1Clima = puestoClima(
    "climaContinuasTFab1-1",
    "climaContinuasHFab1-1",
    "tempContFab1-1",
    "humContFab1-1",
    `${server}/dataFab1ContinuasClima`
  );
  const fab1Continuas2Clima = puestoClimaRef(
    "climaContinuasTFab1-2",
    "climaContinuasHFab1-2",
    "tempContFab1-2",
    "humContFab1-2",
    `${server}/dataFab1Continuas2Clima`
  );

  const fab1EmpaqueClima = puestoClimaRef(
    "climaEmpaqueTFab1",
    "climaEmpaqueHFab1",
    "tempEmpaqueFab1",
    "humEmpaqueFab1",
    `${server}/dataFab1EmpaqueClima`
  );
  const fab1VortexClima = puestoClima(
    "climaVortexTFab1",
    "climaVortexHFab1",
    "tempVortexFab1",
    "humVortexFab1",
    `${server}/dataFab1VortexClima`
  );
  const fab1Vortex1Clima = puestoClima(
    "climaVortexTFab1-1",
    "climaVortexHFab1-1",
    "tempVortexFab1-1",
    "humVortexFab1-1",
    `${server}/dataFab1Vortex-1Clima`
  );
  const fab1Vortex2Clima = puestoClima(
    "climaVortexTFab1-2",
    "climaVortexHFab1-2",
    "tempVortexFab1-2",
    "humVortexFab1-2",
    `${server}/dataFab1Vortex-2Clima`
  );
  const fab1Vortex3Clima = puestoClima(
    "climaVortexTFab1-3",
    "climaVortexHFab1-3",
    "tempVortexFab1-3",
    "humVortexFab1-3",
    `${server}/dataFab1Vortex-3Clima`
  );
  const fab1BobinajeClima = puestoClimaRef(
    "climaBobinajeTFab1",
    "climaBobinajeHFab1",
    "tempBobinajeFab1",
    "humBobinajeFab1",
    `${server}/dataFab1BobinajeClima`
  );
  const fab1Batan = botonF("filtroBatanFab1", `${server}/dataFab1BatanFiltro`);
  const fab1Cotonia = botonF("filtroCotoniaFab1", `${server}/dataFab1Cotonia`);
};

////////////////////// Eventos ////////////////////

///////// Fabrica 6

fab6FiltroPrep.addEventListener("mousemove", (e) => {
  const fab6prepFilV = ventanaFlotanteFiltro(
    `${server}/dataFab6prepFiltro24hs`,
    fab6FiltroPrep,
    e,
    1
  );
  /*console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
});

fab6FiltroPrep.addEventListener("mouseout", (e) => {
  const fab6prepFilVo = mouseOutf(e, fab6FiltroPrep);
});

fab6FiltroPrep.addEventListener("click", () => {
  window.location.href = "filtroPrepFab6/index.html";
});

fab6ClimaPrepT.addEventListener("mouseover", (e) => {
  const fab6prepTClimaV = ventanaFlotanteClima(
    `${server}/dataFab6prepClimaT24hs`,
    fab6ClimaPrepT,
    e
  );
});

fab6ClimaPrepT.addEventListener("mouseout", (e) => {
  const fab6prepTClimaVo = mouseOutfCl(e, fab6ClimaPrepT);
});

fab6ClimaPrepH.addEventListener("mouseover", (e) => {
  const fab6prepHClimaV = ventanaFlotanteClima(
    `${server}/dataFab6prepClimaH24hs`,
    fab6ClimaPrepT,
    e
  );
});

fab6ClimaPrepH.addEventListener("mouseout", (e) => {
  const fab6prepHClimaVo = mouseOutfCl(e, fab6ClimaPrepH);
});



fab6FiltroCont.addEventListener("mousemove", (e)=> {
  const fab6ContFiltV = ventanaFlotanteFiltro(
    `${server}/dataFab6contFiltro24hs`,
    fab6FiltroCont,
    e,
    1
  );
});

fab6FiltroCont.addEventListener("mouseout", (e) => {
  const fab6contFilVo = mouseOutf(e, fab6FiltroCont);
});

fab6ClimaContT.addEventListener("mouseover", (e) => {
  const fab6contTClimaV = ventanaFlotanteClima(
    `${server}/dataFab6contClimaT24hs`,
    fab6ClimaContT,
    e
  );
   /* console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
});

fab6ClimaContT.addEventListener("mouseout", (e) => {
  const fab6contTClimaVo = mouseOutfCl(e, fab6ClimaContT);
});

fab6ClimaContH.addEventListener("mouseover", (e) => {
  const fab6contHClimaV = ventanaFlotanteClima(
    `${server}/dataFab6contClimaH24hs`,
    fab6ClimaContH,
    e
  );
   /* console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
});

fab6ClimaContH.addEventListener("mouseout", (e) => {
  const fab6contHClimaVo = mouseOutfCl(e, fab6ClimaContH);
});



fab6FiltroBob.addEventListener("mousemove", (e)=> {
  const fab6BobFiltV = ventanaFlotanteFiltro(
    `${server}/dataFab6bobFiltro24hs`,
    fab6FiltroBob,
    e,
    1
  );
});

fab6FiltroBob.addEventListener("mouseout", (e) => {
  const fab6BobFilVo = mouseOutf(e, fab6FiltroBob);
});

fab6ClimaBobT.addEventListener("mouseover", (e) => {
  const fab6bobTClimaV = ventanaFlotanteClima(
    `${server}/dataFab6bobClimaT24hs`,
    fab6ClimaBobT,
    e
  );
    console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);
});

fab6ClimaBobT.addEventListener("mouseout", (e) => {
  const fab6bobTClimaVo = mouseOutfCl(e, fab6ClimaBobT);
});

fab6ClimaBobH.addEventListener("mouseover", (e) => {
  const fab6BobHClimaV = ventanaFlotanteClima(
    `${server}/dataFab6bobClimaH24hs`,
    fab6ClimaBobH,
    e
  );
   /* console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
});

fab6ClimaBobH.addEventListener("mouseout", (e) => {
  const fab6bobHClimaVo = mouseOutfCl(e, fab6ClimaBobH);
});

//////Fabrica 4

fab4FiltroClima.addEventListener("mousemove", (e)=> {
  const fab4climaFiltV = ventanaFlotanteFiltro(
    `${server}/dataFab4climaFiltro24hs`,
    fab4FiltroClima,
    e,
    1
  );
});

fab4FiltroClima.addEventListener("mouseout", (e) => {
  const fab4climaFilVo = mouseOutf(e, fab4FiltroClima);
});

fab4ClimaPrepT.addEventListener("mouseover", (e) => {
  const fab4prepTClimaV = ventanaFlotanteClima(
    `${server}/dataFab4prepClimaT24hs`,
    fab4ClimaPrepT,
    e
  );
    /*console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
});

fab4ClimaPrepT.addEventListener("mouseout", (e) => {
  const fab6bobTClimaVo = mouseOutfCl(e, fab4ClimaPrepT);
});

fab4ClimaPrepH.addEventListener("mouseover", (e) => {
  const fab4prepHClimaV = ventanaFlotanteClima(
    `${server}/dataFab4prepClimaH24hs`,
    fab4ClimaPrepH,
    e
  );
    /*console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
});

fab4ClimaPrepH.addEventListener("mouseout", (e) => {
  const fab4prepTClimaVo = mouseOutfCl(e, fab4ClimaPrepH);
});

fab4ClimaOpenEndT.addEventListener("mouseover", (e) => {
  const fab4openEndTClimaV = ventanaFlotanteClima(
    `${server}/dataFab4oeClimaT24hs`,
    fab4ClimaOpenEndT,
    e
  );
    /*console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
});

fab4ClimaOpenEndT.addEventListener("mouseout", (e) => {
  const fab6openEndTClimaVo = mouseOutfCl(e, fab4ClimaOpenEndT);
});

fab4ClimaOpenEndH.addEventListener("mouseover", (e) => {
  const fab4prepHClimaV = ventanaFlotanteClima(
    `${server}/dataFab4oeClimaH24hs`,
    fab4ClimaOpenEndH,
    e
  );
    /*console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
});

fab4ClimaOpenEndH.addEventListener("mouseout", (e) => {
  const fab4prepTClimaVo = mouseOutfCl(e, fab4ClimaOpenEndH);
});

fab4FiltroRetor.addEventListener("mousemove", (e)=> {
  const fab4retorFiltV = ventanaFlotanteFiltro(
    `${server}/dataFab4retorFiltro24hs`,
    fab4FiltroRetor,
    e,
    1
  );
});

fab4FiltroRetor.addEventListener("mouseout", (e) => {
  const fab4retorFilVo = mouseOutf(e, fab4FiltroRetor);
});

fab4ClimaRetorT.addEventListener("mouseover", (e) => {
  const fab4retorcidoTClimaV = ventanaFlotanteClima(
    `${server}/dataFab4retorClimaT24hs`,
    fab4ClimaRetorT,
    e
  );
    /*console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
});

fab4ClimaRetorT.addEventListener("mouseout", (e) => {
  const fab4retorcidoTClimaVo = mouseOutfCl(e, fab4ClimaRetorT);
});

fab4ClimaRetorH.addEventListener("mouseover", (e) => {
  const fab4retorcidoHClimaV = ventanaFlotanteClima(
    `${server}/dataFab4retorClimaH24hs`,
    fab4ClimaRetorH,
    e
  );
    /*console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
});

fab4ClimaRetorH.addEventListener("mouseout", (e) => {
  const fab4retorcidoTClimaVo = mouseOutfCl(e, fab4ClimaRetorH);
});

fab3FiltroEx8.addEventListener("mousemove", (e)=> {
  const fab3ex8FiltV = ventanaFlotanteFiltro(
    `${server}/dataFab3ex8Filtro24hs`,
    fab3FiltroEx8,
    e,
    1
  );
});

fab3FiltroEx8.addEventListener("mouseout", (e) => {
  const fab3ex8FilVo = mouseOutf(e, fab3FiltroEx8);
});

fab3ClimaC80T.addEventListener("mouseover", (e) => {
  const fab3c80TClimaV = ventanaFlotanteClima(
    `${server}/dataFab3c80ClimaT24hs`,
    fab3ClimaC80T,
    e
  );
    /*console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
});

fab3ClimaC80T.addEventListener("mouseout", (e) => {
  const fab4retorcidoTClimaVo = mouseOutfCl(e, fab3ClimaC80T);
});

fab3ClimaC80H.addEventListener("mouseover", (e) => {
  const fab3c80HClimaV = ventanaFlotanteClima(
    `${server}/dataFab3c80ClimaH24hs`,
    fab3ClimaC80H,
    e
  );
    /*console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
});

fab3ClimaC80H.addEventListener("mouseout", (e) => {
  const fab3C80HClimaVo = mouseOutfCl(e, fab3ClimaC80H);
});

fab3ClimaPeiT.addEventListener("mouseover", (e) => {
  const fab3peiTClimaV = ventanaFlotanteClima(
    `${server}/dataFab3peiClimaT24hs`,
    fab3ClimaPeiT,
    e
  );
    /*console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
});

fab3ClimaPeiT.addEventListener("mouseout", (e) => {
  const fab3peiTClimaVo = mouseOutfCl(e, fab3ClimaPeiT);
});

fab3ClimaPeiH.addEventListener("mouseover", (e) => {
  const fab3peiHClimaV = ventanaFlotanteClima(
    `${server}/dataFab3peiClimaH24hs`,
    fab3ClimaPeiH,
    e
  );
    /*console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
});

fab3ClimaPeiH.addEventListener("mouseout", (e) => {
  const fab3peiHClimaVo = mouseOutfCl(e, fab3ClimaPeiH);
});

fab3ClimaManT.addEventListener("mouseover", (e) => {
  const fab3peiTClimaV = ventanaFlotanteClima(
    `${server}/dataFab3manClimaT24hs`,
    fab3ClimaManT,
    e
  );
    /*console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
});

fab3ClimaManT.addEventListener("mouseout", (e) => {
  const fab3peiTClimaVo = mouseOutfCl(e, fab3ClimaManT);
});


fab3ClimaManH.addEventListener("mouseover", (e) => {
  const fab3manHClimaV = ventanaFlotanteClima(
    `${server}/dataFab3manClimaH24hs`,
    fab3ClimaManH,
    e
  );
    /*console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
});

fab3ClimaManH.addEventListener("mouseout", (e) => {
  const fab3manHClimaVo = mouseOutfCl(e, fab3ClimaManH);
});








actualizarDatos();

setInterval(actualizarDatos, 60000);
