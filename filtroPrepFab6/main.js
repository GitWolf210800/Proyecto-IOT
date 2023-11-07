"use strict";

const alertt = '#BD1F1F';
const ok = '#55A317';

const datosSector = (instalacionID,botonVentilador,dataVentilador,botonFiltroVent,dataFiltroVent,botonPicos,dataPicos,botonRpm,dataRpm,botonCarro,dataCarro,direccion) => {

const sector = new XMLHttpRequest();
    sector.onreadystatechange = () => {

        if(sector.readyState == XMLHttpRequest.DONE){
            if(sector.status == 200) {

                const buttonVentilador = document.getElementById(botonVentilador);
                const buttonFiltroVent = document.getElementById(botonFiltroVent);
                const buttonPicos = document.getElementById(botonPicos);
                const buttonRpm = document.getElementById(botonRpm);
                const buttonCarro = document.getElementById(botonCarro);

                console.log(sector.responseText);
                const data = JSON.parse(sector.responseText);

                const instalacion = data.instalacion;
                const ventilador = parseInt(data.datos[0].ventilador);
                const limitVentilador = data.datos[0].limVentilador;
                const filtroVentilador = parseInt(data.datos[0].filtroVentilador);
                const limitFiltroVentilador = data.datos[0].limFiltroVentilador;
                const picos = parseInt(data.datos[0].picos);
                const limitPicos = data.datos[0].limPicos;
                const rpmFiltro = data.datos[0].rpmFiltro;
                const limitRpmFiltro = data.datos[0].limRpmFiltro;
                const carro = data.datos[0].Carro;
                const limitCarro = data.datos[0].limCarro;

                const infoVentilador = `${ventilador} Pa`;
                const infoFiltroVentilador = `${filtroVentilador} Pa`;
                const infoPicos = `${picos} Pa`;
                const infoRpm = `${rpmFiltro} RPM`;
                const infoCarro = `${carro}`;

                document.getElementById(instalacionID).textContent = instalacion;
                document.getElementById(dataVentilador).textContent = infoVentilador;
                document.getElementById(dataFiltroVent).textContent = infoFiltroVentilador;
                document.getElementById(dataPicos).textContent = infoPicos;
                document.getElementById(dataRpm).textContent = infoRpm;
                document.getElementById(dataCarro).textContent = infoCarro;

                (ventilador < limitVentilador) ? buttonVentilador.style.fill = alertt : buttonVentilador.style.fill = ok;

                (filtroVentilador > limitFiltroVentilador) ? buttonFiltroVent.style.fill = alertt : buttonFiltroVent.style.fill = ok;

                (picos < limitPicos) ? buttonPicos.style.fill = alertt : buttonPicos.style.fill = ok;

                (rpmFiltro < limitRpmFiltro) ? buttonRpm.style.fill = alertt : buttonRpm.style.fill = ok;

                (carro < limitCarro) ? buttonCarro.style.fill = alertt : buttonCarro.style.fill = ok;

            } else console.log('error',sector);
        }

    }

    sector.open("GET",direccion, true);
    sector.send();

}


const actualizarDatos = () =>{
    const fab = datosSector('instalacionText','ventiladorData','ventiladorDataText','diferencialData','diferencialDataText','picosData','picosDataText','rpmData','rpmFiltroDataText','carroData','carroDataText',"http://192.168.3.122:1880/dataFab6bobFiltros");

}

actualizarDatos();

setInterval(actualizarDatos,60000);