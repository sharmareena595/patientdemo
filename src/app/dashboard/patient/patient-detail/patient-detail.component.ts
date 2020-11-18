import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.scss']
})
export class PatientDetailComponent implements OnInit {

  constructor() { }
  ProfileForm: FormGroup;
  submitted = true;
  formData = [];
  id = 1;
  @Output() newItemEvent = new EventEmitter<any>();
  @Input() editItem;

  ngOnInit() {
    const data = {
      address1: "Malad West",
      address2: "",
      city: "Mumbai",
      email: "jack@gmail.com",
      firstName: "Jack",
      id: 1,
      lastName: "Archer",
      mobile: "1234567890",
      postcode: "123456",
      state: "Maharashtra",
    }
    this.newItemEvent.emit(data);
    this.createForm();

  }
  createForm(data = null) {

    if (data) {
      this.ProfileForm = new FormGroup({
        firstName: new FormControl(data.firstName, [Validators.required, Validators.pattern(new RegExp('^[a-zA-Z\'-][a-zA-Z \'-]+[a-zA-Z\'-]$'))]),
        lastName: new FormControl(data.lastName, [Validators.required, Validators.pattern(new RegExp('^[a-zA-Z\'-][a-zA-Z \'-]+[a-zA-Z\'-]$'))]),
        email: new FormControl(data.email, [
          Validators.required,
          Validators.email
        ]),
        mobile: new FormControl(data.mobile, [Validators.required, Validators.pattern(new RegExp('^[0-9\-]*$'))]),
        address1: new FormControl(data.address1, Validators.required),
        address2: new FormControl(data.address2),
        city: new FormControl(data.city, Validators.required),
        postcode: new FormControl(data.postcode, [Validators.required, Validators.pattern(new RegExp('^[0-9\-]*$'))]),
        state: new FormControl(data.state, Validators.required),
        id: new FormControl(data.id)
      });
    } else {

      this.ProfileForm = new FormGroup({
        firstName: new FormControl('', [Validators.required, Validators.pattern(new RegExp('^[a-zA-Z\'-][a-zA-Z \'-]+[a-zA-Z\'-]$'))]),
        lastName: new FormControl('', [Validators.required, Validators.pattern(new RegExp('^[a-zA-Z\'-][a-zA-Z \'-]+[a-zA-Z\'-]$'))]),
        email: new FormControl('', [
          Validators.required,
          Validators.email
        ]),
        mobile: new FormControl('', [Validators.required, Validators.pattern(new RegExp('^[0-9\-]*$'))]),
        address1: new FormControl('', Validators.required),
        address2: new FormControl(''),
        city: new FormControl('', Validators.required),
        postcode: new FormControl('', [Validators.required, Validators.pattern(new RegExp('^[0-9\-]*$'))]),
        state: new FormControl('', Validators.required),
        id: new FormControl(this.id)
      });
    }
    this.id = this.id + 1;
  }
  submitForm() {
    console.log(this.ProfileForm);
    if (this.ProfileForm.valid) {
      this.submitted = true;
      this.formData.push(this.ProfileForm.value);
      this.newItemEvent.emit(this.ProfileForm.value);
      this.createForm();
    } else {
      this.submitted = false;
    }
  }

  ngOnChanges() {
    console.log(this.editItem);
    if (this.editItem) {
      this.createForm(this.editItem);

    }

  }
}
