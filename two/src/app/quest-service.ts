import { Injectable } from '@angular/core';
import { QuestInterface } from './quest-interface';

@Injectable({
  providedIn: 'root'
})
export class QuestService {

  private quest1: QuestInterface = {
      id: 1, title: "Rano vstanem", description: "Najdi zmysel zivota", xp: 10
  
    }
    private quest2: QuestInterface = {
      id: 2, title: "mikne ma", description: "Vyjeb sa na to", xp: 100
  
    }
    private quest3: QuestInterface = {
      id: 3, title: "pozriem sa zlava do prava", description: "Choj Spat", xp: 1000
  
    }
    private quests = [this.quest1, this.quest2, this.quest3];
    
    constructor() {
    console.log('Service instance created.');
  }
    getQuests(){
      return [...this.quests]};
   getQuestsbyId(id: number) {
    return this.quests.find(q => q.id === id);
   }
}
