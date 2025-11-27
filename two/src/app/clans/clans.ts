import { Component, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ClanService } from '../clan-service';
import { ClanInterface } from '../clan-interface';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-clans',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, FormsModule],
  templateUrl: './clans.html',
})
export class Clans {
  clans: ClanInterface[] = [];
  clanForm = new FormGroup({
    newname: new FormControl('',[ Validators.required, Validators.minLength(8)] ),
    newdesc: new FormControl('', [ Validators.required, Validators.minLength(8)]),
    newcapacity: new FormControl(null, [ Validators.required, Validators.minLength(8)]),
  });

  searchText = signal<string>('');

  constructor(private clanService: ClanService) {}

  
  filteredClans = computed(() => {
  const text = this.searchText().toLowerCase();

  return this.clans.filter(clan =>
    clan.name.toLowerCase().includes(text)
  );
});

 

  ngOnInit() {
    this.clans = this.clanService.getClans();
  }

  addClan() {
    if (this.clanForm.invalid) return;
    const formValues = this.clanForm.value
    const id = this.clans.length + 1;
    const newName = formValues.newname!;
    const newDesc  = formValues.newdesc!;
    const newCapacity = formValues.newcapacity!;

    const newClan: ClanInterface = {

      id,
      name: newName,
      description: newDesc,
      capacity: newCapacity,
      members: []
    };

    this.clanService.addClan(newClan);
    this.clans = this.clanService.getClans();
  }


  deleteClan(clan: ClanInterface) {
    this.clanService.removeClan(clan);
    this.clans = this.clanService.getClans();
  }
}
