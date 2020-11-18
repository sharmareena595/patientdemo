import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {

  patiendData;
  editData;
  constructor() { }

  ngOnInit() {
  }

  addItem (event) {
    console.log(event);
    this.patiendData = event;
  }
  edititemData(event) {
    this.editData = event
  }

}
