import { Component, input, output, EventEmitter } from '@angular/core';
import { Questsit } from '../questsit';


@Component({
  selector: 'app-quest-item',
  imports: [],
  standalone: true,
  templateUrl: './quest-item.html',
  styleUrl: './quest-item.css'
})
export class QuestItem {
  quest = input.required<Questsit>();
  index = input.required<number>();

  removeQuest = output<number>();

  onRemove() {
    this.removeQuest.emit(this.quest().id);
  }
}

