import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { QuestService } from '../quest-service';
import { QuestInterface } from '../quest-interface';

@Component({
  selector: 'app-quest-detail',
  standalone: true,
  templateUrl: './quest-detail.html',
  styleUrl: './quest-detail.css'
})
export class QuestDetail {
  quest$!: any;

  constructor(
    private route: ActivatedRoute,
    private questService: QuestService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.quest$ = this.questService.getQuests().pipe(
      map((quests: QuestInterface[]) =>
        quests.find(q => q.id === id)
      )
    );
  }
}
