import { Component } from '@angular/core';
import { Questsit } from '../questsit';

@Component({
  selector: 'app-quest',
  imports: [],
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
}

