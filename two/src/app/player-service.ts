import { Injectable } from '@angular/core';
import { PlayerInterface } from './player-interface';
import { QuestService } from './quest-service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private players: PlayerInterface[] = [
    { id: 1, nickname: 'P1', level: 25, clan: null  },
    { id: 2, nickname: 'P2', level: 2, clan: null  },
    { id: 3, nickname: 'P3', level: 125, clan: null }
  ];

  getPlayers(): PlayerInterface[] {
    return this.players;
  }

 getPlayersbyId(id: number) {
    return this.players.find(q => q.id === id);
 }
constructor(private questService: QuestService) {

  this.players.forEach(player => {
    if (!player.quests) {
      player.quests = this.questService.getDefaultQuests();
    }
  });
}

 addPlayer(player: PlayerInterface) {
  if (!player.quests) {
    player.quests = this.questService.getDefaultQuests();
  }
  this.players.push(player);
}

  removePlayer(player: PlayerInterface): void {
    this.players = this.players.filter(p => p !== player);
  }
}