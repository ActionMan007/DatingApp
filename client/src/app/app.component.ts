import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'The Dating App';

  users:any; //We are turning of type safety


  constructor(private acountService: AccountService)    //Removed private http:HttpClient from constructor
  {                                                     //OUR HOME COMPONENT WILL DO THE GET USER FUNCTIONALITY

  }



  ngOnInit() {
    //  this.getUsers();    WE ARE REMOVING THIS
      this.setCurrentUser();
    //for asynchronous code
  }

setCurrentUser(){
  const user: User = JSON.parse(localStorage.getItem('user'))
  this.acountService.setCurrentUser(user);
}


  /*getUsers(){
    this.http.get('https://localhost:5001/api/users').subscribe(response => {
    this.users=response;


    }, error => {
      console.log(error);//logging error to the console
    })

  }
  *///THIS CODE GETS THE USERS
}


  



