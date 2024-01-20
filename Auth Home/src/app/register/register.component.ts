import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,AuthService,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  //required: any;
  isAccountCreated: boolean = false;
  constructor(private authService: AuthService){

  }
  ngOnInit(): void{

  }
  
  registerForm = new FormGroup({
    FirstName: new FormControl("", [Validators.required,Validators.minLength(2)]),
    LastName: new FormControl("", Validators.required),
    Mobile: new FormControl("", Validators.required),
    Age: new FormControl("", Validators.required),
    Email: new FormControl("", [Validators.required, Validators.email]),
    Psw: new FormControl("", Validators.required),
    PswRepeat: new FormControl("", Validators.required)
  });
  registerSubmitted(){
    this.authService.registerUser([
      this.registerForm.value.FirstName!,
      this.registerForm.value.LastName!,
      this.registerForm.value.Mobile!,
      this.registerForm.value.Age!,
      this.registerForm.value.Email!,
      this.registerForm.value.Psw!

    ]).subscribe(res=>{
      if(res=="UserCreated"){
        alert("Account Created Successfully");
        this.isAccountCreated=true;
      }
      else if(res=="UserExists"){
        this.isAccountCreated=false;
        alert("Account Already Exists");
      }
      else{
        this.isAccountCreated=false;
        alert("Something went wrong");
      }
      console.log("res is",res);
    })
    console.log(this.registerForm)
  }
  get FirstName(): FormControl{
    return this.registerForm.get("FirstName") as FormControl;
  }
  get LastName(): FormControl{
    return this.registerForm.get("LastName") as FormControl;
  }
  get Mobile(): FormControl{
    return this.registerForm.get("Mobile") as FormControl;
  }
  get Age(): FormControl{
    return this.registerForm.get("Age") as FormControl;
  }
  get Email(): FormControl{
    return this.registerForm.get("Email") as FormControl;
  }
  get Psw(): FormControl{
    return this.registerForm.get("Psw") as FormControl;
  }
  get PswRepeat(): FormControl{
    return this.registerForm.get("PswRepeat") as FormControl;
  }
 

}
