import { Component } from '@angular/core';
import { quests } from '../quests';
@Component({
  selector: 'app-quest',
  imports: [quests],
  templateUrl: './quest.html',
  styleUrl: './quest.css'
})
export class Quest {
  
  quests: Quests = {
    id: 10, 
    title: "quest1", 
    description: "2 inch actually big", 
    xp: 150
  };
}

