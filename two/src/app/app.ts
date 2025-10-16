import { Component, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Quests } from './quests/quests';
import { Home } from './home/home';




@Component({
  selector: 'app-root',
  imports: [NgIf, RouterOutlet, Quests, RouterLink, Home],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('two');
  showQuests = true;

  toggleQuests() {
      this.showQuests = !this.showQuests
  }
}

