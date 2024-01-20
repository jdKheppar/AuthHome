import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,AuthService,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router){
    
  }
  ngOnInit(): void{

  }
  
  loginForm = new FormGroup({
    
    Email: new FormControl("", [Validators.required, Validators.email]),
    Psw: new FormControl("", [Validators.required,Validators.minLength(6),Validators.maxLength(16)]),
  });
  credentialsSubmitted(){
    this.authService.loginUser([
      this.loginForm.value.Email!,
      this.loginForm.value.Psw!

    ]).subscribe((res:any)=>{

      console.log("res.message is:",res.message);
      if(res.message == "LoginSuccess!"){
        alert("Login Successfull!");
        let response=localStorage.setItem('token', res.token);
        this.router?.navigate(['/home']); 
        console.log(response);
      }
      else if(res.message=="NotFound!"){
        
        alert("User don't exists");
      }
      else if(res.message=="IncorrectPassword!"){
        
        alert("Password in incorrect");
      }
      else{
        
        alert("Something went wrong");
      }
      console.log("res is",res);
    })
    console.log(this.loginForm)
  }
  
  get Email(): FormControl{
    return this.loginForm.get("Email") as FormControl;
  }
  get Psw(): FormControl{
    return this.loginForm.get("Psw") as FormControl;
  }
 
}
