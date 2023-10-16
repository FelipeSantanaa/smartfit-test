import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GetUnitsService } from 'src/app/services/get-units.service';

import { Location } from 'src/app/types/location.interface';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css'],
})
export class FormsComponent implements OnInit {
  results: Location[] = [];
  filteredResults: Location[] = [];
  formGroup!: FormGroup;

  constructor(private fb: FormBuilder, private unitService: GetUnitsService) {}

  ngOnInit() {
    this.unitService.getAllUnits().subscribe(data => {
      this.results = data.locations;
      this.filteredResults = data.locations;
    });
    this.formGroup = this.fb.group({
      hour: '',
      showClosed: true
    })
  }

  onSubmit(){
    if(!this.formGroup.value.showClosed){
      this.filteredResults = this.results.filter(location => location.opened == true)
    } else {
      this.filteredResults = this.results
    }


    console.log('Submit', this.formGroup.value)
  }
  
  onClean(){
    this.formGroup.reset();
  }
}
