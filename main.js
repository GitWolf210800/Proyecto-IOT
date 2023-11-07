"use strict";

let chart;
let chartCl;
let chartCl2;

let paso = 1;
let pasoCl = 1;
const ventanaFlotante = document.getElementById('ventanaFlotante');
const ventanaFlotanteclima = document.getElementById('ventanaClima');
const server = 'http://192.168.3.122:1880';

const tempoColdExt = '#3275E4';
const tempOkExt = '#F4E441';
const tempMhotExt = '#FA9133';
const tempHotExt = '#F43B2F';

const humOkExt = '#37AED8'; 

const alertClima = '#BD1F1F';
const okClima = '#2bc12cff';

const neutral = '#8F8F8F';

const alertFiltro  = '#DC5252';
const okFiltro = '#24A024';

const textOk = '#7DD129';
const textNotOk = '#DF1111';

const offline = '#DE7511';

const mouseOver = '#58B7D3';

const mouseOut = '#333';

const fab6FiltroPrep = document.getElementById('filtroPrepFab6');
const fab6ClimaPrepT = document.getElementById('climaGPrepTFab6');
const fab6ClimaPrepH = document.getElementById('climaGPrepHFab6');

const fab6ClimaContG = document.getElementById('climaGContFab6');

const fab1FiltroColor = document.getElementById('filtroColorFab1');

const climaExt = (direccion) => {
    const tempExteriortext = document.getElementById('tspan2390');
    const tempExt = document.getElementById('tspan2390');
    const humExterior = document.getElementById('tspan2392');
    const fecha = document.getElementById('tspan2396');
    const fechaActual = new Date();
    const fechaText = `${fechaActual.getDate()} / ${fechaActual.getMonth() + 1} / ${fechaActual.getFullYear()}`;
    fecha.textContent = fechaText;

    const sector = new XMLHttpRequest();

    sector.onreadystatechange = () => {
        if (sector.readyState == XMLHttpRequest.DONE){
            if (sector.status == 200){

                const date = JSON.parse(sector.responseText);
                const tempExtdate = `${parseInt(date.datos[0].temperatura)} °C`;
                const humExtdata = `${parseInt(date.datos[0].humedad)} %`;
                if(date.datos[0].temperatura < 20){
                    tempExt.style.fill = tempoColdExt;
                    tempExt.style.stroke = tempoColdExt
                }
                else if (date.datos[0].temperatura < 30){
                    tempExt.style.fill = tempOkExt;
                    tempExt.style.stroke = tempOkExt;
                }
                else if (date.datos[0].temperatura >= 30 && date.datos[0].temperatura < 38){
                    tempExt.style.fill = tempMhotExt;
                    tempExt.style.stroke = tempMhotExt;
                }
                else if (date.datos[0].temperatura >= 38){
                    tempExt.style.fill = tempHotExt;
                    tempExt.style.stroke = tempHotExt; 
                }
                tempExteriortext.textContent = tempExtdate;
                humExterior.textContent = humExtdata; 
            } else console.log('error', sector);
        } 
    }  
    sector.open("GET", direccion, true);
    sector.send()
}



const ventanaFlotanteFiltro = (direccion,boton,e,tipo) => {
    let ctx = document.getElementById('myChartfiltro');
    const sector = new XMLHttpRequest();
    let x = e.clientX + 15; // Agregar un desplazamiento a la derecha
    let y = e.clientY;
    boton.style.fill = mouseOver;

    if (e.clientY >= 45 && e.clientY < 100) y = y + 30;

    else if (e.clientY >= 100 && e.clientY < 200) y = y + 30;

   else if (e.clientY >= 200 && e.clientY < 300){ 
    y = y + 10; 
    x = x - 205;
  }

   else if (e.clientY >= 300 && e.clientY < 400) y = y + 20;

   else if (e.clientY >= 400 && e.clientY < 500){
     y = y - 360;
     x = x - 180;
    }

   else if (e.clientY >= 500 && e.clientY < 600){
     y = y - 360;
     x = x - 205;
    }
 
   else if(e.clientY >= 600 && e.clientY < 700){
     y = y - 360;
     x = x - 35;
    }

  /* else if((e.clientY > 400) && (e.clientX > 1100)) {
    y = y - 360;
    x = x - 205;
    console.log('entra');
   }*/

    else y = y - 50;

    ventanaFlotante.style.left = x + "px";
    ventanaFlotante.style.top = y + "px";
    ventanaFlotante.style.display = "block";
    sector.onreadystatechange = () => {
        if(paso === 1) {
            if (sector.readyState == XMLHttpRequest.DONE && paso === 1 ){
                if(sector.status == 200) {
                    const date = JSON.parse(sector.responseText);
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
                    const infoCarro = `${dataTempReal.Carro}`;
                    const inst = document.getElementById('instalacion');
                    const titleFiltroV = document.getElementById('titleTela').textContent = infoTFiltroV;
                    const diferencial = document.getElementById('filtroVent');
                    const titleVent = document.getElementById('titleVent').textContent = infoTVent;
                    const vent = document.getElementById('vent');
                    const titlePico = document.getElementById('titlePicos').textContent = infoTpicos;
                    const pico = document.getElementById('pico');
                    const titleRpm = document.getElementById('titleRpm').textContent = infoTRpm;
                    const rpm = document.getElementById('rpm');
                    const titleCarrp = document.getElementById('titleCarro').textContent = infoTCarro;
                    const carro = document.getElementById('carro');
                    let datoss = [];
                    let limite = [];
                    inst.textContent = `${date.instalacion}`;

                    

                    if (this.chart) {
                        this.chart.destroy();
                            }

                    let ultID = dataTempReal.ID;   
                    
                    for (let i = 0; i < datos.length; i++) { 
                      let id = datos[i].ID;

                        if(id === ultID){
                            ultID = id;
                            let fecha = new Date(datos[i].fecha);
                            let hora = fecha.getHours().toString().padStart(2,'0');
                            let minuto = fecha.getMinutes().toString().padStart(2,'0');
                            let horaText = `${hora}:${minuto}`;
                            datoss.push({x:horaText, y:`${parseInt(datos[i].filtroVentilador)}`});
                            limite.push({x:horaText, y:`${datos[i].limFiltroVentilador}`});
                            ultID = ultID - 15;
                        }

                    }
                    
                    
                    limite.reverse();
                    datoss.reverse();
                    //console.log(dataTempReal);
                    //console.log(datoss);

                    //chart.update();


                    this.chart = new Chart(ctx, {
                        type: 'line',
                        data: {
                            datasets: [{
                                label: 'Diferencial',
                                borderColor: 'blue',
                                borderWidth: 1.5,
                                data: datoss,
                                //yAxisID: 'y',
                                      
                            },{
                                label: 'Límite',
                                borderColor: '#20A907',
                                borderWidth: 1,
                                data: limite,
                                //yAxisID: 'y1',
                            }],
                        },
                        options: {
                            elements: {
                                point: {
                                  radius: 0, // Establecer el radio de los puntos en 0 para ocultarlos
                                }
                              },
                            animations: {
                                tension: {
                                  duration: 2000,
                                  easing: 'easeInQuad',
                                  from: 1,
                                  to: 0,
                                  loop: false
                                }
                              },
                            scales: {
                              y:
                                {
                                  max: limtieG,
                                  min: 0
                                 /* title: {
                                    display: true,
                                    text: 'Valores',
                                  },*/
                                }
                            }
                          }
                        });

                    //console.log(datoss);
                    //console.log(tiempo);

                    if(tipo === 1) {
                        diferencial.textContent = infoFiltroVent;
                        (dataTempReal.filtroVentilador > dataTempReal.limFiltroVentilador) ? diferencial.style.color = textNotOk : diferencial.style.color = textOk;
                        vent.textContent = infoVent;
                        (dataTempReal.ventilador < dataTempReal.limVentilador) ? vent.style.color = textNotOk : vent.style.color = textOk;
                        pico.textContent = infoPicos;
                        (dataTempReal.picos < dataTempReal.limPicos) ? pico.style.color = textNotOk : pico.style.color = textOk;
                        rpm.textContent = infoRpm;
                        (dataTempReal.rpmFiltro < dataTempReal.limRpmFiltro) ? rpm.style.color = textNotOk : rpm.style.color = textOk;
                        carro.textContent = infoCarro;
                        (dataTempReal.carro < dataTempReal.limCarro) ? carro.style.color = textNotOk : carro.style.color = textOk;
                    }
                } else console.log('error',sector);

                paso = 0;
            }
        }

    }

    sector.open("GET",direccion, true);
    sector.send();
}


const ventanaFlotanteClima = (direccion,boton,e) => {
    let ctxCL = document.getElementById('myChartClima');
    const instalacion = document.getElementById('instalacionclima');
    const nombre = document.getElementById('nombre');
    const sector = new XMLHttpRequest();
    let x = e.clientX + 15; // Agregar un desplazamiento a la derecha
    let y = e.clientY;
    boton.style.fill = mouseOver;

    if (e.clientY >= 45 && e.clientY < 100) y = y + 30;

    else if ((e.clientY >= 400 && e.clientY < 500) && e.clientX >= 1100){
      y = y - 240;
      x = x - 250;
     }

    else if ((e.clientY >= 500 && e.clientY < 600) && e.clientX >= 1100){
      y = y - 340;
      x = x - 400;
     }

    else if (e.clientY >= 100 && e.clientY < 200) y = y + 30;

   else if (e.clientY >= 200 && e.clientY < 300) y = y + 10;

   else if (e.clientY >= 300 && e.clientY < 400) y = y + 20;

   else if (e.clientY >= 400 && e.clientY < 500){
     y = y - 360;
    }

   else if (e.clientY >= 500 && e.clientY < 600){
     y = y - 240;
     //x = x - 250;
    }
 
   else if(e.clientY >= 600 && e.clientY < 700){
     y = y - 340;
     x = x - 305;
    }


   /*else if((e.clientY > 400) && (e.clientX > 1100)) {
    y = y - 360;
    
    console.log('entra');
   }*/

    else y = y - 50;

    ventanaFlotanteclima.style.left = x + "px";
    ventanaFlotanteclima.style.top = y + "px";
    ventanaFlotanteclima.style.display = "block";

    sector.onreadystatechange = () =>{
        if (pasoCl === 1) {
            if (sector.readyState == XMLHttpRequest.DONE){
              pasoCl = 0;
                if(sector.status === 200){
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
  
                          if(idcl === ultIDcl){
                              ultIDcl = idcl;
                              let fecha = new Date(datos[i].fecha);
                              let hora = fecha.getHours().toString().padStart(2,'0');
                              let minuto = fecha.getMinutes().toString().padStart(2,'0');
                              let horaText = `${hora}:${minuto}`;
                              if (date.variable === "temperatura"){
                                  limiteInf.push({x:horaText, y:`${datos[i].minTemp}`});
                                  historial.push({x:horaText, y:`${datos[i].tempFabrica}`});
                                  limiteSup.push({x:horaText, y:`${datos[i].maxtemp}`});
                              } 
                              else if (date.variable === "humedad"){
                                limiteInf.push({x:horaText, y:`${datos[i].minHum}`});
                                historial.push({x:horaText, y:`${datos[i].humedad}`});
                                limiteSup.push({x:horaText, y:`${datos[i].maxHum}`});
                              }
                              ultIDcl = ultIDcl - 30;
                          }  
                      }

                      if (date.variable === "temperatura") {
                            limiteSupT = `Limite Superior: ${dataTempRealcl.maxtemp}°C`;
                             limiteSupG = dataTempRealcl.maxtemp;
                             limtieInfT = `Limite Inferior: ${dataTempRealcl.minTemp}°C`;
                             limiteInfG = dataTempRealcl.minTemp 
                             colorG = '#FA7D07';
                             limiteColor = '#A507FA'
                      }
                        else {
                      limiteSupT = `Limite Superior: ${dataTempRealcl.maxHum}%`;
                      limiteSupG = dataTempRealcl.maxHum, limtieInfT = `Limite Inferior: ${dataTempRealcl.minHum}%`;
                      limiteInfG = dataTempRealcl.minHum
                      colorG = '#417CDF';
                      limiteColor = '#20A907';

                        }


                      limiteInf.reverse();
                      historial.reverse();
                      limiteSup.reverse();

                      //chartCl.update();


                      this.chartCl = new Chart(ctxCL, {
                        type: 'line',
                        data: {
                            datasets: [{
                              label: limiteSupT,
                              borderColor: limiteColor,
                              borderWidth: 1.5,
                              data: limiteSup,
                              //yAxisID: 'y1',
                          },{
                              label: date.variable,
                              borderColor: colorG,
                              borderWidth: 2,
                              data: historial,
                              //yAxisID: 'y1',
                          },{
                            label: limtieInfT,
                            borderColor: limiteColor,
                            borderWidth: 1.5,
                            data: limiteInf,
                            //yAxisID: 'y1',
                        },
                            ],
                        },
                        options: {
                            elements: {
                                point: {
                                  radius: 0, // Establecer el radio de los puntos en 0 para ocultarlos
                                }
                              },
                            animations: {
                                duration: 0
                                /*tension: {
                                  duration: 1000,
                                  easing: 'easeInQuad',
                                  from: 1,
                                  to: 0,
                                  loop: false
                                }*/
                              },
                            scales: {
                              x :{
                                min: historial[0].x
                              },
                              y: 
                                {
                                  max: limiteSupG + 5,
                                  //beginAtZero: true,
                                  min: limiteInfG - 5,
                                 /* title: {
                                    display: true,
                                    text: 'Valores',
                                  },*/
                                }
                            }
                          }
                        });

                } else console.log('error',sector);
            }
        }
    }

    sector.open("GET",direccion, true);
    sector.send();

}


const ventanaFlotanteClima2 = (direccion,boton,e) => {
  let ctxCL = document.getElementById('myChartClima');
  const instalacion = document.getElementById('instalacionclima');
  const nombre = document.getElementById('nombre');
  const sector = new XMLHttpRequest();
  let x = e.clientX + 15; // Agregar un desplazamiento a la derecha
  let y = e.clientY;
  boton.style.fill = mouseOver;

  if (e.clientY >= 45 && e.clientY < 100) y = y + 30;

  else if ((e.clientY >= 400 && e.clientY < 500) && e.clientX >= 1100){
    y = y - 240;
    x = x - 250;
   }

  else if ((e.clientY >= 500 && e.clientY < 600) && e.clientX >= 1100){
    y = y - 340;
    x = x - 400;
   }

  else if (e.clientY >= 100 && e.clientY < 200) y = y + 30;

 else if (e.clientY >= 200 && e.clientY < 300) y = y + 10;

 else if (e.clientY >= 300 && e.clientY < 400) y = y + 20;

 else if (e.clientY >= 400 && e.clientY < 500){
   y = y - 360;
  }

 else if (e.clientY >= 500 && e.clientY < 600){
   y = y - 240;
   //x = x - 250;
  }

 else if(e.clientY >= 600 && e.clientY < 700){
   y = y - 340;
   x = x - 305;
  }


 /*else if((e.clientY > 400) && (e.clientX > 1100)) {
  y = y - 360;
  
  console.log('entra');
 }*/

  else y = y - 50;

  ventanaFlotanteclima.style.left = x + "px";
  ventanaFlotanteclima.style.top = y + "px";
  ventanaFlotanteclima.style.display = "block";

  sector.onreadystatechange = () =>{
      if (pasoCl === 1) {
          if (sector.readyState == XMLHttpRequest.DONE){
            pasoCl = 0;
              if(sector.status === 200){
                  const date = JSON.parse(sector.responseText);
                  const dataTempRealcl = date.datos[0];
                  const datos = date.datos;
                  instalacion.textContent = `${date.instalacion}, ${date.nombre}`;
                  //nombre.textContent = date.nombre;
                  let temperatura = [];
                  let limiteTSup = [];
                  let limiteTInf = [];
                  let humedad = [];
                  let limiteHSup = [];
                  let limiteHInf = [];

                  if (this.chartCl2) {
                    this.chartCl2.destroy();
                        }
          
                  let ultIDcl = dataTempRealcl.ID; 

                  for (let i = 0; i < datos.length; i++) { 
                      let idcl = datos[i].ID;

                        if(idcl === ultIDcl){
                            ultIDcl = idcl;
                            let fecha = new Date(datos[i].fecha);
                            let hora = fecha.getHours().toString().padStart(2,'0');
                            let minuto = fecha.getMinutes().toString().padStart(2,'0');
                            let horaText = `${hora}:${minuto}`;

                              limiteTInf.push({x:horaText, y:`${datos[i].minTemp}`});
                              temperatura.push({x:horaText, y:`${datos[i].tempFabrica}`});
                              limiteTSup.push({x:horaText, y:`${datos[i].maxTemp}`});

                              limiteHInf.push({x:horaText, y:`${datos[i].minHum}`});
                              humedad.push({x:horaText, y:`${datos[i].humedad}`});
                              limiteHSup.push({x:horaText, y:`${datos[i].maxHum}`});
                            
                            ultIDcl = ultIDcl - 30;
                        }  
                    }

                    limiteTInf.reverse();
                    temperatura.reverse();
                    limiteTSup.reverse();

                    limiteHInf.reverse();
                    humedad.reverse();
                    limiteHSup.reverse();

                    //chartCl.update();


                    this.chartCl2 = new Chart(ctxCL, {
                      type: 'line',
                      data: {
                          datasets: [{
                            label: `Temp. Max: ${dataTempRealcl.maxTemp}°C`,
                            borderColor: '#20A907',
                            borderWidth: 1.5,
                            data: limiteTSup,
                            //yAxisID: 'y1',
                        },{
                            label: 'temperatura',
                            borderColor: '#FA7D07',
                            borderWidth: 2.5,
                            data: temperatura,
                            //yAxisID: 'y1',
                        },{
                          label: `Temp. Min: ${dataTempRealcl.minTemp}°C`,
                          borderColor: '#A507FA',
                          borderWidth: 1.5,
                          data: limiteTInf,
                          //yAxisID: 'y1',
                      },{
                        label: `Hum. Max: ${dataTempRealcl.maxHum}%`,
                        borderColor: '#20A907',
                        borderWidth: 1.5,
                        data: limiteHSup,
                        //yAxisID: 'y1',
                    },{
                        label: 'humedad',
                        borderColor: '#417CDF',
                        borderWidth: 2.5,
                        data: humedad,
                        //yAxisID: 'y1',
                    },{
                      label: `Hum. Min: ${dataTempRealcl.minHum}%`,
                      borderColor: '#A507FA',
                      borderWidth: 1.5,
                      data: limiteHInf,
                      //yAxisID: 'y1',
                  },
                          ],
                      },
                      options: {

                        legend: {
                          display: false
                          },
                          elements: {
                              point: {
                                radius: 0, // Establecer el radio de los puntos en 0 para ocultarlos
                              }
                            },
                          animations: {
                              tension: {
                                duration: 2000,
                                easing: 'easeInQuad',
                                from: 1,
                                to: 0,
                                loop: false
                              }
                            },
                          scales: {
                            x :{
                              min: temperatura[0].x
                            },
                            y: 
                              {
                                max: dataTempRealcl.maxHum + 5,
                                //beginAtZero: true,
                                min: dataTempRealcl.minTemp - 5,
                               /* title: {
                                  display: true,
                                  text: 'Valores',
                                },*/
                              }
                          }
                        }
                      });

              } else console.log('error',sector);
          }
      }
  }

  sector.open("GET",direccion, true);
  sector.send();

}



const mouseOutf = (e,boton) => {
    boton.style.fill = mouseOut;
    ventanaFlotante.style.display = "none";
    paso = 1;
    this.chart.destroy();
}

const mouseOutfCl = (e,boton) => {
  boton.style.fill = '#333';
  ventanaFlotanteclima.style.display = "none";
  pasoCl = 1;
  this.chartCl.destroy();
}

const mouseOutfCl2 = (e,boton) => {
  boton.style.fill = '#333';
  ventanaFlotanteclima.style.display = "none";
  pasoCl = 1;
  this.chartCl2.destroy();
}




const puestoClimaRef = (botonTemp,botonHum,textTemp,textHum,direccion) => {
    const sector = new XMLHttpRequest();
    sector.onreadystatechange = () => {
        const buttonTemp = document.getElementById(botonTemp);
        const buttonHum = document.getElementById(botonHum);

        if (sector.readyState == XMLHttpRequest.DONE){
            if(sector.status == 200) {
                const date = JSON.parse(sector.responseText);
                const temp = parseInt(date.datos[0].tempFabrica);
                const minTemper = date.datos[0].minTemp;
                const maxTemper = date.datos[0].maxTemp;
                const minHum = date.datos[0].minHum;
                const maxHum = date.datos[0].maxHum; 
                const hum = parseInt(date.datos[0].humedad);
                const infoTemp = `T: ${temp}°C`;
                const infoHum = `H: ${hum}%`;
                
                document.getElementById(textTemp).textContent = infoTemp;
                document.getElementById(textHum).textContent = infoHum;

    
                (temp < minTemper || temp > maxTemper ) ? buttonTemp.style.fill = alertClima : buttonTemp.style.fill = okClima;

                (hum < minHum || hum > maxHum) ? buttonHum.style.fill = alertClima : buttonHum.style.fill = okClima;

            } else console.log('error',sector);
        }
    }

    sector.open("GET", direccion, true);
    sector.send();

}




const puestoClima = (botonTemp,botonHum,textTemp,textHum,direccion) =>{
    const sector = new XMLHttpRequest();
    sector.onreadystatechange = () => {
        const buttonTemp = document.getElementById(botonTemp);
        const buttonHum = document.getElementById(botonHum);

        if (sector.readyState == XMLHttpRequest.DONE){
            if(sector.status == 200) {
                //console.log(sector.responseText);
                const date = JSON.parse(sector.responseText);
                const temp = parseInt(date.datos[0].tempFabrica);
                const hum = parseInt(date.datos[0].humedad);
                const infoTemp = `T: ${temp}°C`;
                const infoHum = `H: ${hum}%`;
                
                document.getElementById(textTemp).textContent = infoTemp;
                document.getElementById(textHum).textContent = infoHum;

    
                 buttonTemp.style.fill = neutral; buttonHum.style.fill = neutral;

            } else console.log('error',sector);
        }
    }

    sector.open("GET", direccion, true);
    sector.send();
}




const botonF = (botonFiltro,direccion) => {
    const sector = new XMLHttpRequest();
    sector.onreadystatechange = () => {
        const buttonFiltro = document.getElementById(botonFiltro);

        if (sector.readyState == XMLHttpRequest.DONE){
            if (sector.status == 200) {
                const datos = JSON.parse(sector.responseText);
                const estadoFiltro = datos.estado;

                (estadoFiltro === 1) ? buttonFiltro.style.stroke = okFiltro : buttonFiltro.style.stroke = alertFiltro;
            } else console.log('error',sector);
        }
    }

    sector.open("GET",direccion, true);
    sector.send();
}


const actualizarDatos = () => {

    const climaExterior = climaExt("http://192.168.3.122:1880/dataFab9exterior");

    const fab6PrepClima = puestoClimaRef ('climaPrepTFab6','climaPrepHFab6','tempPrepFab6','humPrepFab6',`${server}/dataFab6prepClima`);
    const fab6PrepFiltro = botonF('filtroPrepFab6',`${server}/dataFab6prepFiltro`);

    const fab6ContClima = puestoClimaRef ('climaContTFab6','climaContHFab6','tempContFab6','humContFab6',`${server}/dataFab6contClima`);
    const fab6ContFiltro = botonF('filtroContFab6',`${server}/dataFab6contFiltros`);

    const fab6BobinajeClima = puestoClimaRef ('climaBobTFab6','climaBobHFab6','tempBobFab6','humBobFab6',`${server}/dataFab6bobClima`);
    const fab6BobinajeFiltro = botonF ('filtroBobFab6',`${server}/dataFab6bobFiltros`);

    const fab4PreparacionClima = puestoClimaRef('climaPrepTFab4','climaPrepHFab4','tempPrepFab4','humPrepFab4',`${server}/dataFab4prepClima`);
    const fab4ClimaFiltro = botonF('filtroClimaFab4',`${server}/dataFab4climaFiltro`);
    const fab4OpenEndClima = puestoClima('climaOpen-EndTFab4','climaOpen-EndHFab4','tempOpenEndFab4','humOpenEndFab4',`${server}/dataFab4openClima`);

    const fab4RetorFiltro = botonF('filtroRetorFab4',`${server}/dataFab4retorcidoFiltro`);
    const fab4RetorcidoClima = puestoClima('climaRetorTFab4','climaRetorHFab4','tempRetorFab4','humRetorFab4',`${server}/dataFab4retorcidoClima`);

    const fab9Carda1 = puestoClimaRef('climaPrepTFab9-1','climaPrepHFab9-1','tempCardaFab9','humCardaFab9',`${server}/dataFab9carda-1Clima`);
    const fab9Carda2 = puestoClima('climaPrepTFab9-2','climaPrepHFab9-2','tempCardas-2Fab9','humCardas-2Fab9',`${server}/dataFab9carda-2Clima`);
    const fab9PrepFiltro = botonF('filtroPrepFab9',`${server}/dataFab9prepFiltro`);
    const fab9PrepClima = puestoClima('climaPrepTFab9-3','climaPrepHFab9-3','tempPrepFab9','humPrepFab9',`${server}/dataFab9prepClima`);

    const fab9OpenEndClima = puestoClimaRef('climaOpenEndTFab9','climaOpenEndHFab9','tempOpenEndFab9','humOpenEndFab9',`${server}/dataFab9openEndClima`);
    const fab9OpenFiltro = botonF('filtroOpenEndFab9',`${server}/dataFab9openEndFiltro`);

    const fab9Empaque = puestoClimaRef('climaEmpaqueTFab9','climaEmpaqueHFab9','tempEmpaqueFab9','humEmpaqueFab9',`${server}/dataFab9empaque`);

    const fab3Ex8Filtro = botonF('filtroEX-8Fab3',`${server}/dataFab3ex8`);
    const fab3C80Clima = puestoClima('climaC80TFab3','climaC80HFab3','tempC80Fab3','humC80Fab3',`${server}/dataFab3C80Clima`);

    const fab3PeinadorasClima = puestoClimaRef('climaPeiTFab3','climaPeiHFab3','tempPeiFab3','humPeiFab3',`${server}/dataFab3PeinadorasClima`);
    const fab3PeinadorasFiltro = botonF('filtroPrepFab3-5',`${server}/dataFab3PeinadorasFiltro`);

    const fab3ManuaresClima = puestoClimaRef('climaManTFab3','climaManHFab3','tempManFab3','humManFab3',`${server}/dataFab3ManuaresClima`);
    const fab3PrepaFiltro = botonF('filtroPrepFab3',`${server}/dataFab3PrepFiltro`);

    const fab3CardaFiltro = botonF('filtroCardasFab3',`${server}/dataFab3CardaFiltro`);

    const fab3G30Clima = puestoClimaRef('climaG30TFab3','climaG30HFab3','tempG30Fab3','humG30Fab3',`${server}/dataFab3G30Clima`);
    const fab3G30Filtro = botonF('filtroContFab3',`${server}/dataFab3G30Filtro`);

    const fab3G33Clima = puestoClimaRef('climaG33TFab3','climaG33HFab3','tempG33Fab3','humG33Fab3',`${server}/dataFab3G33Clima`);
    const fab3G33Filtro = botonF('filtroG33Fab3',`${server}/dataFab3G33Filtro`);

    const fab3BobClima = puestoClimaRef('climaBobinajeTFab3','climaBobinajeHFab3','tempBobinajeFab3','humBobinajeFab3',`${server}/dataFab3BobinajeClima`);
    const fab3BobFiltro = botonF('filtroBobFab3',`${server}/dataFab3BobinajeFiltro`);

    const fab1ColorClima = puestoClimaRef('climaColorTFab1','climaColorHFab1','tempColorFab1','humColorFab1',`${server}/dataFab1ColorClima`);
    const fab1ColorFiltro = botonF('filtroColorFab1',`${server}/dataFab1ColorFiltro`);

    const fab1PeinadorasClima = puestoClimaRef('climaPeinadorasTFab1','climaPeinadorasHFab1','tempPeiFab1','humPeiFab1',`${server}/dataFab1PeinadorasClima`);
    const fab1ManuaresClima = puestoClimaRef('climaManuaresTFab1','climaManuaresHFab1','tempManuaresFab1','humManuaresFab1',`${server}/dataFab1ManuaresClima`);
    const fab1PrepFiltro = botonF('filtroPrepFab1',`${server}/dataFab1PrepFiltro`);
    const fab1CardasFiltro = botonF('filtroCardasFab1',`${server}/dataFab1CardaFiltros`);

    const fab1ContFiltro = botonF('filtroContinuasFab1',`${server}/dataFab1ContinuasFiltro`);
    const fab1Continuas1Clima = puestoClima('climaContinuasTFab1-1','climaContinuasHFab1-1','tempContFab1-1','humContFab1-1',`${server}/dataFab1ContinuasClima`);
    const fab1Continuas2Clima = puestoClimaRef('climaContinuasTFab1-2','climaContinuasHFab1-2','tempContFab1-2','humContFab1-2',`${server}/dataFab1Continuas2Clima`);

    const fab1EmpaqueClima = puestoClimaRef('climaEmpaqueTFab1','climaEmpaqueHFab1','tempEmpaqueFab1','humEmpaqueFab1',`${server}/dataFab1EmpaqueClima`);
    const fab1VortexClima = puestoClima('climaVortexTFab1','climaVortexHFab1','tempVortexFab1','humVortexFab1',`${server}/dataFab1VortexClima`);
    const fab1Vortex1Clima = puestoClima('climaVortexTFab1-1','climaVortexHFab1-1','tempVortexFab1-1','humVortexFab1-1',`${server}/dataFab1Vortex-1Clima`);
    const fab1Vortex2Clima = puestoClima('climaVortexTFab1-2','climaVortexHFab1-2','tempVortexFab1-2','humVortexFab1-2',`${server}/dataFab1Vortex-2Clima`);
    const fab1Vortex3Clima = puestoClima('climaVortexTFab1-3','climaVortexHFab1-3','tempVortexFab1-3','humVortexFab1-3',`${server}/dataFab1Vortex-3Clima`);
    const fab1BobinajeClima = puestoClimaRef('climaBobinajeTFab1','climaBobinajeHFab1','tempBobinajeFab1','humBobinajeFab1',`${server}/dataFab1BobinajeClima`);
    const fab1Batan = botonF('filtroBatanFab1',`${server}/dataFab1BatanFiltro`);
    const fab1Cotonia = botonF('filtroCotoniaFab1',`${server}/dataFab1Cotonia`);
}


fab6FiltroPrep.addEventListener("mousemove", (e)=>{
    const fab6prepFilV = ventanaFlotanteFiltro(`${server}/dataFab6prepFiltro12hs`,fab6FiltroPrep,e,1);
    /*console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
});


fab6FiltroPrep.addEventListener("mouseout", (e)=>{
    const fab6prepFilVo = mouseOutf(e,fab6FiltroPrep);
});

fab6FiltroPrep.addEventListener("click", ()=>{
    window.location.href = 'filtroPrepFab6/index.html';
});

fab6ClimaPrepT.addEventListener("mouseover", (e)=>{
  const fab6prepTClimaV = ventanaFlotanteClima(`${server}/dataFab6prepClimaT12hs`,fab6ClimaPrepT,e);
    /*console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
});

fab6ClimaPrepT.addEventListener("mouseout", (e)=>{
    const fab6prepTClimaVo = mouseOutfCl(e,fab6ClimaPrepT);
});

fab6ClimaPrepH.addEventListener("mouseover", (e)=>{
  const fab6prepHClimaV = ventanaFlotanteClima(`${server}/dataFab6prepClimaH12hs`,fab6ClimaPrepT,e);
    /*console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
});

fab6ClimaPrepH.addEventListener("mouseout", (e)=>{
    const fab6prepHClimaVo = mouseOutfCl(e,fab6ClimaPrepH);
});

fab6ClimaContG.addEventListener("mouseover", (e)=>{
  const fab6prepHClimaV = ventanaFlotanteClima2(`${server}/dataFab6contClimaT12hs`,fab6ClimaContG,e);
    /*console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);*/
});

fab6ClimaContG.addEventListener("mouseout", (e)=>{
    const fab6prepHClimaVo = mouseOutfCl2(e,fab6ClimaContG);
});

actualizarDatos();

setInterval(actualizarDatos, 60000);




  
