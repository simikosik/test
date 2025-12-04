import { Component, inject } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import { QuestInterface } from '../quest-interface';
import { QuestItem } from '../quest-item/quest-item';
import { QuestService } from '../quest-service';

@Component({
  selector: 'app-quest-detail',
  standalone: true,
  imports: [],
  templateUrl: './quest-detail.html',
  styleUrl: './quest-detail.css'
})
export class QuestDetail {
  quest: any;
  
 
  constructor(
    private route: ActivatedRoute,
    private questService: QuestService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.quest = this.questService.getQuestsbyId(id);
  }
}
    
  

