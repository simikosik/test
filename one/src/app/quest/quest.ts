import { Component, OnInit, OnDestroy } from '@angular/core';
import { Questsit } from '../questsit';
import { QuestItem } from '../quest-item/quest-item';
import { QuestService } from '../quest-service';

@Component({
  selector: 'app-quest',
  standalone: true,
  imports: [QuestItem],
  templateUrl: './quest.html',
  styleUrls: ['./quest.css'],
  providers: [QuestService]
})
export class Quest implements OnInit, OnDestroy {
  quests: Questsit[] = [];

  constructor(private questsService: QuestService) {

    this.quests = this.questsService.getQuests();
  }
  ngOnInit(): void {
    console.log('Quests component initialized.');
  }
  ngOnDestroy(): void {
    console.log('Quests component destroyed.');
  }
  addQuest() {
    const maxId = this.quests.length > 0
      ? Math.max(...this.quests.map(q => q.id))
      : 0;

    const titles = ['CHoj Spat', 'Najdi zmysel zivota', 'Vyjeb sa na to', 'Repeat ts'];
    const NEWXP = Math.floor(Math.random() * 1000) + 10;

    const newQuest: Questsit = {
      id: maxId + 1,
      title: titles[Math.floor(Math.random() * titles.length)],
      description: 'A randomly generated quest.',
      xp: NEWXP
    };

    this.questsService.addQuest(newQuest);
    this.quests = this.questsService.getQuests();
  }

  removeQuest(id: number) {
    this.questsService.removeQuest(id);
    this.quests = this.questsService.getQuests();
  }
}
