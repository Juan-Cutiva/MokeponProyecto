let ataqueJugador
let ataqueEnemigo
let vidasJugador = 3
let vidasEnemigo = 3
let mascotaEnemigo
let mascotaJugador

function iniciarJuago(){    
    let sectionSeleccionarAtaque = document.getElementById("Seleccionar_ataque")
    sectionSeleccionarAtaque.style.display="none"

    let sectionReiniciar = document.getElementById("reiniciar")
    sectionReiniciar.style.display="none"
    
    let botonMascotaJugador = document.getElementById("boton_mascota") 
    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador)

    let botonFuego = document.getElementById("boton_fuego")
    botonFuego.addEventListener("click", ataqueFuego)
    let botonAgua  = document.getElementById("boton_agua")
    botonAgua.addEventListener("click", ataqueAgua)
    let botonTierra = document.getElementById("boton_tierra")
    botonTierra.addEventListener("click", ataqueTierra)

    let botonReiniciar = document.getElementById("boton_reiniciar")
    botonReiniciar.addEventListener("click", reiniciarJuego)
}

function seleccionarMascotaJugador(){
    let sectionSeleccionarMascota = document.getElementById("seleccionar_mascota")
    sectionSeleccionarMascota.style.display="none"

    let sectionSeleccionarAtaque = document.getElementById("Seleccionar_ataque")
    sectionSeleccionarAtaque.style.display="block"
    
    let inputHipodoge = document.getElementById("hipodoge")
    let inputCapipepo = document.getElementById("capipepo")
    let inputRatigueya = document.getElementById("ratigueya")
    let spanMascotaJugador = document.getElementById("mascota_jugador")

    if(inputHipodoge.checked){
        spanMascotaJugador.innerHTML = "Hipodoge"
        mascotaJugador = "Hipodoge"
    } else if(inputCapipepo.checked){
        spanMascotaJugador.innerHTML = "Capipepo"
        mascotaJugador = "Capipepo"
    } else if(inputRatigueya.checked){
        spanMascotaJugador.innerHTML = "Ratigueya"
        mascotaJugador = "Ratigueya"
    } else{
        alert("Selecciona una mascota")
    }
    seleccionarMascotaEnemigo()
    
}

function seleccionarMascotaEnemigo(){
    let mascotaAleatoria = aleatorio(1,3)
    let spanMascotaEnemigo = document.getElementById("mascota_enemigo")

    if (mascotaAleatoria == 1){
        spanMascotaEnemigo.innerHTML = "Hipodogue"
        mascotaEnemigo = "Hipodoge"
    } else if (mascotaAleatoria == 2){
        spanMascotaEnemigo.innerHTML = "Capipepo"
        mascotaEnemigo = "Capipepo"
    } else {
        spanMascotaEnemigo.innerHTML ="Ratigueya"
        mascotaEnemigo = "Ratigueya"
    }
}

function ataqueFuego(){
    ataqueJugador = "FUEGO🔥"
    ataqueAleatorioEnemigo()   
}
function ataqueAgua(){
    ataqueJugador = "AGUA💧"
    ataqueAleatorioEnemigo()
}
function ataqueTierra(){
    ataqueJugador = "TIERRA🌱"
    ataqueAleatorioEnemigo()
}

function ataqueAleatorioEnemigo(){
    let ataqueAleatorio = aleatorio(1,3)
    
    if(ataqueAleatorio == 1){
        ataqueEnemigo = "FUEGO🔥"
    } else if (ataqueAleatorio == 2){
        ataqueEnemigo = "AGUA💧"
    } else {
        ataqueEnemigo = "TIERRA🌱"
    }

    combate()
}

function combate(){
    let spanVidasJugador = document.getElementById("vidas_jugador")
    let spanVidasEnemigo = document.getElementById("vidas_enemigo")
    
    if(ataqueEnemigo == ataqueJugador){
        crearMensaje("EMPATE")
    } else if(ataqueJugador == "FUEGO🔥" && ataqueEnemigo == "TIERRA🌱" || ataqueJugador == "AGUA💧" && ataqueEnemigo == "FUEGO🔥" || ataqueJugador == "TIERRA🌱" && ataqueEnemigo == "AGUA💧"){
        crearMensaje("GANASTE")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else {
        crearMensaje("PERDISTE")
        vidasJugador--
        spanVidasJugador.innerHTML = vidasJugador
    }

    revisarVidas()
}

function revisarVidas(){
    if(vidasEnemigo <= 0){
        crearMensajeFinal("¡Has ganado el juego!")
    } else if(vidasJugador <= 0){
        crearMensajeFinal( "¡Perdiste el juego!")
    }
}

function crearMensaje(resultado){
    let sectionMensajes = document.getElementById("mensajes")
    
    let parrafoMascotaJugador = document.createElement("p")
    parrafoMascotaJugador.innerHTML = "Tu " + mascotaJugador + " atacó con " + ataqueJugador
    
    let parrafoMascotaEnemigo = document.createElement("p")
    parrafoMascotaEnemigo.innerHTML = mascotaEnemigo+ " del enemigo atacó con " + ataqueEnemigo

    let  parrafoResultado = document.createElement("p")
    parrafoResultado.innerHTML = resultado

    sectionMensajes.appendChild(parrafoMascotaJugador)
    sectionMensajes.appendChild(parrafoMascotaEnemigo)
    sectionMensajes.appendChild(parrafoResultado)
}

function crearMensajeFinal(resultadoCombate){
    alert(resultadoCombate)

    let botonFuego = document.getElementById("boton_fuego")
    botonFuego.disabled = true
    let botonAgua  = document.getElementById("boton_agua")
    botonAgua.disabled = true
    let botonTierra = document.getElementById("boton_tierra")
    botonTierra.disabled = true

    let sectionReiniciar = document.getElementById("reiniciar")
    sectionReiniciar.style.display="block"
}

function reiniciarJuego(){
    location.reload()
}

function aleatorio(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}

window.addEventListener("load",iniciarJuago)
