"use-strict"

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

const fab6ClimaPrep = document.getElementById('filtroPrepFab6');

const fab1FiltroColor = document.getElementById('filtroColorFab1');

const ventanaFlotante = document.getElementById('ventanaFlotante');

const ventanaFlotanteFiltro = (direccion,boton,e,tipo) => {
    const sector = new XMLHttpRequest();
    let x = e.clientX + 0; // Agregar un desplazamiento a la derecha
    let y = e.clientY;
    boton.style.fill = mouseOver;

    if (e.clientY > 45 && e.clientY < 100) y = y + 30;

    else if (e.clientY > 100 && e.clientY < 200) y = y + 30;

   else if (e.clientY > 200 && e.clientY < 300) y = y + 10;

   else if (e.clientY > 300 && e.clientY < 400) y = y + 20;

   else if (e.clientY > 400 && e.clientY < 500) {
    y = y - 40;
    x = x + 20;
    }

   else if (e.clientY > 500 && e.clientY < 600) y = y - 250;

   else if(e.clientY > 600 && e.clientY < 700) y = y - 250;

    else y = y - 50;

    ventanaFlotante.style.left = x + "px";
    ventanaFlotante.style.top = y + "px";
    ventanaFlotante.style.display = "block";
    sector.onreadystatechange = () => {
        if (sector.readyState == XMLHttpRequest.DONE){
            if(sector.status == 200) {
                const date = JSON.parse(sector.responseText);
                const dataTempReal = date.datos[0];
                const infoFiltroVent = `${dataTempReal.filtroVentilador.toFixed(2)} Pa, Limite Sup:(${dataTempReal.limFiltroVentilador}Pa)`;
                const infoVent = `${dataTempReal.presVentilador.toFixed(2)} Pa, Limite Inf:(${dataTempReal.limVentilador}Pa)`
                const infoPicos = `${dataTempReal.presPicos.toFixed(2)} Pa, Limite Inf:(${dataTempReal.limPicos}Pa)`;
                const infoRpm = `${dataTempReal.rpmFiltro}, Limite Inf:(${dataTempReal.limRpmFiltro}RPM)`;
                const infoCarro = `${dataTempReal.Carro}, Limite Inf:(${dataTempReal.limCarro})`;
                const inst = document.getElementById('instalacion');
                const diferencial = document.getElementById('filtroVent');
                const vent = document.getElementById('vent');
                const pico = document.getElementById('pico');
                const rpm = document.getElementById('rpm');
                const carro = document.getElementById('carro');
                inst.textContent = `${date.instalacion}`;
                if(tipo === 1) {
                    diferencial.textContent = infoFiltroVent;
                    (dataTempReal.filtroVentilador > dataTempReal.limFiltroVentilador) ? diferencial.style.color = textNotOk : diferencial.style.color = textOk;
                    vent.textContent = infoVent;
                    (dataTempReal.presVentilador < dataTempReal.limVentilador) ? vent.style.color = textNotOk : vent.style.color = textOk;
                    pico.textContent = infoPicos;
                    (dataTempReal.presPicos < dataTempReal.limPicos) ? pico.style.color = textNotOk : pico.style.color = textOk;
                    rpm.textContent = infoRpm;
                    (dataTempReal.rpmFiltro < dataTempReal.limRpmFiltro) ? rpm.style.color = textNotOk : rpm.style.color = textOk;
                    carro.textContent = infoCarro;
                    (dataTempReal.carro < dataTempReal.limCarro) ? carro.style.color = textNotOk : carro.style.color = textOk;
                }
            } else console.log('error',sector);
        }
    }

    sector.open("GET",direccion, true);
    sector.send();
}





fab6ClimaPrep.addEventListener("mousemove", (e)=>{
    const fab6prepFilV = ventanaFlotanteFiltro("http://192.168.3.122:1880/dataFab6prepFiltro12hs",fab6ClimaPrep,e,1);
    console.log(`X: ${e.clientX}`);
    console.log(`Y: ${e.clientY}`);
});


fab6ClimaPrep.addEventListener("mouseout", ()=>{
    fab6ClimaPrep.style.fill = mouseOut;
    ventanaFlotante.style.display = "none";
});

fab6ClimaPrep.addEventListener("click", ()=>{
    window.location.href = 'filtroPrepFab6/index.html'; // Cambia esta URL a la que desees redirigir
});



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

    const fab6PrepClima = puestoClimaRef ('climaPrepTFab6','climaPrepHFab6','tempPrepFab6','humPrepFab6',"http://192.168.3.122:1880/dataFab6prepClima");
    const fab6PrepFiltro = botonF('filtroPrepFab6',"http://192.168.3.122:1880/dataFab6prepFiltro");

    const fab6ContClima = puestoClimaRef ('climaContTFab6','climaContHFab6','tempContFab6','humContFab6',"http://192.168.3.122:1880/dataFab6contClima");
    const fab6ContFiltro = botonF('filtroContFab6',"http://192.168.3.122:1880/dataFab6contFiltros");

    const fab6BobinajeClima = puestoClimaRef ('climaBobTFab6','climaBobHFab6','tempBobFab6','humBobFab6',"http://192.168.3.122:1880/dataFab6bobClima");
    const fab6BobinajeFiltro = botonF ('filtroBobFab6',"http://192.168.3.122:1880/dataFab6bobFiltros");

    const fab4PreparacionClima = puestoClimaRef('climaPrepTFab4','climaPrepHFab4','tempPrepFab4','humPrepFab4',"http://192.168.3.122:1880/dataFab4prepClima");
    const fab4ClimaFiltro = botonF('filtroClimaFab4',"http://192.168.3.122:1880/dataFab4climaFiltro");
    const fab4OpenEndClima = puestoClima('climaOpen-EndTFab4','climaOpen-EndHFab4','tempOpenEndFab4','humOpenEndFab4',"http://192.168.3.122:1880/dataFab4openClima");

    const fab4RetorFiltro = botonF('filtroRetorFab4',"http://192.168.3.122:1880/dataFab4retorcidoFiltro");
    const fab4RetorcidoClima = puestoClima('climaRetorTFab4','climaRetorHFab4','tempRetorFab4','humRetorFab4',"http://192.168.3.122:1880/dataFab4retorcidoClima");

    const fab9Carda1 = puestoClimaRef('climaPrepTFab9-1','climaPrepHFab9-1','tempCardaFab9','humCardaFab9',"http://192.168.3.122:1880/dataFab9carda-1Clima");
    const fab9Carda2 = puestoClima('climaPrepTFab9-2','climaPrepHFab9-2','tempCardas-2Fab9','humCardas-2Fab9',"http://192.168.3.122:1880/dataFab9carda-2Clima");
    const fab9PrepFiltro = botonF('filtroPrepFab9',"http://192.168.3.122:1880/dataFab9prepFiltro");
    const fab9PrepClima = puestoClima('climaPrepTFab9-3','climaPrepHFab9-3','tempPrepFab9','humPrepFab9',"http://192.168.3.122:1880/dataFab9prepClima");

    const fab9OpenEndClima = puestoClimaRef('climaOpenEndTFab9','climaOpenEndHFab9','tempOpenEndFab9','humOpenEndFab9',"http://192.168.3.122:1880/dataFab9openEndClima");
    const fab9OpenFiltro = botonF('filtroOpenEndFab9',"http://192.168.3.122:1880/dataFab9openEndFiltro");

    const fab3Ex8Filtro = botonF('filtroEX-8Fab3',"http://192.168.3.122:1880/dataFab3ex8");
    const fab3C80Clima = puestoClima('climaC80TFab3','climaC80HFab3','tempC80Fab3','humC80Fab3',"http://192.168.3.122:1880/dataFab3C80Clima");

    const fab3PeinadorasClima = puestoClimaRef('climaPeiTFab3','climaPeiHFab3','tempPeiFab3','humPeiFab3',"http://192.168.3.122:1880/dataFab3PeinadorasClima");
    const fab3PeinadorasFiltro = botonF('filtroPrepFab3-5',"http://192.168.3.122:1880/dataFab3PeinadorasFiltro");

    const fab3ManuaresClima = puestoClimaRef('climaManTFab3','climaManHFab3','tempManFab3','humManFab3',"http://192.168.3.122:1880/dataFab3ManuaresClima");
    const fab3PrepaFiltro = botonF('filtroPrepFab3',"http://192.168.3.122:1880/dataFab3PrepFiltro");

    const fab3CardaFiltro = botonF('filtroCardasFab3',"http://192.168.3.122:1880/dataFab3CardaFiltro");

    const fab3G30Clima = puestoClimaRef('climaG30TFab3','climaG30HFab3','tempG30Fab3','humG30Fab3',"http://192.168.3.122:1880/dataFab3G30Clima");
    const fab3G30Filtro = botonF('filtroContFab3',"http://192.168.3.122:1880/dataFab3G30Filtro");

    const fab3G33Clima = puestoClimaRef('climaG33TFab3','climaG33HFab3','tempG33Fab3','humG33Fab3',"http://192.168.3.122:1880/dataFab3G33Clima");
    const fab3G33Filtro = botonF('filtroG33Fab3',"http://192.168.3.122:1880/dataFab3G33Filtro");

    const fab3BobClima = puestoClimaRef('climaBobinajeTFab3','climaBobinajeHFab3','tempBobinajeFab3','humBobinajeFab3',"http://192.168.3.122:1880/dataFab3BobinajeClima");
    const fab3BobFiltro = botonF('filtroBobFab3',"http://192.168.3.122:1880/dataFab3BobinajeFiltro");

    const fab1ColorClima = puestoClimaRef('climaColorTFab1','climaColorHFab1','tempColorFab1','humColorFab1',"http://192.168.3.122:1880/dataFab1ColorClima");
    const fab1ColorFiltro = botonF('filtroColorFab1',"http://192.168.3.122:1880/dataFab1ColorFiltro");

    const fab1PeinadorasClima = puestoClimaRef('climaPeinadorasTFab1','climaPeinadorasHFab1','tempPeiFab1','humPeiFab1',"http://192.168.3.122:1880/dataFab1PeinadorasClima");
    const fab1ManuaresClima = puestoClimaRef('climaManuaresTFab1','climaManuaresHFab1','tempManuaresFab1','humManuaresFab1',"http://192.168.3.122:1880/dataFab1ManuaresClima");
    const fab1PrepFiltro = botonF('filtroPrepFab1',"http://192.168.3.122:1880/dataFab1PrepFiltro");
    const fab1CardasFiltro = botonF('filtroCardasFab1',"http://192.168.3.122:1880/dataFab1CardaFiltros");

    const fab1ContFiltro = botonF('filtroContinuasFab1',"http://192.168.3.122:1880/dataFab1ContinuasFiltro");
    const fab1Continuas1Clima = puestoClima('climaContinuasTFab1-1','climaContinuasHFab1-1','tempContFab1-1','humContFab1-1',"http://192.168.3.122:1880/dataFab1ContinuasClima");
    const fab1Continuas2Clima = puestoClimaRef('climaContinuasTFab1-2','climaContinuasHFab1-2','tempContFab1-2','humContFab1-2',"http://192.168.3.122:1880/dataFab1Continuas2Clima");

    const fab1EmpaqueClima = puestoClimaRef('climaEmpaqueTFab1','climaEmpaqueHFab1','tempEmpaqueFab1','humEmpaqueFab1',"http://192.168.3.122:1880/dataFab1EmpaqueClima");
    const fab1VortexClima = puestoClima('climaVortexTFab1','climaVortexHFab1','tempVortexFab1','humVortexFab1',"http://192.168.3.122:1880/dataFab1VortexClima");
    const fab1Vortex1Clima = puestoClima('climaVortexTFab1-1','climaVortexHFab1-1','tempVortexFab1-1','humVortexFab1-1',"http://192.168.3.122:1880/dataFab1Vortex-1Clima");
    const fab1Vortex2Clima = puestoClima('climaVortexTFab1-2','climaVortexHFab1-2','tempVortexFab1-2','humVortexFab1-2',"http://192.168.3.122:1880/dataFab1Vortex-2Clima");
    const fab1Vortex3Clima = puestoClima('climaVortexTFab1-3','climaVortexHFab1-3','tempVortexFab1-3','humVortexFab1-3',"http://192.168.3.122:1880/dataFab1Vortex-3Clima");
    const fab1BobinajeClima = puestoClimaRef('climaBobinajeTFab1','climaBobinajeHFab1','tempBobinajeFab1','humBobinajeFab1',"http://192.168.3.122:1880/dataFab1BobinajeClima");
    const fab1Batan = botonF('filtroBatanFab1',"http://192.168.3.122:1880/dataFab1BatanFiltro");
    const fab1Cotonia = botonF('filtroCotoniaFab1',"http://192.168.3.122:1880/dataFab1Cotonia");
}

actualizarDatos();

setInterval(actualizarDatos, 60000);
