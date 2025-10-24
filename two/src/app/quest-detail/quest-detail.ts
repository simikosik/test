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
  route: ActivatedRoute = inject(ActivatedRoute);
  questService = inject(QuestService);
 

  
  ngOnInit() {
    const id = Number(this.route.snapshot.params['id']);
    this.quest = this.questService.getQuestsbyId(id);
    }
  

}
