import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { Quests } from './app/quests/quests';
import { Home } from './app/home/home';
import { RouterOutlet, provideRouter } from '@angular/router';
import { QuestDetail } from './app/quest-detail/quest-detail';

const routes = [
  { path: '', component: Home },       
  { path: 'quests', component: Quests },
  { path: 'quests/:id', component: QuestDetail },
 
  
];

bootstrapApplication(App, {
  providers: [provideRouter(routes)]
});

