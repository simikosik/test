import { Component, signal, model,  computed, } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { PlayerInterface } from '../player-interface';
import { CommonModule } from '@angular/common';
import { PlayerService } from '../player-service';
import { QuestService } from '../quest-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';


@Component({
  selector: 'app-players',
  standalone: true,
  imports: [RouterLink, RouterModule, ReactiveFormsModule, FormsModule,  CommonModule, ],
  templateUrl: './players.html',
  styleUrl: './players.css'
})
export class Players {
  players: PlayerInterface[] = [];
  playerForm = new FormGroup({
    newnickname: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

searchText = model<string>('');
selectedLevel = model<string>('');



  constructor(
    private playerService: PlayerService,
    private questService: QuestService
  ) { }

  levels = [
    { level: 1, xpRequired: 0, title: 'Novice' },
    { level: 2, xpRequired: 100, title: 'Apprentice' },
    { level: 3, xpRequired: 300, title: 'Adept' },
    { level: 4, xpRequired: 600, title: 'Expert' },
    { level: 5, xpRequired: 1000, title: 'Master' },
    { level: 6, xpRequired: 2000, title: 'Grandmaster' },
    { level: 7, xpRequired: 3500, title: 'Legend' },
    { level: 8, xpRequired: 5500, title: 'Mythic' },
    { level: 9, xpRequired: 8000, title: 'Immortal' },
    { level: 10, xpRequired: 12000, title: 'Eternal' }
  ];

  getLevelData(xp: number) {
    let currentLevel = this.levels[0];
    for (const lvl of this.levels) {
      if (xp >= lvl.xpRequired) currentLevel = lvl;
      else break;
    }
    const nextLevel = this.levels.find(l => l.level === currentLevel.level + 1);
    const progress = nextLevel
      ? ((xp - currentLevel.xpRequired) / (nextLevel.xpRequired - currentLevel.xpRequired)) * 100
      : 100;
    return { currentLevel, nextLevel, progress: Math.round(progress) };
  }

  filteredPlayers = computed(() => {
    const text = this.searchText().toLowerCase();
    const lvl = this.selectedLevel();

    return this.players.filter(p => {
      const levelTitle = this.getLevelData(p.xp).currentLevel.title;

      const matchesSearch =
        p.nickname.toLowerCase().includes(text);

      const matchesLevel =
        !lvl || levelTitle === lvl;

      return matchesSearch && matchesLevel;
    });
  });

  ngOnInit() {
    this.players = this.playerService.getPlayers();

  }

  onRemove(player: PlayerInterface) {
    this.playerService.removePlayer(player);
    this.players = this.playerService.getPlayers();
  }

  addPlayer() {
    if (this.playerForm.invalid) return;
    const formValues = this.playerForm.value;

    const newId = this.players.length + 1!;
    const name = formValues.newnickname!;
    const newxp = Math.floor(Math.random() * 10000);

    const defaultplayer: PlayerInterface = {
      id: newId,
      nickname: name,
      xp: newxp,
      clan: null,
      assignedQuests: this.questService.getDefaultQuests(),
      completedQuests: []
    };
    this.playerService.addPlayer(defaultplayer);
    this.players = this.playerService.getPlayers();
  }

}

