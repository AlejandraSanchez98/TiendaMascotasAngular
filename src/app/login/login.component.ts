import { Component, OnInit } from '@angular/core';

export interface Rol {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  roles: Rol[] = [
    {value: 'gerente', viewValue: ' Gerente'},
    {value: 'vendedor', viewValue: ' Vendedor'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
