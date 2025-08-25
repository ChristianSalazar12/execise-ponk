# GameSpock - Dragon Ball Z Edition 🐉

A web-based implementation of the classic Rock-Paper-Scissors-Lizard-Spock game with a Dragon Ball Z theme. Battle against an AI opponent using iconic Dragon Ball characters, each with unique powers and abilities.

## 🎮 Game Overview

**GameSpock** is an enhanced version of the traditional Rock-Paper-Scissors game, expanded with two additional options (Lizard and Spock) and featuring beloved Dragon Ball Z characters. Each character represents one of the five game options and comes with their own power level and special abilities.

### Characters & Their Powers

- **🐲 Shenron** (Piedra/Rock) - Power: 10
  - *The legendary dragon summoned by the Dragon Balls. Great power and resistance.*

- **👴 Maestro Roshi** (Papel/Paper) - Power: 8
  - *The wise martial arts master, cunning and experienced.*

- **😈 Bills** (Tijera/Scissors) - Power: 9
  - *The God of Destruction, fast and lethal in combat.*

- **🟢 Piccolo** (Lagarto/Lizard) - Power: 7
  - *The Namekian strategist, flexible with great regeneration.*

- **👑 Vegeta** (Spock) - Power: 10
  - *The Saiyan prince, proud and with unstoppable strength.*

## 🎯 Game Rules

The game follows the expanded Rock-Paper-Scissors-Lizard-Spock rules:

- **Rock** (Shenron) crushes **Scissors** (Bills) and **Lizard** (Piccolo)
- **Paper** (Maestro Roshi) covers **Rock** (Shenron) and disproves **Spock** (Vegeta)
- **Scissors** (Bills) cuts **Paper** (Maestro Roshi) and decapitates **Lizard** (Piccolo)
- **Lizard** (Piccolo) poisons **Spock** (Vegeta) and eats **Paper** (Maestro Roshi)
- **Spock** (Vegeta) smashes **Scissors** (Bills) and vaporizes **Rock** (Shenron)

### Victory Conditions

- Each player starts with **3 lives** ❤️
- Win a round to remove one life from your opponent
- In case of same choice, the character with higher power wins
- If both characters have the same power, it's a tie (no lives lost)
- First player to lose all lives loses the match
- The game automatically resets after each complete match

## 🏆 Features

- **Animated Character Cards**: Each character features animated GIFs from Dragon Ball Z
- **Real-time Statistics**: Track wins, losses, and remaining lives for both players
- **Power-based Tiebreakers**: When same choices are made, power levels determine the winner
- **Responsive Design**: Optimized for different screen sizes
- **Automatic Game Reset**: Seamless transition between matches
- **Visual Feedback**: Clear display of selected cards and battle results

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, TypeScript
- **Styling**: Custom CSS with modern design patterns
- **Images**: Cloud-hosted animated GIFs via Cloudinary
- **Module System**: ES6 modules with TypeScript compilation
- **Build Tool**: TypeScript compiler (tsc)

## 🚀 Getting Started

### Prerequisites

- Node.js (for TypeScript compilation)
- A modern web browser
- Live server (recommended for development)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd gamespock
```

2. Compile TypeScript files:
```bash
tsc
```

3. Open `public/index.html` in your browser or serve it using a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js http-server
npx http-server public
```

4. Navigate to `http://localhost:8000` and start playing!

## 🎲 How to Play

1. **Select Your Character**: Click on one of the five Dragon Ball Z character cards
2. **Battle**: The AI will automatically select a random character to battle against
3. **View Results**: See the outcome of each round with detailed battle information
4. **Track Progress**: Monitor your lives, wins, and losses in real-time
5. **Continue Fighting**: Keep battling until one player runs out of lives
6. **New Match**: The game automatically resets for a fresh start

## 📁 Project Structure

```
gamespock/
├── public/
│   ├── index.html      # Main HTML file
│   └── style.css       # Stylesheet
├── src/
│   ├── main.ts         # Main game logic
│   └── players.ts      # Player interface definitions
├── tsconfig.json       # TypeScript configuration
├── .gitignore         # Git ignore rules
└── README.md          # This file
```

## 🎨 Design Features

- **Dragon Ball Z Aesthetic**: Authentic character representations with animated GIFs
- **Intuitive UI**: Clean, user-friendly interface with clear visual hierarchy
- **Responsive Layout**: Adapts to different screen sizes and devices
- **Engaging Animations**: Smooth transitions and hover effects
- **Real-time Updates**: Instant feedback on game state changes

## 🤝 Contributing

Feel free to contribute to this project by:

- Adding new Dragon Ball Z characters
- Improving the UI/UX design
- Implementing additional game modes
- Adding sound effects and music
- Creating multiplayer functionality

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

## 🎉 Acknowledgments

- Dragon Ball Z characters and imagery are property of Akira Toriyama and Toei Animation
- Rock-Paper-Scissors-Lizard-Spock game concept popularized by "The Big Bang Theory"
- Character animations hosted on Cloudinary

---

*Ready to test your power level? Choose your fighter and may the strongest warrior win!* 💪⚡
