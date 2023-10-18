"use-strict"

const alert = '#BD1F1F';
const ok = '#2bc12cff';

const datosSector = (botonFiltro,botonClima,textTemp,textHum,direccion) => {
    const sector = new XMLHttpRequest();
    sector.onreadystatechange = () => {
        const buttonFiltro = document.getElementById(botonFiltro);
        const buttonClima = document.getElementById(botonClima);

        if (sector.readyState == XMLHttpRequest.DONE){
            if(sector.status == 200) {
                console.log(sector.responseText);
                const datos = JSON.parse(sector.responseText);
                const estadoFiltro = datos.estado;
                const estadoClima = datos.estadoClima;
                const infoTemp = `T: ${parseInt(datos.temperatura)}°C`;
                const infoHum = `H: ${parseInt(datos.humedad)}%`;
                
                document.getElementById(textTemp).textContent = infoTemp;
                document.getElementById(textHum).textContent = infoHum;

                (estadoFiltro === 1) ? buttonFiltro.style.fill = ok : buttonFiltro.style.fill = alert;

                (estadoClima === 1) ? buttonClima.style.fill = ok : buttonClima.style.fill = alert;
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

                (estadoFiltro === 1) ? buttonFiltro.style.fill = ok : buttonFiltro.style.fill = alert;
            } else console.log('error',sector);
        }
    }

    sector.open("GET",direccion, true);
    sector.send();
}

const actualizarDatos = () => {
    const fab6Prep = datosSector('filtroPrepFab6','climaPrepFab6','tempPrepFab6','humPrepFab6',"http://192.168.3.122:1880/dataFab6prepClima");

    const fab6Cont = datosSector('filtroContFab6','climaContFab6','tempContFab6','humContFab6',"http://192.168.3.122:1880/datafab6contClima");

    const fab6Bob = datosSector('filtroBobFab6','climaBobFab6','tempBobFab6','humBobFab6',"http://192.168.3.122:1880/datafab6bobClima");

    const fab4prep = datosSector('filtroClimaFab4','climaPrepFab4','tempPrepFab4','humPrepFab4',"http://192.168.3.122:1880/dataFab4prepClima");

    const fab4openEnd = datosSector('filtroClimaFab4','climaOpen-EndFab4','tempOpenEndFab4','humOpenEndFab4',"http://192.168.3.122:1880/dataFab4openClima");

    const fab4Retorcido = datosSector('filtroRetorFab4','climaRetorFab4','tempRetorFab4','humRetorFab4',"http://192.168.3.122:1880/dataFab4retorcidoClima");

    const fab9Preparacion = datosSector('filtroPrepFab9','climaPrepFab9-3','tempPrepFab9','humPrepFab9',"http://192.168.3.122:1880/dataFab9prepClima");

    const fab9Carda1 = datosSector('filtroPrepFab9','climaPrepFab9-1','tempCardaFab9','humCardaFab9',"http://192.168.3.122:1880/dataFab9carda-1Clima");

    const fab9carda2 = datosSector('filtroPrepFab9','climaPrepFab9-2','tempCardas-2Fab9','humCardas-2Fab9',"http://192.168.3.122:1880/dataFab9carda-2Clima");

    const fab9OpenEnd = datosSector('filtroOpenEndFab9','climaOpenEndFab9','tempOpenEndFab9','humOpenEndFab9',"http://192.168.3.122:1880/dataFab9openEnd");

    const fab3C80 = datosSector('filtroEX-8Fab3','climaC80Fab3','tempC80Fab3','humC80Fab3',"http://192.168.3.122:1880/dataFab3C80Clima");

    const fab3Peinadoras = datosSector('filtroPrepFab3','climaPeiFab3','tempPeiFab3','humPeiFab3',"http://192.168.3.122:1880/dataFab3PeinadorasClima");

    const fab3Manuares = datosSector('filtroCardasFab3','climaManFab3','tempManFab3','humManFab3',"http://192.168.3.122:1880/dataFab3ManuaresClima");

    const fab3PeinadorasF = botonF('filtroPrepFab3-5',"http://192.168.3.122:1880/dataFab3PeinadorasFClima");

    const fab3G30 = datosSector('filtroContFab3','climaG30Fab3','tempG30Fab3','humG30Fab3',"http://192.168.3.122:1880/dataFab3ContinuasClima");

    const fab3G33 = datosSector('filtroG33Fab3','climaG33Fab3','tempG33Fab3','humG33Fab3',"http://192.168.3.122:1880/dataFab3G33Clima");

    const fab3Bobinaje = datosSector('filtroBobFab3','climaBobinajeFab3','tempBobinajeFab3','humBobinajeFab3',"http://192.168.3.122:1880/dataFab3BobinajeClima");

    const fab1Color = datosSector('filtroColorFab1','climaColorFab1','tempColorFab1','humColorFab1',"http://192.168.3.122:1880/dataFab1ColorClima");

    const fab1Peinadoras = datosSector('filtroPrepFab1','climaPeinadorasFab1','tempPeiFab1','humPeiFab1',"http://192.168.3.122:1880/dataFab1PeinadorasClima");
    
    const fab1Continuas1 = datosSector('filtroContinuasFab1','climaContinuasFab1-1','tempContFab1-1','humContFab1-1',"http://192.168.3.122:1880/dataFab1ContinuasClima");

    const fab1Continuas2 = datosSector('filtroContinuasFab1','climaContinuasFab1-2','tempContFab1-2','humContFab1-2',"http://192.168.3.122:1880/dataFab1Continuas2Clima");

    const fab1Vortex = datosSector('filtroContinuasFab1','climaVortexFab1','tempVortexFab1','humVortexFab1',"http://192.168.3.122:1880/dataFab1VortexClima");
}

actualizarDatos();

setInterval(actualizarDatos, 60000);
