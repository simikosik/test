import { Component, inject, signal, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayerService } from '../player-service';
import { ClanService } from '../clan-service';
import { QuestService } from '../quest-service';
import { PlayerInterface } from '../player-interface';
import { QuestInterface } from '../quest-interface';
import { LevelsTs } from '../levels.ts/levels.ts';

@Component({
  selector: 'app-player-detail',
  standalone: true,
  templateUrl: './player-detail.html'
})
export class PlayerDetail {
  player: PlayerInterface | undefined;
  clanName: string | null = null;
  private questService = inject(QuestService);
  availableQuests: QuestInterface[] = [];


  constructor(
    private route: ActivatedRoute,
    private playerService: PlayerService,
    private clanService: ClanService
  ) {}

  playerXp = signal(0); 

levels = new LevelsTs().playerLevels;

levelData = computed(() => {
  const xp = this.playerXp();
  let currentLevel = this.levels[0];

  for (let lvl of this.levels) {
    if (xp >= lvl.xpRequired) currentLevel = lvl;
    else break;
  }

  const nextLevel = this.levels.find(l => l.level === currentLevel.level + 1);
  const progress = nextLevel
    ? ((xp - currentLevel.xpRequired) / (nextLevel.xpRequired - currentLevel.xpRequired)) * 100
    : 100;

  return { currentLevel, nextLevel, progress: Math.round(progress) };
});

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.player = this.playerService.getPlayersbyId(id);

    if (this.player) {
    
      this.player.assignedQuests ??= [];
      this.player.completedQuests ??= [];

      this.updateAvailableQuests();
    }

    if (this.player?.clan) {
      const clan = this.clanService.getClanById(this.player.clan);
      this.clanName = clan ? clan.name : null;
    }

    this.playerXp.set(this.player?.xp ?? 0);
  }

  completeQuest(q: QuestInterface) {
    if (!this.player) return;

    this.player.assignedQuests = this.player.assignedQuests.filter(x => x.id !== q.id);
    this.player.completedQuests.push(q);

    this.player.xp += q.xp;
    this.playerXp.set(this.player.xp);

    this.updateAvailableQuests();
  }

  undoQuest(q: QuestInterface) {
    if (!this.player) return;

    this.player.completedQuests = this.player.completedQuests.filter(x => x.id !== q.id);
    this.player.assignedQuests.push(q);

    this.player.xp -= q.xp;
    this.playerXp.set(this.player.xp);

    this.updateAvailableQuests();
  }

  assignQuest(q: QuestInterface) {
    if (!this.player) return;

    this.player.assignedQuests.push(q);

 
    this.availableQuests = this.availableQuests.filter(aq => aq.id !== q.id);
  }

  updateAvailableQuests() {
    if (!this.player) return;

    const allQuests = this.questService.getQuests();
    this.availableQuests = allQuests.filter(q =>
      !this.player!.assignedQuests.some(aq => aq.id === q.id) &&
      !this.player!.completedQuests.some(cq => cq.id === q.id)
    );
  }
}
