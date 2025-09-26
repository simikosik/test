import { Component, signal } from '@angular/core';
import { Quest } from './quest/quest';


@Component({
  selector: 'app-root',
  imports: [Quest],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('one');
}
