import { Injectable } from '@angular/core';
import { Questsit } from './questsit';

@Injectable()
 
export class QuestService {
   constructor() {
    console.log('Service instance created.');
   }
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


getQuests(): Questsit[] {
  return this.quests;
}

addQuest(newQuest: Questsit) {
  this.quests = [...this.quests, newQuest];
}

removeQuest(id: number) {
  this.quests = this.quests.filter(q => q.id !== id);
}
}
