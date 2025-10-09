import { Component, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { Quest } from './quest/quest';


@Component({
  
  selector: 'app-root',
  imports: [NgIf, Quest],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true
})
export class App {
  protected readonly title = signal('one');

  showQuests = true;
  toggle() {
    this.showQuests = !this.showQuests;
  }
}
