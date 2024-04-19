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

const contenedorTarjetas = document.getElementById("contenedor_tarjetas")
const contenedorAtaques = document.getElementById("contenedor_ataques")

const sectionVerMapa = document.getElementById("ver_mapa")
const mapa = document.getElementById("mapa")

let jugadorId = null
let enemigoId = null
let mokepones = []
let mokeponesEnemigos = []
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDeMokepones
let inputCapipepo
let inputHipodoge
let inputRatigueya
let mascotaJugadorObjeto
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
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = "./assets/mokemap.png"
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth -20

const anchoMaximoDelMapa = 550
    if (anchoDelMapa > anchoMaximoDelMapa){
        anchoDelMapa = anchoMaximoDelMapa -20
    }

alturaQueBuscamos = anchoDelMapa * 600/800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos 

class Mokepom {
    constructor(nombre, foto, vida, fotoMapa, id = null){
        this.id = id
        this.nombre = nombre
        this.foto =  foto
        this.vida = vida
        this.ataques=[]
        this.ancho=60
        this.alto=60
        this.x= aleatorio(0, mapa.width - this.ancho)
        this.y= aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarMokepon(){
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho, 
            this.alto,
        )
    }
}

let hipodoge = new Mokepom("Hipodoge", "./assets/hipodoge.png", 5,"./assets/hipodoge_mini.png") 

let capipepo = new Mokepom("Capipepo", "./assets/capipepo.png", 5,"./assets/capipepo_mini.png") 

let ratigueya = new Mokepom("Ratigueya", "./assets/ratigueya.png", 5,"./assets/ratigueya_mini.png") 

const HIPODOGE_ATAQUES = [
    {nombre: "AGUA💧", id: "boton_agua"},
    {nombre: "AGUA💧", id: "boton_agua"},
    {nombre: "AGUA💧", id: "boton_agua"},
    {nombre: "FUEGO🔥", id: "boton_fuego"},
    {nombre: "TIERRA🌱", id: "boton_tierra"},
]

const CAPIPEPO_ATAQUES = [
    {nombre: "TIERRA🌱", id: "boton_tierra"},
    {nombre: "TIERRA🌱", id: "boton_tierra"},
    {nombre: "TIERRA🌱", id: "boton_tierra"},
    {nombre: "FUEGO🔥", id: "boton_fuego"},
    {nombre: "AGUA💧", id: "boton_agua"},
]

const RATIGUEYA_ATAQUES = [
    {nombre: "FUEGO🔥", id: "boton_fuego"},
    {nombre: "FUEGO🔥", id: "boton_fuego"},
    {nombre: "FUEGO🔥", id: "boton_fuego"},
    {nombre: "AGUA💧", id: "boton_agua"},
    {nombre: "TIERRA🌱", id: "boton_tierra"},
]

hipodoge.ataques.push(...HIPODOGE_ATAQUES)

capipepo.ataques.push(...CAPIPEPO_ATAQUES)

ratigueya.ataques.push(...RATIGUEYA_ATAQUES)

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

    unirseAlJuego()
}

function unirseAlJuego(){
    fetch("http://localhost:8080/unirse")
        .then(function (res){
            if(res.ok){
                res.text()
                    .then(function (respuesta){
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            }
        })
}

function seleccionarMascotaJugador(){
    sectionSeleccionarMascota.style.display="none"
    //#region Lienzo
    //#endregion
    
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

    seleccionarMokepon(mascotaJugador)

    extraerAtaques(mascotaJugador)
    sectionVerMapa.style.display="flex"
    iniciarMapa()
}

function seleccionarMokepon(mascotaJugador){
    fetch(`http://localhost:8080/mokepon/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    })
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
            if(ataqueJugador.length === 5){
                enviarAtaques()
            }
        })
    })
}

function enviarAtaques(){
    fetch(`http://localhost:8080/mokepon/${jugadorId}/ataques`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })
}

function seleccionarMascotaEnemigo(enemigo){
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques
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

}

function reiniciarJuego(){
    location.reload()
}

function aleatorio(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function pintarCanvas(){
    
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mascotaJugadorObjeto.pintarMokepon()

    enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)

    mokeponesEnemigos.forEach(function(mokepon){
        mokepon.pintarMokepon()
        if(mascotaJugadorObjeto.velocidadX !== 0 || mascotaJugadorObjeto.velocidadY !== 0){
        revisarColision(mokepon)
        }
    })
    
    
    //     revisarColision(hipodogeEnemigo)
    //     revisarColision(capipepoEnemigo)
    //     revisarColision(ratigueyaEnemigo)
    // }
}

function enviarPosicion(x, y){
    fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`,{
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(function(res){
        if (res.ok){
            res.json()
                .then(function({enemigos}){
                    console.log(enemigos)
                    mokeponesEnemigos = enemigos.map(function(enemigo){
                        let mokeponEnemigo = null
                        const mokeponNombre = enemigo.mokepon.nombre || ""
                        if (mokeponNombre === "Hipodoge"){
                            mokeponEnemigo = new Mokepom("Hipodoge", "./assets/hipodoge.png", 5,"./assets/hipodoge_mini.png", enemigo.id)
                        } else if (mokeponNombre === "Capipepo" ){
                            mokeponEnemigo = new Mokepom("Capipepo", "./assets/capipepo.png", 5,"./assets/capipepo_mini.png", enemigo.id)
                        } else if (mokeponNombre === "Ratigueya"){
                            mokeponEnemigo = new Mokepom("Ratigueya", "./assets/ratigueya.png", 5,"./assets/ratigueya_mini.png", enemigo.id)
                        }
                        mokeponEnemigo.x = enemigo.x
                        mokeponEnemigo.y = enemigo.y

                        return mokeponEnemigo
                    })
                })
        }
    })
}

function moverDerecha(){
    mascotaJugadorObjeto.velocidadX = 5
}
function moverIzquierda(){
    mascotaJugadorObjeto.velocidadX = -5
}
function moverAbajo(){
    mascotaJugadorObjeto.velocidadY = 5
}
function moverArriba(){
    mascotaJugadorObjeto.velocidadY = -5
}
function detenerMovimiento(){
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function teclaPresionada(event){
    switch(event.key){
        case "ArrowUp":
            moverArriba()
            break
        case "ArrowDown":
            moverAbajo()
            break
        case "ArrowLeft":
            moverIzquierda()
            break
        case "ArrowRight":
            moverDerecha()
            break
        case "w":
            moverArriba()
            break
        case "s":
            moverAbajo()
            break
        case "a":
            moverIzquierda()
            break
        case "d":
            moverDerecha()
            break
        case "W":
            moverArriba()
            break
        case "S":
            moverAbajo()
            break
        case "A":
            moverIzquierda()
            break
        case "D":
            moverDerecha()
            break
        default:
            break
    }
}

function iniciarMapa(){
    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
    intervalo = setInterval(pintarCanvas, 50)
    
    window.addEventListener("keydown", teclaPresionada)
    window.addEventListener("keyup", detenerMovimiento)
}   

function obtenerObjetoMascota(){
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre){
            return mokepones[i]
        }
    }
}

function revisarColision(enemigo){
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = mascotaJugadorObjeto.y
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = mascotaJugadorObjeto.x
    
    if(abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ){
        return
    }
    detenerMovimiento()
    clearInterval(intervalo)
    enemigoId = enemigo.id
    sectionSeleccionarAtaque.style.display="flex"   
    sectionVerMapa.style.display="none"
    seleccionarMascotaEnemigo(enemigo)
}

window.addEventListener("load",iniciarJuego)
