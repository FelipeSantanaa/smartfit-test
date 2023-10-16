import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GetUnitsService } from 'src/app/services/get-units.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css'],
})
export class FormsComponent implements OnInit {
  results = [];
  formGroup!: FormGroup;

  constructor(private fb: FormBuilder, private unitService: GetUnitsService) {}

  ngOnInit() {
    this.unitService.getAllUnits().subscribe(data => console.log(data));
    this.formGroup = this.fb.group({
      hour: '',
      showClosed: false
    })
  }

  onSubmit(){
    console.log('Submit', this.formGroup.value)
  }
  
  onClean(){
    this.formGroup.reset();
  }
}
