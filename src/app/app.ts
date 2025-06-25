import { Component } from '@angular/core';
import { RouterOutlet} from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Services } from './services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule,ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(public serv:Services){}
  ngOnInit(){
   this.getUserData()
  }
  title = 'formValidation';
  detailsForm = new FormGroup({
  id: new FormControl(null),
  fName: new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.pattern('^[a-zA-Z]+$') 
  ]),
  lName: new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.pattern('^[a-zA-Z]+$')
  ]),
  email: new FormControl('', [
    Validators.required,
    Validators.email
  ]),
  psw: new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$') 
  ])
});

  saveUser(){
    let payload={
    id:this.detailsForm.controls.id.value,
    firstname: this.detailsForm.controls.fName.value,
    lastName: this.detailsForm.controls.lName.value,
    Email: this.detailsForm.controls.email.value,
    password: this.detailsForm.controls.psw.value
    }
    this.serv.postUSer(payload).subscribe(res=>{
      console.log(res);
      window.alert("saved succesfully");
      this.getUserData();
      this.detailsForm.reset();
    })
  };
userData:any=[];
  getUserData(){
    this.serv.getUserdata().subscribe(res=>{
      this.userData= res;
    })
  };

  delete(data:any){
  this.serv.delete(data).subscribe(res=>{
    console.log(res);
    this.getUserData();
  })
  }

  
  

}
