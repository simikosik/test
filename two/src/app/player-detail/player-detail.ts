import { Component, inject } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { CommonModule } from '@angular/common';
import { PlayerInterface } from '../player-interface';
import { PlayerService } from '../player-service';

@Component({
  selector: 'app-player-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-detail.html',
  styleUrl: './player-detail.css'
})
export class PlayerDetail {
  player?: PlayerInterface;

  constructor(
    private route: ActivatedRoute,
    private playerService: PlayerService
  ) {}

ngOnInit() {
  const id = Number(this.route.snapshot.paramMap.get('id'));
  console.log('Route id:', id);
  this.player = this.playerService.getPlayersbyId(id);
  console.log('Player found:', this.player);
}
}
