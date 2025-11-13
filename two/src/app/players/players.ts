import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { PlayerInterface } from '../player-interface';
import { PlayerService } from '../player-service';
import { QuestService } from '../quest-service';


@Component({
  selector: 'app-players',
  standalone: true,
  imports: [RouterLink, RouterModule],
  templateUrl: './players.html',
  styleUrl: './players.css'
})
export class Players {
  players: PlayerInterface[] = [];

  constructor(
    private playerService: PlayerService,
     private questService: QuestService
  ) {}

  ngOnInit() {
    this.players = this.playerService.getPlayers();
    
  }

  onRemove(player: PlayerInterface) {
    this.playerService.removePlayer(player);
    this.players = this.playerService.getPlayers();
  }

  addPlayer() {
    const newId = this.players.length + 1;
    const newlvl = Math.floor(Math.random() * 10000);
    const name = 'P' + newId;

    const defaultplayer: PlayerInterface = {
      id: newId,
      nickname: name,
      level: newlvl,
      clan: null,
      quests: this.questService.getDefaultQuests()
    };
    this.playerService.addPlayer(defaultplayer);
    this.players = this.playerService.getPlayers();
  }
  
}
