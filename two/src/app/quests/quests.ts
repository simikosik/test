import { Component, inject, OnDestroy, OnInit, signal, computed, model } from '@angular/core';
import { QuestInterface } from '../quest-interface';
import { QuestItem } from '../quest-item/quest-item';
import { QuestService } from '../quest-service';
import { FormData } from '../form-data';
import { FormControl, FormGroup, ReactiveFormsModule, Validator, Validators } from '@angular/forms';
import { form, Field, minLength, required } from '@angular/forms/signals';
import { map, combineLatest } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { async } from 'rxjs';
@Component({
  selector: 'app-quests',

  imports: [QuestItem, ReactiveFormsModule, Field, AsyncPipe],
  templateUrl: './quests.html',
  styleUrl: './quests.css',
  standalone: true
})
export class Quests implements OnInit, OnDestroy {
  private questService = inject(QuestService);
  quests$ = this.questService.getQuests();

  /*questForm = new FormGroup({
    newtitle: new FormControl('', [ Validators.required, Validators.minLength(8)]),
    newdesc: new FormControl('', [ Validators.required, Validators.minLength(8)]),
    newxp: new FormControl(null, [ Validators.required, Validators.minLength(1)]),
  });*/
  questModel = signal<FormData>({
    title: '',
    desc: '',
    xp: 0,
    capacity: 0,
    nickname: '',

  })

  questForm = form(this.questModel, (fieldPath) => {
    required(fieldPath.title);
    required(fieldPath.desc);
    required(fieldPath.xp);

  });



  searchText = model<string>('');
  private searchText$ = toObservable(this.searchText);

  addQuest() {

    //const formValues = this.questForm().value();
     if (this.questForm().invalid()) return;

    const value = this.questForm().value();

    const newquest: QuestInterface = {
      id: Date.now(), title: value.title!, description: value.desc!, xp: value.xp!,
    }
    console.log('eh questnewig.')
    this.questService.addQuest(newquest);
    this.questForm().reset();
  }

 removeQuest(docId: string) {
  this.questService.removeQuest(docId);
}

  filteredQuests$ = combineLatest([this.quests$, this.searchText$]).pipe(
    map(([quests, text]) =>
      quests.filter(q =>
        q.title.toLowerCase().includes(text.toLowerCase())
      )
    )
  ); 


  ngOnInit() {
    console.log('Quests component initialized.');
  }

  ngOnDestroy() {
    console.log('Quests component destroyed.');
  }
}




