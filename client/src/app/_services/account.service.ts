import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import {map} from 'rxjs/operators';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl='https://localhost:5001/api/' //This is the URL (The Account service will make a request
                                        // on this URL)
  private currentUserSource = new ReplaySubject<User>(1); //this is like a buffer object                                   //Going to create observable to store our user in 
                                                        //Giving the ReplaySubject type user
                                                        //Need to indicate how many previous values to store
  currentUser$ = this.currentUserSource.asObservable();
  constructor(private http: HttpClient) { }

  login(model:any)      //This method will recieve login details from the login form// user DTO is being sent back
  {
      return this.http.post(this.baseUrl+'account/login', model).pipe(      //What ever inside this pipe method is going to be a RXJS Operator
      map((reponse:User)=> {                                            //response is going to be type user object
          const user= reponse;
          if(user)
          {
            localStorage.setItem('user',JSON.stringify(user));
            this.currentUserSource.next(user);
          }


      }) //want to get our reponse that we get from server

      ) //Model will contain the username and password
  }

  register(model:any){      //Model:any will recieve from the register component

    return this.http.post(this.baseUrl + 'account/register',model).pipe(
      map((user:User) =>{          //Can use any to get around the issue of types--Type scripts
        if(user){
          localStorage.setItem('user',JSON.stringify(user));
          this.currentUserSource.next(user);
        }
        return user;
      })
      )
    }


  //helper Method
  setCurrentUser(user: User)
  {
      this.currentUserSource.next(user);
  }
                                     //Our post- need to provide a body..but we will specify the 

      logout()
      {
        localStorage.removeItem('user');
        this.currentUserSource.next(null);
      }
}
