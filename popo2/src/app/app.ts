import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Quest } from './quest/quest';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Quest],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('popo2');
}
