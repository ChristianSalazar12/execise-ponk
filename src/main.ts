import { Player } from "./players";
type Option = 'piedra' | 'papel' | 'tijera' | 'lagarto' | 'spock';

interface GameCard {
    nombre: string;
    opcion: Option;
    poder: number;
    img: string;
    descripcion: string;
}

const cards: GameCard[] = [
    { nombre: 'Shenron', opcion: 'piedra', poder: 10, img: 'https://res.cloudinary.com/dspprxtpr/image/upload/v1755622739/dragpm_mg8kps.gif', descripcion: 'El dragón legendario, invocado por las esferas. Gran poder y resistencia.' },
    { nombre: 'Maestro Roshi', opcion: 'papel', poder: 8, img: 'https://res.cloudinary.com/dspprxtpr/image/upload/v1755622592/maes_l4ijpt.gif', descripcion: 'El sabio maestro de artes marciales, astuto y experimentado.' },
    { nombre: 'Bills', opcion: 'tijera', poder: 9, img: 'https://res.cloudinary.com/dspprxtpr/image/upload/v1755622688/bill_dqdpqw.gif', descripcion: 'El dios de la destrucción, rápido y letal en combate.' },
    { nombre: 'Piccolo', opcion: 'lagarto', poder: 7, img: 'https://res.cloudinary.com/dspprxtpr/image/upload/v1755622400/Piccolo_nkvkvt.gif', descripcion: 'El estratega Namekiano, flexible y con gran regeneración.' },
    { nombre: 'Vegeta', opcion: 'spock', poder: 10, img: 'https://res.cloudinary.com/dspprxtpr/image/upload/v1755622303/veget_qg0bjg.gif', descripcion: 'El príncipe saiyajin, orgulloso y de fuerza imparable.' },
];

const rules: Record<Option, Option[]> = {
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

function getRivalCard(): GameCard {
    return cards[Math.floor(Math.random() * cards.length)];
}

function updateCounters() {
    (document.getElementById('user-lives') as HTMLElement).textContent = `❤️ ${userLives}`;
    (document.getElementById('user-wins') as HTMLElement).textContent = `🏆 ${userWins}`;
    (document.getElementById('user-losses') as HTMLElement).textContent = `❌ ${userLosses}`;
    (document.getElementById('rival-lives') as HTMLElement).textContent = `❤️ ${rivalLives}`;
    (document.getElementById('rival-wins') as HTMLElement).textContent = `🏆 ${rivalWins}`;
    (document.getElementById('rival-losses') as HTMLElement).textContent = `❌ ${rivalLosses}`;
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
    if (resultDiv) resultDiv.innerHTML = '<strong>¡Nuevo juego! Selecciona una carta para comenzar.</strong>';
    // Limpiar cartas seleccionadas
    const userCardDiv = document.getElementById('user-selected-card');
    const rivalCardDiv = document.getElementById('rival-selected-card');
    if (userCardDiv) userCardDiv.innerHTML = '';
    if (rivalCardDiv) rivalCardDiv.innerHTML = '';
}

function renderSelectedCard(card: GameCard, containerId: string, label: string) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = `
        <div class="card" style="background:rgba(255,255,255,0.13); min-width:220px; align-items:center;">
            <h3 style="color:#fff;">${label}</h3>
            <img src="${card.img}" alt="${card.nombre}" style="width:100%;max-width:140px;height:auto;max-height:140px;object-fit:contain;border-radius:16px;margin-bottom:8px;border:2.5px solid #4fd1c5;background:#fff8;box-shadow:0 2px 12px #0002;display:block;" />
            <h2 style="color:#fff; margin:0 0 2px 0; font-size:1.25rem; font-weight:700; letter-spacing:1px; text-shadow:0 2px 12px #000, 0 1px 0 #4fd1c5; background:rgba(44,62,80,0.72); border-radius:10px; padding:4px 12px; box-shadow:0 2px 8px #0005; display:inline-block; max-width:90%; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${card.nombre}</h2>
            <div class="card-desc" style="color:#f3f6fa;font-size:1.01rem;font-weight:400;margin:8px 0 0 0;text-align:center;line-height:1.35;opacity:0.97;padding:0 4px 8px 4px;min-height:28px;width:100%;box-sizing:border-box;background:rgba(30,41,59,0.22);border-radius:8px;box-shadow:0 1px 6px #0002;">${card.descripcion}</div>
            <p style="margin:0; color:#b3c2e0;">${card.opcion}</p>
            <p style="margin:0; color:#b3c2e0;">⚡ Poder: ${card.poder}</p>
        </div>
    `;
}

function playRound(userCard: GameCard) {
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
        } else if (userCard.poder < rivalCard.poder) {
            result = 'Perdiste por poder';
        } else {
            result = 'Empate total';
            empate = true;
        }
    } else if (rules[userCard.opcion].includes(rivalCard.opcion)) {
        result = 'Ganaste';
        userWon = true;
    } else {
        result = 'Perdiste';
    }

    // Actualizar vidas y contadores
    if (!empate) {
        if (userWon) {
            rivalLives = Math.max(0, rivalLives - 1);
            userWins++;
            rivalLosses++;
        } else {
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
        } else if (rivalLives === 0) {
            resultDiv.innerHTML += '<br><span style="color:green;font-weight:bold;">¡Ganaste la partida! Se reinicia el juego.</span>';
        }
    }

    // Reiniciar si alguien pierde todas las vidas (con pequeño delay para mostrar el mensaje)
    if (userLives === 0 || rivalLives === 0) {
        setTimeout(() => {
            if (userLives === 0) {
                alert('¡Has perdido la partida! Intenta de nuevo.');
            } else if (rivalLives === 0) {
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
            const nombre = card.querySelector('h2')?.textContent || '';
            const userCard = cards.find(c => c.nombre.toLowerCase() === nombre.toLowerCase());
            if (userCard) playRound(userCard);
        });
    });

   
    resetGame();
});
