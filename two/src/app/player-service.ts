import { Injectable } from '@angular/core';
import { PlayerInterface } from './player-interface';
import { QuestService } from './quest-service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private players: PlayerInterface[] = [];

  constructor(private questService: QuestService) {
  
    this.players = [
      { 
        id: 1, 
        nickname: 'P1', 
        xp: 25, 
        clan: null, 
        assignedQuests: [...this.questService.getDefaultQuests()],
        completedQuests: []
      },
      { 
        id: 2, 
        nickname: 'P2', 
        xp: 2, 
        clan: null, 
        assignedQuests: [...this.questService.getDefaultQuests()],
        completedQuests: []
      },
      { 
        id: 3, 
        nickname: 'P3', 
        xp: 125, 
        clan: null, 
        assignedQuests: [...this.questService.getDefaultQuests()],
        completedQuests: []
      }
    ];
  }

  getPlayers(): PlayerInterface[] {
    return this.players;
  }

 
  getPlayersbyId(id: number): PlayerInterface | undefined {
    return this.players.find(p => p.id === id);
  }

 
  addPlayer(player: PlayerInterface) {
    
    player.assignedQuests ??= [...this.questService.getDefaultQuests()];
    player.completedQuests ??= [];
    this.players.push(player);
  }

 
  removePlayer(player: PlayerInterface): void {
    this.players = this.players.filter(p => p !== player);
  }
}
