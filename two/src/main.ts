import { provideZoneChangeDetection } from "@angular/core";
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { Quests } from './app/quests/quests';
import { Home } from './app/home/home';
import { RouterOutlet, provideRouter } from '@angular/router';
import { QuestDetail } from './app/quest-detail/quest-detail';
import { Players } from './app/players/players';
import { PlayerDetail } from './app/player-detail/player-detail';
import { Clans } from './app/clans/clans';
import { ClanDetail } from './app/clan-detail/clan-detail';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { firebaseConfig } from "./firebase.config";

const routes = [
  { path: '', component: Home },
  { path: 'quests', component: Quests },
  { path: 'quests/:id', component: QuestDetail },
  { path: 'players', component: Players },
  { path: 'players/:id', component: PlayerDetail },
  { path: 'clans', component: Clans },
  { path: 'clans/:id', component: ClanDetail },
];

bootstrapApplication(App, {
  providers: [
    provideZoneChangeDetection(),
    provideRouter(routes),

    
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore())
  ]
});
