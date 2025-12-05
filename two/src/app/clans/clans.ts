import { Component, signal, computed, model} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ClanService } from '../clan-service';
import { ClanInterface } from '../clan-interface';
import { FormData } from '../form-data';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { form, Field, required } from '@angular/forms/signals';

@Component({
  selector: 'app-clans',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, FormsModule, Field],
  templateUrl: './clans.html',
})
export class Clans {
  clans= signal<ClanInterface[]>([]);
  /*clanForm = new FormGroup({
    newname: new FormControl('',[ Validators.required, Validators.minLength(8)] ),
    newdesc: new FormControl('', [ Validators.required, Validators.minLength(8)]),
    newcapacity: new FormControl(null, [ Validators.required, Validators.minLength(8)]),
  });*/
  clanModel = signal<FormData>({
    title: '',
    desc: '',
    xp: 0,
    capacity: 0,
    nickname: '',

  })

  clanForm = form(this.clanModel, (fieldPath) => {
    required(fieldPath.title);
    required(fieldPath.desc);
    required(fieldPath.capacity);

  });


  searchText = model<string>('');

  constructor(private clanService: ClanService) {}

  
  filteredClans = computed(() => {
  const text = this.searchText().toLowerCase();

  return this.clans().filter(clan =>
    clan.name.toLowerCase().includes(text)
  );
});

 

  ngOnInit() {
    this.clans.set([...this.clanService.getClans()]);
  }

  addClan() {
    if (this.clanForm().invalid()) return;
    const formValues = this.clanForm().value()
    const id = this.clans.length + 1;
    const newName = formValues.title!;
    const newDesc  = formValues.desc!;
    const newCapacity = formValues.capacity!;

    const newClan: ClanInterface = {

      id,
      name: newName,
      description: newDesc,
      capacity: newCapacity,
      members: []
    };

    this.clanService.addClan(newClan);
    this.clans.set([...this.clanService.getClans()]);
  }


  deleteClan(clan: ClanInterface) {
    this.clanService.removeClan(clan);
    this.clans.set([...this.clanService.getClans()]);
  }
}
