var ELJSON;
const modificadorDeHora = 0; //el número representa la cantidad de horas adelante o atrás que quieres simular que es, a partir de la hora en méxico (-7 GMT).
var contadorDeToques = 0;
var primeraFecha = null;
var ultimaFecha = obtenerFechaDeHoy(modificadorDeHora);
var comboDeFechasLlenado = false;
var ip = "0.0.0.0";

document.addEventListener("DOMContentLoaded", async() => {
    await fetch('Objetos/EL JSON.json').then((response) => response.json()).then((JSONData) => {
        ELJSON = JSONData;
        fecha = obtenerFechaDeHoy(modificadorDeHora); //el número representa la cantidad de horas adelante o atrás que quieres simular que es, a partir de la hora en méxico (-7 GMT).
        // Si hoy es día 08 del mes...
        if (fecha.split("/")[0] == "08") {
            hoyEsUnDíaEspecial();
        }
        // alert(`mensaje del dia = ${fecha.split("/")[0]}/${fecha.split("/")[1]}/${fecha.split("/")[2]}: ultima fecha: ${ultimaFecha}`);
        // obtenerElMensajeDelDía("08", "03", "2024");
        obtenerElMensajeDelDía(fecha.split("/")[0], fecha.split("/")[1], fecha.split("/")[2]);
        primeraFecha = Object.keys(ELJSON[Object.keys(ELJSON)[0]][Object.keys(ELJSON[Object.keys(ELJSON)[0]])[0]])[0] + "/" + Object.keys(ELJSON[Object.keys(ELJSON)[0]])[0] + "/" + Object.keys(ELJSON)[0];
    });
});

document.querySelector('.envelope').addEventListener('click', function () {
    if (document.querySelector('.letter').classList.contains('letter--open')) {
        document.querySelector('.letter').classList.remove('letter--open');
        document.querySelector('.letter').classList.add('letter--close');
        setTimeout(function () {
            document.querySelector('.letter').classList.remove('letter--close');
        }, 600);
    } else {
        document.querySelector('.letter').classList.remove('letter--close');
        document.querySelector('.letter').classList.add('letter--open');
    }
});

document.querySelector('.paper-close').addEventListener('click', function () {
    document.querySelector('.letter').classList.remove('letter--open');
    document.querySelector('.letter').classList.add('letter--close');
    setTimeout(function () {
        document.querySelector('.letter').classList.remove('letter--close');
    }, 600);
});

function obtenerFechaDeHoy(modificadorDeHora = 0) {
    var d = new Date();

    // Convertir a milisegundos
    // Restarle los milisegundos del desface de la hora local
    // obtener la fecha UTC en milisegundos
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);

    // Crear una nueva fecha para la ciudad de Culiacán
    // usando el desface horario dado (-7)
    var nd = new Date(utc + (3600000*(-7 + modificadorDeHora)));
    let fecha = (('0' + (nd).getDate()).slice(-2) + "/" + ('0' + ((nd).getMonth() + 1)).slice(-2) + "/" + (nd).getFullYear());
    return fecha;
}

function obtenerElMensajeDelDía(día = ('0' + (new Date()).getDate()).slice(-2), mes = ('0' + ((new Date()).getMonth() + 1)).slice(-2), año = (new Date()).getFullYear()) {
    if (ELJSON[año][mes][día] == undefined || ELJSON[año][mes][día] == "") {
        document.getElementsByTagName("contenido")[0].innerHTML = "Hola. Si ves este mensaje, significa que olvidé escribir un mensajito hoy 😅. Aún así, espero que tengas un lindo día ❤";
    } else {
        document.getElementsByTagName("contenido")[0].innerHTML = ELJSON[`${año}`][`${mes}`][`${día}`];
    }
    
    document.getElementsByClassName("fecha")[0].innerHTML = `${día}/${mes}/${año}`;
    numeroDeCorazon = 0;
    while (numeroDeCorazon < 1 || numeroDeCorazon > 16) {
        numeroDeCorazon = Math.round(Math.random() * 100);
    }
    document.getElementById("corazon_animado").setAttribute("src", `Objetos/Imagenes/Corazones/Corazón ${numeroDeCorazon}.gif`);
    $("details").css("display", "none");
    setTimeout(() => {
        $.post('https://0hbbj4q2-4000.usw3.devtunnels.ms/PHP/mensajes.php', { ip: `${ip}`, fecha: `${día}/${mes}/${año}` }, function (response) { });
    }, 3000);
}

$(document).ready(() => {
    $.getJSON("https://ipinfo.io",
        function (response) {
            ip = response.ip ?? "0.0.0.0";
            $.post('https://0hbbj4q2-4000.usw3.devtunnels.ms/PHP/index.php', { ip: `${response.ip}`}, function (response) { });
        }, "jsonp");
});

$("#corazon_animado").on("click", () => {
    contadorDeToques++;
    if (contadorDeToques < 3) {
        return;
    }
    if (contadorDeToques == 3 && !comboDeFechasLlenado) {
        llenarComboHastaFecha();
        comboDeFechasLlenado = true;
    }
    
    $("details").css("display", "block");
});

function llenarComboHastaFecha(fecha = ultimaFecha) {
    ultimoDía = fecha.split("/")[0]
    ultimoMes = fecha.split("/")[1]
    ultimoAño = fecha.split("/")[2]
    let años = Object.keys(ELJSON);
    let añosInteger = new Array();
    for (let añosL2 = 0; añosL2 < años.length; añosL2++) {
        añosInteger.push(parseInt(años[añosL2]));
    }
    let añoMásChico = Math.min(...añosInteger);
    for (let añoFor = añoMásChico; añoFor < añoMásChico + Object.keys(ELJSON).length; añoFor++) {
        if (parseInt(ultimoAño) < añoFor) {
            break;
        }
        let año = ('0' + (añoFor)).slice(-4);
        let meses = Object.keys(ELJSON[año]);
        let mesesInteger = new Array();
        for (let mesesL2 = 0; mesesL2 < Object.keys(meses).length; mesesL2++) {
            mesesInteger.push(parseInt(meses[mesesL2]));
        }
        let mesMásChico = Math.min(...mesesInteger);
        for (let mesFor = mesMásChico; mesFor < mesMásChico + Object.keys(meses).length; mesFor++) {
            if (parseInt(ultimoMes) < mesFor && parseInt(ultimoAño) <= añoFor) {
                break;
            }
            let mes = ('0' + (mesFor)).slice(-2);
            let días = Object.keys(ELJSON[año][mes]);
            let díasInteger = new Array();
            for (let díasL2 = 0; díasL2 < Object.keys(días).length; díasL2++) {
                díasInteger.push(parseInt(días[díasL2]));
            }
            let díaMásChico = Math.min(...díasInteger);
            for (let díaFor = díaMásChico; díaFor < díaMásChico + Object.keys(días).length; díaFor++) {
                if (parseInt(ultimoDía) < díaFor && parseInt(ultimoMes) <= mesFor && parseInt(ultimoAño) <= añoFor) {
                    break;
                }
                let día = ('0' + (díaFor)).slice(-2);
                // alert("Fecha: " + día + "/" + mes + "/" + año + "? " + (parseInt(ultimoDía) < díaFor && parseInt(ultimoMes) < mesFor && parseInt(ultimoAño) < añoFor));
                if (ELJSON[año][mes][día] == undefined || ELJSON[año][mes][día] == "") {
                    continue;
                }
                $("#fechas").append(`<li onclick = obtenerElMensajeDelDía("${día}","${mes}","${año}")>${día}/${mes}/${año}</li>`);
            }
        }
    }
    $.post('https://0hbbj4q2-4000.usw3.devtunnels.ms/PHP/secreto.php', { ip: `${ip}` }, function (response) { });
}

function hoyEsUnDíaEspecial() {
    document.documentElement.style.setProperty('--color_envoltura', getComputedStyle(document.documentElement).getPropertyValue('--color_envoltura_dia_especial'));
    document.documentElement.style.setProperty('--color_papel', getComputedStyle(document.documentElement).getPropertyValue('--color_papel_dia_especial'));
    document.documentElement.style.setProperty('--borde_superior_carta_abierta', getComputedStyle(document.documentElement).getPropertyValue('--borde_superior_carta_abierta_dia_especial'));
    document.documentElement.style.setProperty('--color_bordes_carta', getComputedStyle(document.documentElement).getPropertyValue('--color_bordes_carta_dia_especial'));
    document.documentElement.style.setProperty('--color_fondo', getComputedStyle(document.documentElement).getPropertyValue('--color_fondo_dia_especial'));
    document.documentElement.style.setProperty('--color_texto_de_la_carta', getComputedStyle(document.documentElement).getPropertyValue('--color_texto_de_la_carta_dia_especial'));
    document.documentElement.style.setProperty('--color_sombra_de_texto', getComputedStyle(document.documentElement).getPropertyValue('--color_sombra_de_texto_dia_especial'));
}