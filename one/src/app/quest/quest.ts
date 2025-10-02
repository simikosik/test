import { Component } from '@angular/core';
import { Questsit } from '../questsit';
import { QuestItem } from '../quest-item/quest-item';

@Component({
  selector: 'app-quest',
  imports: [QuestItem],
  standalone: true,
  templateUrl: './quest.html',
  styleUrl: './quest.css'
})
export class Quest {
  questData: Questsit = {
    id: 1,
    title: "Quest",
    description: "Najdi zmysel zivota",
    xp: 10
  };
  questData1: Questsit = {
    id: 1,
    title: "Quest",
    description: "Zlyhaj v tom co robis",
    xp: 105
  };
  questData2: Questsit = {
    id: 1,
    title: "Quest",
    description: "Choj spat",
    xp: 1012
  };
  quests = [this.questData1,this.questData2, this.questData]


 addQuest() {
    const NEWXP = Math.floor(Math.random() * 1250) + 10;
    const maxId = this.quests.length > 0 
      ? Math.max(...this.quests.map(q => q.id)) 
      : 0;

    const newQuest: Questsit = {
      id: maxId + 1,
      xp: NEWXP + 1,
      title: 'New Quest',
      description: 'This is a newly added quest.',
    
    };

    this.quests = [...this.quests, newQuest]; 
  }


  removeQuest(id: number) {
    this.quests = this.quests.filter(q => q.id !== id);
  }
}

