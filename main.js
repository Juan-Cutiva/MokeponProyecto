//iniciarJuego
const sectionReiniciar = document.getElementById("reiniciar")
const botonMascotaJugador = document.getElementById("boton_mascota") 
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
const contenedorAtaques = document.getElementById("contenedor_ataques")

let mokepones = []
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDeMokepones
let inputCapipepo
let inputHipodoge
let inputRatigueya
let vidasJugador = 3
let vidasEnemigo = 3
let victoriasJugador = 0
let victoriasEnemigo = 0
let ataquesMokepon
let ataquesMokeponEnemigo
let botonFuego
let botonAgua
let botonTierra
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
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
    {nombre: "AGUA💧", id: "boton_agua"},
    {nombre: "AGUA💧", id: "boton_agua"},
    {nombre: "AGUA💧", id: "boton_agua"},
    {nombre: "FUEGO🔥", id: "boton_fuego"},
    {nombre: "TIERRA🌱", id: "boton_tierra"},
)
capipepo.ataques.push(
    {nombre: "TIERRA🌱", id: "boton_tierra"},
    {nombre: "TIERRA🌱", id: "boton_tierra"},
    {nombre: "TIERRA🌱", id: "boton_tierra"},
    {nombre: "FUEGO🔥", id: "boton_fuego"},
    {nombre: "AGUA💧", id: "boton_agua"},
)
ratigueya.ataques.push(
    {nombre: "FUEGO🔥", id: "boton_fuego"},
    {nombre: "FUEGO🔥", id: "boton_fuego"},
    {nombre: "FUEGO🔥", id: "boton_fuego"},
    {nombre: "AGUA💧", id: "boton_agua"},
    {nombre: "TIERRA🌱", id: "boton_tierra"},
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

function mostrarAtaques(ataques){
    ataques.forEach((ataque) =>{
        ataquesMokepon = `<button class="botones_ataques BAtaque" id=${ataque.id}>${ataque.nombre}</button>`
        contenedorAtaques.innerHTML += ataquesMokepon

    }) 
    botonFuego = document.getElementById("boton_fuego")
    botonAgua  = document.getElementById("boton_agua")
    botonTierra = document.getElementById("boton_tierra")
    botones = document.querySelectorAll(".BAtaque")
}

function secuenciaAtaque(){
    botones.forEach((boton) => {
        boton.addEventListener("click", (e) =>{
            if(e.target.textContent === "FUEGO🔥"){
                ataqueJugador.push("FUEGO🔥")
                boton.style.background = "rgba(255, 136, 17, 0.76)"
                boton.disabled = true
            } else if(e.target.textContent ==="AGUA💧"){
                ataqueJugador.push("AGUA💧")
                boton.style.background = "rgba(255, 136, 17, 0.76)"
                boton.disabled = true
            } else if(e.target.textContent ==="TIERRA🌱"){
                ataqueJugador.push("TIERRA🌱")
                boton.style.background = "rgba(255, 136, 17, 0.76)"
                boton.disabled = true
            }
            ataqueAleatorioEnemigo()
        })
    })
}

function seleccionarMascotaEnemigo(){
    let mascotaAleatoria = aleatorio(0,mokepones.length -1)

    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatoria].nombre
    ataquesMokeponEnemigo = mokepones[mascotaAleatoria].ataques
    secuenciaAtaque()
}

function ataqueAleatorioEnemigo(){
    let ataqueAleatorio = aleatorio(0,ataquesMokeponEnemigo.length -1)
    
    if(ataqueAleatorio == 0||ataqueAleatorio == 1){
        ataqueEnemigo.push("FUEGO🔥")
    } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4){
        ataqueEnemigo.push("AGUA💧")
    } else {
        ataqueEnemigo.push("TIERRA🌱")
    }
    iniciarPelea()
}
function iniciarPelea(){
    if (ataqueJugador.length === 5){
        combate()
    }
}

function iAmbosOponentes(jugador, enemigo){
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate(){
    
    for (let i = 0; i < ataqueJugador.length; i++) {
        if(ataqueJugador[i] === ataqueEnemigo[i]){
            iAmbosOponentes(i, i)
            crearMensaje("EMPATE")
        } else if(ataqueJugador[i] == "FUEGO🔥" && ataqueEnemigo[i] == "TIERRA🌱" || ataqueJugador[i] == "AGUA💧" && ataqueEnemigo[i] == "FUEGO🔥" || ataqueJugador[i] == "TIERRA🌱" && ataqueEnemigo[i] == "AGUA💧"){
            iAmbosOponentes(i, i)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } else {
            iAmbosOponentes(i, i)
            crearMensaje("PERDISTE")
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
        
    }
    revisarVidas()
}

function revisarVidas(){
    if(victoriasEnemigo === victoriasJugador){
        crearMensajeFinal("Empate")
    }else if(victoriasJugador > victoriasEnemigo){
        crearMensajeFinal("¡Has ganado el juego!")
    } else{
        crearMensajeFinal( "¡Perdiste el juego!")
    }
}

function crearMensaje(resultado){
    let parrafoMascotaJugador = document.createElement("p")
    parrafoMascotaJugador.innerHTML = "Tu " + mascotaJugador + " atacó con " + indexAtaqueJugador
    
    let parrafoMascotaEnemigo = document.createElement("p")
    parrafoMascotaEnemigo.innerHTML = spanMascotaEnemigo.innerHTML + " del enemigo atacó con " + indexAtaqueEnemigo

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
    
    sectionReiniciar.style.display="flex"
}

function crearMensajeFinal(resultadoCombate){
    alert(resultadoCombate)

    deshabilitarBotonesAtaque()
}

function reiniciarJuego(){
    location.reload()
}

function aleatorio(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}

window.addEventListener("load",iniciarJuego)
