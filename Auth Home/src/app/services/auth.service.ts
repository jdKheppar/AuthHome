import { Injectable, NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    HttpClientModule,
    // Other imported modules
  ],
  // Other module metadata
})

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  baseServerUrl = "https://localhost:7292/api/"
  registerUser(user: Array<string>){
    console.log("received user is: ",user);
    const age: number = parseInt(user[3], 10);
    // {
    //   UserID: 1,
    //   FirstName: user[0],
    //   LastName: user[1],
    //   Mobile: user[2],
    //   Age: age,
    //   Email: user[4],
    //   Psw: user[5]

    // }
    let newUser={
      //"UserID": 11,
      "FirstName": user[0],
      "LastName": user[1],
      "Mobile": user[2],
      "Age": 83,
      "Email": user[4],
      "Pswd": user[5]
      //"Token": "jublish text"
    }
    return this.http.post(this.baseServerUrl+"User/CreateUser",newUser,{responseType: 'json'})
  }
  loginUser(user: Array<string>){
    console.log("received user is: ",user);
    
    
    let newCre={
      "Email": user[0],
      "Password": user[1]
    }
    return this.http.post(this.baseServerUrl+"User/LoginUser",newCre)//,{responseType: 'text'}
  }
  storeToken(tokenValue: string){
    localStorage.setItem('token', tokenValue)
  }
  getToken(){
    return localStorage.getItem('token')
  }
  isLoggedIn(): boolean{
    return !!localStorage.getItem('token');//casting from string to boolean
  }
}
