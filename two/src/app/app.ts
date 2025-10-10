import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Quests } from './quests/quests';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Quests],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('two');
}
