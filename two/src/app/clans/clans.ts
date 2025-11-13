import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ClanService } from '../clan-service';
import { ClanInterface } from '../clan-interface';

@Component({
  selector: 'app-clans',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './clans.html',
})
export class Clans {
  clans: ClanInterface[] = [];

  constructor(private clanService: ClanService) {}

  ngOnInit() {
    this.clans = this.clanService.getClans();
  }

  addClan() {
    const id = this.clans.length + 1;
    const newClan: ClanInterface = {
      id,
      name: 'New Clan ' + id,
      description: 'Default description',
      capacity: 10,
      members: []
    };

    this.clanService.addClan(newClan);
    this.clans = this.clanService.getClans();
  }

  deleteClan(clan: ClanInterface) {
    this.clanService.removeClan(clan);
    this.clans = this.clanService.getClans();
  }
}
