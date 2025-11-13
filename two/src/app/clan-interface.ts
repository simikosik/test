import { PlayerInterface } from './player-interface';

export interface ClanInterface {
  id: number;
  name: string;
  description: string;
  capacity: number;
  members: PlayerInterface[];  
}
