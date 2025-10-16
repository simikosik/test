import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { Quests } from './app/quests/quests';
import { Home } from './app/home/home';
import { RouterOutlet, provideRouter } from '@angular/router';

const routes = [
  { path: '', component: Home },       
  { path: 'quests', component: Quests },
 
  
];

bootstrapApplication(App, {
  providers: [provideRouter(routes)]
});


bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
