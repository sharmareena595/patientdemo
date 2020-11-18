import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ViewDetailComponent } from '../view-detail/view-detail.component';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {

  @Input() item: any;
  @Output() editItem = new EventEmitter<any>();
  patientArray: any = [];
  displayedColumns: string[] = ['firstName', 'lastName', 'address', 'action'];
  dataSource;

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    
  }

  ngOnChanges(){
    console.log(this.item);
    if(this.item) {

      const index = this.patientArray.findIndex(element=> element.id == this.item.id);
      console.log(index);
       if(index == -1) {
        this.patientArray.push(this.item);
        console.log(this.patientArray);
        this.dataSource = new MatTableDataSource(this.patientArray);
      } else{
        this.patientArray[index] = this.item;
        this.dataSource = new MatTableDataSource(this.patientArray);
      }
    }
  }
  delete(id) {
    console.log(id);
    const index = this.patientArray.findIndex(element=> element.id == id);
    console.log(index);
    if (index > -1) {
      
      this.patientArray.splice(index,1);
      this.dataSource = this.patientArray;
    }


  }
  edit(element) {
    this.editItem.emit(element);
  }
  viewDetail(element) {

    const dialogRef = this.dialog.open(ViewDetailComponent, {
      width: '450px',
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }
}
