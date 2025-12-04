import { Component, inject, OnDestroy, OnInit, signal, computed, model} from '@angular/core';
import { QuestInterface } from '../quest-interface';
import { QuestItem } from '../quest-item/quest-item';
import { QuestService } from '../quest-service';
import { FormData } from '../form-data';
import { FormControl, FormGroup, ReactiveFormsModule, Validator, Validators, Field,  } from '@angular/forms';
@Component({
  selector: 'app-quests',
  imports: [QuestItem, ReactiveFormsModule, Field, ],
  templateUrl: './quests.html',
  styleUrl: './quests.css',
  standalone: true
})
export class Quests implements OnInit, OnDestroy {
  questService = inject(QuestService);
 quests = signal<QuestInterface[]>(this.questService.getQuests());
  /*questForm = new FormGroup({
    newtitle: new FormControl('', [ Validators.required, Validators.minLength(8)]),
    newdesc: new FormControl('', [ Validators.required, Validators.minLength(8)]),
    newxp: new FormControl(null, [ Validators.required, Validators.minLength(1)]),
  });*/
  questModel = signal<FormData>({
  title: '',
  desc: '',
  xp: 0,

  })

  questForm = form(this.questModel);

 

searchText = model<string>('');

  addQuest() {
    if (this.questForm.invalid) return;
    const formValues = this.questForm.value;
   var newId = this.quests().length + 1;
   var newTitle = formValues.newtitle!;
    var newDesc = formValues.newdesc!;
    const newXp = Number(formValues.newxp);

    const newquest: QuestInterface = {
      id: newId, title: newTitle, description: newDesc, xp: newXp,
    }
    this.questService.addQuest(newquest);
this.quests.set(this.questService.getQuests());

  }
  removeQuest(id: number) {
     this.questService.removeQuest(id);
 this.quests.set(this.questService.getQuests());
  }
  
filteredQuests = computed(() => {
  const text = this.searchText().toLowerCase();

  return this.quests().filter((quest: QuestInterface) =>
    quest.title.toLowerCase().includes(text)
  );
});


  ngOnInit() {
    console.log('Quests component initialized.');
  }

  ngOnDestroy() {
    console.log('Quests component destroyed.');
  }
}




