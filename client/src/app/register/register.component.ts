import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
//This is going to contain the form
//Input decorator
//Dont need input property from home component
@Output() cancelRegister = new EventEmitter(); //This is an output component and we are emitting events. When cancel button is clicked, we want to emit a value
model:any = {};   //Give it a model with type of any
 
                  

  constructor(private accountService:AccountService) { }    //So that we can inject this accountservice into the register component 

  ngOnInit(): void {
  }

  register(){
    this.accountService.register(this.model).subscribe(reponse =>{
      console.log(reponse);
      this.cancel();
    }, error=> {console.log(error);
    })  //Register component
  }

  cancel(){
    this.cancelRegister.emit(false);//We are emiting false out of this method
                                    //We want to turn the register mode off in the home component
  }

}
