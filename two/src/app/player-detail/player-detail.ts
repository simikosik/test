import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayerService } from '../player-service';
import { ClanService } from '../clan-service';
import { PlayerInterface } from '../player-interface';

@Component({
  selector: 'app-player-detail',
  standalone: true,
  templateUrl: './player-detail.html'
})
export class PlayerDetail {
  player: PlayerInterface | undefined;
  clanName: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private playerService: PlayerService,
    private clanService: ClanService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.player = this.playerService.getPlayersbyId(id);

    if (this.player?.clan) {
      const clan = this.clanService.getClanById(this.player.clan);
      this.clanName = clan ? clan.name : null;
    }
  }
}
