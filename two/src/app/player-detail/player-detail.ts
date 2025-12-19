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
  player = signal<PlayerInterface | null>(null);
  clanName = signal<string | null>(null);

  // Signal for player XP
  playerXp = signal(0);

  // Levels data
  levels = new LevelsTs().playerLevels;

  // Computed level info
  levelData = computed(() => {
    const xp = this.playerXp();
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
  });

  // Available quests as a computed signal
  availableQuests = computed(() => {
    const playerData = this.player();
    if (!playerData) return [];

    return this.questService.questsSignal().filter(q =>
      !playerData.assignedQuests?.some(aq => aq.id === q.id) &&
      !playerData.completedQuests?.some(cq => cq.id === q.id)
    );
  });

  private questService = inject(QuestService);

  constructor(
    private route: ActivatedRoute,
    private playerService: PlayerService,
    private clanService: ClanService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const playerData = this.playerService.getPlayersbyId(id);

    if (!playerData) return;

    // Initialize assigned and completed quests
    playerData.assignedQuests ??= [];
    playerData.completedQuests ??= [];

    this.player.set(playerData);
    this.playerXp.set(playerData.xp ?? 0);

    if (playerData.clan) {
      const clan = this.clanService.getClanById(playerData.clan);
      this.clanName.set(clan?.name ?? null);
    }
  }

  completeQuest(q: QuestInterface) {
    const playerData = this.player();
    if (!playerData) return;

    playerData.assignedQuests = playerData.assignedQuests.filter(aq => aq.id !== q.id);
    playerData.completedQuests.push(q);

    playerData.xp += q.xp;
    this.playerXp.set(playerData.xp);

    this.player.set({ ...playerData }); // trigger reactivity
  }

  undoQuest(q: QuestInterface) {
    const playerData = this.player();
    if (!playerData) return;

    playerData.completedQuests = playerData.completedQuests.filter(cq => cq.id !== q.id);
    playerData.assignedQuests.push(q);

    playerData.xp -= q.xp;
    this.playerXp.set(playerData.xp);

    this.player.set({ ...playerData });
  }

  assignQuest(q: QuestInterface) {
    const playerData = this.player();
    if (!playerData) return;

    playerData.assignedQuests.push(q);

    this.player.set({ ...playerData });
    
  }
}
