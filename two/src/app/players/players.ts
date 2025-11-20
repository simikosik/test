import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { PlayerInterface } from '../player-interface';
import { PlayerService } from '../player-service';
import { QuestService } from '../quest-service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-players',
  standalone: true,
  imports: [RouterLink, RouterModule, ReactiveFormsModule],
  templateUrl: './players.html',
  styleUrl: './players.css'
})
export class Players {
  players: PlayerInterface[] = [];
  playerForm = new FormGroup({
    newid: new FormControl(null),
    newnickname: new FormControl(''),
  });

    constructor(
      private playerService: PlayerService,
      private questService: QuestService
    ) { }

  ngOnInit() {
      this.players = this.playerService.getPlayers();

    }

  onRemove(player: PlayerInterface) {
      this.playerService.removePlayer(player);
      this.players = this.playerService.getPlayers();
    }

    addPlayer() {
      const formValues = this.playerForm.value;

    const newId = formValues.newid!;
    const name = formValues.newnickname!;
    const newlvl = Math.floor(Math.random() * 10000);
  
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

