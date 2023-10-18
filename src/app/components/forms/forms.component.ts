import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilterUnitsService } from 'src/app/services/filter-units.service';
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

  constructor(private fb: FormBuilder, 
    private unitService: GetUnitsService,
    private filterUnitsService: FilterUnitsService) {}

  ngOnInit() {
    this.unitService.getAllUnits().subscribe((data) => {
      this.results = data;
      this.filteredResults = data;
    });
    this.formGroup = this.fb.group({
      hour: '',
      showClosed: true,
    });
  }

  onSubmit() {
    let {showClosed, hour} = this.formGroup.value;
   this.filteredResults = this.filterUnitsService.filter(this.results, showClosed, hour);
   this.unitService.setFilterUnits(this.filteredResults);
  }

  onClean() {
    this.formGroup.reset();
  }
}
