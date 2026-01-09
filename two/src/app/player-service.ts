import { Injectable } from '@angular/core';
import { PlayerInterface } from './player-interface';
import { QuestService } from './quest-service';

@Injectable({ providedIn: 'root' })
export class PlayerService {
  private players: PlayerInterface[] = [
    { id: 1, nickname: 'P1', xp: 25, clan: null, assignedQuests: [], completedQuests: [] },
    { id: 2, nickname: 'P2', xp: 2, clan: null, assignedQuests: [], completedQuests: [] },
    { id: 3, nickname: 'P3', xp: 125, clan: null, assignedQuests: [], completedQuests: [] }
  ];

  getPlayers() {
    return this.players;
  }

  getPlayersbyId(id: number) {
    return this.players.find(p => p.id === id);
  }

  addPlayer(player: PlayerInterface) {
    player.assignedQuests ??= [];
    player.completedQuests ??= [];
    this.players.push(player);
  }

  removePlayer(player: PlayerInterface) {
    this.players = this.players.filter(p => p !== player);
  }
}
