//iniciarJuego
const sectionReiniciar = document.getElementById("reiniciar")
const botonMascotaJugador = document.getElementById("boton_mascota") 
const botonFuego = document.getElementById("boton_fuego")
const botonAgua  = document.getElementById("boton_agua")
const botonTierra = document.getElementById("boton_tierra")
const botonReiniciar = document.getElementById("boton_reiniciar")

//seleccionarMascotaJugador
const sectionSeleccionarMascota = document.getElementById("seleccionar_mascota")
const sectionSeleccionarAtaque = document.getElementById("seleccionar_ataque")
const spanMascotaJugador = document.getElementById("mascota_jugador")

//seleccionarMascotaEnemigo
const spanMascotaEnemigo = document.getElementById("mascota_enemigo")

//combate
const spanVidasJugador = document.getElementById("vidas_jugador")
const spanVidasEnemigo = document.getElementById("vidas_enemigo")

//crearMensaje
const sectionMensajes = document.getElementById("mensajes")
const mostrarCajaMensajes = document.getElementById("caja_mensajes")

//crearMensajeFinal
//variables repetidas

const contenedorTarjetas = document.getElementById("contenedor_tarjetas")

let mokepones = []
let ataqueJugador
let ataqueEnemigo
let opcionDeMokepones
let inputCapipepo
let inputHipodoge
let inputRatigueya
let vidasJugador = 3
let vidasEnemigo = 3
let mascotaEnemigo
let mascotaJugador

class Mokepom {
    constructor(nombre, foto, vida){
        this.nombre = nombre
        this.foto =  foto
        this.vida = vida
        this.ataques=[]
    }
}

let hipodoge = new Mokepom("Hipodoge", "./assets/hipodoge.png", 5) 

let capipepo = new Mokepom("Capipepo", "./assets/capipepo.png", 5) 

let ratigueya = new Mokepom("Ratigueya", "./assets/ratigueya.png", 5) 

hipodoge.ataques.push(
    {nombre: "💧", id: "boton_agua"},
    {nombre: "💧", id: "boton_agua"},
    {nombre: "💧", id: "boton_agua"},
    {nombre: "🔥", id: "boton_fuego"},
    {nombre: "🌱", id: "boton_tierra"},
)
capipepo.ataques.push(
    {nombre: "🌱", id: "boton_tierra"},
    {nombre: "🌱", id: "boton_tierra"},
    {nombre: "🌱", id: "boton_tierra"},
    {nombre: "🔥", id: "boton_fuego"},
    {nombre: "💧", id: "boton_agua"},
)
ratigueya.ataques.push(
    {nombre: "🔥", id: "boton_fuego"},
    {nombre: "🔥", id: "boton_fuego"},
    {nombre: "🔥", id: "boton_fuego"},
    {nombre: "💧", id: "boton_agua"},
    {nombre: "🌱", id: "boton_tierra"},
)

mokepones.push(hipodoge, capipepo, ratigueya)

function iniciarJuego(){    
    sectionReiniciar.style.display="none"

    mokepones.forEach((mokepon)=>{
        opcionDeMokepones = `
        <input type="radio" name="mascota" id="${mokepon.nombre}" />
        <label class="tarjeta_de_mokepon" for="${mokepon.nombre}">
            <p>${mokepon.nombre}</p>
            <img src="${mokepon.foto}" alt="${mokepon.nombre}">
        </label>
        `
    
    contenedorTarjetas.innerHTML += opcionDeMokepones

    inputCapipepo = document.getElementById("Capipepo")
    inputHipodoge = document.getElementById("Hipodoge")
    inputRatigueya = document.getElementById("Ratigueya")
    })


    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador)

    botonFuego.addEventListener("click", ataqueFuego)

    botonAgua.addEventListener("click", ataqueAgua)

    botonTierra.addEventListener("click", ataqueTierra)

    botonReiniciar.addEventListener("click", reiniciarJuego)
}

function seleccionarMascotaJugador(){
    sectionSeleccionarMascota.style.display="none"

    sectionSeleccionarAtaque.style.display="flex"

    if(inputHipodoge.checked){
        spanMascotaJugador.innerHTML = inputHipodoge.id
        mascotaJugador = inputHipodoge.id
    } else if(inputCapipepo.checked){
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascotaJugador = inputCapipepo.id
    } else if(inputRatigueya.checked){
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotaJugador = inputRatigueya.id
    } else{
        alert("Selecciona una mascota")
        location.reload()
    }

    extraerAtaques(mascotaJugador)
    seleccionarMascotaEnemigo()
}

function extraerAtaques(mascotaJugador){
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre){
            ataques = mokepones[i].ataques
        }
    }
    mostrarAtaques(ataques)
}

function seleccionarMascotaEnemigo(){
    let mascotaAleatoria = aleatorio(0,mokepones.length -1)

    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatoria].nombre
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
    let parrafoMascotaJugador = document.createElement("p")
    parrafoMascotaJugador.innerHTML = "Tu " + mascotaJugador + " atacó con " + ataqueJugador
    
    let parrafoMascotaEnemigo = document.createElement("p")
    parrafoMascotaEnemigo.innerHTML = spanMascotaEnemigo.innerHTML + " del enemigo atacó con " + ataqueEnemigo

    let  parrafoResultado = document.createElement("p")
    parrafoResultado.innerHTML = resultado

    let separacion =  document.createElement("p")
    separacion.innerHTML = "--------------------------------------------"

    let separacion2 =  document.createElement("p")
    separacion2.innerHTML = "--------------------------------------------"

    sectionMensajes.appendChild(separacion2)
    sectionMensajes.appendChild(parrafoResultado)
    sectionMensajes.appendChild(parrafoMascotaEnemigo)
    sectionMensajes.appendChild(parrafoMascotaJugador)
    sectionMensajes.appendChild(separacion)

    mostrarCajaMensajes.style.display="revert"
}

function crearMensajeFinal(resultadoCombate){
    alert(resultadoCombate)

    botonFuego.disabled = true

    botonAgua.disabled = true

    botonTierra.disabled = true

    sectionReiniciar.style.display="flex"
}

function reiniciarJuego(){
    location.reload()
}

function aleatorio(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}

window.addEventListener("load",iniciarJuego)
