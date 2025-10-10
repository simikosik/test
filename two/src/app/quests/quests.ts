import { Component } from '@angular/core';
import { QuestInterface } from '../quest-interface';
import { QuestItem } from '../quest-item/quest-item';
@Component({
  selector: 'app-quests',
  imports: [QuestItem],
  templateUrl: './quests.html',
  styleUrl: './quests.css'
})
export class Quests {

  quest1: QuestInterface = {
    id: 1, title: "Rano vstanem", description: "Najdi zmysel zivota", xp: 10

  }
  quest2: QuestInterface = {
    id: 1, title: "mikne ma", description: "Vyjeb sa na to", xp: 100

  }
  quest3: QuestInterface = {
    id: 1, title: "pozriem sa zlava do prava", description: "Choj Spat", xp: 1000

  }
  quests = [this.quest1, this.quest2, this.quest3];
}



