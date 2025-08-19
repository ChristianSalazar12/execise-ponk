const cards = [
    { nombre: 'Shenron', opcion: 'piedra', poder: 10, img: 'https://res.cloudinary.com/dspprxtpr/image/upload/v1755622739/dragpm_mg8kps.gif' },
    { nombre: 'Maestro Roshi', opcion: 'papel', poder: 8, img: 'https://res.cloudinary.com/dspprxtpr/image/upload/v1755622592/maes_l4ijpt.gif' },
    { nombre: 'Bills', opcion: 'tijera', poder: 9, img: 'https://res.cloudinary.com/dspprxtpr/image/upload/v1755622688/bill_dqdpqw.gif' },
    { nombre: 'Piccolo', opcion: 'lagarto', poder: 7, img: 'https://res.cloudinary.com/dspprxtpr/image/upload/v1755622400/Piccolo_nkvkvt.gif' },
    { nombre: 'Vegeta', opcion: 'spock', poder: 10, img: 'https://res.cloudinary.com/dspprxtpr/image/upload/v1755622303/veget_qg0bjg.gif' },
];
const rules = {
    piedra: ['tijera', 'lagarto'],
    papel: ['piedra', 'spock'],
    tijera: ['papel', 'lagarto'],
    lagarto: ['spock', 'papel'],
    spock: ['tijera', 'piedra'],
};
// Estado del juego
let userLives = 3;
let rivalLives = 3;
let userWins = 0;
let userLosses = 0;
let rivalWins = 0;
let rivalLosses = 0;
function getRivalCard() {
    return cards[Math.floor(Math.random() * cards.length)];
}
function updateCounters() {
    document.getElementById('user-lives').textContent = userLives.toString();
    document.getElementById('user-wins').textContent = userWins.toString();
    document.getElementById('user-losses').textContent = userLosses.toString();
    document.getElementById('rival-lives').textContent = rivalLives.toString();
    document.getElementById('rival-wins').textContent = rivalWins.toString();
    document.getElementById('rival-losses').textContent = rivalLosses.toString();
}
function resetGame() {
    userLives = 3;
    rivalLives = 3;
    userWins = 0;
    userLosses = 0;
    rivalWins = 0;
    rivalLosses = 0;
    updateCounters();
    const resultDiv = document.getElementById('game-result');
    if (resultDiv)
        resultDiv.innerHTML = '<strong>¡Nuevo juego! Selecciona una carta para comenzar.</strong>';
    // Limpiar cartas seleccionadas
    const userCardDiv = document.getElementById('user-selected-card');
    const rivalCardDiv = document.getElementById('rival-selected-card');
    if (userCardDiv)
        userCardDiv.innerHTML = '';
    if (rivalCardDiv)
        rivalCardDiv.innerHTML = '';
}
function renderSelectedCard(card, containerId, label) {
    const container = document.getElementById(containerId);
    if (!container)
        return;
    container.innerHTML = `
        <div class="card" style="background:#23305a; min-width:220px; min-height:320px; align-items:center;">
            <h3 style="color:#fff;">${label}</h3>
            <img src="${card.img}" alt="${card.nombre}" style="width:120px;height:120px;object-fit:contain;border-radius:10px;margin-bottom:18px;border:2px solid #4fd1c5;background:#fff;" />
            <h2 style="color:#4fd1c5; margin:0;">${card.nombre}</h2>
            <p style="margin:0; color:#b3c2e0;">${card.opcion}</p>
            <p style="margin:0; color:#b3c2e0;">Poder: ${card.poder}</p>
        </div>
    `;
}
function playRound(userCard) {
    if (userLives === 0 || rivalLives === 0) {
        resetGame();
        return;
    }
    const rivalCard = getRivalCard();
    let result = '';
    let userWon = false;
    let empate = false;
    // Mostrar las cartas seleccionadas
    renderSelectedCard(userCard, 'user-selected-card', 'Tu elección');
    renderSelectedCard(rivalCard, 'rival-selected-card', 'Rival');
    if (userCard.opcion === rivalCard.opcion) {
        if (userCard.poder > rivalCard.poder) {
            result = 'Ganaste por poder';
            userWon = true;
        }
        else if (userCard.poder < rivalCard.poder) {
            result = 'Perdiste por poder';
        }
        else {
            result = 'Empate total';
            empate = true;
        }
    }
    else if (rules[userCard.opcion].includes(rivalCard.opcion)) {
        result = 'Ganaste';
        userWon = true;
    }
    else {
        result = 'Perdiste';
    }
    // Actualizar vidas y contadores
    if (!empate) {
        if (userWon) {
            rivalLives = Math.max(0, rivalLives - 1);
            userWins++;
            rivalLosses++;
        }
        else {
            userLives = Math.max(0, userLives - 1);
            userLosses++;
            rivalWins++;
        }
    }
    updateCounters();
    // Mostrar resultado en el HTML
    const resultDiv = document.getElementById('game-result');
    if (resultDiv) {
        resultDiv.innerHTML = `
            <strong>Tu elección:</strong> ${userCard.nombre} (${userCard.opcion}, poder ${userCard.poder})<br>
            <strong>Rival:</strong> ${rivalCard.nombre} (${rivalCard.opcion}, poder ${rivalCard.poder})<br>
            <strong>Resultado:</strong> ${result}<br>
            <strong>Vidas:</strong> Tú: ${userLives} | Rival: ${rivalLives}
        `;
        if (userLives === 0) {
            resultDiv.innerHTML += '<br><span style="color:red;font-weight:bold;">¡Perdiste la partida! Se reinicia el juego.</span>';
        }
        else if (rivalLives === 0) {
            resultDiv.innerHTML += '<br><span style="color:green;font-weight:bold;">¡Ganaste la partida! Se reinicia el juego.</span>';
        }
    }
    // Reiniciar si alguien pierde todas las vidas (con pequeño delay para mostrar el mensaje)
    if (userLives === 0 || rivalLives === 0) {
        setTimeout(() => {
            if (userLives === 0) {
                alert('¡Has perdido la partida! Intenta de nuevo.');
            }
            else if (rivalLives === 0) {
                alert('¡Felicidades! Has ganado la partida.');
            }
            resetGame();
        }, 2000);
    }
}
document.addEventListener('DOMContentLoaded', () => {
    // Conectar eventos a las cartas del HTML
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => {
            var _a;
            const nombre = ((_a = card.querySelector('h2')) === null || _a === void 0 ? void 0 : _a.textContent) || '';
            const userCard = cards.find(c => c.nombre.toLowerCase() === nombre.toLowerCase());
            if (userCard)
                playRound(userCard);
        });
    });
    resetGame();
});
export {};
