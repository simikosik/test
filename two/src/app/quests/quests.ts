import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { QuestInterface } from '../quest-interface';
import { QuestItem } from '../quest-item/quest-item';
import { QuestService } from '../quest-service';
@Component({
  selector: 'app-quests',
  imports: [QuestItem],
  templateUrl: './quests.html',
  styleUrl: './quests.css',
  standalone: true
})
export class Quests implements OnInit, OnDestroy {
  questService = inject(QuestService);
  quests = this.questService.getQuests();



  addQuest() {
   var newId = this.quests.length + 1;

    const newquest: QuestInterface = {
      id: newId, title: "Nahanaju ma bestie", description: "Repeat", xp: 10
    }
    this.quests.push(newquest)
  }
  removeQuest(id: number) {
    this.quests = this.quests.filter(q => q.id !== id);
  }
  ngOnInit() {
    console.log('Quests component initialized.');
  }

  ngOnDestroy() {
    console.log('Quests component destroyed.');
  }
}




