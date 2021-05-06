import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode= false;        //If we dont declare a type then typescript will infer the type for us/ if a declaration value is given
 

  constructor() { }

  ngOnInit(): void {
    
  }

  registerToggle(){
    this.registerMode = !this.registerMode;
  }

                                                    //the response is an array of users
                                                    //Then we setting this.users to the property users that we declared up top
  cancelRegisterMode(event:boolean){
    this.registerMode=event;

  }



}
