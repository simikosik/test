import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ClanService } from '../clan-service';
import { PlayerService } from '../player-service';
import { ClanInterface } from '../clan-interface';
import { PlayerInterface } from '../player-interface';
import { LevelInterface } from '../level-interface';



@Component({
  selector: 'app-clan-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './clan-detail.html'
})
export class ClanDetail {
  clan?: ClanInterface;
  allPlayers: PlayerInterface[] = [];

  constructor(
    private route: ActivatedRoute,
    private clanService: ClanService,
    private playerService: PlayerService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.clan = this.clanService.getClanById(id);
    this.allPlayers = this.playerService.getPlayers();
  }

  addPlayerToClan(player: PlayerInterface) {
    if (!this.clan) return;

    const error = this.clanService.addMember(this.clan.id, player);
    if (error) alert(error);
  }

  removePlayerFromClan(player: PlayerInterface) {
    if (!this.clan) return;

    this.clanService.removeMember(this.clan.id, player);
  }
}
