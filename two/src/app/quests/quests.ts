import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { QuestInterface } from '../quest-interface';
import { QuestItem } from '../quest-item/quest-item';
import { QuestService } from '../quest-service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-quests',
  imports: [QuestItem, ReactiveFormsModule],
  templateUrl: './quests.html',
  styleUrl: './quests.css',
  standalone: true
})
export class Quests implements OnInit, OnDestroy {
  questService = inject(QuestService);
  quests = this.questService.getQuests();
  questForm = new FormGroup({
    newtitle: new FormControl(''),
    newdesc: new FormControl(''),
    newxp: new FormControl(null),
  });



  addQuest() {
    const formValues = this.questForm.value;
   var newId = this.quests.length + 1;
   var newTitle = formValues.newtitle!;
    var newDesc = formValues.newdesc!;
    const newXp = Number(formValues.newxp);

    const newquest: QuestInterface = {
      id: newId, title: newTitle, description: newDesc, xp: newXp,
    }
    this.questService.addQuest(newquest);
this.quests = this.questService.getQuests();

  }
  removeQuest(id: number) {
     this.questService.removeQuest(id);
  this.quests = this.questService.getQuests();
  }
  ngOnInit() {
    console.log('Quests component initialized.');
  }

  ngOnDestroy() {
    console.log('Quests component destroyed.');
  }
}




