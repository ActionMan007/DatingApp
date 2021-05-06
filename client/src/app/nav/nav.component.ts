import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model:any = {}  //What the user enters into the form, we wont give it a type as yet thus any- Initialise
                  //to an empty object
  currentUser$:Observable<User>; //Currentuser$ is type observable of type user

  constructor(public accountService: AccountService ) { }

  ngOnInit(): void {
    //this.getCurrentUser();
    

  }

  //Login method
  login()
  {   //We have to subscribe then we will get a reponse from server--We will get userDTO back
    this.accountService.login(this.model).subscribe(response => {   //Observable<Object> thats the return type of login function is lazy so we need to 
      console.log(response);    //subscribe
     
    }, error => {               //Error handling- this will display/log this error in the console
      console.log(error)
    })  //This returns a obseravable
    //console.log(this.model); //Log the login values that we get to the form
  }

  logout(){
    this.accountService.logout();
                               //We will use this LoggedIn Property in our Navcomponent.html
                            //to decide whether or not to display those links
  }

//Dont need this getCurrent User as we are getting this from our accountService
 /* getCurrentUser(){
    this.accountService.currentUser$.subscribe(user=>{ //this is not an http request and it never completes/ Potential for memory leaks
      this.loggedIn = !!user; //!! turns our object into a boolean
    },error=>{
      console.log(error);
    })
  }
  */
}
