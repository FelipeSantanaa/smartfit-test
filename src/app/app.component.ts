import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GetUnitsService } from './services/get-units.service';
import { Location } from './types/location.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showList = new BehaviorSubject(false);
  unitsList: Location[] = []

  constructor(private unitService: GetUnitsService){

  }

  onSubmit(){
    this.unitsList = this.unitService.getFilterUnits();
    this.showList.next(true);
  }
}
