import { Player } from './players';
export class Playing {
    private players: Player[];

    constructor() {
        this.players = [];
    }

    addPlayer(player: Player): void {
        this.players.push(player);
    }

    getPlayers(): Player[] {
        return this.players;
    }

    findPlayerById(id: string): Player | undefined {
        return this.players.find(player => player.id === id);
    }

}