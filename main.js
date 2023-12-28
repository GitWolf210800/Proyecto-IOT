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
const preAlertClima = "#E4C500";
const okClima = "#2bc12cff";

const neutral = "#8F8F8F";

const alertFiltro = "#DC5252";
const okFiltro = "#24A024";

const textOk = "#7DD129";
const textNotOk = "#DF1111";

const offline = "#DE7511";

const mouseOver = "#58B7D3";

const mouseOut = "#333";

const fab1FiltroPrensa = document.getElementById("filtroPrensaFab1");
const fab1filtroCoton = document.getElementById("filtroCotoniaFab1");
const fab1FiltroBatan = document.getElementById("filtroBatanFab1");
const fab1FiltroCard = document.getElementById("filtroCardasFab1");
const fab1FiltroPrep = document.getElementById("filtroPrepFab1");
const fab1ClimaPeiT = document.getElementById("climaGpeinadorasTFab1");
const fab1ClimaPeiH = document.getElementById("climaGpeinadorasHFab1");
const fab1ClimaManT = document.getElementById("climaGmanuaresTFab1");
const fab1ClimaManH = document.getElementById("climaGmanuaresHFab1");
const fab1FiltroCont = document.getElementById("filtroContinuasFab1");
const fab1FiltroBob = document.getElementById("filtroBobinajeFab1");
const fab1ClimaCont1T = document.getElementById("climaGcontinuas-1TFab1");
const fab1ClimaCont1H = document.getElementById("climaGcontinuas-1HFab1");
const fab1ClimaCont2T = document.getElementById("climaGcontinuas-2TFab1");
const fab1ClimaCont2H = document.getElementById("climaGcontinuas-2HFab1");
const fab1ClimaVortex1T = document.getElementById("climaGvortex-1TFab1");
const fab1ClimaVortex1H = document.getElementById("climaGvortex-1HFab1");
const fab1ClimaVortex2T = document.getElementById("climaGvortex-2TFab1");
const fab1ClimaVortex2H = document.getElementById("climaGvortex-2HFab1");
const fab1ClimaVortex3T = document.getElementById("climaGvortex-3TFab1");
const fab1ClimaVortex3H = document.getElementById("climaGvortex-3HFab1");
const fab1ClimaVortex4T = document.getElementById("climaGvortexTFab1");
const fab1ClimaVortex4H = document.getElementById("climaGvortexHFab1");


const fab1ClimaBobT = document.getElementById("climaGbobinajeTFab1");
const fab1ClimaBobH = document.getElementById("climaGbobinajeHFab1");
const fab1ClimaEmpT = document.getElementById("climaGempaqueTFab1");
const fab1ClimaEmpH = document.getElementById("climaGempaqueHFab1");
const fab1FiltroColor = document.getElementById("filtroColorFab1");
const fab1ClimaColorT = document.getElementById("climaGcolorTFab1");
const fab1ClimaColorH = document.getElementById("climaGcolorHFab1");


const fab3FiltroEx8 = document.getElementById("filtroEX-8Fab3");
const fab3ClimaC80T = document.getElementById("climaGc80TFab3");
const fab3ClimaC80H = document.getElementById("climaGc80HFab3");
const fab3ClimaPeiT = document.getElementById("climaGpeinadorasTFab3");
const fab3ClimaPeiH = document.getElementById("climaGpeinadorasHFab3");
const fab3PeiHumAbs = document.getElementById("climaGpeinadorasEFab3");
const fab3ClimaManT = document.getElementById("climaGmanuaresTFab3");
const fab3ClimaManH = document.getElementById("climaGmanuaresHFab3");
const fab3FiltroPei = document.getElementById("filtroPrepFab3-5");
const fab3FiltroPrep = document.getElementById("filtroPrepFab3");
const fab3FiltroCardas = document.getElementById("filtroCardasFab3");
const fab3FiltroCont = document.getElementById("filtroContFab3");
const fab3FiltroBob = document.getElementById("filtroBobFab3");
const fab3FiltroG33 = document.getElementById("filtroG33Fab3");
const fab3ClimaG30T = document.getElementById("climaGg30TFab3");
const fab3ClimaG30H = document.getElementById("climaGg30HFab3");
const fab3ClimaBobT = document.getElementById("climaGbobTFab3");
const fab3ClimaBobH = document.getElementById("climaGbobHFab3");
const fab3ClimaG33T = document.getElementById("climaGg33TFab3");
const fab3ClimaG33H = document.getElementById("climaGg33HFab3");
const fab3Clima3ZT = document.getElementById("climaG3zTFab3");
const fab3Clima3ZH = document.getElementById("climaG3zHFab3-1");

const fab4FiltroBatan = document.getElementById("filtroBatanFab4");
const fab4FiltroCardas = document.getElementById("filtroCardaFab4");
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
const fab6HumAbsPrep = document.getElementById("climaGPrepEFab6");

const fab6FiltroCont = document.getElementById("filtroContFab6");
const fab6ClimaContT = document.getElementById("climaGContTFab6");
const fab6ClimaContH = document.getElementById("climaGContHFab6");
const fab6HumAbsCont = document.getElementById("climaGContEFab6");

const fab6FiltroBob = document.getElementById("filtroBobFab6");
const fab6ClimaBobT = document.getElementById("climaGBobTFab6");
const fab6ClimaBobH = document.getElementById("climaGBobHFab6");
const fab6HumAbsBob = document.getElementById("climaGBobHFab6-1");

const fab9ClimaCarda1T = document.getElementById("climaGCardas-1TFab9");
const fab9ClimaCarda1H = document.getElementById("climaGBobHFab6-6");
const fab9ClimaCarda2T = document.getElementById("climaGCardas-2TFab9");
const fab9ClimaCarda2H = document.getElementById("climaGCardas-2HFab9");
const fab9FiltroCardaA = document.getElementById("filtroCardasAFab9");
const fab9FiltroCardaB = document.getElementById("filtroCardasBFab9");
const fab9FiltroLuwa = document.getElementById("filtroLuwaFab9");
const fab9FiltroPrep = document.getElementById("filtroPrepFab9");
const fab9ClimaPrepT = document.getElementById("climaGPrepTFab9");
const fab9ClimaPrepH = document.getElementById("climaGPrepHFab9");
const fab9FiltroOE = document.getElementById("filtroOpenEndFab9");
const fab9ClimaOET = document.getElementById("climaGPrepTFab9-3");
const fab9ClimaOEH = document.getElementById("climaGPrepTFab9-3-2");
const fab9ClimaEmpT = document.getElementById("climaGEmpTFab9");
const fab9ClimaEmpH = document.getElementById("climaGEmpHFab9");

const isMobile = () => {
  return /Mobi|Android/i.test(navigator.userAgent);
};

const detecPant = () => {
  if(isMobile()) {
    console.log('Pantalla de un SmartPhone');
    //alert('Pantalla de un celular');
  } else {
    console.log('Pantalla de una Pc');
    //alert('pantalla de una PC');
  }
};

const climaExt = (direccion) => {
  const tempExteriortext = document.getElementById("tempExt");
  const tempExt = document.getElementById("tempExt");
  const humExterior = document.getElementById("humExt");
 // const fecha = document.getElementById("fecha");
  const entalpiaText = document.getElementById("entalpia");
  
/*
  const fechaActual = new Date();
  const fechaText = `${fechaActual.getDate()} / ${
    fechaActual.getMonth() + 1
  } / ${fechaActual.getFullYear()}`;
  fecha.textContent = fechaText;*/

  const sector = new XMLHttpRequest();

  sector.onreadystatechange = () => {
    if (sector.readyState == XMLHttpRequest.DONE) {
      if (sector.status == 200) {
        const date = JSON.parse(sector.responseText);
        const tempExtdate = `${parseInt(date.datos[0].temperatura)} °C`;
        const humExtdata = `${parseInt(date.datos[0].humedad)} %`;
        entalpiaText.textContent = `${date.datos[0].entalpia.toFixed(2)} Kj/Kg`;
        const ultimaVezText = document.getElementById("ultimaVez").textContent = date.actualizacion;

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

const ventanaFlotanteFiltro = (direccion, boton, e) => {
  if (chart) this.chart.destroy();
  let ctx = document.getElementById("myChartfiltro");
  const sector = new XMLHttpRequest();
  let x = e.clientX + 15; // Agregar un desplazamiento a la derecha
  let y = e.clientY;
  boton.style.fill = mouseOver;

  if (e.clientY >= 45 && e.clientY < 100) y = y + 30;

  else if (e.clientY >= 300 && e.clientY < 450 && e.clientX >= 1200 && e.clientX < 1400) {
    y = y - 280;
    x = x - 360;
  } 

  else if (e.clientY >= 300 && e.clientY < 400 && e.clientX >= 300 && e.clientX < 400) {
    y = y - 280;
    x = x + 30;
  } 
  else if (e.clientY >= 400 && e.clientY < 500 && e.clientX >= 200 && e.clientX < 300) {
    y = y - 360;
    x = x + 50;
  } 
  else if (e.clientY >= 400 && e.clientY < 500 && e.clientX >= 400 && e.clientX < 500) {
    y = y - 360;
    x = x - 350;
  }
  else if (e.clientY >= 600 && e.clientY < 700 && e.clientX >= 500 && e.clientX < 600){
    x = x - 345;
    y = y - 430;
  }
  else if (e.clientY >= 500 && e.clientY < 700 && e.clientX >= 200 && e.clientX < 500) {
    y = y - 360;
    x = x + 25;
  }
  else if (e.clientY >= 400 && e.clientY < 700 && e.clientX >= 500) {
    y = y - 360;
    x = x - 345;
  }
  else if (e.clientY >= 400 && e.clientY < 600 && e.clientX >= 780) {
    y = y - 360;
    x = x - 330;
  }
  else if (e.clientY >= 700 && e.clientY < 900 && e.clientX >= 800 && e.clientX < 900) {
    y = y - 360;
    x = x + 40;
  }
  else if (e.clientY >= 100 && e.clientY < 200) {
    y = y + 30;
  }
  else if (e.clientY >= 200 && e.clientY < 300) {
    y = y - 200;
    x = x + 25;
  } else if (e.clientY >= 300 && e.clientY < 400) {
    y = y - 330;
    x = x + 20;
  }
  else if (e.clientY >= 400 && e.clientY < 500) {
    y = y - 360;
    x = x - 310;
  } else if (e.clientY >= 500 && e.clientY < 600) {
    y = y - 360;
    x = x - 310;
  } else if (e.clientY >= 600 && e.clientY < 700) {
    y = y - 360;
    x = x - 35;
  } else y = y - 50;


  ventanaFlotante.style.left = x + "px";
  ventanaFlotante.style.top = y + "px";
  ventanaFlotante.style.display = "block";
  sector.onreadystatechange = () => {
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
          const preFiltroData = dataTempReal.preFiltro;
          const limPreFiltroData = dataTempReal.limPreFiltro;
          const picos2Data = dataTempReal.picos2;
          const limPicos = dataTempReal.limPicos;
          const rpm2Data = dataTempReal.rpmFiltro2;
          const limRpmFiltro = dataTempReal.limRpmFiltro;
          const carro2Data = dataTempReal.carro2;
          const limCarro = dataTempReal.limCarro;
          const inst = document.getElementById("instalacion");
          const titleFiltroV = (document.getElementById("titleTela").textContent = infoTFiltroV);
          const diferencial = document.getElementById("filtroVent");
          const titleVent = (document.getElementById("titleVent").textContent = infoTVent);
          const vent = document.getElementById("vent");
          const titlePico = (document.getElementById("titlePicos").textContent = infoTpicos);
          const pico = document.getElementById("pico");
          const titleRpm = (document.getElementById("titleRpm").textContent = infoTRpm);
          const rpm = document.getElementById("rpm");
          const titleCarro = (document.getElementById("titleCarro").textContent = infoTCarro);
          const picos2Title = document.getElementById("titlePicos2");
          const picos2 = document.getElementById("pico2");
          const carro = document.getElementById("carro");
          const rpm2Title = document.getElementById("RPM2H");
          const rpm2 = document.getElementById("rpm2");
          const carro2Title = document.getElementById("carro2H");
          const carro2 = document.getElementById("carro2");
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

            (dataTempReal.carro === undefined) 
            ? (carro.style.display = "none", document.getElementById("titleCarro").style.display = "none") 
            : (carro.style.display = "block", document.getElementById("titleCarro").style.display = "block");

            (dataTempReal.rpmFiltro === undefined)
            ? (rpm.style.display = "none", document.getElementById("titleRpm").style.display = "none")
            : (rpm.style.display = "block", document.getElementById("titleRpm").style.display = "block");

            if (date.instalacion === "Filtro Fabrica 4 Cardas 24Hs"){
              const preFiltroTitle = document.getElementById("preFiltroH");
              const preFiltro = document.getElementById("preFiltro");
              const ventTitle = document.getElementById("titleVent").style.display = "none";
              const vent = document.getElementById("vent").style.display = "none";
              const picosTitle = document.getElementById("titlePicos");
              const picos = document.getElementById("pico");
              preFiltroTitle.style.display = "block";
              preFiltro.style.display = "block";
              preFiltro.textContent = `${dataTempReal.preFiltro} Pa`;
              picosTitle.style.display = "none";
              picos.style.display = "none";           

              document.getElementById("titleVent").textContent
            } else {
              const preFiltroTitle = document.getElementById("preFiltroH").style.display = "none";
              const preFiltro = document.getElementById("preFiltro").style.display = "none";
              const ventTitle = document.getElementById("titleVent").style.display = "block";
              const vent = document.getElementById("vent").style.display = "block";
              const picosTitle = document.getElementById("titlePicos").style.display = "block";
              const picos = document.getElementById("pico").style.display = "block";
            }

            if(preFiltroData !== undefined) {
              const preFiltroTitle = document.getElementById("preFiltroH");
              const preFiltro = document.getElementById("preFiltro");
              preFiltroTitle.style.display = "block";
              preFiltro.style.display = "block";
              preFiltroTitle.textContent = `Pre-Filtro, Limite: ${dataTempReal.limPreFiltro} Pa`
              preFiltro.textContent = `${dataTempReal.preFiltro} Pa`

              if (preFiltroData < limPreFiltroData) {
                preFiltro.style.color = textNotOk;
              } else preFiltro.style.color = textOk;

            } 

            if (picos2Data !== undefined) {
              picos2Title.style.display = "block";
              picos2.style.display = "block";
              picos2Title.textContent = `Picos-2, Limite: ${dataTempReal.limPicos}`;
              picos2.textContent = `${dataTempReal.picos2} Pa`;

              (picos2Data < limPicos)
                ? (picos2.style.color = textNotOk)
                : (picos2.style.color = textOk);

            } else {
              picos2Title.style.display = "none";
              picos2.style.display = "none";
            }

            
            if (rpm2Data !== undefined) {
              rpm2Title.style.display = "block";
              rpm2.style.display = "block";
              rpm2Title.textContent = `RPM-2, Limite: ${limRpmFiltro}RPM`;
              rpm2.textContent = `${rpm2Data} RPM`;
              if (rpm2Data < limRpmFiltro) rpm2.style.color = textNotOk;
                else rpm2.style.color = textOk;

            } else { 
              rpm2Title.style.display = "none";
              rpm2.style.display = "none";    
            }

            if (carro2Data !== undefined) {
              carro2Title.style.display = "block";
              carro2.style.display = "block";
              carro2Title.textContent = `Carro-2, (Limite inf: ${limCarro})`
              carro2.textContent = `${carro2Data}`

              if (carro2Data < limCarro) {
                carro2.style.color = textNotOk;
              } else carro2.style.color = textOk;
            } else {
              carro2Title.style.display = "none";
              carro2.style.display = "none";
            }


            if (preFiltroData !== undefined && rpm2Data === undefined && picos2Data === undefined) ventanaFlotante.style.height = "375px";

            else if (preFiltroData === undefined && rpm2Data !== undefined && picos2Data !== undefined && carro2Data !== undefined) ventanaFlotante.style.height = "435px";

            else if (preFiltroData === undefined && rpm2Data !== undefined && picos2Data === undefined && carro2Data !== undefined) ventanaFlotante.style.height = "400px";

            else if (preFiltroData !== undefined && rpm2Data !== undefined && picos2Data !== undefined && carro2Data !== undefined) ventanaFlotante.style.height = "470px";

            else if (preFiltroData === undefined && picos2Data !== undefined ) ventanaFlotante.style.height = "380px";

            else ventanaFlotante.style.height = "330px";

        } else console.log("error", sector);

      }
  };

  sector.open("GET", direccion, true);
  sector.send();
};

const ventanaFlotanteClima = (direccion, boton, e) => {
  if(chartCl) this.chartCl.destroy();
  let ctxCL = document.getElementById("myChartClima");
  const instalacion = document.getElementById("instalacionclima");
  const nombre = document.getElementById("nombre");
  const sector = new XMLHttpRequest();
  let x = e.clientX + 15; // Agregar un desplazamiento a la derecha
  let y = e.clientY;
  boton.style.fill = mouseOver;

  if (e.clientY >= 45 && e.clientY < 100) y = y + 30;

  else if (e.clientY >= 300 && e.clientY < 400 && e.clientX >= 200 && e.clientX < 400) {
    y = y - 310;
    x = x - 200;
  }
  else if (e.clientY >= 300 && e.clientY < 400 && e.clientX >= 1100) {
    y = y - 330;
    x = x - 300;
  }
  else if (e.clientY >= 400 && e.clientY < 500 && e.clientX >= 1100) {
    y = y - 320;
    x = x - 250;
  }
  else if (e.clientY >= 500 && e.clientY < 600 && e.clientX >= 1100) {
    y = y - 340;
    x = x - 400;
  }
  else if (e.clientY >= 100 && e.clientY < 200) {
    y = y + 30;
  }
  else if (e.clientY >= 200 && e.clientY < 300) {
    y = y + 5;
  }
  else if (e.clientY >= 300 && e.clientY < 400) {
    y = y - 310;
    x = x - 280;
  }
  else if (e.clientY >= 400 && e.clientY < 500) {
    y = y - 325;
    x = x - 250;
  }
  else if (e.clientY >= 500 && e.clientY < 600) {
    y = y - 340;
    x = x - 305;
  }
  else if (e.clientY >= 600 && e.clientY < 800) {
    y = y - 340;
    x = x - 305;
  } else y = y - 50;

  ventanaFlotanteclima.style.left = x + "px";
  ventanaFlotanteclima.style.top = y + "px";
  ventanaFlotanteclima.style.display = "block";

  sector.onreadystatechange = () => {
      if (sector.readyState == XMLHttpRequest.DONE) {
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
              ultIDcl = ultIDcl - 30;
              if (date.variable === "temperatura") {
                limiteInf.push({ x: horaText, y: `${datos[i].minTemp}` });
                historial.push({ x: horaText, y: `${datos[i].tempFabrica}` });
                limiteSup.push({ x: horaText, y: `${datos[i].maxTemp}` });
              } else if (date.variable === "humedad") {
                limiteInf.push({ x: horaText, y: `${datos[i].minHum}` });
                historial.push({ x: horaText, y: `${datos[i].humedad}` });
                limiteSup.push({ x: horaText, y: `${datos[i].maxHum}` });
              }
              else if (date.variable === "prensa_filtro") {
                historial.push({ x: horaText, y: `${datos[i].filtro}` });
                ultIDcl = ultIDcl - 15; 
              }
              else if (date.variable === "g/kg") {
                limiteInf.push({ x: horaText, y: `${datos[i].minEnt}` });
                historial.push({ x: horaText, y: `${datos[i].humedadAbsoluta2}` });
                limiteSup.push({ x: horaText, y: `${datos[i].maxEnt}` });
              }
              
            }
          }

          if (date.variable === "temperatura") {
            limiteSupT = `Limite Superior: ${dataTempRealcl.maxTemp}°C`;
            limiteSupG = dataTempRealcl.maxTemp;
            limtieInfT = `Limite Inferior: ${dataTempRealcl.minTemp}°C`;
            limiteInfG = dataTempRealcl.minTemp;
            colorG = "#FA7D07";
            limiteColor = "#A507FA";
          } else if (date.variable === "humedad") {
            limiteSupT = `Limite Superior: ${dataTempRealcl.maxHum}%`;
            limiteSupG = dataTempRealcl.maxHum;
            limtieInfT = `Limite Inferior: ${dataTempRealcl.minHum}%`;
            limiteInfG = dataTempRealcl.minHum;
            colorG = "#417CDF";
            limiteColor = "#20A907";
          }
          else if (date.variable === "prensa_filtro") colorG = "#31BD00";

          else if (date.variable === "g/kg") {
            limiteSupT = `Limite Superior: ${dataTempRealcl.maxEnt}g/kg`;
            limtieInfT = `Limite Inferior: ${dataTempRealcl.minEnt}g/kg`;
            colorG = "#0076E5";
            limiteColor = "#FA1300";
          }

          limiteInf.reverse();
          historial.reverse();
          limiteSup.reverse();

          this.chartCl = new Chart(ctxCL, {
            type: "line",
            data: {
              datasets: [
                {
                  label: limtieInfT,
                  borderColor: limiteColor,
                  borderWidth: 1.5,
                  data: limiteInf,
                },
                {
                  label: date.variable,
                  borderColor: colorG,
                  borderWidth: 2,
                  data: historial,
                },
                {
                  label: limiteSupT,
                  borderColor: limiteColor,
                  borderWidth: 1.5,
                  data: limiteSup,
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
              },
              scales: {
                x: {
                  min: historial[0].x,
                },
               /* y: {
                  max: limiteSupG + 2,
                  min: limiteInfG - 2,
                },*/
              },
            },
          });
          document.getElementById("myChartClima").style.display = "block";
        } else console.log("error", sector);
      }

  };

  sector.open("GET", direccion, true);
  sector.send();
};

const mouseOutf = (e, boton) => {
  boton.style.fill = mouseOut;
  ventanaFlotante.style.display = "none";
  paso = 1;
  if(chart) this.chart.destroy();
};

const mouseOutfCl = (e, boton) => {
  boton.style.fill = "#333";
  ventanaFlotanteclima.style.display = "none";
  document.getElementById("myChartClima").style.display = "none";
  pasoCl = 1;
  if(chartCl) this.chartCl.destroy();
};


const puestoClimaRef = (botonTemp, botonHum, textTemp, textHum, direccion, botonEnt, textEnt) => {
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
        const infoTemp = `${parseInt(temp)}°C`;
        const infoHum = `${parseInt(hum)}% H.r`;

        document.getElementById(textTemp).textContent = infoTemp;
        document.getElementById(textHum).textContent = infoHum;

        temp < minTemper || temp > maxTemper
          ? (buttonTemp.style.fill = alertClima)
          : (buttonTemp.style.fill = okClima);

        hum < minHum || hum > maxHum
          ? (buttonHum.style.fill = alertClima)
          : (buttonHum.style.fill = okClima);

        if(date.datos[0].entalpia){
          const buttonEnt = document.getElementById(botonEnt);
          const minEnt = date.datos[0].minEnt;
          const maxEnt = date.datos[0].maxEnt;
          const humAbs = date.datos[0].humedadAbsoluta2;
          const infoEnt = `${parseInt(humAbs)} g/Kg`;
          document.getElementById(textEnt).textContent = infoEnt;

          humAbs < minEnt || humAbs > maxEnt
            ? (buttonEnt.style.fill = alertClima)
            : (buttonEnt.style.fill = okClima);
        }
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
        const infoTemp = `${temp}°C`;
        const infoHum = `${hum}% H.r`;

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

const carrier = (direccion) =>{
  const carrier1Button = document.getElementById("carrier1");
  const carrier2Button = document.getElementById("carrier2");
  const carrier3Button = document.getElementById("carrier3");
  const carrier4Button = document.getElementById("carrier4");
  const carrier5Button = document.getElementById("carrier5");

  const sector = new XMLHttpRequest();

  sector.onreadystatechange = () => {
    if (sector.readyState == XMLHttpRequest.DONE){
      if (sector.status == 200) {
        const date = JSON.parse(sector.responseText);
        if(date.datos[0].carrier1 === 100) carrier1Button.style.fill = okClima;

        else if(date.datos[0].carrier1 === 50) carrier1Button.style.fill = alertClima;

        else if(date.datos[0].carrier1 === 0) carrier1Button.style.fill = preAlertClima;

        if(date.datos[0].carrier2 === 100) carrier2Button.style.fill = okClima;

        else if(date.datos[0].carrier2 === 50) carrier2Button.style.fill = alertClima;

        else if(date.datos[0].carrier2 === 0) carrier2Button.style.fill = preAlertClima;

        if(date.datos[0].carrier3 === 100) carrier3Button.style.fill = okClima;

        else if(date.datos[0].carrier3 === 50) carrier3Button.style.fill = alertClima;

        else if(date.datos[0].carrier3 === 0) carrier3Button.style.fill = preAlertClima;

        if(date.datos[0].carrier4 === 100) carrier4Button.style.fill = okClima;

        else if(date.datos[0].carrier4 === 50) carrier4Button.style.fill = alertClima;

        else if(date.datos[0].carrier4 === 0) carrier4Button.style.fill =  preAlertClima;

        if(date.datos[0].carrier5 === 100) carrier5Button.style.fill = okClima;

        else if(date.datos[0].carrier5 === 50) carrier5Button.style.fill = alertClima;

        else if(date.datos[0].carrier5 === 0) carrier5Button.style.fill = preAlertClima;
      }
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

  const carrierUp = carrier(`${server}/dataCarrierEstado`);

  const climaExterior = climaExt(`${server}/dataFab9exterior`);

  const fab6PrepClima = puestoClimaRef(
    "climaPrepTFab6",
    "climaPrepHFab6",
    "tempPrepFab6",
    "humPrepFab6",
    `${server}/dataFab6prepClima`,
    "climaPrepEFab6",
    "climaETprepFab6"
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
    `${server}/dataFab6contClima`,
    "climaContEFab6",
    "climaETcontFab6"
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
    `${server}/dataFab6bobClima`,
    "climaBobEFab6",
    "climaETbobFab6"
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

  const fab4BatanFiltro = botonF(
    "filtroBatanFab4",
    `${server}/dataFab4batanFiltro`
  );

  const fab4CardasFiltro = botonF(
    "filtroCardaFab4",
    `${server}/dataFab4cardaFiltro`
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

  const fab9CardasAFiltro = botonF(
    "filtroCardasAFab9",
    `${server}/dataFab9cardaAFiltro`
    );

  const fab9CardasBFiltro = botonF(
    "filtroCardasBFab9",
    `${server}/dataFab9cardaBFiltro`
    );
  
  const fab9LuwaFiltro = botonF(
    "filtroLuwaFab9",
    `${server}/dataFab9luwaFiltro`
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

  const fab3Ex8Filtro = botonF(
    "filtroEX-8Fab3", 
    `${server}/dataFab3ex8`
    );
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
    `${server}/dataFab3PeinadorasClima`,
    "climaPeiEFab3",
    "climaETpeiFab3"
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
  const fab3G30Filtro = botonF(
    "filtroContFab3", 
  `${server}/dataFab3G30Filtro`
  );

  const fab33ZClima = puestoClimaRef(
    "clima3zTFab3",
    "clima3zHFab3",
    "temp3zFab3",
    "hum3zFab3",
    `${server}/dataFab33ZClima`
  );

  const fab3G33Clima = puestoClimaRef(
    "climaG33TFab3",
    "climaG33HFab3",
    "tempG33Fab3",
    "humG33Fab3",
    `${server}/dataFab3G33Clima`
  );
  const fab3G33Filtro = botonF(
    "filtroG33Fab3", 
  `${server}/dataFab3G33Filtro`
  );

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

  const fab1BobFiltro = botonF(
    "filtroBobinajeFab1",
    `${server}/dataFab1bobFiltro`
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
  const fab1Batan = botonF(
  "filtroBatanFab1", 
  `${server}/dataFab1BatanFiltro`
  );
  const fab1Cotonia = botonF(
    "filtroCotoniaFab1", 
    `${server}/dataFab1Cotonia`
    );
};

////////////////////// Eventos ////////////////////

//window.addEventListener('resize', detecPant);

///////// Fabrica 6

fab6FiltroPrep.addEventListener("mouseover", (e) => {
  const fab6prepFilV = ventanaFlotanteFiltro(
    `${server}/dataFab6prepFiltro24hs`,
    fab6FiltroPrep,
    e
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
    fab6ClimaPrepH,
    e
  );
});

fab6ClimaPrepH.addEventListener("mouseout", (e) => {
  const fab6prepHClimaVo = mouseOutfCl(e, fab6ClimaPrepH);
});

fab6HumAbsPrep.addEventListener("mouseover", (e) => {
  const fab6prepHumAbsV = ventanaFlotanteClima(
    `${server}/dataFab6prepHumAbsH24hs`,
    fab6HumAbsPrep,
    e
  );
});

fab6HumAbsPrep.addEventListener("mouseout", (e) => {
  const fab6prepHumAbsVo = mouseOutfCl(e, fab6HumAbsPrep);
});

fab6FiltroCont.addEventListener("mouseover", (e)=> {
  const fab6ContFiltV = ventanaFlotanteFiltro(
    `${server}/dataFab6contFiltro24hs`,
    fab6FiltroCont,
    e
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

fab6HumAbsCont.addEventListener("mouseover", (e) => {
  const fab6contHumAbsV = ventanaFlotanteClima(
    `${server}/dataFab6contHumAbsH24hs`,
    fab6HumAbsCont,
    e
  );
   /* console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
});

fab6HumAbsCont.addEventListener("mouseout", (e) => {
  const fab6contHumAbsVo = mouseOutfCl(e, fab6HumAbsCont);
});


fab6FiltroBob.addEventListener("mouseover", (e)=> {
  const fab6BobFiltV = ventanaFlotanteFiltro(
    `${server}/dataFab6bobFiltro24hs`,
    fab6FiltroBob,
    e
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
    /*console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
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

fab6HumAbsBob.addEventListener("mouseover", (e) => {
  const fab6BobHumedadAbsV = ventanaFlotanteClima(
    `${server}/dataFab6bobHumAbsH24hs`,
    fab6HumAbsBob,
    e
  );
   /* console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
});

fab6HumAbsBob.addEventListener("mouseout", (e) => {
  const fab6bobHumAbsVo = mouseOutfCl(e, fab6HumAbsBob);
});

//////Fabrica 4

fab4FiltroBatan.addEventListener("mouseover", (e)=> {
  const fab4batanFiltV = ventanaFlotanteFiltro(
    `${server}/dataFab4batanFiltro24hs`,
    fab4FiltroBatan,
    e
  );

  /* console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
});

fab4FiltroBatan.addEventListener("mouseout", (e) => {
  const fab4batanFilVo = mouseOutf(e, fab4FiltroBatan);
});

fab4FiltroCardas.addEventListener("mouseover", (e)=> {
  const fab4cardasFiltV = ventanaFlotanteFiltro(
    `${server}/dataFab4cardasFiltro24hs`,
    fab4FiltroCardas,
    e
  );

   /*console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
});

fab4FiltroCardas.addEventListener("mouseout", (e) => {
  const fab4cardasFilVo = mouseOutf(e, fab4FiltroCardas);
});

fab4FiltroClima.addEventListener("mouseover", (e)=> {
  const fab4climaFiltV = ventanaFlotanteFiltro(
    `${server}/dataFab4climaFiltro24hs`,
    fab4FiltroClima,
    e
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

fab4FiltroRetor.addEventListener("mouseover", (e)=> {
  const fab4retorFiltV = ventanaFlotanteFiltro(
    `${server}/dataFab4retorFiltro24hs`,
    fab4FiltroRetor,
    e
  );
  /*console.log(`X: ${e.clientX}`);
  console.log(`Y: ${e.clientY}`);*/
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


//fabrica 3/////////////////////


fab3FiltroEx8.addEventListener("mouseover", (e)=> {
  const fab3ex8FiltV = ventanaFlotanteFiltro(
    `${server}/dataFab3ex8Filtro24hs`,
    fab3FiltroEx8,
    e
  );
    /*console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
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

fab3PeiHumAbs.addEventListener("mouseover", (e) => {
  const fab3peiEClimaV = ventanaFlotanteClima(
    `${server}/dataFab3peiHumAbsH24hs`,
    fab3PeiHumAbs,
    e
  );
    /*console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
});

fab3PeiHumAbs.addEventListener("mouseout", (e) => {
  const fab3peiEClimaVo = mouseOutfCl(e, fab3PeiHumAbs);
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


fab3FiltroPei.addEventListener("mouseover", (e)=> {
  const fab3ex8FiltV = ventanaFlotanteFiltro(
    `${server}/dataFab3peiFiltro24hs`,
    fab3FiltroPei,
    e
  );
  /*console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
});

fab3FiltroPei.addEventListener("mouseout", (e) => {
  const fab3ex8FilVo = mouseOutf(e, fab3FiltroPei);
});

fab3FiltroPrep.addEventListener("mouseover", (e)=> {
  const fab3prepFiltV = ventanaFlotanteFiltro(
    `${server}/dataFab3prepFiltro24hs`,
    fab3FiltroPrep,
    e
  );
});

fab3FiltroPrep.addEventListener("mouseout", (e) => {
  const fab3prepFilVo = mouseOutf(e, fab3FiltroPrep);
});

fab3FiltroCardas.addEventListener("mouseover", (e)=> {
  const fab3prepFiltV = ventanaFlotanteFiltro(
    `${server}/dataFab3cardaFiltro24hs`,
    fab3FiltroCardas,
    e
  );
});

fab3FiltroCardas.addEventListener("mouseout", (e) => {
  const fab3prepFilVo = mouseOutf(e, fab3FiltroCardas);
});

fab3FiltroCont.addEventListener("mouseover", (e)=> {
  const fab3contFiltV = ventanaFlotanteFiltro(
    `${server}/dataFab3contFiltro24hs`,
    fab3FiltroCont,
    e
  );
   /* console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
});

fab3FiltroCont.addEventListener("mouseout", (e) => {
  const fab3contFilVo = mouseOutf(e, fab3FiltroCont);
});

fab3ClimaG30T.addEventListener("mouseover", (e) => {
  const fab3g30TClimaV = ventanaFlotanteClima(
    `${server}/dataFab3g30ClimaT24hs`,
    fab3ClimaG30T,
    e
  );
    /*console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
});

fab3ClimaG30T.addEventListener("mouseout", (e) => {
  const fab3g30TClimaVo = mouseOutfCl(e, fab3ClimaG30T);
});

fab3ClimaG30H.addEventListener("mouseover", (e) => {
  const fab3g30HClimaV = ventanaFlotanteClima(
    `${server}/dataFab3g30ClimaH24hs`,
    fab3ClimaG30H,
    e
  );
    /*console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
});

fab3ClimaG30H.addEventListener("mouseout", (e) => {
  const fab3g30HClimaVo = mouseOutfCl(e, fab3ClimaG30H);
});

fab3Clima3ZT.addEventListener("mouseover", (e) => {
  const fab3g30TClimaV = ventanaFlotanteClima(
    `${server}/dataFab33zClimaT24hs`,
    fab3Clima3ZT,
    e
  );
    /*console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
});

fab3Clima3ZT.addEventListener("mouseout", (e) => {
  const fab3g30TClimaVo = mouseOutfCl(e, fab3Clima3ZT);
});

fab3Clima3ZH.addEventListener("mouseover", (e) => {
  const fab3g30HClimaV = ventanaFlotanteClima(
    `${server}/dataFab33zClimaH24hs`,
    fab3Clima3ZH,
    e
  );
    /*console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
});

fab3Clima3ZH.addEventListener("mouseout", (e) => {
  const fab3g30HClimaVo = mouseOutfCl(e, fab3Clima3ZH);
});

fab3FiltroBob.addEventListener("mouseover", (e)=> {
  const fab3bobFiltV = ventanaFlotanteFiltro(
    `${server}/dataFab3bobFiltro24hs`,
    fab3FiltroBob,
    e
  );
    /*console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
});

fab3FiltroBob.addEventListener("mouseout", (e) => {
  const fab3contFilVo = mouseOutf(e, fab3FiltroBob);
});

fab3ClimaBobT.addEventListener("mouseover", (e) => {
  const fab3bobTClimaV = ventanaFlotanteClima(
    `${server}/dataFab3bobClimaT24hs`,
    fab3ClimaBobT,
    e
  );
    /*console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
});

fab3ClimaBobT.addEventListener("mouseout", (e) => {
  const fab3bobTClimaVo = mouseOutfCl(e, fab3ClimaBobT);
});

fab3ClimaBobH.addEventListener("mouseover", (e) => {
  const fab3bobHClimaV = ventanaFlotanteClima(
    `${server}/dataFab3bobClimaH24hs`,
    fab3ClimaBobH,
    e
  );
    /*console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
});

fab3ClimaBobH.addEventListener("mouseout", (e) => {
  const fab3bobHClimaVo = mouseOutfCl(e, fab3ClimaBobH);
});


fab3FiltroG33.addEventListener("mouseover", (e)=> {
  const fab3g33FiltV = ventanaFlotanteFiltro(
    `${server}/dataFab3g33Filtro24hs`,
    fab3FiltroG33,
    e
  );
    /*console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
});

fab3FiltroG33.addEventListener("mouseout", (e) => {
  const fab3g33FilVo = mouseOutf(e, fab3FiltroG33);
});

fab3ClimaG33T.addEventListener("mouseover", (e) => {
  const fab3g33TClimaV = ventanaFlotanteClima(
    `${server}/dataFab3g33ClimaT24hs`,
    fab3ClimaG33T,
    e
  );
    /*console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
});

fab3ClimaG33T.addEventListener("mouseout", (e) => {
  const fab3g33TClimaVo = mouseOutfCl(e, fab3ClimaG33T);
});

fab3ClimaG33H.addEventListener("mouseover", (e) => {
  const fab3g33HClimaV = ventanaFlotanteClima(
    `${server}/dataFab3g33ClimaH24hs`,
    fab3ClimaG33H,
    e
  );
    /*console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
});

fab3ClimaG33H.addEventListener("mouseout", (e) => {
  const fab3g33HClimaVo = mouseOutfCl(e, fab3ClimaG33H);
});

//fabrica 9 //////////////

fab9FiltroLuwa.addEventListener("mouseover", (e)=> {
  const fab9luwaFiltV = ventanaFlotanteFiltro(
    `${server}/dataFab9luwaFiltro24hs`,
    fab9FiltroLuwa,
    e
  );
    console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);
});

fab9FiltroLuwa.addEventListener("mouseout", (e) => {
  const fab9luwaFilVo = mouseOutf(e, fab9FiltroLuwa);
});

fab9FiltroPrep.addEventListener("mouseover", (e)=> {
  const fab9prepFiltV = ventanaFlotanteFiltro(
    `${server}/dataFab9prepFiltro24hs`,
    fab9FiltroPrep,
    e
  );
    /*console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
});

fab9FiltroPrep.addEventListener("mouseout", (e) => {
  const fab9prepFilVo = mouseOutf(e, fab9FiltroPrep);
});

fab9ClimaPrepT.addEventListener("mouseover", (e) => {
  const fab9prepTClimaV = ventanaFlotanteClima(
    `${server}/dataFab9prepClimaT24hs`,
    fab9ClimaPrepT,
    e
  );
    /*console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
});

fab9ClimaPrepT.addEventListener("mouseout", (e) => {
  const fab9prepTClimaVo = mouseOutfCl(e, fab9ClimaPrepT);
});

fab9ClimaPrepH.addEventListener("mouseover", (e) => {
  const fab9prepHClimaV = ventanaFlotanteClima(
    `${server}/dataFab9prepClimaH24hs`,
    fab9ClimaPrepH,
    e
  );
   /* console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
});

fab9ClimaPrepH.addEventListener("mouseout", (e) => {
  const fab9prepHClimaVo = mouseOutfCl(e, fab9ClimaPrepH);
});

fab9FiltroCardaA.addEventListener("mouseover", (e)=> {
  const fab9CardaaFiltV = ventanaFlotanteFiltro(
    `${server}/dataFab9cardaAFiltro24hs`,
    fab9FiltroCardaA,
    e
  );
    /*console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
});

fab9FiltroCardaA.addEventListener("mouseout", (e) => {
  const fab9CardaaFilVo = mouseOutf(e, fab9FiltroCardaA);
});

fab9FiltroCardaB.addEventListener("mouseover", (e)=> {
  const fab9CardabFiltV = ventanaFlotanteFiltro(
    `${server}/dataFab9cardaBFiltro24hs`,
    fab9FiltroCardaB,
    e
  );
    /*console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
});

fab9FiltroCardaB.addEventListener("mouseout", (e) => {
  const fab9CardabFilVo = mouseOutf(e, fab9FiltroCardaB);
});

fab9ClimaCarda1T.addEventListener("mouseover", (e) => {
  const fab9carda1TClimaV = ventanaFlotanteClima(
    `${server}/dataFab9cardas1ClimaT24hs`,
    fab9ClimaCarda1T,
    e
  );
    /*console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
});

fab9ClimaCarda1T.addEventListener("mouseout", (e) => {
  const fab9carda1TClimaVo = mouseOutfCl(e, fab9ClimaCarda1T);
});

fab9ClimaCarda1H.addEventListener("mouseover", (e) => {
  const fab9carda1HClimaV = ventanaFlotanteClima(
    `${server}/dataFab9cardas1ClimaH24hs`,
    fab9ClimaCarda1H,
    e
  );
   /* console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
});

fab9ClimaCarda1H.addEventListener("mouseout", (e) => {
  const fab9carda1HClimaVo = mouseOutfCl(e, fab9ClimaCarda1H);
});

fab9ClimaCarda2T.addEventListener("mouseover", (e) => {
  const fab9carda2TClimaV = ventanaFlotanteClima(
    `${server}/dataFab9cardas2ClimaT24hs`,
    fab9ClimaCarda2T,
    e
  );
    /*console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
});

fab9ClimaCarda2T.addEventListener("mouseout", (e) => {
  const fab9carda2TClimaVo = mouseOutfCl(e, fab9ClimaCarda1T);
});

fab9ClimaCarda2H.addEventListener("mouseover", (e) => {
  const fab9carda2HClimaV = ventanaFlotanteClima(
    `${server}/dataFab9cardas2ClimaH24hs`,
    fab9ClimaCarda2H,
    e
  );
    /*console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
});

fab9ClimaCarda2H.addEventListener("mouseout", (e) => {
  const fab9carda2TClimaVo = mouseOutfCl(e, fab9ClimaCarda2H);
});

fab9FiltroOE.addEventListener("mouseover", (e)=> {
  const fab9oeFiltV = ventanaFlotanteFiltro(
    `${server}/dataFab9oeFiltro24hs`,
    fab9FiltroOE,
    e
  );
    /*console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
});

fab9FiltroOE.addEventListener("mouseout", (e) => {
  const fab9oeFilVo = mouseOutf(e, fab9FiltroOE);
});

fab9ClimaOET.addEventListener("mouseover", (e) => {
  const fab9oeTClimaV = ventanaFlotanteClima(
    `${server}/dataFab9oeClimaT24hs`,
    fab9ClimaOET,
    e
  );
    /*console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
});

fab9ClimaOET.addEventListener("mouseout", (e) => {
  const fab9oeTClimaVo = mouseOutfCl(e, fab9ClimaOET);
});

fab9ClimaOEH.addEventListener("mouseover", (e) => {
  const fab9oeHClimaV = ventanaFlotanteClima(
    `${server}/dataFab9oeClimaH24hs`,
    fab9ClimaOEH,
    e
  );
    /*console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
});

fab9ClimaOEH.addEventListener("mouseout", (e) => {
  const fab9oeHClimaVo = mouseOutfCl(e, fab9ClimaOEH);
});

fab9ClimaEmpT.addEventListener("mouseover", (e) => {
  const fab9empTClimaV = ventanaFlotanteClima(
    `${server}/dataFab9empClimaT24hs`,
    fab9ClimaEmpT,
    e
  );
    /*console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
});

fab9ClimaEmpT.addEventListener("mouseout", (e) => {
  const fab9empTClimaVo = mouseOutfCl(e, fab9ClimaEmpT);
});

fab9ClimaEmpH.addEventListener("mouseover", (e) => {
  const fab9empHClimaV = ventanaFlotanteClima(
    `${server}/dataFab9empClimaH24hs`,
    fab9ClimaEmpH,
    e
  );
    /*console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
});

fab9ClimaEmpH.addEventListener("mouseout", (e) => {
  const fab9empHClimaVo = mouseOutfCl(e, fab9ClimaEmpH);
});

/// fabrica 1/////////////

fab1FiltroCard.addEventListener("mouseover", (e)=> {
  const fab1cardasFiltV = ventanaFlotanteFiltro(
    `${server}/dataFab1cardasFiltro24hs`,
    fab1FiltroCard,
    e
  );
    /*console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
});

fab1FiltroCard.addEventListener("mouseout", (e) => {
  const fab1cardasFilVo = mouseOutf(e, fab1FiltroCard);
});

fab1FiltroPrep.addEventListener("mouseover", (e)=> {
  const fab1prepFiltV = ventanaFlotanteFiltro(
    `${server}/dataFab1prepFiltro24hs`,
    fab1FiltroPrep,
    e
  );
    /*console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
});

fab1FiltroPrep.addEventListener("mouseout", (e) => {
  const fab1prepFilVo = mouseOutf(e, fab1FiltroPrep);
});

fab1ClimaPeiT.addEventListener("mouseover", (e) => {
  const fab1peiTClimaV = ventanaFlotanteClima(
    `${server}/dataFab1peiClimaT24hs`,
    fab1ClimaPeiT,
    e
  );
    /*console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
});

fab1ClimaPeiT.addEventListener("mouseout", (e) => {
  const fab1peiTClimaVo = mouseOutfCl(e, fab1ClimaPeiT);
});

fab1ClimaPeiH.addEventListener("mouseover", (e) => {
  const fab1peiHClimaV = ventanaFlotanteClima(
    `${server}/dataFab1peiClimaH24hs`,
    fab1ClimaPeiH,
    e
  );
    /*console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
});

fab1ClimaPeiH.addEventListener("mouseout", (e) => {
  const fab1peiHClimaVo = mouseOutfCl(e, fab1ClimaPeiH);
});

fab1ClimaManT.addEventListener("mouseover", (e) => {
  const fab1manTClimaV = ventanaFlotanteClima(
    `${server}/dataFab1manClimaT24hs`,
    fab1ClimaManT,
    e
  );
    /*console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
});

fab1ClimaManT.addEventListener("mouseout", (e) => {
  const fab1manTClimaVo = mouseOutfCl(e, fab1ClimaManT);
});

fab1ClimaManH.addEventListener("mouseover", (e) => {
  const fab1manHClimaV = ventanaFlotanteClima(
    `${server}/dataFab1manClimaH24hs`,
    fab1ClimaManH,
    e
  );
    /*console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
});

fab1ClimaManH.addEventListener("mouseout", (e) => {
  const fab1manHClimaVo = mouseOutfCl(e, fab1ClimaManH);
});

fab1FiltroCont.addEventListener("mouseover", (e)=> {
  const fab1contFiltV = ventanaFlotanteFiltro(
    `${server}/dataFab1contFiltro24hs`,
    fab1FiltroCont,
    e
  );
    /*console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
});

fab1FiltroCont.addEventListener("mouseout", (e) => {
  const fab1contFilVo = mouseOutf(e, fab1FiltroCont);
});

fab1FiltroBob.addEventListener("mouseover", (e)=> {
  const fab1bobFiltV = ventanaFlotanteFiltro(
    `${server}/dataFab1bobFiltro24hs`,
    fab1FiltroBob,
    e
  );
    /*console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
});

fab1FiltroBob.addEventListener("mouseout", (e) => {
  const fab1bobFilVo = mouseOutf(e, fab1FiltroBob);
});

fab1ClimaCont1T.addEventListener("mouseover", (e) => {
  const fab1cont1TClimaV = ventanaFlotanteClima(
    `${server}/dataFab1cont1ClimaT24hs`,
    fab1ClimaCont1T,
    e
  );
    /*console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
});

fab1ClimaCont1T.addEventListener("mouseout", (e) => {
  const fab1cont1TClimaVo = mouseOutfCl(e, fab1ClimaCont1T);
});

fab1ClimaCont1H.addEventListener("mouseover", (e) => {
  const fab1cont1HClimaV = ventanaFlotanteClima(
    `${server}/dataFab1cont1ClimaH24hs`,
    fab1ClimaCont1H,
    e
  );
    /*console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
});

fab1ClimaCont1H.addEventListener("mouseout", (e) => {
  const fab1cont1HClimaVo = mouseOutfCl(e, fab1ClimaCont1H);
});

fab1ClimaCont2T.addEventListener("mouseover", (e) => {
  const fab1cont2TClimaV = ventanaFlotanteClima(
    `${server}/dataFab1cont2ClimaT24hs`,
    fab1ClimaCont2T,
    e
  );
    /*console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
});

fab1ClimaCont2T.addEventListener("mouseout", (e) => {
  const fab1cont2TClimaVo = mouseOutfCl(e, fab1ClimaCont2T);
});

fab1ClimaVortex1T.addEventListener("mouseover", (e) => {
  const fab1vortex1TClimaV = ventanaFlotanteClima(
    `${server}/dataFab1vortex1ClimaT24hs`,
    fab1ClimaVortex1T,
    e
  );
    /*console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
});

fab1ClimaVortex1T.addEventListener("mouseout", (e) => {
  const fab1vortex1TClimaVo = mouseOutfCl(e, fab1ClimaVortex1T);
});

fab1ClimaVortex1H.addEventListener("mouseover", (e) => {
  const fab1vortex1HClimaV = ventanaFlotanteClima(
    `${server}/dataFab1vortex1ClimaH24hs`,
    fab1ClimaVortex1H,
    e
  );
    /*console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
});

fab1ClimaVortex1H.addEventListener("mouseout", (e) => {
  const fab1vortex1HClimaVo = mouseOutfCl(e, fab1ClimaVortex1H);
});

fab1ClimaVortex2T.addEventListener("mouseover", (e) => {
  const fab1vortex2TClimaV = ventanaFlotanteClima(
    `${server}/dataFab1vortex2ClimaT24hs`,
    fab1ClimaVortex2T,
    e
  );
    /*console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
});

fab1ClimaVortex2T.addEventListener("mouseout", (e) => {
  const fab1vortex2TClimaVo = mouseOutfCl(e, fab1ClimaVortex2T);
});

fab1ClimaVortex2H.addEventListener("mouseover", (e) => {
  const fab1vortex2HClimaV = ventanaFlotanteClima(
    `${server}/dataFab1vortex2ClimaH24hs`,
    fab1ClimaVortex2H,
    e
  );
    /*console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
});

fab1ClimaVortex2H.addEventListener("mouseout", (e) => {
  const fab1vortex2HClimaVo = mouseOutfCl(e, fab1ClimaVortex2H);
});

fab1ClimaVortex3T.addEventListener("mouseover", (e) => {
  const fab1vortex3TClimaV = ventanaFlotanteClima(
    `${server}/dataFab1vortex3ClimaT24hs`,
    fab1ClimaVortex3T,
    e
  );
    /*console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
});

fab1ClimaVortex3T.addEventListener("mouseout", (e) => {
  const fab1vortex3TClimaVo = mouseOutfCl(e, fab1ClimaVortex3T);
});

fab1ClimaVortex3H.addEventListener("mouseover", (e) => {
  const fab1vortex3TClimaV = ventanaFlotanteClima(
    `${server}/dataFab1vortex3ClimaH24hs`,
    fab1ClimaVortex3H,
    e
  );
    /*console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
});

fab1ClimaVortex3H.addEventListener("mouseout", (e) => {
  const fab1vortex3TClimaVo = mouseOutfCl(e, fab1ClimaVortex3H);
});

fab1ClimaVortex4T.addEventListener("mouseover", (e) => {
  const fab1vortex3TClimaV = ventanaFlotanteClima(
    `${server}/dataFab1vortex4ClimaT24hs`,
    fab1ClimaVortex4T,
    e
  );
    /*console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
});

fab1ClimaVortex4T.addEventListener("mouseout", (e) => {
  const fab1vortex3TClimaVo = mouseOutfCl(e, fab1ClimaVortex4T);
});

fab1ClimaVortex4H.addEventListener("mouseover", (e) => {
  const fab1vortex4TClimaV = ventanaFlotanteClima(
    `${server}/dataFab1vortex4ClimaH24hs`,
    fab1ClimaVortex4H,
    e
  );
    /*console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
});

fab1ClimaVortex4H.addEventListener("mouseout", (e) => {
  const fab1vortex4TClimaVo = mouseOutfCl(e, fab1ClimaVortex4H);
});


fab1ClimaCont2H.addEventListener("mouseover", (e) => {
  const fab1cont2HClimaV = ventanaFlotanteClima(
    `${server}/dataFab1cont2ClimaH24hs`,
    fab1ClimaCont2H,
    e
  );
    /*console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
});

fab1ClimaCont2H.addEventListener("mouseout", (e) => {
  const fab1cont2HClimaVo = mouseOutfCl(e, fab1ClimaCont2H);
});

fab1FiltroColor.addEventListener("mouseover", (e)=> {
  const fab1colorFiltV = ventanaFlotanteFiltro(
    `${server}/dataFab1colorFiltro24hs`,
    fab1FiltroColor,
    e
  );
});

fab1FiltroColor.addEventListener("mouseout", (e) => {
  const fab1colorFilVo = mouseOutf(e, fab1FiltroColor);
});

fab1ClimaColorT.addEventListener("mouseover", (e) => {
  const fab1colorTClimaV = ventanaFlotanteClima(
    `${server}/dataFab1colorClimaT24hs`,
    fab1ClimaColorT,
    e
  );
});

fab1ClimaColorT.addEventListener("mouseout", (e) => {
  const fab1colorTClimaVo = mouseOutfCl(e, fab1ClimaColorT);
});

fab1ClimaColorH.addEventListener("mouseover", (e) => {
  const fab1colorHClimaV = ventanaFlotanteClima(
    `${server}/dataFab1colorClimaH24hs`,
    fab1ClimaColorH,
    e
  );
});

fab1ClimaColorH.addEventListener("mouseout", (e) => {
  const fab1colorHClimaVo = mouseOutfCl(e, fab1ClimaColorH);
});

fab1ClimaBobT.addEventListener("mouseover", (e) => {
  const fab1bobTClimaV = ventanaFlotanteClima(
    `${server}/dataFab1bobClimaT24hs`,
    fab1ClimaBobT,
    e
  );
    /*console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
});

fab1ClimaBobT.addEventListener("mouseout", (e) => {
  const fab1bobTClimaVo = mouseOutfCl(e, fab1ClimaBobT);
});

fab1ClimaBobH.addEventListener("mouseover", (e) => {
  const fab1bobHClimaV = ventanaFlotanteClima(
    `${server}/dataFab1bobClimaH24hs`,
    fab1ClimaBobH,
    e
  );
    /*console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
});

fab1ClimaBobH.addEventListener("mouseout", (e) => {
  const fab1bobHClimaVo = mouseOutfCl(e, fab1ClimaBobH);
});

fab1ClimaEmpT.addEventListener("mouseover", (e) => {
  const fab1empTClimaV = ventanaFlotanteClima(
    `${server}/dataFab1empClimaT24hs`,
    fab1ClimaEmpT,
    e
  );
    /*console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
});

fab1ClimaEmpT.addEventListener("mouseout", (e) => {
  const fab1empTClimaVo = mouseOutfCl(e, fab1ClimaEmpT);
});

fab1ClimaEmpH.addEventListener("mouseover", (e) => {
  const fab1empHClimaV = ventanaFlotanteClima(
    `${server}/dataFab1empClimaH24hs`,
    fab1ClimaEmpH,
    e
  );
    /*console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
});

fab1ClimaEmpH.addEventListener("mouseout", (e) => {
  const fab1empHClimaVo = mouseOutfCl(e, fab1ClimaEmpH);
});

fab1FiltroBatan.addEventListener("mouseover", (e)=> {
  const fab1batanFiltV = ventanaFlotanteFiltro(
    `${server}/dataFab1batanFiltro24hs`,
    fab1FiltroBatan,
    e
  );
    /*console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
});

fab1FiltroBatan.addEventListener("mouseout", (e) => {
  const fab1batanFilVo = mouseOutf(e, fab1FiltroBatan);
});

fab1filtroCoton.addEventListener("mouseover", (e)=> {
  const fab1cotonFiltV = ventanaFlotanteFiltro(
    `${server}/dataFab1cotonFiltro24hs`,
    fab1filtroCoton,
    e
  );
    /*console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
});

fab1filtroCoton.addEventListener("mouseout", (e) => {
  const fab1cotonFilVo = mouseOutf(e, fab1filtroCoton);
});

fab1FiltroPrensa.addEventListener("mouseover", (e) => {
  const fab1prensaFiltroV = ventanaFlotanteClima(
    `${server}/dataFabxprensaFiltro24hs`,
    fab1FiltroPrensa,
    e
  );
    /*console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
});

fab1FiltroPrensa.addEventListener("mouseout", (e) => {
  const fab1prensaFiltroVo = mouseOutfCl(e, fab1FiltroPrensa);
});


detecPant();


actualizarDatos();

setInterval(actualizarDatos, 60000);
