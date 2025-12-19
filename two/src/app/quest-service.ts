import { Injectable, inject, signal } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, deleteDoc, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { QuestInterface } from './quest-interface';

@Injectable({ providedIn: 'root' })
export class QuestService {
  private firestore = inject(Firestore);
  private questsRef = collection(this.firestore, 'quests');

 
  questsSignal = signal<QuestInterface[]>([]);

  constructor() {
    
    collectionData(this.questsRef, { idField: 'docId' }).subscribe(qs => {
      this.questsSignal.set(qs as QuestInterface[]);
    });
  }

  getQuests(): Observable<QuestInterface[]> {
    return collectionData(this.questsRef, { idField: 'docId' }) as Observable<QuestInterface[]>;
  }

  addQuest(quest: QuestInterface) {
    return addDoc(this.questsRef, quest);
  }

  removeQuest(docId: string) {
    return deleteDoc(doc(this.firestore, 'quests', docId));
  }
}
