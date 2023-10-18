
let fab6prep = new XMLHttpRequest();
let fab6cont = new XMLHttpRequest();
let fab6bob = new XMLHttpRequest();

let alert = '#BD1F1F';
let ok = '#2bc12cff';

let estadoFiltroFab6;
let estadoClimaFab6;


let estadoFiltroFab6cont;
let estadoClimaFab6cont;


let estadoFiltrofab6bob;
let estadoClimafab6bob;
let infoClimafab6bob;



function actualizarDatos() {
    fab6prep.onreadystatechange = function () {
        let infoTempFab6prep;
        let infoHumFab6prep;
        let buttomFiltro = document.getElementById('filtroPrepFab6');
        let buttonClima = document.getElementById('climaPrepFab6');

        if (fab6prep.readyState == XMLHttpRequest.DONE) {
            if (fab6prep.status == 200) {
                console.log((fab6prep.responseText));
                datos = JSON.parse(fab6prep.responseText);
                date = new Date(datos.fecha).toDateString();
                estadoFiltroFab6 = datos.estado;
                estadoClimaFab6 = datos.estadoClima;
                infoTempFab6prep = `T: ${parseInt(datos.temperatura)}°C`;
                infoHumFab6prep = `H: ${parseInt(datos.humedad)}%`;
                //infoClimaFab6prep = "T: " + datos.temperatura + "H: " + datos.humedad;

                //document.getElementById('fechaMod').textContent = fecha;
                document.getElementById('tempPrepFab6').textContent = infoTempFab6prep;
                document.getElementById('humPrepFab6').textContent = infoHumFab6prep;

                if (estadoFiltroFab6 === 1){
                    buttomFiltro.style.fill = ok;
                } 
                    else {
                        buttomFiltro.style.fill = alert;
                    }
                if (estadoClimaFab6 === 1){
                    buttonClima.style.fill = ok;
                }
                    else {
                        buttonClima.style.fill = alert;
                    }
            }
            else {
                console.log('error', fab6prep);
            }
        }
    }



    fab6prep.open("GET", "http://192.168.3.122:1880/dataFab6prepClima", true);
    fab6prep.send();



    fab6cont.onreadystatechange = function () {
        let infoTempfab6cont;
        let infoHumfab6cont;
        let buttomFiltro = document.getElementById('filtroContFab6');
        let buttomClima = document.getElementById('climaContFab6');

        if (fab6cont.readyState == XMLHttpRequest.DONE) {
            if (fab6cont.status == 200) {
                console.log((fab6cont.responseText));
                let    datosContFab6 = JSON.parse(fab6cont.responseText);
                let    date = new Date(datosContFab6.fecha).toDateString();
                estadoFiltroFab6cont = datosContFab6.estado;
                estadoClimaFab6cont = datosContFab6.estadoClima;
                infoTempfab6cont = `T: ${parseInt(datosContFab6.temperatura)}°C`;
                infoHumfab6cont = `H: ${parseInt(datosContFab6.humedad)}%`;
                //infoClimafab6cont = "T: " + datos.temperatura + "H: " + datos.humedad;

                document.getElementById('tempContFab6').textContent = infoTempfab6cont;
                document.getElementById('humContFab6').textContent = infoHumfab6cont;

                if (estadoFiltroFab6cont === 1) {
                    buttomFiltro.style.fill = ok;
                }
                    else {
                        buttomFiltro.style.fill = alert;
                    }
                if (estadoClimaFab6cont === 1) {
                    buttomClima.style.fill = ok;
                }
                    else {
                        buttomClima.style.fill = alert;
                    }
            }
            else {
                console.log('error', fab6cont);
            }
        }
    }

    fab6cont.open("GET", "http://192.168.3.122:1880/datafab6contClima", true);
    fab6cont.send();


    fab6bob.onreadystatechange = function () {
        let infoTempfab6bob;
        let infoHumfab6bob;
        let buttomFiltro = document.getElementById('filtroBobFab6');
        let buttonClima = document.getElementById('climaBobFab6');

        if (fab6bob.readyState == XMLHttpRequest.DONE) {
            if (fab6bob.status == 200) {
                console.log((fab6bob.responseText));
                let    datosBobFab6 = JSON.parse(fab6bob.responseText);
                let    date = new Date(datosBobFab6.fecha).toDateString();
                estadoFiltrofab6bob = datosBobFab6.estado;
                estadoClimafab6bob = datosBobFab6.estadoClima;
                infoTempfab6bob = `T: ${parseInt(datosBobFab6.temperatura)}°C `;
                infoHumfab6bob = `H: ${parseInt(datosBobFab6.humedad)}%`

                //document.getElementById('fechaMod').textContent = fecha;
                document.getElementById('tempBobFab6').textContent = infoTempfab6bob;
                document.getElementById('humBobFab6').textContent = infoHumfab6bob;

                if (estadoFiltrofab6bob === 1) {
                    buttomFiltro.style.fill = ok;
                }
                    else {
                        buttomFiltro.style.fill = alert;
                    }
                if (estadoClimafab6bob === 1) {
                    buttonClima.style.fill = ok;
                }
                    else {
                        buttonClima.style.fill = alert;
                    }
            }
            else {
                console.log('error', fab6bob);
            }
        }
    }

    fab6bob.open("GET", "http://192.168.3.122:1880/datafab6bobClima", true);
    fab6bob.send();
}
actualizarDatos();
/*
function actualizarPagina() {
    location.reload(true); // Recarga la página forzando la recarga desde el servidor
  }*/

  setInterval(actualizarDatos, 60000);