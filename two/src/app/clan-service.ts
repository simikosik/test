import { Injectable } from '@angular/core';
import { ClanInterface } from './clan-interface';
import { PlayerInterface } from './player-interface';

@Injectable({
  providedIn: 'root'
})
export class ClanService {
  private clans: ClanInterface[] = [
    {
      id: 1,
      name: 'Andrew Tate G Club ',
      description: 'tule tule vida vida.',
      capacity: 5,
      members: []
    },
    {
      id: 2,
      name: 'Sigma grind  academy',
      description: 'sigma wulf',
      capacity: 10,
      members: []
    }
  ];

  getClans() {
    return [...this.clans];
  }

  getClanById(id: number) {
    return this.clans.find(c => c.id === id);
  }

  addClan(clan: ClanInterface) {
    this.clans.push(clan);
  }

  removeClan(clan: ClanInterface) {
    this.clans = this.clans.filter(c => c !== clan);
  }

  addMember(clanId: number, player: PlayerInterface): string | null {
  const clan = this.getClanById(clanId);
  if (!clan) return 'Nic bro';

  if (clan.members.length >= clan.capacity)
    return 'fullovica';

  if (clan.members.some(m => m.id === player.id))
    return 'capek already innn';

  clan.members = [...clan.members, player];

  
  player.clan = clan.id;

  return null;
}


  removeMember(clanId: number, player: PlayerInterface) {
  const clan = this.getClanById(clanId);
  if (!clan) return;

  clan.members = clan.members.filter(m => m.id !== player.id);

  player.clan = null;
}


}
