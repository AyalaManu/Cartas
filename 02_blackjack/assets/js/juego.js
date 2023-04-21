const miModulo = (() => {

    'use strick'

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
        especiales = ['A', 'J', 'Q', 'K'];

    let = puntosJugadores = [];

    //referencias HTML
    const btnPedir = document.querySelector('#btnPedir'),
        btnDetener = document.querySelector('#btnDetener'),
        btnNuevo = document.querySelector('#btnNuevo'),
        btnPedir2 = document.querySelector('#btnPedir2');

    const divCartasJugadores = document.querySelectorAll('.divCartas , .divCartas2'),
        puntosHTML = document.querySelectorAll('small');

    const inicializarJuego = (numJugadores = 3) => {

        deck = crearDeck();
        puntosJugadores = [];

        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }

        puntosHTML.forEach(elem => elem.innerText = 0);
        divCartasJugadores.forEach(elem => elem.innerHTML = '');
        btnDetener.disabled = false;
        btnPedir.disabled = false;
    }


    //crea un deck
    const crearDeck = () => {
        deck = [];
        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo);
            }
        }
        for (let tipo of tipos) {
            for (let esp of especiales) {
                deck.push(esp + tipo);
            }
        }

        return _.shuffle(deck);
    }


    //esta funcion toma una carta
    const pedirCarta = () => {

        if (deck.length == 0) {
            throw 'no hay cartas en el deck';
        }

        return deck.pop();

    }

    //pide una carta
    const valorCarta = (carta) => {

        const valor = carta.substring(0, carta.length - 1);
        return (isNaN(valor)) ?
            (valor === 'A') ? 11 : 10
            : valor * 1;
    }

    // turno de la computadora
    const acumularPuntos = (carta, turno) => {

        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntosHTML[turno].innerText = puntosJugadores[turno];

        return puntosJugadores[turno];
    }

    const crearCarta = (carta, turno) => {

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;

        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);
    }

    const determinarGanador = () => {

        const [puntosMinimos, puntosComputadora] = puntosJugadores;

        setTimeout(() => {

            if (puntosMinimos === puntosComputadora) {
                alert('Empate');
            }
            else if (puntosMinimos > puntosComputadora && puntosMinimos <= 21 || puntosComputadora > 21) {
                alert('jugador1 gano');
            }
            else if (puntosMinimos < puntosComputadora && puntosComputadora <= 21 || puntosMinimos > 21) {
                alert('computadora gano');
            }
        }, 100);
    }

    const turnoComputadora = (puntosMinimos) => {
        let puntosComputadora = 0;
        do {
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1);

            if (puntosMinimos > 21) {
                break;
            }

        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));
        determinarGanador();
    }


    //eventos
    btnPedir.addEventListener('click', () => {

        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0);

        crearCarta(carta, 0);

        if (puntosJugador > 21) {
            console.warn('perdistes')
            btnPedir.disabled = true;
            btnDetener.disabled = false;
            btnPedir2.disabled = false;
            turnoComputadora(puntosJugador);

        } else if (puntosJugador === 21) {
            btnPedir.disabled = true;
            btnDetener.disabled = false;
            btnPedir2.disabled = false;
            console.warn('21 genial');
            turnoComputadora(puntosJugador);
        }

    });

    btnPedir2.addEventListener('click', () => {
        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 1);
        crearCarta(carta, 1);
    
        if (puntosJugador > 21) {
            console.warn('perdiste');
            btnDetener.disabled = true;
            btnPedir2.disabled = true;
            turnoComputadora();
        } else if (puntosJugador === 21) {
            console.warn('21 genial');
            btnDetener.disabled = true;
            btnPedir2.disabled = true;
            turnoComputadora();
        }
    });

    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = false;
        btnDetener.disabled = false;
        btnPedir2.disabled = false;
    });

    return {
        nuevoJuego: inicializarJuego
    };

})();







