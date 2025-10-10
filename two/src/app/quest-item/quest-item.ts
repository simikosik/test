import { Component, input } from '@angular/core';
import { QuestInterface } from '../quest-interface';

@Component({
  selector: 'app-quest-item',
  imports: [],
  templateUrl: './quest-item.html',
  styleUrl: './quest-item.css'
})
export class QuestItem {
quest = input.required<QuestInterface>();
index = input.required<number>();
}
